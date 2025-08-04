
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  QrCode,
  UserCheck,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { featuredPandits, testimonials } from '@/lib/placeholder-data';
import { PanditCard } from '@/components/PanditCard';
import { ReviewCard } from '@/components/ReviewCard';
import { UpcomingFestivals } from '@/components/UpcomingFestivals';


export default function Home() {
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
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: 'Content Hub',
      description: 'Explore articles, videos, and guides on rituals, mantras, and fasting in multiple languages.',
      link: '/content-hub',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-foreground">
              Your Guide to Divine Rituals
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              PujaBaba connects you with verified pandits, helps you plan the perfect puja, and provides a wealth of spiritual knowledge.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="#pandits">
                  Find a Pandit <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/content-hub">Explore Content</Link>
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
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
      
      <section id="pandits" className="py-16 md:py-24">
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
