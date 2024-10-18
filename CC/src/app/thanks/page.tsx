import React from "react";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/outline";

const Thanks = () => {
  return (
    <div className="flex mt-24 items-center justify-center px-4">
      <div className="mx-auto p-10 rounded-xl shadow-xl text-center space-y-8">
        <CheckCircleIcon className="h-24 w-24 text-magenta mx-auto animate-bounce" />
        <h1 className="text-2xl font-bold text-magenta m-4">
          Thanks - Submission Received!
        </h1>
      
        <Link href="/dashboard">
          <span className="inline-block bg-magenta text-white text-lg font-semibold px-8 py-4 rounded-lg shadow hover:bg-yorange transition duration-300 mt-8">
            Track your referrals
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Thanks;


