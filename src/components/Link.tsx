import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
export const Link = ({ children, href, ...rest }) => (
  <NextLink passHref href={href}>
    <ChakraLink {...rest}>{children}</ChakraLink>
  </NextLink>
);
