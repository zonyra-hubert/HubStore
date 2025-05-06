import { auth } from "@/server/auth";
import { UserButton } from "./user-btn";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
// import Logo from "./logo";
import bb from "../../public/gggg.png";
import Image from "next/image";
import CartDrawer from "../cart/cart-drawer";
export default async function Nav() {
  const session = await auth();

  return (
    <header className=" py-12 shadow-sm">
      <nav>
        <ul
          aria-label="Zonyra Hubert logo"
          className="flex justify-between  items-center md:gap-8 gap-4"
        >
          <li className="flex flex-1">
            <Link href={"/"}>
              <Image src={bb} alt="Logo" width={100} />

              {/* <Logo /> */}
            </Link>
          </li>
          <li className="relative flex items-center hover:bg-muted ">
            <CartDrawer />
          </li>
          {!session ? (
            <li className="flex items-center justify-center">
              <Button asChild>
                <Link className="flex gap-2" href="/auth/login">
                  <LogIn size={16} />
                  <span>LogIn</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li className="flex items-center justify-center">
              <UserButton
                expires={session?.expires ?? ""}
                user={session?.user}
              />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
