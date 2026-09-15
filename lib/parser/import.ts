import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import type { RawQuestion } from '@/types/question'
import { normalizeRows } from './normalize'

export async function parseQuestionFile(file: File) {
  const ext = file.name.toLowerCase().split('.').pop()
  if (ext === 'csv') {
    const text = await file.text()
    const result = Papa.parse<Record<string, unknown>>(text, { header: true, skipEmptyLines: true, dynamicTyping: false })
    return normalizeRows(result.data as RawQuestion[], result.meta.fields ?? [])
  }
  const buffer = await file.arrayBuffer()
  const wb = XLSX.read(buffer, { type: 'array', cellDates: true })
  const sheet = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json<RawQuestion>(sheet, { defval: '' })
  const headers = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1, range: 0 })[0] ?? []
  return normalizeRows(rows, headers.map(String))
}
