import Image from "next/image";
import Link from "next/link";
import { featuredPandits, testimonials } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewCard } from "@/components/ReviewCard";
import {
  CheckCircle,
  Download,
  MapPin,
  MessageSquare,
  Star,
} from "lucide-react";
import type { Pandit } from "@/lib/types";

export default function PanditProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const pandit = featuredPandits.find((p) => p.id === params.id) as Pandit | undefined;

  if (!pandit) {
    notFound();
  }

  // Filter testimonials to show only reviews for the current pandit, or some for demo.
   const panditReviews = testimonials.filter((t, index) => {
    const panditId = (index % 2 === 0) ? '1' : '2'; // Assign reviews to pandits for demo
    return panditId === params.id || params.id === '1';
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Image
                src={pandit.imageUrl}
                alt={pandit.name}
                width={400}
                height={400}
                className="rounded-lg object-cover w-full aspect-square shadow-lg"
                data-ai-hint="portrait priest"
              />
            </div>
            <div className="md:w-2/3">
              {pandit.verified && (
                <Badge variant="default" className="mb-2 bg-green-600 text-white">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified Pandit
                </Badge>
              )}
              <h1 className="text-4xl font-headline font-bold">{pandit.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-5 w-5" />
                  <span>{pandit.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-foreground">{pandit.rating.toFixed(1)}</span>
                  <span>({pandit.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {pandit.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-sm">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <p className="mt-6 text-base text-foreground/80">{pandit.bio}</p>
            </div>
          </div>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {panditReviews.length > 0 ? (
                <div className="space-y-6">
                  {panditReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} className="border-b pb-4 last:border-b-0 last:pb-0" />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No reviews yet for this pandit.</p>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Contact this Pandit</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">You can download the pandit's profile to get their contact information.</p>
                
                <Button size="lg" variant="secondary" className="w-full">
                    <Download className="mr-2 h-5 w-5" /> Download Profile (PDF)
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
