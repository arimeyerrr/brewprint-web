'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimateInViewProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function AnimateInView({
  children,
  delay = 0,
  className,
}: AnimateInViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
