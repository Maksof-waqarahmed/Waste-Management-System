import ForgotPassword from "@/components/auth/forgot-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import logo from "../../../assets/images/logo.png";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-green-100 p-5">
      <Card className="rounded-2xl max-w-[400px] w-full font-heading">
        <CardHeader>
          <div className="flex items-center">
            <Image
              src={logo}
              width={120}
              height={44}
              alt=""
              className="mt-[-20px] ml-[-27px] w-20 h-20 md:w-[120px] md:h-[120px]"
            />
            <h3 className="md:text-2xl font-bold mb-5 text-[#027C05] text-xl">
              Waste Management System
            </h3>
          </div>
          <CardTitle className="text-2xl text-[#027C05] font-bold	">
            Forgot Your Password?
          </CardTitle>
          <CardDescription className="text-black">
            We’ll send you instructions to reset your password via email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPassword />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
