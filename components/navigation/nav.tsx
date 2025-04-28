import { auth } from "@/server/auth";
import UserButton from "./user-btn";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
// import Logo from "./logo";
import bb from "../../public/gggg.png";
import Image from "next/image";
export default async function Nav() {
  const session = await auth();

  return (
    <header className=" py-12 shadow-xl">
      <nav>
        <ul
          aria-label="Zonyra Hubert logo"
          className="flex justify-between  items-center"
        >
          <li>
            <Link href={"/"}>
              <Image src={bb} alt="Logo" width={100} />

              {/* <Logo /> */}
            </Link>
          </li>
          {!session ? (
            <li>
              <Button asChild>
                <Link className="flex gap-2" href="/auth/login">
                  <LogIn size={16} />
                  <span>LogIn</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li>
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
