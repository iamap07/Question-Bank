export type RawQuestion = Record<string, unknown> & {
  unique_id?: unknown
  content?: unknown
  solutions?: unknown
  video_urls?: unknown
  bilingual_options?: unknown
  verification_status?: unknown
  category_configuration_id?: unknown
  difficulty?: unknown
  updated_at?: unknown
  Question_Type?: unknown
  Verification_Type?: unknown
  parent_question_id?: unknown
  class_id?: unknown
  subject_id?: unknown
  chapter_id?: unknown
  topic_id?: unknown
  subtopic_id?: unknown
  class?: unknown
  category?: unknown
  subject?: unknown
  chapter?: unknown
  topic?: unknown
  subtopic?: unknown
  boook?: unknown
  qcm_tag?: unknown
  target_exam?: unknown
  target_exam_stages?: unknown
  bilingual_content_count?: unknown
  bilingual_solution_count?: unknown
  text_solution?: unknown
  vid_solution?: unknown
  chapter_present?: unknown
  topic_present?: unknown
  difficulty_present?: unknown
}

export interface NormalizedQuestion {
  id: string
  englishQuestion: string
  hindiQuestion: string
  englishOptions: { label: string; text: string; correct?: boolean }[]
  hindiOptions: { label: string; text: string; correct?: boolean }[]
  englishSolution: string
  hindiSolution: string
  correctAnswer: string
  videoUrls: string[]
  category: string
  subject: string
  chapter: string
  topic: string
  subtopic: string
  className: string
  book: string
  qcmTag: string
  targetExam: string
  targetExamStages: string[]
  questionType: string
  verificationType: string
  difficulty: string
  verificationStatus: string
  bilingualContentCount: number | null
  bilingualSolutionCount: number | null
  parentQuestionId: string
  categoryConfigurationId: string
  updatedAt: string | null
  textSolutionAvailable: boolean
  videoSolutionAvailable: boolean
  bilingualAvailable: boolean
  raw: RawQuestion
  parseWarnings: string[]
}

export interface ImportResult {
  rows: NormalizedQuestion[]
  headers: string[]
  warnings: string[]
  malformedJsonCount: number
}

export interface Filters {
  category: string[]
  subject: string[]
  chapter: string[]
  topic: string[]
  subtopic: string[]
  difficulty: string[]
  verificationStatus: string[]
  verificationType: string[]
  questionType: string[]
  targetExam: string[]
  targetExamStage: string[]
  textSolution: 'all' | 'yes' | 'no'
  videoSolution: 'all' | 'yes' | 'no'
  bilingual: 'all' | 'yes' | 'no'
  updatedFrom: string
  updatedTo: string
}
