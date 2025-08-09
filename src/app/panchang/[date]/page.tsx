

import { getPanchang, getFestivalByDate } from '@/lib/panchang';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Sun, Moon, Star, Zap, Waves, Sunrise, Sunset } from 'lucide-react';
import { pujaKitsData } from '@/lib/puja-kits-data';
import { PujaKit } from '@/components/PujaKit';
import { cn } from '@/lib/utils';

const PanchangDetailCard = ({ icon, label, value, className }: { icon: React.ReactNode, label: string, value?: string, className?: string }) => (
    <Card className={cn("text-center flex flex-col items-center justify-center p-4 aspect-square", className)}>
        <CardHeader className="p-2">
            {icon}
        </CardHeader>
        <CardContent className="p-2 flex-grow flex flex-col justify-center items-center">
            <p className="font-semibold text-sm md:text-base">{value || 'N/A'}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
        </CardContent>
    </Card>
);


export default function PanchangDetailPage({ params }: { params: { date: string } }) {
    const dateStr = params.date;
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
        notFound();
    }
    
    date.setUTCHours(12, 0, 0, 0);

    const panchang = getPanchang(date);
    const festival = getFestivalByDate(dateStr);
    const pujaKit = festival ? pujaKitsData.find(k => k.festival_english === festival.name) : undefined;

    if (!panchang) {
        return <div>Could not calculate Panchang for this date.</div>
    }

    const formattedDate = date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });

    const panchangDetails = [
        { icon: <Calendar className="h-8 w-8 text-primary" />, label: "तिथि (Tithi)", value: panchang.tithi },
        { icon: <Moon className="h-8 w-8 text-primary" />, label: "पक्ष (Paksha)", value: panchang.paksha },
        { icon: <Star className="h-8 w-8 text-primary" />, label: "नक्षत्र (Nakshatra)", value: panchang.nakshatra },
        { icon: <Zap className="h-8 w-8 text-primary" />, label: "योग (Yoga)", value: panchang.yoga },
        { icon: <Waves className="h-8 w-8 text-primary" />, label: "करण (Karana)", value: panchang.karana },
    ];

    const timingDetails = [
        { icon: <Sunrise className="h-8 w-8 text-amber-500" />, label: "सूर्योदय (Sunrise)", value: panchang.sunrise },
        { icon: <Sunset className="h-8 w-8 text-orange-600" />, label: "सूर्यास्त (Sunset)", value: panchang.sunset },
    ]

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto text-primary mb-4" />
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">{festival?.name || 'Panchang'}</h1>
                    <p className="text-xl text-muted-foreground mt-2">
                        {formattedDate}
                    </p>
                </div>

                <div>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {panchangDetails.map((detail) => (
                            <PanchangDetailCard key={detail.label} {...detail} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-center font-headline text-3xl mb-6">Timings</h3>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        {timingDetails.map((detail) => (
                            <PanchangDetailCard key={detail.label} {...detail} />
                        ))}
                    </div>
                </div>


                {pujaKit && <PujaKit kit={pujaKit} />}
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const paths = Array.from({ length: 90 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            date: date.toISOString().split('T')[0],
        };
    });

    return paths;
}
