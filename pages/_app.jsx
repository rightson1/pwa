import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCashe';
import AdminNav from '../components/AdminNav';
import AdminSide from '../components/AdminSide';
import '../styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import { ThemeProvider } from '../context/themeContext';
import { AnimatePresence } from 'framer-motion';
import VoterSide from '../components/VoterSide';
import Protected from "../components/Protected";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from 'react-hot-toast';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  if (Component.getLayout) {
    if (Component.voter) {
      return Component.getLayout(
        <QueryClientProvider client={queryClient}>
          <div>
            <CacheProvider value={emotionCache}>
              <ThemeProvider>
                <CssBaseline />
                <Protected>
                  <AnimatePresence>
                    <div className='app'>
                      <VoterSide />
                      <main className="content" style={{
                        width: "100%",
                      }}>
                        <AdminNav />
                        <Component {...pageProps} />
                      </main>


                    </div>;
                  </AnimatePresence>
                </Protected>

              </ThemeProvider>
            </CacheProvider>
          </div>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>

      )
    }
    else if (Component.admin) {
      return (
        <QueryClientProvider client={queryClient}>
          <div>
            <CacheProvider value={emotionCache}>
              <ThemeProvider>
                <CssBaseline />
                <Protected>
                  <AnimatePresence>
                    <div className='app'>
                      <AdminSide />
                      <main className="content" style={{
                        width: "100%",
                      }}>
                        <AdminNav />
                        <Toaster />
                        <Component {...pageProps} />
                      </main>


                    </div>;
                  </AnimatePresence>
                </Protected>

              </ThemeProvider>
            </CacheProvider>
          </div>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      );
    }

    else {
      return (
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider>
              <CssBaseline />

              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </QueryClientProvider>
      )
    }
  }
  else {
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>

  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};