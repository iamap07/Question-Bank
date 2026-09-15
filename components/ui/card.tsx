import * as React from 'react'
import { cn } from '@/lib/utils/cn'
export const Card=({className,...p}:React.HTMLAttributes<HTMLDivElement>)=><div className={cn('rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900',className)} {...p}/>
export const CardHeader=({className,...p}:React.HTMLAttributes<HTMLDivElement>)=><div className={cn('p-5 pb-3',className)} {...p}/>
export const CardContent=({className,...p}:React.HTMLAttributes<HTMLDivElement>)=><div className={cn('p-5 pt-0',className)} {...p}/>
export const CardTitle=({className,...p}:React.HTMLAttributes<HTMLHeadingElement>)=><h3 className={cn('font-semibold',className)} {...p}/>
