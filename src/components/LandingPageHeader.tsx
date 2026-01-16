import React from "react";
import { Button } from "./ui/button";

const LandingPageHeader = () => {
  return (
    <div className="fixed left-0 right-0 top-0 h-12.5 bg-stone-100 border border-b-0.5 border-primary flex justify-between items-center px-3">
      <div>
        <span className="font-semibold text-primary">zAcademy</span>
      </div>

      <div className="flex gap-3 items-center">
        <Button variant={"outline"}>Sign up</Button>
        <Button>Sign in</Button>
      </div>
    </div>
  );
};

export default LandingPageHeader;
