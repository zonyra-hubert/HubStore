"use client";

import { useCartStore } from "@/lib/client-store";
import { motion } from "framer-motion";
import { DrawerDescription, DrawerTitle } from "../ui/drawer";
import { ArrowLeft } from "lucide-react";

const CartMessage = () => {
  const { checkoutProgress, setCheckoutProgress } = useCartStore();
  return (
    <motion.div
      className="text-center"
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 10 }}
    >
      <DrawerTitle>
        {checkoutProgress === "cart-page" ? "Your viewing requests" : null}
        {checkoutProgress === "payment-page"
          ? "Confirm your appointment"
          : null}
        {checkoutProgress === "confirmation-page"
          ? "Appointment Confirmed"
          : null}
      </DrawerTitle>
      <DrawerDescription className="py-1">
        {checkoutProgress === "cart-page"
          ? "Review the properties you want to visit"
          : null}
        {checkoutProgress === "payment-page" ? (
          <span
            className="flex items-center justify-center gap-1 cursor-pointer hover:text-primary"
            onClick={() => setCheckoutProgress("cart-page")}
          >
            <ArrowLeft size={14} /> Head back to viewings
          </span>
        ) : null}
        {checkoutProgress === "confirmation-page"
          ? "Your appointment request has been saved. You can contact the hostel directly after visiting."
          : null}
      </DrawerDescription>
    </motion.div>
  );
};

export default CartMessage;
