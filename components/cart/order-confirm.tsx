"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { useCartStore } from "@/lib/client-store";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { motion } from "framer-motion";
import orderConfirmed from "../../public/order-confirmed.json";
import { Suspense } from "react";
import LoadingSpinner from "../Loading";
export default function OrderConfirmed() {
  const { setCheckoutProgress, setCartOpen } = useCartStore();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="flex flex-col items-center  gap-4">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Lottie className="h-56 my-4" animationData={orderConfirmed} />
        </motion.div>
        <h2 className="text-2xl font-medium">Appointment Confirmed</h2>
        <p className="max-w-md text-center text-sm text-muted-foreground">
          Your viewing appointment has been booked! Visit the property on your
          selected date. If you love it, call the hostel directly to check
          availability and reserve your space.
        </p>
        <div className="rounded-md border p-4 text-sm text-left w-full max-w-md">
          <p className="font-medium">Hostel Contact</p>
          <p>Phone: +233 000 000 000</p>
          <p>WhatsApp: +233 000 000 000</p>
        </div>
        <Link href={"/dashboard/orders"}>
          <Button
            variant={"secondary"}
            onClick={() => {
              setCheckoutProgress("cart-page");
              setCartOpen(false);
            }}
          >
            Browse More Properties
          </Button>
        </Link>
      </div>
    </Suspense>
  );
}
