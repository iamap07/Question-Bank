'use client'
import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuestionDetail } from '@/components/question-detail'
import { useQuestions } from '@/hooks/use-question-store'
export default function QuestionPage({params}:{params:Promise<{id:string}>}){const {id}=use(params);const {questions}=useQuestions();const q=questions.find(x=>x.id===decodeURIComponent(id));if(!q)return <div className="mx-auto max-w-xl py-20 text-center"><h1 className="text-xl font-semibold">Question not found</h1><p className="mt-2 text-sm text-slate-500">This question is not present in the current local dataset.</p><Link href="/questions"><Button className="mt-5"><ArrowLeft size={15}/>Back to Questions</Button></Link></div>;return <><Link href="/questions"><Button variant="ghost" size="sm" className="mb-2"><ArrowLeft size={15}/>Questions</Button></Link><QuestionDetail q={q}/></>}
