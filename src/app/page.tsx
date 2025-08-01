
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  HeartHandshake,
  QrCode,
  Sparkles,
  Star,
  UserCheck,
  CalendarHeart,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { featuredPandits, testimonials } from '@/lib/placeholder-data';
import { PanditCard } from '@/components/PanditCard';
import { ReviewCard } from '@/components/ReviewCard';
import { upcomingFestivals } from '@/ai/flows/upcoming-festivals';
import { format, parse, getYear } from 'date-fns';
import { panchangGenerator } from '@/ai/flows/panchang-generator';

async function UpcomingFestivals() {
  try {
    const festivals = await upcomingFestivals();
    return (
      <section id="upcoming-festivals" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              Upcoming Festivals
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Stay informed about the next auspicious dates in the Hindu calendar.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {festivals.map((festival) => {
              const festivalDate = parse(festival.date, 'yyyy-MM-dd', new Date());
              const festivalYear = getYear(festivalDate);
              const festivalQuery = `${festival.name} ${festivalYear}`;
              return (
                <Link key={festival.name} href={`/panchang?query=${encodeURIComponent(festivalQuery)}`} className="block">
                  <Card className="text-center p-4 transition-transform transform hover:-translate-y-2 hover:shadow-lg h-full">
                    <CalendarHeart className="h-10 w-10 text-primary mx-auto mb-3" />
                    <h3 className="font-headline text-lg font-bold">{festival.name}</h3>
                    <p className="font-bold text-primary text-md">
                      {format(festivalDate, 'MMMM d, yyyy')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{festival.description}</p>
                  </Card>
                </Link>
            )})}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Failed to fetch upcoming festivals:", error);
    // Return null or a fallback UI if the flow fails
    return null;
  }
}

async function TestPanchang() {
  try {
    const today = format(new Date(), 'yyyy-MM-dd');
    console.log(`Testing ProKerala API for date: ${today}`);
    const panchang = await panchangGenerator({ date: today, location: 'New Delhi, India' });
    console.log('Successfully fetched and cached panchang data:', panchang);
    return (
        <div className="container mx-auto px-4 md:px-6 my-4">
            <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
                <p className="font-bold">Test Successful!</p>
                <p>Successfully fetched Panchang data from ProKerala API for today and saved it to MongoDB. You can check your database now.</p>
            </div>
        </div>
    );
  } catch (e: any) {
    console.error("Panchang test failed:", e);
     return (
        <div className="container mx-auto px-4 md:px-6 my-4">
            <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
                <p className="font-bold">Test Failed!</p>
                <p>Could not fetch data from ProKerala API. Error: {e.message}. Please check your API keys in the .env file and your MongoDB connection.</p>
            </div>
        </div>
    );
  }
}

export default async function Home() {
  const features = [
    {
      icon: <UserCheck className="h-8 w-8 text-primary" />,
      title: 'Verified Pandits',
      description: 'Connect with trusted and experienced pandits for all your spiritual needs.',
      link: '#pandits',
    },
    {
      icon: <QrCode className="h-8 w-8 text-primary" />,
      title: 'Easy QR Access',
      description: 'Scan a QR code to instantly view pandit profiles, book services, or download details.',
      link: '#pandits',
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: 'AI Puja Planner',
      description: 'Get personalized puja recommendations and find auspicious dates with our smart AI.',
      link: '/puja-planner',
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: 'Content Hub',
      description: 'Explore articles, videos, and guides on rituals, mantras, and fasting in multiple languages.',
      link: '/content-hub',
    },
  ];

  return (
    <div className="flex flex-col">
      <TestPanchang />
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-foreground">
              Your Guide to Divine Rituals
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              PujaBaba connects you with verified pandits, helps you plan the perfect puja with AI, and provides a wealth of spiritual knowledge.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/puja-planner">
                  Plan Your Puja <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="#pandits">Find a Pandit</Link>
              </Button>
            </div>
          </div>
        </div>
        <div 
          className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)] -z-10"
          style={{
            backgroundImage: `
              radial-gradient(at 27% 37%, hsla(var(--primary)/0.2) 0px, transparent 50%),
              radial-gradient(at 97% 21%, hsla(var(--accent)/0.1) 0px, transparent 50%),
              radial-gradient(at 52% 99%, hsla(var(--primary)/0.3) 0px, transparent 50%),
              radial-gradient(at 10% 29%, hsla(var(--accent)/0.2) 0px, transparent 50%),
              radial-gradient(at 97% 96%, hsla(35, 100%, 50%, 0.1) 0px, transparent 50%),
              radial-gradient(at 33% 50%, hsla(var(--accent)/0.15) 0px, transparent 50%),
              radial-gradient(at 79% 53%, hsla(35, 100%, 50%, 0.1) 0px, transparent 50%)
            `,
          }}
        />
      </section>

      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              Everything You Need for Your Spiritual Journey
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              From finding the right pandit to understanding ancient rituals, we've got you covered.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center flex flex-col items-center p-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {feature.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <UpcomingFestivals />

      <section id="pandits" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              Meet Our Esteemed Pandits
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Handpicked, verified, and reviewed by our community.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredPandits.map((pandit) => (
              <PanditCard key={pandit.id} pandit={pandit} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="bg-primary/10 border-primary/20 overflow-hidden">
             <div className="grid md:grid-cols-2 items-center gap-8">
                <div className="p-8 md:p-12">
                   <Sparkles className="h-10 w-10 text-primary mb-4" />
                   <h2 className="text-3xl md:text-4xl font-headline font-bold">Unsure Which Puja to Perform?</h2>
                   <p className="mt-4 text-lg text-muted-foreground">
                     Let our AI Puja Planner guide you. Answer a few simple questions about your purpose, and we'll recommend the most suitable puja and the most auspicious time to perform it.
                   </p>
                   <Button asChild size="lg" className="mt-6">
                     <Link href="/puja-planner">
                       Try the AI Planner
                       <ArrowRight className="ml-2 h-5 w-5" />
                     </Link>
                   </Button>
                </div>
                <div className="relative h-64 md:h-full">
                    <Image
                        src="https://placehold.co/600x600"
                        alt="AI Puja Planner illustration"
                        fill
                        style={{objectFit: 'cover'}}
                        data-ai-hint="spiritual ceremony"
                        className="opacity-20 md:opacity-100"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background to-transparent"></div>
                </div>
             </div>
          </Card>
        </div>
      </section>

      <section id="testimonials" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              Praised by Devotees
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              See what our users have to say about their experience with PujaBaba.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
                <ReviewCard key={testimonial.id} review={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
