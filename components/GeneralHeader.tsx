import * as React from 'react'
import cs from 'classnames'
import { Search, useNotionContext } from 'react-notion-x'

import * as types from 'lib/types'
import { navigationLinks, isSearchEnabled } from 'lib/config'

export const GeneralHeader: React.FC<types.PageProps> = ({ recordMap }) => {
  const { components, mapPageUrl } = useNotionContext()
  const keys = Object.keys(recordMap?.block || {})
  return (
    <header className='px-3 text-slate-300 absolute inset-0 h-16 bg-transparent py-5'>
      <div className='max-w-4xl mx-auto flex justify-end items-center flex-row '>
        <div className="flex-shrink-0 flex items-center space-x-3">
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
                    className={cs('uppercase text-xs', 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs('uppercase text-xs', 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.Link>
                )
              }
            })
            .filter(Boolean)}
            {isSearchEnabled && <Search block={recordMap?.block?.[keys[0]]?.value} title={null} />}
        </div>
      </div>
    </header>
  )
}
