
"use client"

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 w-full relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#2BC397_1px,transparent_1px)] dark:bg-[radial-gradient(#2BC397_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex-1 w-full"
        >
            {children}
        </motion.div>
    </div>
  )
}
