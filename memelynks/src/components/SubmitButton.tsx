import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: ReactNode;
  className?: string;
}

export default function SubmitButton({ children, className = "" }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        "bg-[#ffce7b] disabled:bg-[#fde1b0] disabled:text-black/50 text-black rounded-md disabled:text-gray-200 py-2 px-4 block mx-auto w-full flex gap-2 items-center justify-center " +
        className
      }
    >
      {pending ? <span>Saving...</span> : children}
    </button>
  );
}