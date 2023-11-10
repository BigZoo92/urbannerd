import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'urbarnnerd.app',
  appName: 'urbannerd',
  bundledWebRuntime: false,
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
};

export default config;
