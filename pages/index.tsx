import * as React from 'react'
import Image from 'next/image'

import { domain } from 'lib/config'
import * as types from 'lib/types'
import { resolveNotionPage } from 'lib/resolve-notion-page'
import { Parallax, GeneralHeader, Shopee, SiteDescription } from 'components'

import LuxoticarsLogo from 'site-props/LUXOTICARS.svg'
import LuxoticarsWhiteFont from 'site-props/LUXOTICARS_WHITE_FONT.svg'
import Carousel from 'components/Carousel'

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(domain)

    return {
      props,
      revalidate: 10
    }
  } catch (err) {
    console.error('page error', domain, err.message)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage(props: types.PageProps) {
  const [hasMounted, setMounted] = React.useState<boolean>(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className='relative w-screen h-screen left-0 z-0 snap-y snap-center snap-always snap-mandatory'>
      {hasMounted && (
        <>
        <Carousel className='relative block w-full h-screen clear-both z-0'>
          <GeneralHeader {...props} />
          <div className='fixed top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/3'>
              <Parallax offset={100}>
                <div className='flex items-center space-x-3'>
                  <Image src={LuxoticarsLogo} alt="Luxoticars" height={182} width={134} />
                  <div className="relative">
                    <Image src={LuxoticarsWhiteFont} alt="Luxoticars" height={39} width={300} />
                    <SiteDescription {...props} />
                  </div>
                </div>
              </Parallax>
          </div>
        </Carousel>
        <div className='relative z-0 bg-black h-screen'>
          <div className='mx-auto max-w-3xl'>
            <Parallax offset={-100}>
              <h2 className='text-white text-xl'>Merchandise</h2>
              <Shopee />
            </Parallax>
          </div>
        </div>
        </>
      )}
    </div>
  )
}
