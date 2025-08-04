
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Festival } from '@/lib/types';
import { Calendar } from 'lucide-react';

interface FestivalCardProps {
  festival: Festival;
}

export function FestivalCard({ festival }: FestivalCardProps) {
  const date = new Date(festival.startDate);
  const day = date.toLocaleDateString('en-US', { day: '2-digit' });
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <Card className="flex flex-col text-center items-center justify-between p-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="p-2">
        <p className="font-bold text-sm text-primary">{month}</p>
        <p className="font-headline text-4xl">{day}</p>
      </CardHeader>
      <CardContent className="p-2 flex-grow">
        <CardTitle className="text-base font-semibold leading-tight">{festival.name}</CardTitle>
      </CardContent>
       <CardDescription className="p-2 text-xs">
          {dayOfWeek}
       </CardDescription>
    </Card>
  );
}
