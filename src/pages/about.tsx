import { NotionRenderer } from "react-notion-x";
import SiteLayout from "../layouts/SiteLayout";

import { getMeta, getPosts } from "../notion";
import { NotionAPI } from "notion-client";
import React from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

export async function getStaticProps() {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(`e18faca2ded744e59bc17c8b2f0b915d`);
  const meta = await getMeta();
  return {
    props: {
      meta,
      recordMap,
    },
    revalidate: 60,
  };
}

const About = ({ meta, recordMap }) => {
  return (
    <>
      <NextSeo
        title="Rizky Rahad - About"
        description="RIZKY RAHAD is an independent director, producer, and fixer based in Jakarta, Indonesia."
        openGraph={{
          url: "https://rizkyrahad.com/about",
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
      <SiteLayout {...meta}>
        <Box p="4rem">
          <NotionRenderer recordMap={recordMap} />
        </Box>
      </SiteLayout>
    </>
  );
};
export default About;
