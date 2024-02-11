export type Tutorial = {
  id: number
  content: TutorialContent 
  autor: string
  date: string
  qualifyQty: string
  qualifySum: string
}

export type TutorialContent = {
  title: string
  description: string
  html: string
  tags: string[]
}