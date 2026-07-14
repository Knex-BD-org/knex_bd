import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Printer } from "lucide-react";
import Image from "next/image";

interface OrderItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    selectedVariant?: { name?: string };
    selectedColor?: string;
    selectedSize?: string;
    customSelections?: any;
}

interface Order {
    id: number;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    subtotal: number;
    deliveryCharge: number;
    total: number;
    createdAt: string;
    items: OrderItem[];
}

interface OrderInvoiceProps {
    order: Order;
    onClose: () => void;
}

export default function OrderInvoice({ order, onClose }: OrderInvoiceProps) {
    // Editable state
    const [customerName, setCustomerName] = useState(order.customerName);
    const [customerPhone, setCustomerPhone] = useState(order.customerPhone);
    const [deliveryAddress, setDeliveryAddress] = useState(order.deliveryAddress);
    const [invoiceDate, setInvoiceDate] = useState(new Date(order.createdAt).toLocaleDateString());

    const [items, setItems] = useState(order.items.map(item => ({ ...item })));

    const [deliveryCharge, setDeliveryCharge] = useState(order.deliveryCharge);

    // Calculated state
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryCharge;

    const handleItemChange = (index: number, field: string, value: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: Number(value) || 0 };
        setItems(newItems);
    };

    const handlePrint = () => {
        window.print();
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const invoiceContent = (
        <div className="print-invoice-wrapper fixed inset-0 z-100 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto print:shadow-none print:max-h-none print:w-full print:m-0 print:rounded-none print:overflow-visible">
                {/* Print Action Bar - hidden when printing */}
                <div className="sticky top-0 bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center print:hidden rounded-t-xl z-10">
                    <h2 className="text-lg font-bold text-gray-800">Invoice / Receipt</h2>
                    <div className="flex gap-3">
                        <button onClick={handlePrint} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <Printer className="w-4 h-4" /> Print Invoice
                        </button>
                        <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Invoice Content */}
                <div className="p-8 print:p-0 text-gray-800 bg-white" id="invoice-content">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8 border-b pb-8">
                        <div>
                            {/* KNEX Logo */}
                            <div className="mb-4">
                                <Image
                                    src="https://res.cloudinary.com/druwzzjp3/image/upload/v1781161177/3d-png_hbgcsh.png"
                                    alt="KNEX.BD"
                                    width={400}
                                    height={120}
                                    className="h-24 w-auto"
                                    unoptimized
                                />
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Dhaka, Bangladesh</p>
                            <p className="text-gray-500 text-sm font-medium">Phone: +880 9647700001</p>
                            <p className="text-gray-500 text-sm font-medium">knex.com.bd</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2 uppercase tracking-wider">Invoice</h2>
                            <div className="text-sm">
                                <p className="mb-1"><span className="font-semibold">Invoice No:</span> INV-{order.orderNumber}</p>
                                <div className="flex justify-end items-center mb-1">
                                    <span className="font-semibold mr-2">Date:</span>
                                    <input
                                        className="text-right border-none outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 print:p-0 bg-transparent w-28"
                                        value={invoiceDate}
                                        onChange={(e) => setInvoiceDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-8 bg-gray-50 p-6 rounded-lg print:bg-transparent print:p-0">
                        <h3 className="font-bold text-lg border-b pb-2 mb-4 text-gray-800 uppercase tracking-wider">Bill To</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                                <span className="font-semibold w-24">Name:</span>
                                <input className="flex-1 border-none outline-none focus:ring-1 focus:ring-blue-500 bg-transparent print:p-0 font-medium text-gray-900" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold w-24">Phone:</span>
                                <input className="flex-1 border-none outline-none focus:ring-1 focus:ring-blue-500 bg-transparent print:p-0" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                            </div>
                            <div className="flex items-start">
                                <span className="font-semibold w-24 mt-1">Address:</span>
                                <textarea
                                    className="flex-1 border-none outline-none focus:ring-1 focus:ring-blue-500 bg-transparent resize-none print:p-0 h-16"
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="mb-8">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b-2 border-gray-800 text-gray-800">
                                    <th className="py-3 px-2 uppercase font-bold w-12">#</th>
                                    <th className="py-3 px-2 uppercase font-bold">Item Description</th>
                                    <th className="py-3 px-2 uppercase font-bold text-center w-24">Qty</th>
                                    <th className="py-3 px-2 uppercase font-bold text-right w-32">Price (Tk)</th>
                                    <th className="py-3 px-2 uppercase font-bold text-right w-32">Total (Tk)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {items.map((item, idx) => {
                                    // Build variant display
                                    const variantParts: string[] = [];
                                    if (item.selectedVariant?.name) variantParts.push(item.selectedVariant.name);
                                    if (item.selectedColor) variantParts.push(`Color: ${item.selectedColor}`);
                                    if (item.selectedSize) variantParts.push(`Size: ${item.selectedSize}`);
                                    const variantText = variantParts.join(" | ");

                                    return (
                                        <tr key={item.id} className="text-gray-700">
                                            <td className="py-4 px-2">{idx + 1}</td>
                                            <td className="py-4 px-2">
                                                <div className="font-semibold text-gray-900">{item.title}</div>
                                                {variantText && <div className="text-xs text-gray-500 mt-1">{variantText}</div>}
                                            </td>
                                            <td className="py-4 px-2 text-center">
                                                <input
                                                    type="number"
                                                    className="w-16 text-center border-b border-gray-300 bg-transparent outline-none focus:border-blue-500 print:border-none print:p-0"
                                                    value={item.quantity}
                                                    onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                                                />
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <input
                                                    type="number"
                                                    className="w-24 text-right border-b border-gray-300 bg-transparent outline-none focus:border-blue-500 print:border-none print:p-0"
                                                    value={item.price}
                                                    onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
                                                />
                                            </td>
                                            <td className="py-4 px-2 text-right font-medium text-gray-900">
                                                {(item.price * item.quantity).toLocaleString()}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="flex justify-end mb-12">
                        <div className="w-72 space-y-3 text-sm">
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-gray-600">Subtotal:</span>
                                <span>Tk {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="font-semibold text-gray-600">Delivery Charge:</span>
                                <div className="flex items-center">
                                    <span className="mr-1">Tk</span>
                                    <input
                                        type="number"
                                        className="w-16 text-right border-b border-gray-300 bg-transparent outline-none focus:border-blue-500 print:border-none print:p-0"
                                        value={deliveryCharge}
                                        onChange={(e) => setDeliveryCharge(Number(e.target.value) || 0)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="font-bold text-gray-900 uppercase">Total:</span>
                                <span className="font-bold text-lg text-blue-600">Tk {total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Notes */}
                    <div className="border-t pt-6 text-sm text-gray-500">
                        <h4 className="font-bold text-gray-800 mb-2 uppercase">Terms & Conditions</h4>
                        <p>Please contact our support for any queries regarding this order.</p>
                        <div className="mt-8 text-center font-semibold text-gray-800 italic">
                            Thank you for your business!
                        </div>
                    </div>
                </div>
            </div>

            {/* Inject print styles globally just for this component */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { margin: 0; }
                    body {
                        margin: 0;
                        padding: 0;
                        background: white;
                    }
                    /* Hide everything in the body EXCEPT our invoice wrapper */
                    body > *:not(.print-invoice-wrapper) {
                        display: none !important;
                    }
                    /* Reset the wrapper to be a normal static element for printing */
                    .print-invoice-wrapper {
                        position: static !important;
                        display: block !important;
                        background: white !important;
                        padding: 1cm !important; /* Margin for the printed page */
                    }
                    /* Make the inner content flow normally */
                    .print-invoice-wrapper > div {
                        max-height: none !important;
                        overflow: visible !important;
                        box-shadow: none !important;
                    }
                    input[type="number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                }
            `}} />
        </div>
    );

    if (!mounted) return null;
    return createPortal(invoiceContent, document.body);
}
