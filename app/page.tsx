import type { Metadata } from "next";
import HaldenSite from "./HaldenSite";

export const metadata: Metadata = {
  title: { absolute: "Halden Home Climate | Heating & Cooling for the Phoenix Valley" },
  description:
    "Clear, thoughtful heating and cooling service for homes across Phoenix, Scottsdale, and the East Valley.",
};

export default function Home() {
  return <HaldenSite />;
}
