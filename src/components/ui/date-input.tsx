'use client';

import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ScrollArea } from './scroll-area';
import { getDaysInMonth, getYear, getMonth, getDate } from 'date-fns';

interface DateInputProps {
  value?: Date;
  onChange: (value: Date) => void;
  className?: string;
  fromYear?: number;
  toYear?: number;
}

export function DateInput({ value, onChange, className, fromYear, toYear }: DateInputProps) {
  const [day, setDay] = React.useState<number | undefined>(value ? getDate(value) : undefined);
  const [month, setMonth] = React.useState<number | undefined>(value ? getMonth(value) : undefined);
  const [year, setYear] = React.useState<number | undefined>(value ? getYear(value) : undefined);

  const handleDateChange = (newDay?: number, newMonth?: number, newYear?: number) => {
    const d = newDay !== undefined ? newDay : day;
    const m = newMonth !== undefined ? newMonth : month;
    const y = newYear !== undefined ? newYear : year;

    if (d !== undefined && m !== undefined && y !== undefined) {
      const newDate = new Date(y, m, d);
      onChange(newDate);
    }
  };
  
  React.useEffect(() => {
    if (value) {
        setDay(getDate(value));
        setMonth(getMonth(value));
        setYear(getYear(value));
    } else {
        setDay(undefined);
        setMonth(undefined);
        setYear(undefined);
    }
  }, [value]);
  
  const currentYear = new Date().getFullYear();
  const startYear = fromYear || currentYear - 100;
  const endYear = toYear || currentYear;
  
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).reverse();
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: new Date(2000, i).toLocaleString('default', { month: 'long' }),
  }));
  
  const daysInSelectedMonth = (month !== undefined && year !== undefined) ? getDaysInMonth(new Date(year, month)) : 31;
  const days = Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1);


  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select
        onValueChange={(val) => {
            const newDay = parseInt(val);
            setDay(newDay);
            handleDateChange(newDay);
        }}
        value={day?.toString()}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent>
            <ScrollArea className="h-72">
                {days.map(d => (
                    <SelectItem key={d} value={d.toString()}>{d}</SelectItem>
                ))}
            </ScrollArea>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(val) => {
            const newMonth = parseInt(val);
            setMonth(newMonth);
            handleDateChange(undefined, newMonth);
        }}
        value={month?.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
           <ScrollArea className="h-72">
                {months.map(m => (
                    <SelectItem key={m.value} value={m.value.toString()}>{m.label}</SelectItem>
                ))}
            </ScrollArea>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(val) => {
            const newYear = parseInt(val);
            setYear(newYear);
            handleDateChange(undefined, undefined, newYear);
        }}
        value={year?.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
            <ScrollArea className="h-72">
                {years.map(y => (
                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
            </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
}

    