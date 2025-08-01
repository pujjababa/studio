import { Gem } from 'lucide-react';
import { KundliMatchingClient } from './KundliMatchingClient';

export default function KundliMatchingPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Gem className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            Kundli Matching (Gun Milan)
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Check the compatibility of two horoscopes with the traditional 36 Guna Milan system.
          </p>
        </div>
        
        <KundliMatchingClient />
        
      </div>
    </div>
  );
}
