
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Festival } from '@/lib/types';

interface FestivalCardProps {
  festival: Festival;
}

export function FestivalCard({ festival }: FestivalCardProps) {
  const date = new Date(festival.startDate);
  // Adjust for timezone to show correct date
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() + userTimezoneOffset);

  const day = localDate.toLocaleDateString('en-US', { day: '2-digit' });
  const month = localDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const dayOfWeek = localDate.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <Card className="flex flex-col text-center items-center justify-between p-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="p-2">
        <p className="font-bold text-sm text-primary">{month}</p>
        <p className="font-headline text-4xl">{day}</p>
      </CardHeader>
      <CardContent className="p-2 flex-grow">
        <CardTitle className="text-base font-semibold leading-tight">{festival.name}</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">{festival.description}</p>
      </CardContent>
       <CardDescription className="p-2 text-xs">
          {festival.tithi ? `${festival.tithi}, ${dayOfWeek}` : dayOfWeek}
       </CardDescription>
    </Card>
  );
}
