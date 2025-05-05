import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
