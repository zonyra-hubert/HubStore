"use client";

import { Button } from "../ui/button";
import Link from "next/link";

type BackButtonType = {
  href: string;
  label: string;
};
const BackButton = ({ href, label }: BackButtonType) => {
  return (
    <Button asChild variant={"link"} className="font-meduim w-full">
      <Link aria-label={label} href={href}>
        {label}
      </Link>
    </Button>
  );
};

export default BackButton;
