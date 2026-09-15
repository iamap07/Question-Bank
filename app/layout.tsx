import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { QuestionProvider } from '@/hooks/use-question-store'
import { Toaster } from 'sonner'
import { AppShell } from '@/components/layout'

export const metadata={title:'Question Backend',description:'Internal question-bank management dashboard'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><ThemeProvider><QuestionProvider><AppShell>{children}</AppShell><Toaster position="bottom-right" richColors/></QuestionProvider></ThemeProvider></body></html>}
