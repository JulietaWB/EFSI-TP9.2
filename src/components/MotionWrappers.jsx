import { motion } from 'framer-motion'

export function FadeIn({ children, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

export function HoverScale({ children, className }) {
  return (
    <motion.div className={className} whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      {children}
    </motion.div>
  )
}
