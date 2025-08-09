
import { getPanchang } from '@/lib/panchang';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Sun, Moon, Star, Zap, Waves, Sunrise, Sunset, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => (
    <div className="flex items-start justify-between py-3 border-b last:border-b-0">
        <div className="flex items-center gap-4 text-md text-muted-foreground">
            {icon}
            <span>{label}</span>
        </div>
        <span className="font-semibold text-md text-foreground text-right">{value || 'N/A'}</span>
    </div>
);

export default function PanchangDetailPage({ params }: { params: { date: string } }) {
    const dateStr = params.date;
    const date = new Date(dateStr);

    // Basic date validation
    if (isNaN(date.getTime())) {
        notFound();
    }
    
    // The panchang is calculated for UTC noon to get a stable value for the whole day
    date.setUTCHours(12, 0, 0, 0);

    const panchang = getPanchang(date);

    if (!panchang) {
        // Handle case where panchang calculation might fail, though unlikely with current setup
        return <div>Could not calculate Panchang for this date.</div>
    }

    const formattedDate = date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-3xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <Calendar className="h-12 w-12 mx-auto text-primary mb-4" />
                        <CardTitle className="font-headline text-4xl">Panchang</CardTitle>
                        <CardDescription className="text-xl text-muted-foreground">
                            {formattedDate}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8">
                        <div className="space-y-2">
                             <DetailRow icon={<Calendar className="h-6 w-6 text-primary" />} label="तिथि (Tithi)" value={panchang.tithi} />
                            <DetailRow icon={<Moon className="h-6 w-6 text-primary" />} label="पक्ष (Paksha)" value={panchang.paksha} />
                            <DetailRow icon={<Star className="h-6 w-6 text-primary" />} label="नक्षत्र (Nakshatra)" value={panchang.nakshatra} />
                            <DetailRow icon={<Zap className="h-6 w-6 text-primary" />} label="योग (Yoga)" value={panchang.yoga} />
                            <DetailRow icon={<Waves className="h-6 w-6 text-primary" />} label="करण (Karana)" value={panchang.karana} />
                        </div>
                         <div className="mt-8 pt-6 border-t">
                            <h3 className="text-center font-headline text-2xl mb-4">Timings</h3>
                             <DetailRow icon={<Sunrise className="h-6 w-6 text-amber-500" />} label="सूर्योदय (Sunrise)" value={panchang.sunrise} />
                             <DetailRow icon={<Sunset className="h-6 w-6 text-orange-600" />} label="सूर्यास्त (Sunset)" value={panchang.sunset} />
                        </div>
                        <div className="mt-8 pt-6 border-t text-center">
                            <Button asChild size="lg" className="mt-4">
                                <Link href="/puja-kits">
                                    <ShoppingCart className="mr-2 h-5 w-5" /> Shop for Puja Kits
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Generate static paths for upcoming festivals to improve performance
export async function generateStaticParams() {
    // This function is optional but good for performance.
    // We can pre-render pages for the next few days.
    const paths = Array.from({ length: 90 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            date: date.toISOString().split('T')[0],
        };
    });

    return paths;
}
