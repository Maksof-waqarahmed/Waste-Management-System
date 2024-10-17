import VerifyEmail from "@/components/auth/verify-email-screen";
import { Card } from "@/components/ui/card";
import React from "react";

const Page = ({searchParams}: any) => {
  return (
    <div>
      <Card>
        <VerifyEmail searchParams={searchParams}/>
      </Card>
    </div>
  );
};

export default Page;
