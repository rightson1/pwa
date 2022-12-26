import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCashe';
import AdminNav from '../components/AdminNav';
import AdminSide from '../components/AdminSide';
import '../styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import { Box } from '@mui/system';
import { ThemeProvider } from '../context/themeContext';
import { AnimatePresence } from 'framer-motion';
import VoterSide from '../components/VoterSide';
import Protected from "../components/Protected";
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  if (Component.getLayout) {
    if (Component.voter) {
      return Component.getLayout(<div>
        <CacheProvider value={emotionCache}>
          <ThemeProvider>
            <CssBaseline />
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

          </ThemeProvider>
        </CacheProvider>
      </div>)
    } else {
      return Component.getLayout(<CacheProvider value={emotionCache}>
        <ThemeProvider>
          <CssBaseline />

          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>)
    }
  }
  return (
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
                  <Component {...pageProps} />
                </main>


              </div>;
            </AnimatePresence>
          </Protected>

        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};