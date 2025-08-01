import { CalendarHeart } from 'lucide-react';
import { MarriageMuhuratClient } from './MarriageMuhuratClient';

export default function MarriageMuhuratPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <CalendarHeart className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            Marriage Muhurat Finder
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the most auspicious dates for your wedding ceremony based on Vedic astrology.
          </p>
        </div>
        
        <MarriageMuhuratClient />
        
      </div>
    </div>
  );
}
