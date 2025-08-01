'use client';

import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ScrollArea } from './scroll-area';

interface TimePickerProps {
  value: string; // HH:MM
  onChange: (value: string) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [hour, minute] = value ? value.split(':') : ['00', '00'];

  const handleHourChange = (newHour: string) => {
    onChange(`${newHour}:${minute || '00'}`);
  };

  const handleMinuteChange = (newMinute: string) => {
    onChange(`${hour || '00'}:${newMinute}`);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select onValueChange={handleHourChange} value={hour}>
        <SelectTrigger>
          <SelectValue placeholder="HH" />
        </SelectTrigger>
        <SelectContent>
            <ScrollArea className="h-72">
                {hours.map(h => (
                    <SelectItem key={h} value={h}>{h}</SelectItem>
                ))}
            </ScrollArea>
        </SelectContent>
      </Select>
      <span className="font-bold">:</span>
      <Select onValueChange={handleMinuteChange} value={minute}>
        <SelectTrigger>
          <SelectValue placeholder="MM" />
        </SelectTrigger>
        <SelectContent>
           <ScrollArea className="h-72">
                {minutes.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
            </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
}
