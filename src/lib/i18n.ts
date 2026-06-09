import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    filters: "Filters",
                    clear_all_upper: "CLEAR ALL",
                    clear_all: "Clear All",
                    applied: "Applied",
                    categories: "Categories",
                    sub_categories: "Sub Categories",
                    subcategories: "Subcategories",
                    sub_sub_categories: "Sub-Sub Categories",
                    brand: "Brand",
                    price_range: "Price Range",
                    apply_filters: "Apply Filters",
                    enter_different_address: "Enter different address",
                    loading_saved_addresses: "Loading saved addresses...",
                    delivery_address: "Delivery Address",
                    enter_new_address: "Enter new address",
                    select_address: "Select address",
                    default: "Default",
                    login_required: "Login Required",
                    login_required_desc: "Please login or create an account to complete your purchase. Your cart will be saved.",
                    login: "Login",
                    create_account: "Create Account",
                    cart_saved_desc: "Your cart items are saved and will be available after login.",
                    order_placed: "Order Placed!",
                    order_success_desc: "Your order has been placed successfully.",
                    order_number_label: "Order Number:",
                    contact_confirm_desc: "We will contact you shortly to confirm your order.",
                    view_my_orders: "View My Orders",
                    continue_shopping: "Continue Shopping",
                    checkout: "Checkout",
                    complete_your_order: "Complete your order",
                    delivery_location: "Delivery Location",
                    inside_dhaka: "Inside Dhaka",
                    outside_dhaka: "Outside Dhaka",
                    payment_method: "Payment Method",
                    cash_on_delivery: "Cash on Delivery",
                    pay_when_you_receive: "Pay when you receive",
                    subtotal: "Subtotal",
                    delivery: "Delivery",
                    total: "Total",
                    place_order: "Place Order",
                    placing_order: "Placing Order...",
                    delivery_charge_info: "Delivery: Tk {{amount}}",
                    currency_amount: "Tk {{amount}}"
                }
            }
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // React already safes from XSS
        }
    });

export default i18n;
