
import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config'
import { InterFont } from '@tamagui/font-inter'

const config = createTamagui({
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    accent: {
      ...defaultConfig.theme.blue,
      color: '#fff',
      background: '#7c5cff',
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
})

export type AppConfig = typeof config
export { config }
export default config