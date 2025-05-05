import { currentUser } from "@clerk/nextjs/server";
import CTASection from "./_components/cta-section";
import FeaturedSection from "./_components/featured-section";
import HeroSection from "./_components/hero-section";
import PreviewSection from "./_components/preview-section";
import Testimonials from "./_components/testimonial-section";
import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function Home() {
  const data = await currentUser();
  if (data?.emailAddresses?.[0]?.emailAddress) {
    const user = await getUser(data.emailAddresses[0].emailAddress);

    if (user?.role === "ADMIN") {
      redirect("/dashboard");
    }
  }


  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <PreviewSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
