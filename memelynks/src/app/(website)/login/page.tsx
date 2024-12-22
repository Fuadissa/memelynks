import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "@/components/user-auth-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  
  return (
    <>
      <div className="container relative h-screen flex flex-col items-center justify-center">
        <div className="absolute lg:top-10 lg:left-10 md:top-8 md:left-8 left-4 top-10 z-20 flex items-center text-lg font-medium">
          <span className="text-3xl pl-3">
            Meme<span className="text-[#ffce7b]">Lynks</span>
          </span>
        </div>

        <div className="lg:p-8 lg:pt-20 flex flex-col justify-center items-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:w-[350px] md:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-xl font-semibold tracking-tight">
                Create Or Enter Account
              </h1>
              <p className="text-sm text-muted-foreground">
                Use any of the social Login
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
