import { useRouter } from "next/router";
import { NotionRenderer } from "react-notion-x";
import SiteLayout from "../layouts/SiteLayout";
import { Image, Stack, Text, Heading } from "@chakra-ui/react";
import { Link } from "../components/Link";
import { getMeta, getPosts, getTable } from "../notion";
import { NotionAPI } from "notion-client";
import { getSSRTable } from "../notion/ssr";

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
  return (
    <>
      <SiteLayout {...meta}>
        <Stack>
          <Image src={post.thumbnail[0].url} />
          <Heading>{post.title}</Heading>
          <NotionRenderer recordMap={recordMap} />

          <Text fontWeight="bold">{post.roles.join("//")}</Text>
          <Link href="/">Show thumbnails</Link>
        </Stack>
      </SiteLayout>
    </>
  );
};
export default Post;
