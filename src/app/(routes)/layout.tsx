
"use client"

import { AnimatePresence, motion } from 'framer-motion';

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <AnimatePresence mode="wait">
          <motion.div
            key="layout"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {children}
          </motion.div>
      </AnimatePresence>
  )
}
