import * as React from 'react'
import cs from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import {
  Header,
  Search,
  useNotionContext
} from 'react-notion-x'
import * as types from 'notion-types'
import { parsePageId } from 'notion-utils'

import { navigationStyle, navigationLinks, isSearchEnabled, site } from 'lib/config'
import LuxoticarsLogo from 'site-props/LUXOTICARS.svg'
import LuxoticarsWhiteFont from 'site-props/LUXOTICARS_WHITE_FONT.svg'
import { NotionPageFooter } from './NotionPageFooter'

import styles from './styles.module.css'

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock | undefined
}> = ({ block }) => {
  const { components, mapPageUrl } = useNotionContext()
  const [hasMounted, setMounted] = React.useState(false)
  const [showBottom, setShowBottom] = React.useState(false)
  const sentinalRef = React.useRef(null)
  const navRef = React.useRef(null)
  const isRootPage = parsePageId(block?.id) === parsePageId(site?.rootNotionPageId)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (window) {
      if (hasMounted) {
        const handler = ([entry]) => {
          if (!isRootPage) {
            if (entry.isIntersecting) {
              setShowBottom(false)
            } else {
              setShowBottom(true)
            }
          }
          if (!entry.isIntersecting) {
            if (navRef.current) {
              navRef.current.style.backdropFilter = 'saturate(180%) blur(8px)'
              navRef.current.style.webkitBackdropFilter = 'saturate(180%) blur(8px)'
              navRef.current.style.boxShadow = 'inset 0 -1px 0 0 rgb(0 0 0 / 10%)'
              navRef.current.style.webkitBoxShadow = 'inset 0 -1px 0 0 rgb(0 0 0 / 10%)'
            }
          } else {
            if (navRef.current) {
              navRef.current.style.backdropFilter = 'none'
              navRef.current.style.webkitBackdropFilter = 'none'
              navRef.current.style.boxShadow = 'none'
              navRef.current.style.webkitBoxShadow = 'none'
            }
          }
        }
        const observer = new window.IntersectionObserver(handler)
        observer.observe(sentinalRef.current)
      }
    }
  }, [hasMounted, sentinalRef, navRef, isRootPage])

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <>
      <div className={`observer-element h-3`} ref={sentinalRef} />
      <header className='notion-header' ref={navRef}>
        <div className='notion-nav-header'>
          <div className="flex-shrink-0 flex items-center">
            <div className="lg:block w-auto">
              <Link href="/">
                <a className="flex items-center text-white space-x-4">
                  <Image src={LuxoticarsLogo} alt="Luxoticars" height={62} width={34} />
                  <div className="relative">
                    <Image src={LuxoticarsWhiteFont} alt="Luxoticars" height={19} width={200} />
                  </div>
                </a>
              </Link>
            </div>
          </div>

          <div className='notion-nav-header-rhs breadcrumbs'>
            <div className='hidden lg:block'>
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
            </div>
            {isSearchEnabled && <Search block={block} title={null} />}
          </div>
        </div>
        <div className='hidden lg:flex'></div>
      </header>
      {showBottom && (
        <NotionPageFooter block={block} />
      )}
    </>
  )
}
