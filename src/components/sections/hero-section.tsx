
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Code, Copy, Search, Play, LayoutDashboard } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: <Search />,
    title: "Browse & Filter",
    description: "Easily find programs by subject, language, or tags.",
  },
  {
    icon: <Copy />,
    title: "One-Click Copy",
    description: "Grab code snippets instantly to use in your projects.",
  },
  {
    icon: <Play />,
    title: "Run in Browser",
    description: "Execute HTML/CSS/JS code directly to see it in action.",
  },
  {
    icon: <Code />,
    title: "All Subjects",
    description: "Covering AI, FSD, CN, and experimental projects.",
  },
]

export function HeroSection() {
  return (
    <section id="home" className="relative w-full pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24">
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center gap-8 text-center animate-slide-up">
        <div className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm">
          <Code className="mr-2 h-5 w-5" />
          Your Ultimate Code Companion for Labs
        </div>

        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl">
          Notes, Labs & Materials
          <br />
          <span className="text-primary">All in One Place</span>
        </h1>
        
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Stop searching endless folders. Access notes, materials, lab programs, and question papers from a single, organized hub.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="hero" variant="hero">
            <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Go to Dashboard
            </Link>
          </Button>
          <Button asChild size="hero" variant="heroOutline">
            <Link href="/dashboard#all-programs">View All Programs</Link>
          </Button>
        </div>

        <Card className="mt-12 w-full max-w-5xl rounded-2xl border bg-card/50 p-6 shadow-lg backdrop-blur-sm sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/80 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-primary/20 opacity-50 blur-[80px]"></div>
      </div>
    </section>
  )
}
