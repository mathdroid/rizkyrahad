import { SimpleGrid, Box, Code, Image, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import Shell from "../layouts/SiteLayout";
import { getMeta, getTable } from "../notion";
// const NOTION_POSTS_ID = "a33808e821de4b97938c01373c0a6026";
// const NOTION_SITE_META_ID = `3e28ec13b74f408f99c2e514918fbce8`;
// export const getAllPosts = async () => {
//   return await fetch(
//     `https://notion-api.mathdro.id/api/table/${NOTION_POSTS_ID}`
//   ).then((res) => res.json());
// };
// export const getMetaData = async () => {
//   const meta = await fetch(
//     `https://notion-api.mathdro.id/api/table/${NOTION_SITE_META_ID}`
//   ).then((res) => res.json());
//   return meta.reduce(
//     (result, item) => ({
//       ...result,
//       [item.key.toLowerCase()]: item[item.type],
//     }),
//     {}
//   );
// };

const postsTableId = `a33808e821de4b97938c01373c0a6026`;
const metaTableId = `3e28ec13b74f408f99c2e514918fbce8`;

export async function getStaticProps() {
  const posts = await getTable(postsTableId);
  const meta = await getMeta();
  return {
    props: {
      posts,
      meta,
    },
  };
}
function PostItem({ post }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link href={post["Slug"]}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        cursor="pointer"
        transition="top 50ms ease-out,left 50ms ease-out"
        backgroundColor="rgba(175,175,175,.1)"
      >
        <Image
          transition="all .2s ease"
          filter={isHovered ? "brightness(40%)" : null}
          src={post["Thumbnail"][0].url}
        />
        <Heading
          opacity={isHovered ? 1 : 0}
          position="absolute"
          margin={0}
          color="#fff"
          textAlign="center"
          padding="1rem"
          fontSize="1rem"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {post["Title"]}
        </Heading>
      </Box>
    </Link>
  );
}
function HomePage({ posts, meta }) {
  return (
    <Shell {...meta}>
      <SimpleGrid columns={meta.columns} spacing={5}>
        {posts.map((post) => (
          <PostItem post={post} />
        ))}
      </SimpleGrid>
    </Shell>
  );
}
export default HomePage;
