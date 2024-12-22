"use client";

import { useState } from "react";
import SubmitButton from "../SubmitButton";
import RightIcon from "../RightIcon";
import grabTicker from "@/actions/grabTicker";

interface UsernameFormProps {
  desiredUsername?: string; // Use `string | undefined` if the prop is optional
}

export default function UsernameForm({ desiredUsername }: UsernameFormProps) {
  const [ticker, setTicker] = useState(desiredUsername || ""); // State for the ticker input
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Pass the ticker directly to grabTicker
    const result = await grabTicker({ ticker }); // Assuming grabTicker accepts an object with the ticker

    if (result.success) {
      window.location.href = `/account?created=${ticker}`;
    } else {
      setError(result.message);

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit} // Attach the submit handler
      className="bg-white p-4 rounded-md flex flex-col gap-4 shadow-xl"
    >
      <h1 className="text-4xl font-bold text-center mb-2">Grab your Ticker</h1>
      <p className="text-center mb-6 text-gray-500">Choose your ticker</p>
      <div className="max-w-xs mx-auto flex flex-col gap-4 w-full">
        <input
          name="ticker"
          className="block p-2 mx-auto border w-full mb-2 text-center rounded-md"
          value={ticker} // Controlled input
          onChange={(e) => setTicker(e.target.value)} // Update state on input change
          type="text"
          placeholder="$doge"
        />
        {error.length > 1 && (
          <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">
            {error}
          </div>
        )}
        <SubmitButton>
          <span>Claim your Ticker</span>
          <RightIcon />
        </SubmitButton>
      </div>
    </form>
  );
}
