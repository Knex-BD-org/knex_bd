"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, User, Phone, Mail, MapPin, Wallet, LogIn, Loader2, CheckCircle, XCircle, ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Address {
    id: number;
    type: string;
    name: string;
    phone: string;
    address: string;
    area: string;
    city: string;
    isDefault: boolean;
}

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    total: number;
}

interface OrderBody {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: string;
    deliveryArea: "inside" | "outside";
    paymentMethod: string;
    items?: Array<{
        productId: number;
        title: string;
        price: number;
        quantity: number;
        image: string;
        selectedColor: string | null;
        selectedSize: string | null;
        selectedVariant: unknown;
        customSelections: unknown;
    }>;
}

export default function CheckoutModal({ isOpen, onClose, total }: CheckoutModalProps) {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { refreshCart, clearCart, items } = useCart();

    const [location, setLocation] = useState<"inside" | "outside">("inside");
    const [paymentMethod, setPaymentMethod] = useState<"cod" /* | "bkash" | "nagad" */>("cod");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Saved addresses state
    const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | "custom">("custom");
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const [showAddressSelector, setShowAddressSelector] = useState(false);

    // Form state
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");

    // Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [error, setError] = useState("");

    // Fetch saved addresses
    const fetchAddresses = useCallback(async () => {
        const token = localStorage.getItem("userToken");
        if (!token) return;

        setLoadingAddresses(true);
        try {
            const res = await fetch(`${API}/addresses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const addresses: Address[] = await res.json();
                setSavedAddresses(addresses);

                // Pre-fill with default address if available
                const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
                if (defaultAddr) {
                    setSelectedAddressId(defaultAddr.id);
                    setCustomerName(defaultAddr.name);
                    setCustomerPhone(defaultAddr.phone);
                    setDeliveryAddress(`${defaultAddr.address}, ${defaultAddr.city}`);
                    setLocation(defaultAddr.area === "inside" ? "inside" : "outside");
                }
            }
        } catch (e) {
            console.error("Error fetching addresses:", e);
        } finally {
            setLoadingAddresses(false);
        }
    }, []);

    // Track if modal was previously open
    const prevIsOpen = useRef(false);
    const prevLanguage = useRef(i18n.language);

    // Check if user is logged in and fetch addresses
    useEffect(() => {
        if (isOpen) {
            const token = localStorage.getItem("userToken");
            const loggedIn = !!token;
            setIsLoggedIn(loggedIn);
            setCheckingAuth(false);
            setOrderSuccess(false);
            setError("");

            // Only set language to 'bn' when the modal transitions from closed to open
            if (!prevIsOpen.current) {
                prevLanguage.current = i18n.language;
                if (i18n.language !== 'bn') {
                    i18n.changeLanguage('bn');
                }
            }

            if (loggedIn) {
                fetchAddresses();
            }
        } else if (prevIsOpen.current) {
            // Modal just closed — restore previous language
            i18n.changeLanguage(prevLanguage.current);
        }
        prevIsOpen.current = isOpen;
    }, [isOpen, fetchAddresses, i18n]);

    // Handle address selection
    const handleAddressSelect = (addressId: number | "custom") => {
        setSelectedAddressId(addressId);
        setShowAddressSelector(false);

        if (addressId === "custom") {
            // Clear form for custom entry
            setCustomerName("");
            setCustomerPhone("");
            setCustomerEmail("");
            setDeliveryAddress("");
            return;
        }

        const selected = savedAddresses.find((a) => a.id === addressId);
        if (selected) {
            setCustomerName(selected.name);
            setCustomerPhone(selected.phone);
            setDeliveryAddress(`${selected.address}, ${selected.city}`);
            setLocation(selected.area === "inside" ? "inside" : "outside");
        }
    };

    if (!isOpen) return null;

    const deliveryCharge = location === "inside" ? 60 : 130;
    const finalTotal = total + deliveryCharge;

    // Handle order submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent double submission
        setError("");

        // Validation
        const phoneRegex = /^(?:\+88|01)[3-9]\d{8}$/;
        if (!customerName.trim()) {
            setError("Please enter your name");
            return;
        }
        if (!customerPhone.trim() || !phoneRegex.test(customerPhone.trim())) {
            setError("Please enter a valid Bangladeshi phone number");
            return;
        }
        if (!deliveryAddress.trim() || deliveryAddress.trim().length < 5) {
            setError("Please enter a valid delivery address");
            return;
        }
        if (!items || items.length === 0) {
            setError("Your cart is empty");
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("userToken");

            let endpoint = `${API}/orders`;
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            const body: OrderBody = {
                customerName: customerName.trim(),
                customerEmail: customerEmail.trim(),
                customerPhone: customerPhone.trim(),
                deliveryAddress: deliveryAddress.trim(),
                deliveryArea: location,
                paymentMethod,
            };

            // For guest checkout, use guest endpoint and include cart items
            if (!token) {
                endpoint = `${API}/orders/guest/create`;
                body.items = items.map(item => ({
                    productId: item.productId,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    selectedColor: item.selectedColor || null,
                    selectedSize: item.selectedSize || null,
                    selectedVariant: item.selectedVariant || null,
                    customSelections: item.customSelections || null,
                }));
            } else {
                headers.Authorization = `Bearer ${token}`;
            }

            const res = await fetch(endpoint, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to place order");
            }

            // Success!
            setOrderNumber(data.order.orderNumber);
            setOrderSuccess(true);

            // Clear cart to remove items
            if (!token) {
                clearCart();
            } else {
                await refreshCart();
            }

            // Reset form
            setCustomerName("");
            setCustomerPhone("");
            setCustomerEmail("");
            setDeliveryAddress("");

        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to place order");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading while checking auth
    if (checkingAuth) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    // Show success message
    if (orderSuccess) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} className="text-green-600" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("order_placed")}</h2>
                    <p className="text-gray-600 mb-6">
                        {t("order_success_desc")}
                    </p>

                    <div className="space-y-3">
                        {isLoggedIn && (
                            <button
                                onClick={() => {
                                    onClose();
                                    router.push("/account/orders");
                                }}
                                className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
                            >
                                {t("view_my_orders")}
                            </button>
                        )}
                        <button
                            onClick={() => {
                                onClose();
                                router.push("/");
                            }}
                            className={`block w-full py-3 rounded-xl font-semibold transition cursor-pointer ${
                                isLoggedIn
                                ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                        >
                            {t("continue_shopping")}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer z-10">
                    <X size={24} />
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 relative shrink-0">
                        <Image src="https://res.cloudinary.com/dh34a84tc/image/upload/v1772353425/3d-png_lcu5qg.png" alt="KNEX" fill className="object-contain" loading="eager" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t("checkout")}</h2>
                        <p className="text-xs text-gray-500">{t("complete_your_order")}</p>
                    </div>
                    <div className="flex bg-gray-100 p-1 rounded-lg shrink-0 mr-8">
                        <button
                            type="button"
                            onClick={() => i18n.changeLanguage("bn")}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${i18n.language === "bn" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            বাংলা
                        </button>
                        <button
                            type="button"
                            onClick={() => i18n.changeLanguage("en")}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${i18n.language === "en" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            EN
                        </button>
                    </div>
                </div>

                {!isLoggedIn && !checkingAuth && (
                    <div className="mb-6 p-4 bg-linear-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl flex items-start gap-3">
                        <LogIn size={18} className="text-blue-600 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{t("want_saved_addresses", "Want faster checkout?")}</p>
                            <p className="text-xs text-gray-600 mb-2">{t("login_to_save_addresses", "Login to save addresses and order history")}</p>
                            <div className="flex gap-2">
                                <Link
                                    href="/login"
                                    className="text-xs px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    {t("login", "Login")}
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-xs px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                                >
                                    {t("register", "Register")}
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                        <XCircle size={20} className="text-red-500 shrink-0" />
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Saved Address Selector */}
                {savedAddresses.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <MapPin size={16} className="text-blue-500" /> {t("delivery_address")}
                        </p>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowAddressSelector(!showAddressSelector)}
                                className="w-full flex items-center justify-between gap-3 px-4 py-3 border-2 border-blue-200 bg-blue-50 rounded-xl hover:border-blue-400 transition"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <MapPin size={18} className="text-blue-500 shrink-0" />
                                    <span className="text-sm text-gray-700 truncate">
                                        {selectedAddressId === "custom"
                                            ? t("enter_new_address")
                                            : savedAddresses.find((a) => a.id === selectedAddressId)?.address || t("select_address")}
                                    </span>
                                </div>
                                <ChevronDown size={18} className={`text-gray-500 shrink-0 transition-transform ${showAddressSelector ? "rotate-180" : ""}`} />
                            </button>

                            {showAddressSelector && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
                                    {savedAddresses.map((addr) => (
                                        <button
                                            key={addr.id}
                                            type="button"
                                            onClick={() => handleAddressSelect(addr.id)}
                                            className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition text-left border-b border-gray-100 last:border-b-0 ${selectedAddressId === addr.id ? "bg-blue-50" : ""
                                                }`}
                                        >
                                            <MapPin size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                                                    {addr.name}
                                                    {addr.isDefault && (
                                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{t("default")}</span>
                                                    )}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">{addr.address}, {addr.city}</p>
                                                <p className="text-xs text-gray-400">{addr.phone}</p>
                                            </div>
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleAddressSelect("custom")}
                                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left ${selectedAddressId === "custom" ? "bg-blue-50" : ""
                                            }`}
                                    >
                                        <Plus size={16} className="text-green-500" />
                                        <span className="text-sm text-gray-700">{t("enter_different_address")}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {loadingAddresses && (
                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                        <Loader2 size={16} className="animate-spin" />
                        {t("loading_saved_addresses")}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Personal Info - Side by Side */}
                    <div className="grid md:grid-cols-2 gap-3">
                        <label className="block">
                            <div className="flex items-center gap-3 px-4 py-3 border rounded-xl focus-within:ring-2 focus-within:ring-blue-400 transition">
                                <User size={18} className="text-blue-500 shrink-0" />
                                <input
                                    type="text"
                                    placeholder={t("full_name_placeholder", "Full Name")}
                                    required
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                            </div>
                        </label>

                        <label className="block">
                            <div className="flex items-center gap-3 px-4 py-3 border rounded-xl focus-within:ring-2 focus-within:ring-green-400 transition">
                                <Phone size={18} className="text-green-500 shrink-0" />
                                <input
                                    type="tel"
                                    placeholder={t("phone_number_placeholder", "Phone Number")}
                                    required
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                            </div>
                        </label>
                    </div>

                    {/* Email */}
                    <label className="block">
                        <div className="flex items-center gap-3 px-4 py-3 border rounded-xl focus-within:ring-2 focus-within:ring-yellow-400 transition">
                            <Mail size={18} className="text-yellow-600 shrink-0" />
                            <input
                                type="email"
                                placeholder={t("email_placeholder", "Email Address (Optional)")}
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm"
                            />
                        </div>
                    </label>

                    {/* Address */}
                    <label className="block">
                        <div className="flex items-start gap-3 px-4 py-3 border rounded-xl focus-within:ring-2 focus-within:ring-blue-400 transition">
                            <MapPin size={18} className="text-blue-500 mt-1 shrink-0" />
                            <textarea
                                placeholder={t("delivery_address_placeholder", "Delivery Address")}
                                required
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm resize-none"
                                rows={2}
                            />
                        </div>
                    </label>

                    {/* Delivery Location */}
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">{t("delivery_location")}</p>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="flex items-center gap-3 px-4 py-3 border-2 rounded-xl cursor-pointer hover:bg-blue-50 transition" style={{ borderColor: location === "inside" ? "#3b82f6" : "#e5e7eb" }}>
                                <input type="radio" name="location" checked={location === "inside"} onChange={() => setLocation("inside")} className="w-4 h-4 text-blue-600 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm">{t("inside_dhaka")}</p>
                                    <p className="text-xs text-gray-500">{t("delivery_charge_info", { amount: 60 })}</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 px-4 py-3 border-2 rounded-xl cursor-pointer hover:bg-green-50 transition" style={{ borderColor: location === "outside" ? "#22c55e" : "#e5e7eb" }}>
                                <input type="radio" name="location" checked={location === "outside"} onChange={() => setLocation("outside")} className="w-4 h-4 text-green-600 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm">{t("outside_dhaka")}</p>
                                    <p className="text-xs text-gray-500">{t("delivery_charge_info", { amount: 130 })}</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <Wallet size={16} className="text-yellow-600" /> {t("payment_method")}
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                            {/* Cash on Delivery - Active */}
                            <label className="flex items-center gap-3 px-4 py-4 border-2 rounded-xl cursor-pointer hover:border-blue-400 transition" style={{ borderColor: paymentMethod === "cod" ? "#3b82f6" : "#e5e7eb", backgroundColor: paymentMethod === "cod" ? "#eff6ff" : "transparent" }}>
                                <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="w-4 h-4" />
                                <div>
                                    <p className="font-semibold text-sm">{t("cash_on_delivery")}</p>
                                    <p className="text-xs text-gray-500">{t("pay_when_you_receive")}</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-linear-to-r from-blue-50 to-green-50 rounded-xl p-5 border border-blue-100 mt-2">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">{t("subtotal")}</span>
                            <span className="font-medium text-sm">{t("currency_amount", { amount: total.toLocaleString() })}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">{t("delivery")}</span>
                            <span className="font-medium text-sm text-green-600">{t("currency_amount", { amount: deliveryCharge })}</span>
                        </div>
                        <div className="border-t border-gray-300 pt-3 mt-2 flex justify-between items-center">
                            <span className="font-bold text-gray-900 text-base">{t("total")}</span>
                            <span className="text-2xl font-bold text-blue-600">{t("currency_amount", { amount: finalTotal.toLocaleString() })}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-linear-to-r from-blue-600 to-green-600 text-white p-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                {t("placing_order")}
                            </>
                        ) : (
                            t("place_order")
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
