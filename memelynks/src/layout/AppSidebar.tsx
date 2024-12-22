"use client";
import { FaArrowLeft, FaChartLine } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiHome5Fill } from "react-icons/ri";
import LogoutButton from "../components/LogoutButton";

export default function AppSidebar() {
  const path = usePathname();
  return (
    <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-2 text-white w-full">
      <Link
        href={"/account"}
        className={
          "flex gap-4 p-2 " + (path === "/account" ? "bg-[#ffce7b] rounded-md" : "")
        }
      >
        <RiHome5Fill className={"w-6 h-6"} />
        <span className="">Home</span>
      </Link>
      <Link
        href={"/analytics"}
        className={
          "flex gap-4 p-2 " + (path === "/analytics" ? "bg-[#ffce7b] rounded-md" : "")
        }
      >
        <FaChartLine
          //   fixedWidth={true}
          className={"w-6 h-6"}
        />
        <span className="">Analytics</span>
      </Link>
      <LogoutButton
        iconLeft={true}
        className={"flex gap-4 items-center text-gray-500 p-2"}
        iconClasses={"w-6 h-6"}
      />
      <Link
        href={"/"}
        className="flex items-center gap-2 text-xs text-gray-500 border-t pt-4"
      >
        <FaArrowLeft className={"w-3 h-3"} />
        <span>Back to website</span>
      </Link>
    </nav>
  );
}
