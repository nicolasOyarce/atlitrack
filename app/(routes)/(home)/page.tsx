import { Navbar } from "@/components/Navbar";
import { FirtsBlock } from "./components/FirtsBlock";
import { SliderBrands } from "./components/SliderBrands";

export default function Home() {
  return (
    <div className="bg-gray-950 text-white">
      <Navbar />
      <FirtsBlock />
      <SliderBrands />
    </div>
  );
}
