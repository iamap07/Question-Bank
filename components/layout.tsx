'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Database, LayoutDashboard, Settings, Upload, Search, Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useQuestions } from '@/hooks/use-question-store'
import { useState } from 'react'
import { Button } from './ui/button'

const nav=[['/dashboard','Dashboard',LayoutDashboard],['/questions','Questions',Database],['/analytics','Analytics',BarChart3],['/upload','Upload Data',Upload],['/settings','Settings',Settings]] as const
export function AppShell({children}:{children:React.ReactNode}){
 const path=usePathname(); const [open,setOpen]=useState(false); const {theme,setTheme}=useTheme(); const {search,setSearch,questions}=useQuestions()
 return <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
  <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white p-4 transition-transform dark:border-slate-800 dark:bg-slate-900 ${open?'translate-x-0':'-translate-x-full'} lg:translate-x-0`}>
   <div className="flex items-center justify-between px-2 py-2"><div className="flex items-center gap-2 font-semibold"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">Q</span>Question Backend</div><button className="lg:hidden" onClick={()=>setOpen(false)}><X size={18}/></button></div>
   <nav className="mt-7 space-y-1">{nav.map(([href,label,Icon])=><Link onClick={()=>setOpen(false)} key={href} href={href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${path.startsWith(href)?'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300':'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}><Icon size={17}/>{label}</Link>)}</nav>
   <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-slate-200 p-3 text-xs text-slate-500 dark:border-slate-800"><div className="flex justify-between"><span>Records</span><span className="font-semibold text-slate-700 dark:text-slate-200">{questions.length.toLocaleString()}</span></div><div className="mt-1">Local / Browser mode</div></div>
  </aside>
  {open&&<div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={()=>setOpen(false)}/>} 
  <div className="lg:pl-64"><header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 md:px-6"><div className="flex items-center gap-3"><Button variant="ghost" size="sm" className="lg:hidden" onClick={()=>setOpen(true)}><Menu size={18}/></Button><div className="relative max-w-xl flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search QBG ID, question, subject, topic…" className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900"/></div><div className="flex items-center gap-2"><Button variant="outline" size="sm" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle theme">{theme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</Button><div className="hidden h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white md:flex">AT</div></div></div></header><main className="p-4 md:p-6">{children}</main></div>
 </div>
}
