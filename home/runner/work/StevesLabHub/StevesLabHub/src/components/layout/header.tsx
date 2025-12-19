
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Code, X, GraduationCap, LayoutDashboard, Gamepad2, Book, FileQuestion, StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from './theme-toggle';
import { Separator } from '../ui/separator';

const mainNavItems = [
  { href: '/', label: 'Home', icon: GraduationCap },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/games', label: 'Games', icon: Gamepad2 },
];

const mobileExtraNavItems = [
    { href: '/dashboard#subjects', label: 'Subjects', icon: Book },
    { href: '/dashboard#all-programs', label: 'Lab Programs', icon: Code },
    { href: '/dashboard#study-materials', label: 'Study Materials', icon: FileQuestion },
    { href: '/dashboard#notes', label: 'Notes & Links', icon: StickyNote },
]

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDashboardPage = pathname.startsWith('/dashboard');
  const isGamesPage = pathname.startsWith('/games');

  const NavLink = ({ href, label, icon: Icon, isMobile = false }: { href: string, label: string, icon: React.ElementType, isMobile?: boolean }) => {
    const isActive = (pathname === href || (href.startsWith('/dashboard') && isDashboardPage));
    
    return (
      <Button
        asChild
        variant="ghost"
        className={cn(
          "justify-start text-muted-foreground hover:text-foreground hover:bg-accent",
           (isActive || (href.startsWith('/games') && isGamesPage)) && "bg-primary/10 text-primary",
           isMobile ? "w-full text-base py-6" : "text-sm"
        )}
        onClick={() => isMobile && setMobileMenuOpen(false)}
      >
        <Link href={href}>
          {isMobile && <Icon className="mr-2 h-5 w-5" />}
          {label}
        </Link>
      </Button>
    );
  };
  
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'border-b border-border/40 bg-background/85 backdrop-blur-xl' : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center sm:h-20">
        <Link href="/" className="mr-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <span className="font-extrabold text-2xl text-primary-foreground">S</span>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-lg sm:text-xl text-foreground">Steve's Lab Hub</p>
          </div>
        </Link>

        <nav className="hidden items-center space-x-2 md:flex">
          {mainNavItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80vw] sm:w-[50vw] p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation links for Steve's Lab Hub.
                  </SheetDescription>
                  <div className="flex items-center justify-between">
                       <Link href="/" className="mr-6 flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                              <span className="font-extrabold text-xl text-primary-foreground">S</span>
                          </div>
                          <p className="font-bold text-lg text-foreground">Steve's Lab Hub</p>
                      </Link>
                      <SheetTrigger asChild>
                           <Button variant="ghost" size="icon">
                              <X className="h-6 w-6" />
                           </Button>
                      </SheetTrigger>
                  </div>
                </SheetHeader>
              <div className="p-4">
                <nav className="flex flex-col gap-2">
                  {mainNavItems.map((item) => (
                    <NavLink key={item.href} {...item} isMobile />
                  ))}
                  <Separator className="my-2" />
                  {mobileExtraNavItems.map((item) => (
                    <NavLink key={item.href} {...item} isMobile />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
