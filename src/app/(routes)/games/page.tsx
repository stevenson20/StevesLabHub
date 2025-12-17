
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowRight, Bug, ListTree, Binary, Keyboard, Pyramid, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const games = [
  {
    title: 'Tech Quiz',
    description: 'Test your knowledge with multiple-choice questions from various CS topics.',
    href: '/games/tech-quiz',
    icon: <Brain className="h-8 w-8 text-primary" />,
    isAvailable: true,
    isDesktopOnly: false,
  },
  {
    title: 'Towers of Hanoi',
    description: 'The classic puzzle. Move the entire stack to another rod, obeying the simple rules.',
    href: '/games/towers-of-hanoi',
    icon: <Pyramid className="h-8 w-8 text-primary" />,
    isAvailable: true,
    isDesktopOnly: false,
  },
  {
    title: 'Tech Word Guess',
    description: 'Guess the 5-letter tech-related word in 6 tries. A fun challenge for your inner geek!',
    href: '/games/tech-word-guess',
    icon: <Puzzle className="h-8 w-8 text-primary" />,
    isAvailable: true,
    isDesktopOnly: false,
  },
  {
    title: 'Code-Catcher',
    description: 'Spot the bug in short code snippets. Test your debugging skills against the clock!',
    href: '/games/code-catcher',
    icon: <Bug className="h-8 w-8 text-primary" />,
    isAvailable: true,
    isDesktopOnly: false,
  },
  {
    title: 'Algo-Sort',
    description: 'Arrange the jumbled steps of a classic algorithm into the correct logical order. A puzzle for programmers.',
    href: '/games/algo-sort',
    icon: <ListTree className="h-8 w-8 text-primary" />,
    isAvailable: true,
    isDesktopOnly: false,
  },
   {
    title: 'Binary Blitz',
    description: 'Convert decimal numbers to binary against the clock. A fun test of your binary knowledge!',
    href: '/games/binary-blitz',
    icon: <Binary className="h-8 w-8 text-primary" />,
    isAvailable: true,
    isDesktopOnly: false,
  },
   {
    title: 'Type-Racer: Code Edition',
    description: 'Test your coding speed by typing out code snippets. Measure your WPM and accuracy.',
    href: '/games/type-racer',
    icon: <Keyboard className="h-8 w-8 text-primary" />,
    isAvailable: true,
    isDesktopOnly: true,
  },
];

export default function GamesHubPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight">Game Center</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Take a break and test your skills with these fun, tech-themed games.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {games.map((game) => (
          <div key={game.title} className={cn(game.isDesktopOnly && 'hidden md:block')}>
            <Card 
              className={cn(
                "flex flex-col group transition-transform duration-300 h-full",
                game.isAvailable ? "hover:-translate-y-1" : "opacity-60 cursor-not-allowed"
              )}
            >
              <CardHeader className="flex-grow">
                  <div className="flex items-start justify-between">
                      <div className={cn("p-3 rounded-lg", game.isAvailable ? "bg-primary/10" : "bg-muted")}>
                          {game.icon}
                      </div>
                      {!game.isAvailable && (
                        <Badge variant="secondary">Coming Soon</Badge>
                      )}
                  </div>
                <CardTitle className={cn("mt-4 text-2xl font-bold transition-colors", game.isAvailable && "group-hover:text-primary")}>{game.title}</CardTitle>
                <CardDescription className="mt-2">{game.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full" disabled={!game.isAvailable}>
                  {game.isAvailable ? (
                    <Link href={game.href}>
                      Play Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  ) : (
                    <span>
                      Coming Soon
                    </span>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
