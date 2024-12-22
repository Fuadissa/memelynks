import { ReactNode } from "react";

interface SectionBoxProps {
  children: ReactNode;
}

export default function SectionBox({ children }: SectionBoxProps) {
  return <div className="bg-white lg:m-8 p-1 px-4 lg:p-4 shadow">{children}</div>;
}
