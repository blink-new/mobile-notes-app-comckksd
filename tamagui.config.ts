
import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config'
import { InterFont } from '@tamagui/font-inter'

// Patch: Ensure Button theme and fontSize tokens are present for $4
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
    // Patch: Add a button theme with $4 fontSize
    button: {
      ...((defaultConfig.theme && defaultConfig.theme.button) || {}),
      color: '#fff',
      background: '#7c5cff',
      fontSize: '$4',
      borderRadius: 12,
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
    4: defaultConfig.fontSize?.[4] ?? 18,
    3: defaultConfig.fontSize?.[3] ?? 16,
    2: defaultConfig.fontSize?.[2] ?? 14,
    1: defaultConfig.fontSize?.[1] ?? 12,
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

export default config
export type Conf = typeof config