'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MandirIcon } from '@/components/icons/MandirIcon';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const marriageNavItems: { href: string, label: string }[] = [
];

const toolsNavItems: { href: string, label: string }[] = [
];

const resourcesNavItems = [
    { href: '/puja-kits', label: 'Puja Kits' },
    { href: '/content-hub', label: 'Content Hub' },
    { href: '/remedies-hub', label: 'Remedies' },
    { href: '/temple-tracker', label: 'Temple Tracker' },
]

const allNavItems = [
    { href: '/', label: 'Home' },
    ...marriageNavItems,
    ...toolsNavItems,
    ...resourcesNavItems,
]

function NavLink({ href, pathname, children, onClick }: { href: string; pathname: string, children: React.ReactNode, onClick?: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                'transition-colors hover:text-foreground/80 text-lg md:text-sm',
                pathname === href
                ? 'text-foreground font-semibold'
                : 'text-foreground/60'
            )}
            >
            {children}
        </Link>
    )
}

function NavDropdown({ title, items, pathname, closeMobileMenu }: { title: string, items: {href: string, label: string}[], pathname: string, closeMobileMenu?: () => void }) {
    if (items.length === 0) return null;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="px-2 py-1 my-1 text-sm font-medium h-auto hover:bg-transparent text-foreground/60 data-[state=open]:text-foreground/80 hover:text-foreground/80">
                    {title}
                    <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
                 </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {items.map(item => (
                    <DropdownMenuItem key={item.href}>
                        <NavLink href={item.href} pathname={pathname} onClick={closeMobileMenu}>{item.label}</NavLink>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-auto min-h-16 flex-wrap items-center justify-between py-2">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <MandirIcon className="h-8 w-8 text-primary" />
          <span className="font-bold font-headline text-2xl inline-block">
            PujaBaba
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-1 flex-wrap">
            <NavLink href="/" pathname={pathname}>Home</NavLink>
            <NavDropdown title="Marriage & Compatibility" items={marriageNavItems} pathname={pathname} />
            <NavDropdown title="Tools & Guides" items={toolsNavItems} pathname={pathname} />
            <NavDropdown title="Resources" items={resourcesNavItems} pathname={pathname} />
        </nav>
        
        {/* Mobile Menu */}
        <div className="flex md:hidden items-center justify-end">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>
                        <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={closeMobileMenu}>
                            <MandirIcon className="h-8 w-8 text-primary" />
                            <span className="font-bold font-headline text-2xl inline-block">
                            PujaBaba
                            </span>
                        </Link>
                    </SheetTitle>
                    <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                </SheetHeader>
              <nav className="flex flex-col space-y-4">
                <NavLink href="/" pathname={pathname} onClick={closeMobileMenu}>Home</NavLink>
                
                {marriageNavItems.length > 0 && <p className="font-semibold text-muted-foreground pt-4">Marriage & Compatibility</p>}
                {marriageNavItems.map((item) => (
                    <NavLink key={item.href} href={item.href} pathname={pathname} onClick={closeMobileMenu}>
                        {item.label}
                    </NavLink>
                ))}
                
                {toolsNavItems.length > 0 && <p className="font-semibold text-muted-foreground pt-4">Tools & Guides</p>}
                {toolsNavItems.map((item) => (
                    <NavLink key={item.href} href={item.href} pathname={pathname} onClick={closeMobileMenu}>
                        {item.label}
                    </NavLink>
                ))}
                
                <p className="font-semibold text-muted-foreground pt-4">Resources</p>
                {resourcesNavItems.map((item) => (
                    <NavLink key={item.href} href={item.href} pathname={pathname} onClick={closeMobileMenu}>
                        {item.label}
                    </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
