"use client";

import React, { useState } from "react";
import { Column, Grid, Media, Text, SmartLink, Flex, Button } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  posts: any[];
  range?: [number, number?];
  exclude?: string[];
  display?: "list" | "grid" | "row";
}

export function Projects({ posts, range, exclude, display = "list" }: ProjectsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  let allProjects = [...posts];

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

  if (display === "row") {
    const marqueeProjects = [...displayedProjects, ...displayedProjects];

    return (
      <Column 
        fillWidth 
        position="relative" 
        style={{ overflow: 'hidden' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container {
            display: flex;
            width: fit-content;
            animation: marquee 30s linear infinite;
            gap: 32px;
            padding: 24px 0;
          }
          .marquee-paused {
            animation-play-state: paused;
          }
        `}} />
        
        <div className={`marquee-container ${isPaused ? 'marquee-paused' : ''}`}>
          {marqueeProjects.map((post, index) => {
            const rotation = index % 2 === 0 ? "3deg" : "-3deg";
            return (
              <div key={`${post.slug}-${index}`} style={{ flexShrink: 0 }}>
                <SmartLink
                  href={`/projetos/${post.slug}`}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    transform: `rotate(${rotation})`,
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    width: "180px",
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "rotate(0deg) scale(1.1)";
                    e.currentTarget.style.zIndex = "10";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${rotation})`;
                    e.currentTarget.style.zIndex = "1";
                  }}
                >
                  <Media
                    src={post.metadata.images[0] || post.metadata.image || ""}
                    alt={post.metadata.title}
                    aspectRatio="1 / 1"
                    radius="m"
                    border="neutral-alpha-weak"
                    style={{ pointerEvents: 'none', boxShadow: "var(--shadow-l)" }}
                  />
                </SmartLink>
              </div>
            );
          })}
        </div>
      </Column>
    );
  }

  if (display === "grid") {
    return (
      <Grid columns={2} s={{ columns: 1 }} fillWidth gap="24" marginBottom="40" paddingX="l">
        {displayedProjects.map((post, index) => (
          <SmartLink
            key={post.slug}
            href={`/projetos/${post.slug}`}
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Column 
              fillWidth 
              gap="0" 
              radius="l"
              style={{
                background: '#0d0d0d',
                border: '1px solid #222',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredIndex === index ? 'scale(1.03)' : 'scale(1)',
                borderColor: hoveredIndex === index ? 'var(--brand-alpha-medium)' : '#222',
                boxShadow: hoveredIndex === index ? '0 0 30px var(--brand-alpha-weak)' : 'none'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                <Media
                  src={post.metadata.images[0] || post.metadata.image || ""}
                  alt={post.metadata.title}
                  fill
                  radius="none"
                  border={false}
                  style={{ 
                    objectFit: "cover",
                    height: '100%',
                    width: '100%',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  zIndex: 2
                }}>
                  <Button
                    variant="secondary"
                    size="s"
                    suffixIcon="arrowRight"
                    style={{ pointerEvents: 'none' }}
                  >
                    Ver Projeto
                  </Button>
                </div>
              </div>
              <Column padding="24" gap="8">
                <Text variant="heading-strong-l" style={{ color: '#fff' }}>{post.metadata.title}</Text>
                <Text 
                  variant="body-default-s" 
                  onBackground="neutral-weak"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.5'
                  }}
                >
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
            post.metadata.team?.map((member: any) => ({ src: member.avatar })) || []
          }
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
