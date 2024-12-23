import { Provider } from "@/layout/Provider";

export const metadata = {
  title: "Dashborad",
  description: "Your Dashboard Page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-white`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
