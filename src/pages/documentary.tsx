import { SimpleGrid, Box, Image, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import Shell from "../layouts/SiteLayout";
import { getMeta, getPosts } from "../notion";

export async function getStaticProps() {
  const posts = (await getPosts()).filter(
    (post) => post["Type"] === "Documentary"
  );
  const meta = await getMeta();
  return {
    props: {
      posts,
      meta,
    },
    revalidate: 60
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
        background="white"
      >
        <Image
          transition="all .2s ease"
          filter={isHovered ? "brightness(40%)" : null}
          src={post["Thumbnail"][0].url}
          objectFit="cover"
        />
        <Heading
          maxW="300px"
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
      <SimpleGrid p="4rem"  columns={meta.columns} spacing={5} minChildWidth="300px">
        {posts.map((post) => (
          <PostItem post={post} />
        ))}
      </SimpleGrid>
    </Shell>
  );
}
export default HomePage;
