"use client"

import { motion } from 'framer-motion';

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 w-full relative bg-background">
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
