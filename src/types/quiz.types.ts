export interface QuizForm {
  title: string
  url: string
  description: string
  questions_answers: QuestionForm[]
}

export interface QuestionForm {
  feedback_false: string
  feedback_true: string
  text: string
}