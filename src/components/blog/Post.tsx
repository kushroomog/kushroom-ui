"use client";

import { Card, Column, Media, Row, Avatar, Text } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";

interface PostProps {
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
  variant?: "default" | "home";
}

export default function Post({ post, thumbnail, direction, variant = "default" }: PostProps) {
  if (variant === "home") {
    return (
      <Card
        fillWidth
        key={post.slug}
        href={`/blog/${post.slug}`}
        transition="micro-medium"
        direction={direction}
        border="neutral-alpha-weak"
        background="neutral-alpha-weak"
        padding="0"
        radius="l"
        gap={direction === "column" ? undefined : "24"}
        s={{ direction: "column" }}
        style={{
          overflow: "hidden",
          border: "1px solid var(--neutral-alpha-weak)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.borderColor = "var(--brand-alpha-medium)";
          e.currentTarget.style.boxShadow = "0 0 30px var(--brand-alpha-weak)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.borderColor = "var(--neutral-alpha-weak)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {post.metadata.image && thumbnail && (
          <Media
            priority
            sizes="(max-width: 768px) 100vw, 640px"
            border={false}
            cursor="interactive"
            radius="none"
            src={post.metadata.image}
            alt={"Thumbnail of " + post.metadata.title}
            aspectRatio="16 / 9"
            style={{
              flexShrink: 0,
              objectFit: "cover",
            }}
          />
        )}
        <Row fillWidth>
          <Column paddingY="24" paddingX="l" gap="16" vertical="center" flex={1}>
            <Row gap="24" vertical="center" fillWidth horizontal="between">
              <Row vertical="center" gap="12">
                <Avatar src={person.avatar} size="s" />
                <Text variant="label-default-s" onBackground="neutral-strong">{person.name}</Text>
              </Row>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {formatDate(post.metadata.publishedAt, false)}
              </Text>
            </Row>
            <Text variant="heading-strong-l" wrap="balance" onBackground="neutral-strong">
              {post.metadata.title}
            </Text>
            {post.metadata.tag && (
              <Text variant="label-strong-s" onBackground="brand-weak" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {post.metadata.tag}
              </Text>
            )}
          </Column>
        </Row>
      </Card>
    );
  }

  return (
    <Card
      fillWidth
      key={post.slug}
      href={`/blog/${post.slug}`}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
    >
      {post.metadata.image && thumbnail && (
        <Media
          priority
          sizes="(max-width: 768px) 100vw, 640px"
          border="neutral-alpha-weak"
          cursor="interactive"
          radius="l"
          src={post.metadata.image}
          alt={"Thumbnail of " + post.metadata.title}
          aspectRatio="16 / 9"
        />
      )}
      <Row fillWidth>
        <Column maxWidth={28} paddingY="24" paddingX="l" gap="20" vertical="center">
          <Row gap="24" vertical="center">
            <Row vertical="center" gap="16">
              <Avatar src={person.avatar} size="s" />
              <Text variant="label-default-s">{person.name}</Text>
            </Row>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt, false)}
            </Text>
          </Row>
          <Text variant="heading-strong-l" wrap="balance">
            {post.metadata.title}
          </Text>
          {post.metadata.tag && (
            <Text variant="label-strong-s" onBackground="neutral-weak">
              {post.metadata.tag}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}
