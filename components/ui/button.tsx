import * as React from 'react'
import { cn } from '@/lib/utils/cn'
export function Button({className='',variant='default',size='md',...props}:React.ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'default'|'outline'|'ghost'|'danger';size?:'sm'|'md'|'lg'}){
 const v={default:'bg-blue-600 text-white hover:bg-blue-700',outline:'border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800',ghost:'hover:bg-slate-100 dark:hover:bg-slate-800',danger:'bg-red-600 text-white hover:bg-red-700'}[variant]
 const s={sm:'h-8 px-2.5 text-xs',md:'h-9 px-3 text-sm',lg:'h-10 px-4'}[size]
 return <button className={cn('inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50',v,s,className)} {...props}/>
}
