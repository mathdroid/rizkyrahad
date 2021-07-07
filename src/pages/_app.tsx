import { ChakraProvider, extendTheme } from "@chakra-ui/react";
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
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
