import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Socials from "./socials";
import BackButton from "./back-button";
import { Suspense } from "react";
import LoadingSpinner from "../Loading";
type CardWrapperProps = {
  children: React.ReactNode;
  className: string;
  cardTitle: string;
  backButtonHref: string;
  backButtonLable: string;
  showSocials?: boolean;
};

const AuthCard = ({
  children,
  cardTitle,
  backButtonHref,
  backButtonLable,
  showSocials,
}: CardWrapperProps) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Card>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocials && (
          <CardFooter>
            <Socials />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton href={backButtonHref} label={backButtonLable} />
        </CardFooter>
      </Card>
    </Suspense>
  );
};

export default AuthCard;
