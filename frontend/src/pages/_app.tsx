// pages/_app.tsx
import { AppProps } from 'next/app';
import '@urbannerd/style/style.css'
import { AuthProvider } from '@urbannerd/provider/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
