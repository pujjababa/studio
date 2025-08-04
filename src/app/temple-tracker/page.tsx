import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { famousTemples } from "@/lib/placeholder-data";
import { Ticket, Video, LocateFixed, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MandirIcon } from "@/components/icons/MandirIcon";


export default function TempleTrackerPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <MandirIcon className="h-12 w-12 mx-auto text-primary mb-4" />
                <h1 className="text-4xl md:text-5xl font-headline font-bold">
                    Temple Tracker & Darshan Booking
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Discover famous temples, book online darshan, and experience divine aartis from home.
                </p>
            </div>

            <div className="mb-16">
                 <Card className="bg-primary/10 border-primary/20 overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center gap-8">
                        <div className="p-8 md:p-12">
                        <Sparkles className="h-10 w-10 text-primary mb-4" />
                        <h2 className="text-3xl md:text-4xl font-headline font-bold">Darshan by Proxy</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Can't visit in person? Our verified pandits can perform darshan at a temple of your choice on your behalf. Receive prasad and blessings delivered to your doorstep.
                        </p>
                        <Button asChild size="lg" className="mt-6">
                            <Link href="/#pandits">
                                Choose a Pandit
                            </Link>
                        </Button>
                        </div>
                        <div className="relative h-64 md:h-full">
                            <Image
                                src="https://placehold.co/600x600"
                                alt="Darshan by Proxy"
                                fill
                                style={{objectFit: 'cover'}}
                                data-ai-hint="temple interior"
                                className="opacity-20 md:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background to-transparent"></div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {famousTemples.map(temple => (
                <Card key={temple.id} className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader className="p-0 relative">
                        <Image
                            src={temple.imageUrl}
                            alt={temple.name}
                            width={600}
                            height={400}
                            className="w-full h-56 object-cover"
                            data-ai-hint="indian temple"
                        />
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                        <CardTitle className="font-headline text-xl mb-1">{temple.name}</CardTitle>
                        <CardDescription className="text-base mb-4 flex items-center gap-2">
                           <LocateFixed className="h-4 w-4"/> {temple.location}
                        </CardDescription>
                        <p className="font-bold">Main Deity: {temple.deity}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-2 mt-auto grid grid-cols-2 gap-2">
                        <Button disabled={!temple.onlineDarshan}>
                            <Ticket className="mr-2 h-5 w-5" /> Book Darshan
                        </Button>
                        <Button variant="secondary" disabled={!temple.liveAarti}>
                            <Video className="mr-2 h-5 w-5" /> Live Aarti
                        </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </div>
    );
}
