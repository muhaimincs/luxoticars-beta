import * as React from 'react'
import cs from 'classnames'
import Link from 'next/link'
import {
  Header,
  // Breadcrumbs,
  Search,
  useNotionContext
} from 'react-notion-x'
import Image from 'next/image'
import * as types from 'notion-types'
import { useRouter } from 'next/router'
// import {
//   Popover
// } from '@headlessui/react'

import { navigationStyle, navigationLinks, isSearchEnabled } from 'lib/config'
import LuxoticarsLogo from 'site-props/LUXOTICARS.svg'
import LuxoticarsWhiteFont from 'site-props/LUXOTICARS_WHITE_FONT.svg'
// import Shopee from 'site-props/shopee.svg'

import styles from './styles.module.css'

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { components, mapPageUrl } = useNotionContext()
  const router = useRouter()
  const logoClassName = React.useMemo(() => {
    if (['/', '/gallery'].includes(router.pathname)) {
      return 'hidden md:block lg:hidden'
    }
    return 'block lg:hidden'
  }, [router.pathname])

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <div className="flex-shrink-0 flex items-center">
          <Link href="/">
            <a className={logoClassName}>
              <Image src={LuxoticarsLogo} alt="Luxoticars" height={52} width={34} />
            </a>
          </Link>
          <div className="hidden lg:block w-auto">
            <Link href="/">
              <a className="flex items-center text-white space-x-4">
                <Image src={LuxoticarsLogo} alt="Luxoticars" height={52} width={34} />
                <div className="relative">
                  <Image src={LuxoticarsWhiteFont} alt="Luxoticars" height={19} width={300} />
                </div>
              </a>
            </Link>
          </div>
        </div>

        <div className='notion-nav-header-rhs breadcrumbs'>
          {navigationLinks
            ?.map((link, index) => {
              if (!link.pageId && !link.url) {
                return null
              }

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.Link>
                )
              }
            })
            .filter(Boolean)}

          {isSearchEnabled && <Search block={block} title={null} />}
        </div>
      </div>
    </header>
  )
}
