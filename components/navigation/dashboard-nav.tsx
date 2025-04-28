"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
const DashboardNav = ({
  allLinks,
}: {
  allLinks: { label: string; path: string; icon: JSX.Element }[];
}) => {
  const pathname = usePathname();
  return (
    <nav className="py-2 overflow-auto mb-4">
      <ul className="flex   gap-6 text-xs font-bold">
        <AnimatePresence>
          {allLinks.map((link) => (
            <motion.li key={link.label} whileTap={{ scale: 0.95 }}>
              <Link
                className={cn(
                  "flex gap-1 flex-col items-center relative",
                  pathname === link.path && "text-primary"
                )}
                href={link.path}
              >
                {link.icon}
                {link.label}
                {pathname === link.path ? (
                  <motion.div
                    className="h-[2px] w-full rounded-full absolute bg-primary z-0 left-0 -bottom-1"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 35 }}
                  />
                ) : null}
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </nav>
  );
};

export default DashboardNav;
