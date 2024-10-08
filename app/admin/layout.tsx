import { getServerSession } from "next-auth";
import Header from "./_components/Header";
import { redirect } from "next/navigation"; // Importer pour les redirections côté serveur

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Vérifiez la session côté serveur
  const session = await getServerSession();

  // Redirection vers /login si la session n'existe pas
  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
