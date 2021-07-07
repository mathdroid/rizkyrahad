import Head from "next/head";
import { NextSeo } from "next-seo";
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
      <NextSeo
        title="Rizky Rahad"
        description="RIZKY RAHAD is an independent director, producer, and fixer based in Jakarta, Indonesia."
        openGraph={{
          url: "https://rizkyrahad.com",
          title: "Rizky Rahad",
          description:
            "RIZKY RAHAD is an independent director, producer, and fixer based in Jakarta, Indonesia.",
          images: [
            {
              url: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa9cf6cc1-3e32-4e9e-9ae8-1adaa6dabc3f%2Frizkyrahad.jpeg?table=block&id=f7c57f7e-69f2-4865-9c59-4955d94abcb8&cache=v2",
              width: 800,
              height: 600,
              alt: "Rizky Rahad",
            },
          ],
          site_name: "Rizky Rahad",
        }}
        twitter={{
          handle: "@rich_rahad",
          site: "@rich_rahad",
          cardType: "summary_large_image",
        }}
      />
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
export default MyApp;
