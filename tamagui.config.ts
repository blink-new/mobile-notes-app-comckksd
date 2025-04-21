
import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config'
import { InterFont } from '@tamagui/font-inter'

// Ensure all required tokens and theme keys are present
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
    1: defaultConfig.fontSize?.[1] ?? 12,
    2: defaultConfig.fontSize?.[2] ?? 14,
    3: defaultConfig.fontSize?.[3] ?? 16,
    4: defaultConfig.fontSize?.[4] ?? 18,
    5: defaultConfig.fontSize?.[5] ?? 20,
    6: defaultConfig.fontSize?.[6] ?? 24,
    7: defaultConfig.fontSize?.[7] ?? 32,
    8: defaultConfig.fontSize?.[8] ?? 40,
    9: defaultConfig.fontSize?.[9] ?? 48,
    10: defaultConfig.fontSize?.[10] ?? 56,
  },
  space: {
    ...defaultConfig.space,
    1: defaultConfig.space?.[1] ?? 4,
    2: defaultConfig.space?.[2] ?? 8,
    3: defaultConfig.space?.[3] ?? 12,
    4: defaultConfig.space?.[4] ?? 16,
    5: defaultConfig.space?.[5] ?? 20,
    6: defaultConfig.space?.[6] ?? 24,
    7: defaultConfig.space?.[7] ?? 32,
    8: defaultConfig.space?.[8] ?? 40,
    9: defaultConfig.space?.[9] ?? 48,
    10: defaultConfig.space?.[10] ?? 56,
  },
})

export default config
export type Conf = typeof config