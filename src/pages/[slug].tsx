import { useRouter } from "next/router";
import { NotionRenderer } from "react-notion-x";
import SiteLayout from "../layouts/SiteLayout";
import {
  Image,
  Stack,
  Text,
  Heading,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { Link } from "../components/Link";
import { getMeta, getPosts, getTable } from "../notion";
import { NotionAPI } from "notion-client";
import { getSSRTable } from "../notion/ssr";
import React from "react";

const parseYoutubeURL = (youtubeURL: string) => {
  const [_base, params] = youtubeURL.split("watch?");
  const embedId = params
    .split("&")
    .find((p) => p.startsWith("v="))
    .slice(2);
  return embedId;
};

export async function getStaticProps({ params: { slug } }) {
  const notion = new NotionAPI();

  const posts: any[] = (await getPosts()).map((obj) =>
    Object.entries(obj).reduce(
      (acc, [currentKey, currentValue]) => ({
        ...acc,
        [currentKey.toLowerCase()]: currentValue,
      }),
      {}
    )
  );
  const post = posts.find((post) => post.slug === slug);
  const recordMap = await notion.getPage(post.id);
  const meta = await getMeta();
  return {
    props: {
      post,
      meta,
      recordMap,
    },
  };
}

export async function getStaticPaths() {
  const posts: any[] = (await getPosts()).map((obj) =>
    Object.entries(obj).reduce(
      (acc, [currentKey, currentValue]) => ({
        ...acc,
        [currentKey.toLowerCase()]: currentValue,
      }),
      {}
    )
  );
  console.log(posts);
  return { paths: posts.map((p) => `/${p.slug}`), fallback: false };
}
const Post = ({ post, meta, recordMap }) => {
  const router = useRouter();
  const { slug } = router.query;
  const embedId = post.youtube && parseYoutubeURL(post.youtube);
  return (
    <>
      <SiteLayout {...meta}>
        {post.youtube ? (
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        ) : (
          <Image src={post.thumbnail[0].url} />
        )}

        <Box
          position={"absolute"}
          bottom={0}
          right={0}
          maxWidth={"60ch"}
          background="white"
          padding="1rem 2rem"
        >
          <Accordion allowToggle defaultIndex={[0]}>
            <AccordionItem border="none">
              <AccordionButton justifyContent="space-between" width="100%">
                <Heading textAlign="left" fontSize="1rem">
                  {post.title}
                </Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <NotionRenderer recordMap={recordMap} />

                <Text my="1rem" fontWeight="bold">
                  {post.roles.join("//")}
                </Text>
                <Link textDecoration="underline" href="/">
                  Show thumbnails
                </Link>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </SiteLayout>
    </>
  );
};
export default Post;
