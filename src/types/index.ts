export type ThemeKey = 'office' | 'classroom' | 'fridge'

export interface Post {
  title: string
  message: string
  author: string
  time: string
}

export interface ThemeConfig {
  className: string
  title: string
}
