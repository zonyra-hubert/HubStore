import { auth } from "@/server/auth";
import { UserButton } from "./user-btn";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
// import Logo from "./logo";
import bb from "../../public/gggg.png";
import Image from "next/image";
export default async function Nav() {
  const session = await auth();
  const listPropertyHref =
    session?.user.role === "admin"
      ? "/dashboard/add-product"
      : "/dashboard/request-access";

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
          <li>
            <Link href="/" className="text-sm font-medium hover:underline">
              Browse Listings
            </Link>
          </li>
          <li>
            <Link
              href={listPropertyHref}
              className="text-sm font-medium hover:underline"
            >
              List Your Property
            </Link>
          </li>
          {!session ? (
            <li className="flex items-center justify-center">
              <Button asChild>
                <Link className="flex gap-2" href="/auth/login">
                  <LogIn size={16} />
                  <span>Login</span>
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
