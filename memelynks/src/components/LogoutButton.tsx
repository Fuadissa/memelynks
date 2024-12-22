"use client";
import { FaRightFromBracket } from "react-icons/fa6";
import { signOutBtn } from "@/lib/signInBtn";

export default function LogoutButton({
  className = "flex items-center gap-2 border p-2 px-4 shadow",
  iconLeft = false,
  iconClasses = "",
}) {
  return (
    <button className={className} onClick={() => signOutBtn()}>
      {iconLeft && <FaRightFromBracket className={iconClasses} />}
      <span>Logout</span>
      {!iconLeft && <FaRightFromBracket className={iconClasses} />}
    </button>
  );
}
