import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Socials from "./socials";
import BackButton from "./back-button";
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
  );
};

export default AuthCard;
