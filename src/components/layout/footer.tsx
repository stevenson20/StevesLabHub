import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-bold text-lg text-primary-foreground">S</span>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Steve's Lab Hub. All rights reserved.
          </p>
        </div>
        <p className="text-sm font-medium text-muted-foreground hidden sm:block">
          Your one-stop destination for lab programs.
        </p>
      </div>
    </footer>
  )
}
