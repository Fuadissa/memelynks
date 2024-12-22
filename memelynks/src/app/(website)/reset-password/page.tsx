/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/auth/reset-password.tsx

"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password: newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/signin");
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      {error && <div className="text-red-600">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <label htmlFor="token" className="text-sm font-medium">Reset Token</label>
          <input
            id="token"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="input input-bordered w-full"
            required
            disabled={isLoading}
          />
          <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input input-bordered w-full"
            required
            disabled={isLoading}
          />
          <button type="submit" className="btn-primary btn w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
