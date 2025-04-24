import React from "react";
import Link from "next/link";
import { User, Users } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md text-center">
        <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary mb-3">Communities</h1>
        <p className="text-secondary mb-8">
          Select a community to interact with:
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/communities/explore"
            className="w-full py-3 px-4 rounded-full bg-accent text-white font-medium text-center hover:bg-accent/90 transition-all">
            Explore Communities
          </Link>

          <Link
            href="/communities/create"
            className="w-full py-3 px-4 rounded-full bg-white border border-gray-300 text-primary font-medium text-center hover:bg-gray-50 transition-all">
            Create New Community
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
