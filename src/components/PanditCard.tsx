import Link from 'next/link';
import Image from 'next/image';
import { Star, CheckCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Pandit } from '@/lib/types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface PanditCardProps {
  pandit: Pandit;
}

export function PanditCard({ pandit }: PanditCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <Link href={`/pandits/${pandit.id}`}>
          <Image
            src={pandit.imageUrl}
            alt={pandit.name}
            width={400}
            height={400}
            className="w-full h-56 object-cover"
            data-ai-hint="portrait priest"
          />
        </Link>
        {pandit.verified && (
            <Badge variant="default" className="absolute top-2 right-2 bg-green-600 text-white">
                <CheckCircle className="h-3 w-3 mr-1"/>
                Verified
            </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-1">
          <Link href={`/pandits/${pandit.id}`} className="hover:text-primary transition-colors">{pandit.name}</Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2">{pandit.location}</CardDescription>
        <div className="flex flex-wrap gap-2 my-3">
          {pandit.specialties.slice(0, 2).map((specialty) => (
            <Badge key={specialty} variant="secondary">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="font-bold">{pandit.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({pandit.reviewCount})</span>
        </div>
        <Button asChild size="sm">
          <Link href={`/pandits/${pandit.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
