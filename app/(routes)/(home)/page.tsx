import { Navbar } from "@/components/Navbar";
import { FirtsBlock } from "./components/FirtsBlock";
import { SliderBrands } from "./components/SliderBrands";
import { OurSportsCenter } from "./components/OurSportsCenter/OurSportsCenter";

export default function Home() {
  return (
    <div className="bg-gray-950 text-white">
      <Navbar />
      <FirtsBlock />
      <SliderBrands />
      <OurSportsCenter />
    </div>
  );
}
