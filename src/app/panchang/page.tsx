import { Calendar } from "lucide-react";
import { PanchangClient } from "./PanchangClient";
import { FestivalSearch } from "./FestivalSearch";
import { Separator } from "@/components/ui/separator";

export default function PanchangPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <Calendar className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          AI-Powered Panchang
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Your daily guide to auspicious timings, celestial events, and festival details, powered by AI and astrological data.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-12">
        <PanchangClient />
        <Separator />
        <FestivalSearch />
      </div>
    </div>
  );
}
