import Head from "next/head";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// core styles shared by all of react-notion-x (required)
import "../styles/notion.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";

// used for collection views (optional)
import "rc-dropdown/assets/index.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import { Fonts } from "../styles/font-face";
const theme = extendTheme({
  fonts: {
    heading: "Inconsolata",
    body: `"Courier New", Courier, monospace
    `,
  },
  styles: {
    global: {
      "html, body": {
        fontSize: "sm",
      },
      body: {
        minHeight: "100vh",
      },
      p: {
        mb: "13px",
      },
      ".notion-link": {
        textDecor: "underline",
      },
    },
  },
});
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
export default MyApp;
