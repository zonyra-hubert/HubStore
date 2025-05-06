"use client";

import { useCartStore } from "@/lib/client-store";
import { ShoppingBag } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import CartItems from "./cart-items";
import CartMessage from "./cart-message";
import Payment from "./Payment";
import OrderConfirmed from "./order-confirm";
import CartProgress from "./cart-progress";

export default function CartDrawer() {
  const { cart, checkoutProgress, cartOpen, setCartOpen } = useCartStore();
  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen}>
      <DrawerTrigger>
        <div className="relative px-2">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0, opacity: 0 }}
                exit={{ scale: 0 }}
                className="absolute flex items-center justify-center -top-1 -right-0.5 w-5 h-4 dark:bg-primary bg-primary text-white text-xs font-bold rounded-full"
              >
                {cart.length}
              </motion.span>
            )}
          </AnimatePresence>
          <ShoppingBag />
        </div>
      </DrawerTrigger>
      <DrawerContent className="fixed bottom-0 left-0 max-h-[70vh] min-h-[50vh]">
        <DrawerHeader>
          <CartMessage />
          <CartProgress />
        </DrawerHeader>
        <div className="overflow-auto p-4">
          {checkoutProgress === "cart-page" && <CartItems />}
          {checkoutProgress === "payment-page" && <Payment />}
          {checkoutProgress === "confirmation-page" && <OrderConfirmed />}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
