import { getPosts } from "@/utils/utils";
import { Column, Grid, Media, Text, SmartLink, Flex } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  display?: "list" | "grid";
}

export function Projects({ range, exclude, display = "list" }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "projetos", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  if (display === "grid") {
    return (
      <Grid columns={2} s={{ columns: 1 }} fillWidth gap="m" marginBottom="40" paddingX="l">
        {displayedProjects.map((post) => (
          <SmartLink
            key={post.slug}
            href={`/projetos/${post.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <Column fillWidth gap="s">
              <Media
                src={post.metadata.images[0] || post.metadata.image || ""}
                alt={post.metadata.title}
                aspectRatio="16 / 9"
                radius="m"
                border="neutral-alpha-weak"
              />
              <Column paddingX="xs" gap="4">
                <Text variant="heading-strong-m">{post.metadata.title}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {post.metadata.summary}
                </Text>
              </Column>
            </Column>
          </SmartLink>
        ))}
      </Grid>
    );
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/projetos/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={
            post.metadata.team?.map((member) => ({ src: member.avatar })) || []
          }
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
