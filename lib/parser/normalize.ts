import type { ImportResult, NormalizedQuestion, RawQuestion } from '@/types/question'
import { firstNonEmpty, parseArray, parseJson, safeString } from '@/lib/utils/parse'

function pick(obj: any, keys: string[]) { for (const k of keys) if (obj && obj[k] !== undefined) return obj[k]; return undefined }

function htmlish(value: unknown): string {
  if (typeof value === 'string') return value
  if (value == null) return ''
  return safeString(value)
}

function extractLang(obj: any, lang: 'english' | 'hindi') {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  const keys = lang === 'english' ? ['english', 'en', 'English', 'question', 'text'] : ['hindi', 'hi', 'Hindi']
  const v = pick(obj, keys)
  return htmlish(v)
}

function normalizeOptions(value: unknown, lang: 'english'|'hindi') {
  const parsed = parseJson(value) ?? value
  const source = Array.isArray(parsed) ? parsed : (parsed && typeof parsed === 'object' ? (pick(parsed, [lang, lang==='english'?'en':'hi', 'options']) ?? []) : [])
  const arr = Array.isArray(source) ? source : []
  return arr.map((item: any, i) => {
    const text = typeof item === 'string' ? item : htmlish(pick(item, ['text','value','content','option']))
    const correct = item && typeof item === 'object' ? Boolean(pick(item, ['correct','is_correct','isCorrect'])) : false
    return { label: String.fromCharCode(65+i), text, correct }
  }).filter(o => o.text)
}

export function normalizeRow(raw: RawQuestion, rowIndex = 0): NormalizedQuestion {
  const warnings: string[] = []
  const contentRaw = raw.content
  const content = parseJson(contentRaw)
  if (typeof contentRaw === 'string' && contentRaw.trim() && content === null) warnings.push(`Row ${rowIndex+2}: invalid content JSON`)
  const solutionsRaw = raw.solutions
  const solutions = parseJson(solutionsRaw)
  if (typeof solutionsRaw === 'string' && solutionsRaw.trim() && solutions === null) warnings.push(`Row ${rowIndex+2}: invalid solutions JSON`)
  const optsRaw = raw.bilingual_options
  const opts = parseJson(optsRaw)
  if (typeof optsRaw === 'string' && optsRaw.trim() && opts === null) warnings.push(`Row ${rowIndex+2}: invalid bilingual_options JSON`)

  const englishQuestion = firstNonEmpty(extractLang(content, 'english'), pick(raw, ['english_question','question_en']))
  const hindiQuestion = firstNonEmpty(extractLang(content, 'hindi'), pick(raw, ['hindi_question','question_hi']))
  const englishSolution = firstNonEmpty(extractLang(solutions, 'english'), pick(raw, ['text_solution']))
  const hindiSolution = firstNonEmpty(extractLang(solutions, 'hindi'))
  const videoUrls = parseArray(raw.video_urls).map(safeString).filter(Boolean)
  const englishOptions = normalizeOptions(opts ?? optsRaw, 'english')
  const hindiOptions = normalizeOptions(opts ?? optsRaw, 'hindi')
  const correctAnswer = firstNonEmpty(
    pick(content, ['correctAnswer','correct_answer','answer']),
    pick(opts as any, ['correctAnswer','correct_answer','answer']),
    englishOptions.find(x => x.correct)?.label,
  )
  const n = (v: unknown) => { const x = Number(v); return Number.isFinite(x) ? x : null }
  return {
    id: firstNonEmpty(raw.unique_id), englishQuestion, hindiQuestion, englishOptions, hindiOptions,
    englishSolution, hindiSolution, correctAnswer, videoUrls,
    category: safeString(raw.category), subject: safeString(raw.subject), chapter: safeString(raw.chapter), topic: safeString(raw.topic), subtopic: safeString(raw.subtopic),
    className: safeString(raw.class), book: safeString(raw.boook), qcmTag: safeString(raw.qcm_tag), targetExam: safeString(raw.target_exam),
    targetExamStages: parseArray(raw.target_exam_stages).map(safeString).filter(Boolean), questionType: safeString(raw.Question_Type), verificationType: safeString(raw.Verification_Type), difficulty: safeString(raw.difficulty), verificationStatus: safeString(raw.verification_status),
    bilingualContentCount: n(raw.bilingual_content_count), bilingualSolutionCount: n(raw.bilingual_solution_count), parentQuestionId: safeString(raw.parent_question_id), categoryConfigurationId: safeString(raw.category_configuration_id), updatedAt: firstNonEmpty(raw.updated_at),
    textSolutionAvailable: Boolean(englishSolution || hindiSolution || raw.text_solution), videoSolutionAvailable: videoUrls.length > 0 || Boolean(raw.vid_solution), bilingualAvailable: Boolean(hindiQuestion || hindiOptions.length || hindiSolution || Number(raw.bilingual_content_count) > 0),
    raw, parseWarnings: warnings,
  }
}

export function normalizeRows(rawRows: RawQuestion[], headers: string[]): ImportResult {
  const warnings: string[] = []
  const rows = rawRows.map((r, i) => normalizeRow(r, i))
  rows.forEach(r => warnings.push(...r.parseWarnings))
  const blankIds = rows.filter(r => !r.id).length
  if (blankIds) warnings.push(`${blankIds} row(s) are missing unique_id`)
  const ids = new Set<string>(), duplicateIds = new Set<string>()
  for (const r of rows) { if (!r.id) continue; if (ids.has(r.id)) duplicateIds.add(r.id); ids.add(r.id) }
  if (duplicateIds.size) warnings.push(`${duplicateIds.size} duplicate unique_id value(s) detected`)
  return { rows, headers, warnings, malformedJsonCount: warnings.filter(w => w.includes('invalid')).length }
}
