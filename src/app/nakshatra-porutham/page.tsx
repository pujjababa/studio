import { Star } from 'lucide-react';
import { NakshatraPoruthamClient } from './NakshatraPoruthamClient';

export default function NakshatraPoruthamPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Star className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            Nakshatra Porutham
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Analyze marriage compatibility using the traditional 10-point South Indian Nakshatra matching system.
          </p>
        </div>
        
        <NakshatraPoruthamClient />
        
      </div>
    </div>
  );
}
