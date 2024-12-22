import logoImage from "@/assets/images/logo.svg";
import Image from "next/image";

const footerLinks = [
  { href: "#", label: "Contact" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms & Conditions" },
];

export default function Footer() {
  return (
    <section className="py-16">
      <div className="container flex flex-col md:flex-row md:justify-between items-center gap-6">
        <div>
          <span className="text-3xl pl-3">
            Meme<span className="text-[#ffce7b]">Lynks</span>
          </span>
        </div>
        <div>
          <nav className="flex gap-6">
            {footerLinks.map((link) => (
              <a
                href={link.href}
                key={link.label}
                className="text-white/50 text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
