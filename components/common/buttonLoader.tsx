import React from 'react'
import { motion } from 'framer-motion'

const ButtonLoader = () => {
  return (
    <motion.div
      className="w-8 h-8 border-t-2 border-slate-100 border-solid rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        loop: Infinity,
        ease: "linear",
        duration: 1,
      }}
    />
  )
}

export default ButtonLoader