
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Package, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const pujaKits = [
  {
    id: 'griha-pravesh',
    name: 'Griha Pravesh Puja Kit',
    price: '999',
    description: 'Everything you need for a blessed housewarming ceremony.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['Kalash', 'Mango Leaves', 'Havan Samagri', 'Incense Sticks', 'Camphor'],
    type: 'Standard'
  },
  {
    id: 'satyanarayan',
    name: 'Satyanarayan Puja Kit',
    price: '799',
    description: 'Complete kit for performing the auspicious Satyanarayan katha.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['Prasad Items', 'Story Book', 'Panchamrit ingredients', 'Red Cloth', 'Mouli'],
    type: 'Standard'
  },
  {
    id: 'diwali-lakshmi',
    name: 'Diwali Lakshmi Puja Kit',
    price: '1,499',
    description: 'A comprehensive kit for a grand Diwali puja to welcome Goddess Lakshmi.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['Idols of Lakshmi & Ganesh', 'Shri Yantra', 'Diya Pack', 'Kheel Batasha', 'Aarti Thali'],
    type: 'Combo'
  },
  {
    id: 'navagraha-shanti',
    name: 'Navagraha Shanti Puja Kit',
    priceRange: '599 - 1,099',
    description: 'Pacify the nine planets and bring peace with this specialized kit.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['Navadhanya', 'Colored Cloths for planets', 'Havan Samagri for each planet', 'Yantras'],
    type: 'Combo'
  },
  {
    id: 'wedding-essentials',
    name: 'Wedding Essentials Combo',
    priceRange: '749 - 1,299',
    description: 'A curated combo of essential items for Hindu wedding rituals.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['Varmala', 'Sindoor', 'Mangalsutra (basic)', 'Sehra', 'Pooja Samagri'],
    type: 'Combo'
  },
  {
    id: 'starter-havan',
    name: 'Starter Havan Kit',
    price: '499',
    description: 'A basic kit for performing a simple Havan at home.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['Mini Havan Kund', 'Samidha Sticks', 'Ghee', 'Havan Samagri mixture'],
    type: 'Standard'
  }
];

export default function PujaKitsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <Package className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Puja Kits
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Conveniently curated kits with all the essentials for your rituals, delivered to your doorstep.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {pujaKits.map(kit => (
          <Card key={kit.id} className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl">
            <CardHeader className="p-0 relative">
              <Link href="#">
                <Image
                  src={kit.imageUrl}
                  alt={kit.name}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover"
                  data-ai-hint="religious items"
                />
              </Link>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="font-headline text-xl mb-2">{kit.name}</CardTitle>
              <CardDescription className="text-base mb-4">{kit.description}</CardDescription>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-semibold">Includes</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 mt-2">
                      {kit.features.map(feature => (
                        <li key={feature} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="p-4 pt-2 mt-auto">
              <div className="flex justify-between items-center w-full">
                <p className="text-2xl font-bold text-primary">
                  <span className="font-sans">
                  {kit.price ? `₹${kit.price}` : `₹${kit.priceRange?.split(' - ')[0]} - ₹${kit.priceRange?.split(' - ')[1]}`}
                  </span>
                </p>
                <Button>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
