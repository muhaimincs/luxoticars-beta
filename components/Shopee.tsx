import * as React from 'react'
import { motion } from 'framer-motion'

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

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const data = [
  'https://images.ctfassets.net/ijuxqf6x1pz2/4QMTDG9pRujlqZ5a2OZ8Pq/aede618ab6e7ff41d0ab15bd04eb4e1a/photo_2022-05-29_13.52.25.jpeg',
  'https://images.ctfassets.net/ijuxqf6x1pz2/3Z6Oy75dEuVmaan3R02pg0/4ff8fa5b7870138cdd419daae0ffbb76/photo_2022-04-16_22.31.17.jpeg',
  'https://images.ctfassets.net/ijuxqf6x1pz2/6fhnIF0DbfYKYIFtQain0D/8e74183d55344ed1159018ac11ec751e/photo_2022-04-16_22.00.32.jpeg',
  'https://images.ctfassets.net/ijuxqf6x1pz2/6iYi9rN29VZ9cQSVDjW1D5/eb4e2c1a60b95ebf7b5752eccb165dd0/photo_2022-05-29_13.52.23.jpeg',
  'https://images.ctfassets.net/ijuxqf6x1pz2/5RKwbQqDu35DxNprlVnTsI/a27e5d8c5dbbdbe607985cac5b70831c/photo_2022-05-29_13.52.30.jpeg',
  'https://images.ctfassets.net/ijuxqf6x1pz2/3uKDZKbIrC5haON0XgIMlx/e180d7e5f3137b154f505de35218eb58/photo_2022-05-29_13.52.31.jpeg',
  'https://images.ctfassets.net/ijuxqf6x1pz2/5lVc0ZgK0Rminb8jlq8jWG/751af5de385962de43d5bf7d19beaa6a/photo_2022-05-29_13.52.40.jpeg',
  'https://images.ctfassets.net/ijuxqf6x1pz2/3N9p6OOcEb8VeMtbEadNtN/96d300846621461fe1797eed1ac49116/photo_2022-05-29_13.52.44.jpeg',
  'https://images.ctfassets.net/ijuxqf6x1pz2/5LFyvosNBhq8qPHindfZyB/3d4648b7d5f95019ccde2db1e9739f55/photo_2022-05-29_13.52.43.jpeg',
  'https://images.ctfassets.net/ijuxqf6x1pz2/5IwX9sLIjt71XfUqaJ22uk/088ad9e9352206fd3a09bead9cac15f2/photo_2022-05-29_13.52.38.jpeg'
]

export const Shopee: React.FC = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
      {data.map(g => (
        <motion.img
          key={g}
          variants={item}
          className={`group`}
          src={g}
        />
      ))}
    </motion.div>
  )
}
