import { Flex, Heading, Icon, Stack, Text, Image } from "@chakra-ui/react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "../components/Link";
export default ({
  children,
  title,
  subtitle,
  instagram,
  linkedin,
  twitter,
  email,
  logo,
  iconsize,
}) => (
  <Flex boxSizing="content-box" width="100vw" flexWrap="wrap">
    <Stack
      spacing="2rem"
      as="header"
      dir="column"
      flexGrow={1}
      flexBasis="250px"
      p="4rem"
    >
      <Stack>
        <Link href={"/"}>
          <Image src={logo.url} alt={title} title={title} maxWidth="250px" />
        </Link>
        <p>{subtitle}</p>
      </Stack>
      <Stack
        as="nav"
        fontFamily="'Inconsolata'"
        fontWeight="700"
        fontStyle="normal"
        textTransform="uppercase"
        letterSpacing="0em"
        lineHeight="1.6em"
        fontSize="16px"
        padding=".2em"
      >
        <Link href="/documentary">Documentary/</Link>
        <Link href="/narrative">Narrative/</Link>
        <Link href="/about">About/</Link>
      </Stack>
      <Stack direction="row" spacing="1rem">
        <Link href={instagram} _hover={{ opacity: 0.5 }}>
          <Icon as={FaInstagram} w={iconsize} h={iconsize} />
        </Link>
        <Link href={linkedin} _hover={{ opacity: 0.5 }}>
          <Icon as={FaLinkedinIn} w={iconsize} h={iconsize} />
        </Link>
        <Link href={twitter} _hover={{ opacity: 0.5 }}>
          <Icon as={FaTwitter} w={iconsize} h={iconsize} />
        </Link>
        <Link href={`mailto:${email}`} _hover={{ opacity: 0.5 }}>
          <Icon as={FaEnvelope} w={iconsize} h={iconsize} />
        </Link>
      </Stack>
    </Stack>
    <Flex
      as="main"
      dir="column"
      flexGrow={999}
      flexBasis={0}
      minW="50%"
      p="4rem"
    >
      {children}
    </Flex>
  </Flex>
);
