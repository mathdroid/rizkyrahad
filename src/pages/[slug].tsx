import { useRouter } from "next/router";
import { NotionRenderer } from "react-notion-x";
import SiteLayout from "../layouts/SiteLayout";
import { Image, Stack, Text, Heading } from "@chakra-ui/react";
import { Link } from "../components/Link";
import { getMeta, getTable } from "../notion";
import { NotionAPI } from "notion-client";

export const getAllPosts = async () => {
  const postsTableId = `a33808e821de4b97938c01373c0a6026`;
  const posts = await getTable(postsTableId);
  return posts.map((obj) =>
    Object.entries(obj).reduce(
      (acc, [currentKey, currentValue]) => ({
        ...acc,
        [currentKey.toLowerCase()]: currentValue,
      }),
      {}
    )
  );
};

export async function getStaticProps({ params: { slug } }) {
  const notion = new NotionAPI();

  const posts = await getAllPosts();
  console.log(posts);
  const post = posts.find((post) => post.slug === slug);
  const recordMap = await notion.getPage(post.id);
  const blocks = await getTable(post.id);
  const meta = await getMeta();
  return {
    props: {
      post,
      meta,
      blocks,
      recordMap,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return { paths: posts.map((p) => `/${p.slug}`), fallback: false };
}
const Post = ({ post, blocks, meta, recordMap }) => {
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
