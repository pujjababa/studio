import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import type { Review } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`;
        }
        return name.substring(0, 2);
    }
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={review.avatarUrl} alt={review.author} data-ai-hint="person portrait"/>
            <AvatarFallback>{getInitials(review.author)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-base">{review.author}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-5 w-5',
                    i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/50'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-muted-foreground italic flex-grow">"{review.comment}"</p>
      </CardContent>
    </Card>
  );
}
