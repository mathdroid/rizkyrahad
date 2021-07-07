import { NotionRenderer } from "react-notion-x";
import SiteLayout from "../layouts/SiteLayout";

import { getMeta, getPosts } from "../notion";
import { NotionAPI } from "notion-client";
import React from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

export async function getStaticProps() {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(`e18faca2ded744e59bc17c8b2f0b915d`);
  const meta = await getMeta();
  return {
    props: {
      meta,
      recordMap,
    },
    revalidate: 60
  };
}

const About = ({ meta, recordMap }) => {
  return (
    <>
      <Head>
        <title>Rizky Rahad - About</title>
      </Head>
      <SiteLayout {...meta}>
        <Box p="4rem" textAlign="left">
          <NotionRenderer recordMap={recordMap} />
        </Box>
      </SiteLayout>
    </>
  );
};
export default About;
