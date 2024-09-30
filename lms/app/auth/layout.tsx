import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollToTop } from "@/components/scroll-to-top";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default async function PublicLayout({ 
  children, 
}: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        {children}
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
