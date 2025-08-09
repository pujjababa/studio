

import { getPanchang, getFestivalByDate } from '@/lib/panchang';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Sun, Moon, Star, Zap, Waves, Sunrise, Sunset, CalendarDays } from 'lucide-react';
import { pujaKitsData } from '@/lib/puja-kits-data';
import { PujaKit } from '@/components/PujaKit';

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => (
    <div className="flex items-center space-x-2">
        <div className="flex-shrink-0 text-primary">{icon}</div>
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-semibold text-sm md:text-base">{value || 'N/A'}</p>
        </div>
    </div>
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
        { icon: <Calendar className="h-5 w-5 md:h-6 md:w-6" />, label: "Tithi (तिथि)", value: panchang.tithi },
        { icon: <Moon className="h-5 w-5 md:h-6 md:w-6" />, label: "Paksha (पक्ष)", value: panchang.paksha },
        { icon: <Star className="h-5 w-5 md:h-6 md:w-6" />, label: "Nakshatra (नक्षत्र)", value: panchang.nakshatra },
        { icon: <Zap className="h-5 w-5 md:h-6 md:w-6" />, label: "Yoga (योग)", value: panchang.yoga },
        { icon: <Waves className="h-5 w-5 md:h-6 md:w-6" />, label: "Karana (करण)", value: panchang.karana },
        { icon: <CalendarDays className="h-5 w-5 md:h-6 md:w-6" />, label: "Month (मास)", value: panchang.month },
        { icon: <Sunrise className="h-5 w-5 md:h-6 md:w-6" />, label: "Sunrise (सूर्योदय)", value: panchang.sunrise },
        { icon: <Sunset className="h-5 w-5 md:h-6 md:w-6" />, label: "Sunset (सूर्यास्त)", value: panchang.sunset },
    ];

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

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl">Daily Panchang Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-8 gap-x-4">
                            {panchangDetails.map((detail) => (
                                <DetailItem key={detail.label} {...detail} />
                            ))}
                        </div>
                    </CardContent>
                </Card>


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
