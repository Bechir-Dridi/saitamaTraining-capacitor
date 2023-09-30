import { CapacitorConfig } from '@capacitor/cli';
import { CapacitorHttp } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.example.saiapp',
  appName: 'Saitama Training',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
