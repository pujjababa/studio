
'use client';

import { useState, useEffect } from 'react';
import type { PujaKit, PujaSamagri } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash, PlusCircle, Save } from 'lucide-react';
import { updatePujaKitAction, createPujaKitAction } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';

interface EditPujaKitFormProps {
    pujaKit: PujaKit | null;
}

export function EditPujaKitForm({ pujaKit }: EditPujaKitFormProps) {
    const router = useRouter();
    const isNew = pujaKit === null;

    const [formData, setFormData] = useState<Omit<PujaKit, '_id'>>({
        festival_english: '',
        festival_hindi: '',
        total_price_inr: 0,
        puja_samagri: []
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (pujaKit) {
            setFormData({
                festival_english: pujaKit.festival_english,
                festival_hindi: pujaKit.festival_hindi,
                total_price_inr: pujaKit.total_price_inr,
                puja_samagri: JSON.parse(JSON.stringify(pujaKit.puja_samagri)), // Deep copy
            });
        }
    }, [pujaKit]);

    useEffect(() => {
        const totalPrice = formData.puja_samagri.reduce((sum, item) => sum + (Number(item.price_inr) || 0), 0);
        setFormData(prev => ({ ...prev, total_price_inr: totalPrice }));
    }, [formData.puja_samagri]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSamagriChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedSamagri = [...formData.puja_samagri];
        (updatedSamagri[index] as any)[name] = name === 'quantity' || name === 'price_inr' ? parseFloat(value) : value;
        setFormData(prev => ({ ...prev, puja_samagri: updatedSamagri }));
    };

    const addSamagriItem = () => {
        setFormData(prev => ({
            ...prev,
            puja_samagri: [
                ...prev.puja_samagri,
                { item_hindi: '', item_english: '', quantity: 1, unit: '', price_inr: 0 }
            ]
        }));
    };

    const removeSamagriItem = (index: number) => {
        const updatedSamagri = formData.puja_samagri.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, puja_samagri: updatedSamagri }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isNew) {
                await createPujaKitAction(formData);
            } else if(pujaKit?._id) {
                await updatePujaKitAction(pujaKit._id, formData);
            }
            router.push('/admin');
            router.refresh(); // To show updated data
        } catch (error) {
            console.error('Failed to save puja kit', error);
            // Here you would show an error toast to the user
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="festival_english">Festival Name (English)</Label>
                    <Input id="festival_english" name="festival_english" value={formData.festival_english} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="festival_hindi">Festival Name (Hindi)</Label>
                    <Input id="festival_hindi" name="festival_hindi" value={formData.festival_hindi} onChange={handleInputChange} required />
                </div>
            </div>

            <div>
                <Label className="text-lg font-semibold">Puja Samagri</Label>
                 <div className="mt-2 border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item (Hindi)</TableHead>
                                <TableHead>Item (English)</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Price (INR)</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formData.puja_samagri.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell><Input name="item_hindi" value={item.item_hindi} onChange={e => handleSamagriChange(index, e)} /></TableCell>
                                    <TableCell><Input name="item_english" value={item.item_english} onChange={e => handleSamagriChange(index, e)} /></TableCell>
                                    <TableCell><Input name="quantity" type="number" value={item.quantity} onChange={e => handleSamagriChange(index, e)} /></TableCell>
                                    <TableCell><Input name="unit" value={item.unit} onChange={e => handleSamagriChange(index, e)} /></TableCell>
                                    <TableCell><Input name="price_inr" type="number" value={item.price_inr} onChange={e => handleSamagriChange(index, e)} /></TableCell>
                                    <TableCell>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeSamagriItem(index)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Button type="button" variant="outline" size="sm" className="mt-4" onClick={addSamagriItem}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                </Button>
            </div>

            <div className="flex justify-between items-center pt-6 border-t">
                <div className="text-xl font-bold">
                    Total Price: <span className="text-primary">₹{formData.total_price_inr.toFixed(2)}</span>
                </div>
                 <Button type="submit" size="lg" disabled={isLoading}>
                    <Save className="mr-2 h-5 w-5" />
                    {isLoading ? 'Saving...' : (isNew ? 'Create Kit' : 'Save Changes')}
                </Button>
            </div>
        </form>
    );
}
