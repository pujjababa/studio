
import type { Festival } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Calendar, Moon, Sun, Star, Zap, Waves } from 'lucide-react';

interface FestivalPanchangModalProps {
  isOpen: boolean;
  onClose: () => void;
  festival: Festival;
}

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {icon}
            <span>{label}</span>
        </div>
        <span className="font-semibold text-sm text-foreground">{value || 'N/A'}</span>
    </div>
);


export function FestivalPanchangModal({ isOpen, onClose, festival }: FestivalPanchangModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">{festival.name}</DialogTitle>
          <DialogDescription>
            Panchang details for {new Date(festival.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-1">
            <DetailRow icon={<Calendar className="h-4 w-4" />} label="तिथि (Tithi)" value={festival.tithi} />
            <DetailRow icon={<Moon className="h-4 w-4" />} label="पक्ष (Paksha)" value={festival.paksha} />
            <DetailRow icon={<Star className="h-4 w-4" />} label="नक्षत्र (Nakshatra)" value={festival.nakshatra} />
            <DetailRow icon={<Zap className="h-4 w-4" />} label="योग (Yoga)" value={festival.yoga} />
            <DetailRow icon={<Waves className="h-4 w-4" />} label="करण (Karana)" value={festival.karana} />
        </div>
        <DialogFooter>
          <Button onClick={onClose}>बंद करें</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
