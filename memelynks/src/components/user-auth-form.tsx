/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
import { ImSpinner } from "react-icons/im";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { signInBtn } from "@/lib/signInBtn";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<string>("");

  // async function onSubmit(event: React.FormEvent) {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const result = await signIn("credentials", {
  //       email,
  //       password,
  //       redirect: false,
  //     });

  //     if (result?.error) {
  //       setError(result.error);
  //     } else {
  //       router.push("/dashboard");
  //     }
  //   } catch (error) {
  //     setError("An error occurred. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function handleSocialSignIn(provider: string) {
  //   setIsLoading(true);
  //   try {
  //     await handleSignIn(provider);
  //   } catch (error) {
  //     setError("Failed to sign in with " + provider);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-transparent border-white/25"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password webauthn"
              autoCorrect="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-transparent border-white/25"
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <Button disabled={isLoading} onClick={() => magicLinkBtn()}>
            {isLoading && <ImSpinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form> */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-neutral-950 z-20 px-2 text-muted-foreground">
            Continue With
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading.length > 0}
        // onClick={() => handleSocialSignIn("twitter")}
        onClick={() => {
          setIsLoading("twitter");
          signInBtn("twitter");
        }}
        className="bg-transparent border-white/25 [&_svg]:size-6"
      >
        {isLoading === "twitter" ? (
          <ImSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaXTwitter className="mr-2 h-4 w-4" />
        )}
        X (Twitter)
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading.length > 0}
        className="bg-transparent border-white/25 [&_svg]:size-6"
        // onClick={() => handleSocialSignIn("google")}
        onClick={() => {
          setIsLoading("google");
          signInBtn("google");
        }}
      >
        {isLoading === "google" ? (
          <ImSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading.length > 0}
        className="bg-transparent border-white/25 [&_svg]:size-6"
        // onClick={() => handleSocialSignIn("github")}
        onClick={() => {
          setIsLoading("github");
          signInBtn("github");
        }}
      >
        {isLoading === "github" ? (
          <ImSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGithub className="mr-2 h-4 w-4" />
        )}
        GitHub
      </Button>
    </div>
  );
}
