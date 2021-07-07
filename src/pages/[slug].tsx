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
import Head from "next/head";
import { NextSeo } from "next-seo";

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
    revalidate: 60,
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
      <NextSeo
        title={`Rizky Rahad - ${post.title}`}
        description="RIZKY RAHAD is an independent director, producer, and fixer based in Jakarta, Indonesia."
        openGraph={{
          url: "https://rizkyrahad.com/" + post.slug,
          title: `Rizky Rahad - ${post.title}`,
          images: [
            {
              url: post.thumbnail[0].url,
              width: 800,
              height: 600,
              alt: `Rizky Rahad - ${post.title}`,
            },
          ],
          site_name: `Rizky Rahad - ${post.title}`,
        }}
        twitter={{
          handle: "@rich_rahad",
          site: "@rich_rahad",
          cardType: "summary_large_image",
        }}
      />
      <SiteLayout {...meta}>
        <Box pt="4rem" px="4rem" pb={["16rem", "8rem", "4rem"]} width="100%">
          <Box
            position="relative"
            paddingTop="56.25%"
            width="100%"
            minWidth="300px"
          >
            {post.youtube ? (
              <iframe
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                width="100%"
                height="100%"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
              />
            ) : (
              <Image src={post.thumbnail[0].url} />
            )}
          </Box>
        </Box>

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
