import Link from 'next/link';
import Image from 'next/image';
import { Film, Newspaper } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Content } from '@/lib/types';
import { Button } from './ui/button';

interface ContentCardProps {
  content: Content;
}

export function ContentCard({ content }: ContentCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <Link href={content.link}>
          <Image
            src={content.imageUrl}
            alt={content.title}
            width={600}
            height={400}
            className="w-full h-56 object-cover"
            data-ai-hint="spiritual symbol"
          />
        </Link>
         <Badge variant="secondary" className="absolute top-2 left-2">
            {content.type === 'video' ? <Film className="h-4 w-4 mr-1" /> : <Newspaper className="h-4 w-4 mr-1" />}
            {content.category}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">
          <Link href={content.link} className="hover:text-primary transition-colors">{content.title}</Link>
        </CardTitle>
        <CardDescription className="text-base">
          {content.excerpt}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={content.link}>
            {content.type === 'video' ? 'Watch Video' : 'Read More'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
