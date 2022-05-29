import * as React from 'react'
import Image from 'next/image'

import styles from './Brand.module.css'

const brands = [
  'aston-martin',
  'audi',
  'bentley',
  'BMW',
  'bugatti',
  'cadillac',
  'dodge',
  'ferrari',
  'fiat',
  'ford',
  'jaguar',
  'jeep',
  'lamborghini',
  'land-rover',
  'lexus',
  'lotus',
  'maserati',
  'mclaren',
  'mercedes-benz',
  'mini',
  'nissan',
  'pagani',
  'porsche',
  'rolls-royce',
  'toyota',
  'volkswagen',
  'volvo'
]
const Brand: React.FC<{ brandname: string }> = ({ brandname }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logo = require(`../site-props/brands/${brandname}.svg`).default

  return (
    <div className={styles.brand}>
      <Image src={logo} alt={brandname} />
    </div>
  )
}
export const Brands: React.FC = () => (
  <div className={styles.container}>
    {brands.map(br => <Brand key={br} brandname={br} />)}
  </div>
)
