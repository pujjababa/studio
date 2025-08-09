
import Link from 'next/link';
import { MandirIcon } from '@/components/icons/MandirIcon';
import { Github, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <MandirIcon className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-2xl">
                PujaBaba
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Your trusted partner for all spiritual ceremonies and guidance.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="GitHub">
                <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-2">
            <div>
              <h3 className="font-semibold font-headline tracking-wider">Navigate</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/content-hub" className="text-muted-foreground hover:text-primary transition-colors">Content</Link></li>
                 <li><Link href="/remedies-hub" className="text-muted-foreground hover:text-primary transition-colors">Remedies</Link></li>
                 <li><Link href="/temple-tracker" className="text-muted-foreground hover:text-primary transition-colors">Temple Tracker</Link></li>
                <li><Link href="/#pandits" className="text-muted-foreground hover:text-primary transition-colors">Pandits</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-headline tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
             <div>
              <h3 className="font-semibold font-headline tracking-wider">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">Admin</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PujaBaba. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
