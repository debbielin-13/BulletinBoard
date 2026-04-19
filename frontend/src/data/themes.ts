import type { ThemeKey, ThemeConfig } from '../types'

export const themeMap: Record<ThemeKey, ThemeConfig> = {
  office: {
    className: 'theme-office',
    title: '📋 辦公室佈告欄',
  },
  classroom: {
    className: 'theme-classroom',
    title: '🧑‍🏫 教室佈告欄',
  },
  fridge: {
    className: 'theme-fridge',
    title: '🧊 冰箱佈告欄',
  },
}
