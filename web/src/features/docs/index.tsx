/*
Copyright (C) 2026 wangjain3297-prog and contributors.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

Based on QuantumNous/new-api (AGPLv3).
*/
import { BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CopyButton } from '@/components/copy-button'
import { PublicLayout } from '@/components/layout'

import { DOCS_SECTIONS, type DocsBlock } from './content'

// 文档内容为静态数据，用正文内容派生稳定 key
function blockKey(block: DocsBlock): string {
  if (block.type === 'code') return `${block.lang}:${block.code.slice(0, 40)}`
  if (block.type === 'list') return `list:${block.items[0]}`
  if (block.type === 'note') return `note:${block.text}`
  return `p:${block.text}`
}

function CodeBlock(props: { block: Extract<DocsBlock, { type: 'code' }> }) {
  return (
    <div className='group relative'>
      <CopyButton
        value={props.block.code}
        tooltip='Copy'
        successTooltip='Copied'
        className='bg-background/80 border-border/60 absolute top-2 right-2 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100'
      />
      <pre className='bg-muted/60 border-border/50 overflow-x-auto rounded-lg border p-4 text-xs leading-relaxed'>
        <code>{props.block.code}</code>
      </pre>
    </div>
  )
}

function BlockView(props: { block: DocsBlock }) {
  const block = props.block
  if (block.type === 'p') {
    return (
      <p className='text-muted-foreground leading-7'>{block.text}</p>
    )
  }
  if (block.type === 'list') {
    return (
      <ul className='text-muted-foreground list-disc space-y-2 pl-5 leading-7'>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
  if (block.type === 'note') {
    return (
      <p className='border-primary/30 bg-primary/5 text-foreground rounded-lg border-l-4 px-4 py-3 text-sm leading-6'>
        {block.text}
      </p>
    )
  }
  return <CodeBlock block={block} />
}

export function Docs() {
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <div className='mx-auto max-w-6xl px-4 py-10'>
        <div className='mb-10 flex items-center gap-3'>
          <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl'>
            <BookOpen className='size-5' />
          </div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {t('Prism Documentation Center')}
          </h1>
        </div>

        <div className='grid gap-10 md:grid-cols-[200px_1fr]'>
          <nav aria-label={t('Prism Documentation Center')} className='hidden md:block'>
            <ul className='sticky top-20 space-y-1'>
              {DOCS_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className='text-muted-foreground hover:text-foreground rounded-md px-2 py-1.5 text-sm transition-colors'
                  >
                    {t(section.titleKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className='min-w-0 space-y-12'>
            {DOCS_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className='scroll-mt-24 space-y-5'>
                <h2 className='border-border/60 pb-2 text-xl font-semibold'>
                  {t(section.titleKey)}
                </h2>
                {section.blocks.map((block) => (
                  <BlockView key={blockKey(block)} block={block} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
