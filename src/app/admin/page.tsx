
import { getAllPujaKits } from "@/services/puja-kits.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboard() {
    const pujaKits = await getAllPujaKits();

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline text-3xl">Admin Panel</CardTitle>
                        <CardDescription>Manage Puja Kits</CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/admin/kits/new">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Create New Kit
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Festival (English)</TableHead>
                                <TableHead>Festival (Hindi)</TableHead>
                                <TableHead className="text-center">Items</TableHead>
                                <TableHead className="text-right">Total Price (INR)</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pujaKits.map((kit) => (
                                <TableRow key={kit._id}>
                                    <TableCell className="font-medium">{kit.festival_english}</TableCell>
                                    <TableCell>{kit.festival_hindi}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="secondary">{kit.puja_samagri.length}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">₹{kit.total_price_inr.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/admin/kits/${kit._id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
