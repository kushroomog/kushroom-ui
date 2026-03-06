import { getPosts } from "@/utils/utils";
import { Grid, RevealFx } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
  variant?: "default" | "home";
  stagger?: boolean;
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
  variant = "default",
  stagger = false,
}: PostsProps) {
  let allBlogs = getPosts(["src", "app", "blog", "posts"]);

  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  const sortedBlogs = allBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range[1] ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedBlogs.map((post, index) => (
            stagger ? (
              <RevealFx key={post.slug} translateY="12" delay={index * 0.1} speed="medium">
                <Post 
                  post={post} 
                  thumbnail={thumbnail} 
                  direction={direction} 
                  variant={variant}
                />
              </RevealFx>
            ) : (
              <Post 
                key={post.slug} 
                post={post} 
                thumbnail={thumbnail} 
                direction={direction} 
                variant={variant}
              />
            )
          ))}
        </Grid>
      )}
    </>
  );
}
