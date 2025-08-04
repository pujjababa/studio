import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldAlert, HeartCrack, Info, Clock, Users } from "lucide-react";

const remedies = [
    {
        id: "mangal-dosh",
        title: "Remedies for Manglik (Mangal) Dosha",
        icon: <ShieldAlert className="h-6 w-6 text-destructive" />,
        remedies: [
            {
                name: "Kumbh Vivah",
                description: "A symbolic wedding between the Manglik person and a banana tree, peepal tree, or a silver/golden idol of Lord Vishnu. This is a powerful ritual to nullify the malefic effects of Mars."
            },
            {
                name: "Fasting on Tuesdays",
                description: "Observing a fast on Tuesdays can appease Mars (Mangal). You can consume fruits and milk. Also, donate red items like masoor dal (red lentils) or red clothes."
            },
            {
                name: "Chanting Mantras",
                description: "Regularly chant the Hanuman Chalisa or the Mangal Mantra: 'Om Kraam Kreem Kraum Sah Bhaumaya Namah'. This generates positive vibrations and reduces negativity."
            },
            {
                name: "Marrying another Manglik",
                description: "It is widely believed that if two Manglik individuals marry, the negative effects of the dosha are cancelled out for both partners, leading to a balanced life."
            }
        ]
    },
    {
        id: "low-guna",
        title: "Remedies for Low Guna Milan Score",
        icon: <HeartCrack className="h-6 w-6 text-blue-500" />,
        remedies: [
            {
                name: "Grah Shanti Puja",
                description: "Performing a Grah Shanti Puja for the planets that are causing incompatibility (as per the detailed Kundli analysis) can harmonize their energies."
            },
            {
                name: "Nadi Dosha Nivaran Puja",
                description: "If the low score is due to Nadi Dosha, a specific Nadi Dosha Nivaran Puja is highly recommended. This is crucial for health and progeny in the marriage."
            },
            {
                name: "Bhakoot Dosha Puja",
                description: "If Bhakoot Dosha is the cause (score of 0 in Bhakoot Milan), a puja can be performed to mitigate its effects related to finances and relationship harmony."
            },
            {
                name: "Astrological Gemstones",
                description: "After consulting an expert astrologer, wearing specific gemstones can strengthen weak but beneficial planets for both partners, improving overall compatibility."
            }
        ]
    },
    {
        id: "delay-in-marriage",
        title: "Remedies for Delay in Marriage",
        icon: <Clock className="h-6 w-6 text-amber-600" />,
        remedies: [
            {
                name: "Gauri Shankar Puja",
                description: "Worshipping Lord Shiva and Goddess Parvati together is considered highly effective for removing obstacles in marriage. Chanting the 'Om Gauri Shankaraya Namah' mantra is beneficial."
            },
            {
                name: "Fasting on Mondays",
                description: "Observing a fast on 16 consecutive Mondays (Solah Somvar Vrat) is a well-known remedy to please Lord Shiva and find a suitable partner."
            },
            {
                name: "Strengthening Jupiter",
                description: "A weak or afflicted Jupiter in the horoscope can cause delays. Worshipping a banana tree on Thursdays and donating yellow items (like gram flour, turmeric, yellow clothes) can help."
            },
            {
                name: "Chant Katyayani Mantra",
                description: "For girls facing delays, chanting the Katyayani Mantra is highly recommended, especially during Navratri: 'Om Katyayani Mahamaye Mahayoginyadheeshwari Nandgopsutam Devipatim Me Kurute Namah'."
            }
        ]
    },
    {
        id: "kaal-sarp-pitru-dosha",
        title: "Remedies for Kaal Sarp & Pitru Dosha",
        icon: <Users className="h-6 w-6 text-gray-600" />,
        remedies: [
            {
                name: "Kaal Sarp Dosha Nivaran Puja",
                description: "This is a specific puja performed to pacify the serpent planets Rahu and Ketu. It is most effective when done at holy places like Trimbakeshwar in Nashik."
            },
            {
                name: "Pitru Dosha Nivaran Puja / Pind Daan",
                description: "This involves performing rituals for ancestors to seek their blessings and remove their dissatisfaction, which can cause obstacles in life, including marriage. This is often done at Gaya or Haridwar."
            },
            {
                name: "Serving Elders and Underprivileged",
                description: "To mitigate Pitru Dosha, it is advised to respect and serve your elders. Donating food, especially on Amavasya (new moon day), also helps appease ancestors."
            },
            {
                name: "Chanting Maha Mrityunjaya Mantra",
                description: "Regular chanting of the Maha Mrityunjaya Mantra is a powerful remedy for various doshas, including Kaal Sarp Dosha, as it provides divine protection."
            }
        ]
    }
];

export default function RemediesHubPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <Info className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Compatibility Remedies Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore astrological remedies for common compatibility challenges.
        </p>
         <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
            Disclaimer: These are general suggestions. It is always recommended to consult a qualified astrologer for personalized advice.
          </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {remedies.map(section => (
            <Card key={section.id}>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center">
                        {section.icon}
                        <span className="ml-3">{section.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                         {section.remedies.map((remedy, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                 <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                                     {remedy.name}
                                 </AccordionTrigger>
                                 <AccordionContent className="text-base text-muted-foreground">
                                     {remedy.description}
                                 </AccordionContent>
                             </AccordionItem>
                         ))}
                    </Accordion>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
