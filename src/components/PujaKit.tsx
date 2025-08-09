
'use client';

import { useState, useEffect } from 'react';
import type { PujaKit, PujaSamagri } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Package, ShoppingCart, PlusCircle, MinusCircle } from 'lucide-react';

interface PujaKitProps {
    kit: PujaKit;
}

export function PujaKit({ kit }: PujaKitProps) {
    const [samagri, setSamagri] = useState<PujaSamagri[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Deep copy to prevent state mutation issues
        const initialSamagri = JSON.parse(JSON.stringify(kit.puja_samagri));
        setSamagri(initialSamagri);
        setTotalPrice(kit.total_price_inr);
    }, [kit]);
    
    const handleQuantityChange = (index: number, newQuantity: number) => {
        const updatedSamagri = [...samagri];
        const item = updatedSamagri[index];
        const originalItemData = kit.puja_samagri.find(i => i.item_english === item.item_english);

        if (!originalItemData || originalItemData.quantity === 0) return;

        const pricePerUnit = originalItemData.price_inr / originalItemData.quantity;
        
        item.quantity = newQuantity;
        item.price_inr = pricePerUnit * newQuantity;

        setSamagri(updatedSamagri);
        calculateTotalPrice(updatedSamagri);
    };

    const calculateTotalPrice = (items: PujaSamagri[]) => {
        const total = items.reduce((sum, item) => sum + item.price_inr, 0);
        setTotalPrice(total);
    };

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
                <Package className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="font-headline text-4xl">{kit.festival_hindi} - Puja Samagri</CardTitle>
                <CardDescription className="text-xl text-muted-foreground">
                    Your customizable puja kit for {kit.festival_english}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item (Hindi/English)</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Price (INR)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {samagri.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <p className="font-semibold">{item.item_hindi}</p>
                                        <p className="text-sm text-muted-foreground">{item.item_english}</p>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button size="icon" variant="ghost" onClick={() => handleQuantityChange(index, Math.max(0, item.quantity - 1))}>
                                                <MinusCircle className="h-5 w-5" />
                                            </Button>
                                            <Input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10) || 0)}
                                                className="w-20 text-center h-10"
                                            />
                                             <Button size="icon" variant="ghost" onClick={() => handleQuantityChange(index, item.quantity + 1)}>
                                                <PlusCircle className="h-5 w-5" />
                                            </Button>
                                        </div>
                                         <p className="text-xs text-muted-foreground mt-1">{item.unit}</p>
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">₹{item.price_inr.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
             <CardFooter className="flex flex-col md:flex-row justify-between items-center p-6 bg-secondary/30">
                <div className="text-2xl font-bold mb-4 md:mb-0">
                    Total: <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
                </div>
                <Button size="lg">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                </Button>
            </CardFooter>
        </Card>
    );
}
