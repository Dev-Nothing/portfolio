import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experiments } from "@/components/sections/experiments";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Process />
        <Experiments />
        <Stack />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
