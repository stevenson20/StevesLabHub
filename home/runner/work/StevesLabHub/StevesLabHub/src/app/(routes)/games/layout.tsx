
"use client"

import { motion } from 'framer-motion';

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 w-full relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[#0a0a0a] bg-[radial-gradient(#2BC397_1.5px,transparent_1.5px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
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
