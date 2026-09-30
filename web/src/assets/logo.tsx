/*
Copyright (C) 2023-2026 QuantumNous

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

For commercial licensing, please contact support@quantumnous.com
*/
import type { SVGProps } from 'react'

import { cn } from '@/lib/utils'

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      id='prism-logo'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      width='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('size-6', className)}
      {...props}
    >
      <title>Prism</title>
      {/* 棱镜三角：一束光进入，折射出光谱 */}
      <path d='M13.5 4.5 20 17H7z' />
      <path d='M2 13h5.5' strokeOpacity='0.9' />
      <path d='M3.5 17h4' strokeOpacity='0.55' />
      <path d='M20 12.5h2' strokeOpacity='0.9' />
      <path d='M20 15.5h2.5' strokeOpacity='0.55' />
      <path d='M20 18.5h2' strokeOpacity='0.3' />
    </svg>
  )
}
