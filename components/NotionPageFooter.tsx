import * as React from 'react'
import { createPortal } from 'react-dom'
import cs from 'classnames'
import * as types from 'notion-types'
import { Breadcrumbs, useNotionContext } from 'react-notion-x'
import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import LuxoticarsLogo from 'site-props/LUXOTICARS_GRADIENT_SKULL.svg'
import LuxoticarsFont from 'site-props/LUXOTICARS_WHITE_FONT.svg'
import Shopee from 'site-props/shopee.svg'

import { navigationLinks } from 'lib/config'
import s from './NotionPageFooter.module.css'

export const NotionPageFooter: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { components, mapPageUrl } = useNotionContext()

  return createPortal(
    <Popover className={s.wrapper} as="header">
      <div className={s.menu}>
        <Breadcrumbs block={block} rootOnly={false} />
        <Popover.Button className='px-4 border-l border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:hidden inline-flex items-center justify-center'>
          <span className="sr-only">Open main menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </Popover.Button>
      </div>
      <div className={s.copyright}>
        Copyright © 2022 Luxoticars Sdn. Bhd. All rights reserved.
      </div>
      <Transition
        as={React.Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
      <Popover.Panel
        focus
        className="absolute z-10 bottom-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div className="rounded-lg shadow-md bg-black/70 bg-gradient-to-r to-gray-900 via-[#2125293d] from-[#21252999] ring-1 ring-white overflow-hidden backdrop-blur-xl">
          <div className="px-3 pt-4">
            <div className='space-x-3 flex items-center flex-row'>
              <div className='mr-3'>
                <Image src={LuxoticarsLogo} alt="Luxoticars" height={62} width={34} />
              </div>
              <Image src={LuxoticarsFont} alt="Luxoticars" height={82} width={220} />
            </div>
            <div className='px-8 pt-2 pb-3'>
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
                      className={cs('block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-gray-900 hover:bg-gray-50', 'breadcrumb', 'button')}
                    >
                      {link.title}
                    </components.PageLink>
                  )
                } else {
                  return (
                    <components.Link
                      href={link.url}
                      key={index}
                      className={cs('block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-gray-900 hover:bg-gray-50', 'breadcrumb', 'button')}
                    >
                      {link.title}
                    </components.Link>
                  )
                }
              })
              .filter(Boolean)}
              <a
                href="https://shp.ee/i6sjx9t"
                className='flex px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-gray-900 hover:bg-gray-50'
              >
                Merchandise
                <motion.div
                  style={{
                    marginBottom: '-20px',
                    marginRight: '-45px',
                    paddingBottom: '20px',
                    paddingRight: '45px',
                    display: 'inline-block'
                  }}
                  animate={{ rotate: 20 }}
                  transition={{
                    repeat: 7,
                    repeatType: 'mirror',
                    duration: 0.2,
                    delay: 0.5,
                    ease: 'easeInOut',
                    type: 'tween'
                  }}
                >
                  <Image src={Shopee} width={22} height={22} />
                </motion.div>
              </a>
            </div>
          </div>
          <div className="px-3 pb-3 flex items-center justify-end">
            <Popover.Button className="bg-white rounded-full p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500">
              <span className="sr-only">Close menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Popover.Button>
          </div>
        </div>
      </Popover.Panel>
      </Transition>
    </Popover>,
    document.getElementsByTagName('body')[0]
  )
}