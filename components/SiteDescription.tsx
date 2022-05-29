import * as React from 'react'
import { motion } from 'framer-motion'

import { AnimatedTitle } from './AnimatedText'
import * as types from 'lib/types'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const container2 = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.5
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export const SiteDescription: React.FC<types.PageProps> = ({ site }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className='space-y-3'
    >
      <motion.h2
        className='text-white text-base md:text-lg lg:text-5xl'
        variants={item}
      >
        <AnimatedTitle title={site.description} />
      </motion.h2>
      <motion.div
        variants={item}
      >
        <motion.div variants={container2} initial="hidden" animate="visible" className='space-x-3'>
          <motion.span
            variants={item}
            className="rounded bg-red-600 px-2.5 py-1 text-xs font-semibold text-red-50 tracking-wide uppercase"
          >
          {`What's new`}
          </motion.span>
          <motion.span variants={item} className='text-white'>
            Nissan GTR Nismo 3.8
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
