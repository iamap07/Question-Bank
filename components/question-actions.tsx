'use client'
import { Copy, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from './ui/button'
export function CopyButton({value,label}:{value:string;label:string}){return <Button variant="ghost" size="sm" onClick={async()=>{try{await navigator.clipboard.writeText(value);toast.success(`${label} copied`)}catch{toast.error('Clipboard unavailable')}}}><Copy size={14}/><span className="sr-only">Copy {label}</span></Button>}
export function OpenQuestion({id}:{id:string}){return <Link href={`/questions/${encodeURIComponent(id)}`}><Button variant="ghost" size="sm"><ExternalLink size={14}/></Button></Link>}
