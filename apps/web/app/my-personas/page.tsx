"use client";

import { useConvexAuth } from "convex/react";
import { SignIn, useUser } from "@clerk/nextjs";
import { MyPersonas } from "../../components/personas/my-personas";

export default function Page(): JSX.Element {
  const { user } = useUser();
  const { isAuthenticated } = useConvexAuth();
  return (
    <div className="w-full h-full flex flex-col justify-self-start lg:pr-6">
      {isAuthenticated ? (
        <MyPersonas />
      ) : (
        <div className="w-full h-full items-start justify-center flex py-32">
          {!user && <SignIn />}
        </div>
      )}
    </div>
  );
}
