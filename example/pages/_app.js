import { CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
