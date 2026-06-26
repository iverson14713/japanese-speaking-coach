import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.wayne.travelcoach',
  appName: '旅行口說教練',
  webDir: 'dist',
  ios: {
    contentInset: 'automatic',
    // Native mic prompt copy lives in ios/App/App/Info.plist (NSMicrophoneUsageDescription).
  },
}

export default config
