"use client";

import { useCartStore } from "@/lib/client-store";
import getStripe from "@/lib/get-stripe";
import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import PaymentForm from "./PaymentForm";
import { useTheme } from "next-themes";
import { Suspense } from "react";
import LoadingSpinner from "../Loading";

export default function Payment() {
  const stripe = getStripe();
  const { cart } = useCartStore();
  const { theme } = useTheme();

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.variant.quantity;
  }, 0);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <motion.div className="max-w-2xl mx-auto">
        <div className="mb-4 rounded-md border bg-muted/30 p-4 text-sm">
          No payment needed — visit the property and contact them directly to
          confirm your stay.
        </div>
        <Elements
          stripe={stripe}
          options={{
            mode: "payment",
            currency: "usd",
            amount: totalPrice * 100,
            appearance: { theme: theme === "dark" ? "night" : "flat" },
          }}
        >
          <PaymentForm totalPrice={totalPrice} />
        </Elements>
      </motion.div>
    </Suspense>
  );
}
