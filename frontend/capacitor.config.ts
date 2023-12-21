import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'urbannerd',
  webDir: "public",
  server: {
    url: "http://localhost:3000",
    cleartext: true
  },
};

export default config;
