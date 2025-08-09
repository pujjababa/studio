import { notFound } from "next/navigation";
import { getPujaKitById } from "@/services/puja-kits.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EditPujaKitForm } from "./_components/EditPujaKitForm";

export default async function EditPujaKitPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const isNew = id === 'new';
    const pujaKit = isNew ? null : await getPujaKitById(id);

    if (!isNew && !pujaKit) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <Card className="max-w-4xl mx-auto">
                 <CardHeader>
                    <CardTitle className="font-headline text-3xl">
                        {isNew ? 'Create New Puja Kit' : 'Edit Puja Kit'}
                    </CardTitle>
                    <CardDescription>
                        {isNew ? 'Add details for the new puja kit.' : `Editing kit for ${pujaKit?.festival_english}`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <EditPujaKitForm pujaKit={pujaKit} />
                </CardContent>
            </Card>
        </div>
    );
}
