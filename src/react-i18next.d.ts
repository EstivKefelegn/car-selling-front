import 'react-i18next';

interface CustomTypeOptions {
  resources: {
    welcome: string;
    description: string;
  };
}

declare module 'react-i18next' {
  interface Resources extends CustomTypeOptions['resources'] {}
}
