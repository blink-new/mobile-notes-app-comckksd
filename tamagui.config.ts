
import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config'
import { InterFont } from '@tamagui/font-inter'

// Define accent theme directly, not inheriting from undefined keys
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
})

export type AppConfig = typeof config
export { config }
export default config