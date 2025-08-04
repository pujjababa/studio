import { contentHubItems } from "@/lib/placeholder-data";
import { ContentCard } from "@/components/ContentCard";
import { BookOpen } from "lucide-react";

export default function ContentHubPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <BookOpen className="h-12 w-12 mx-auto text-primary mb-4" />
                <h1 className="text-4xl md:text-5xl font-headline font-bold">
                    Content Hub
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Explore our collection of articles, videos, and guides to deepen your spiritual knowledge.
                </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {contentHubItems.map(item => (
                    <ContentCard key={item.id} content={item} />
                ))}
            </div>
        </div>
    );
}
