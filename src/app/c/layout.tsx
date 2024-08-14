import { Sidebar } from "../components/layouts/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex items-center justify-start h-screen w-screen p-3 bg-grey">
      <Sidebar />
      {children}
    </main>
  );
}
