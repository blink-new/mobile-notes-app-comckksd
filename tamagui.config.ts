
import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config'
import { InterFont } from '@tamagui/font-inter'

// Ensure required theme keys (fontSize, space, etc.) are present
const config = createTamagui({
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    accent: {
      color: '#fff',
      background: '#7c5cff',
      borderColor: '#7c5cff',
      shadowColor: '#7c5cff',
    },
  },
  fonts: {
    ...defaultConfig.fonts,
    heading: InterFont,
    body: InterFont,
  },
  shorthands: {
    ...defaultConfig.shorthands,
  },
  fontSize: {
    ...defaultConfig.fontSize,
    // Add required font size variables if missing
    4: defaultConfig.fontSize?.[4] ?? 16,
    3: defaultConfig.fontSize?.[3] ?? 14,
    2: defaultConfig.fontSize?.[2] ?? 12,
    1: defaultConfig.fontSize?.[1] ?? 10,
  },
  space: {
    ...defaultConfig.space,
    4: defaultConfig.space?.[4] ?? 16,
    3: defaultConfig.space?.[3] ?? 12,
    2: defaultConfig.space?.[2] ?? 8,
    1: defaultConfig.space?.[1] ?? 4,
    10: defaultConfig.space?.[10] ?? 40,
    8: defaultConfig.space?.[8] ?? 32,
  },
})

export type AppConfig = typeof config
export { config }
export default config