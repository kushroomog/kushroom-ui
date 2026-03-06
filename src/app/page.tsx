import React from "react";
import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  Flex,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Hero } from "@/components/Hero";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const allProjects = getPosts(["src", "app", "projetos", "projects"]);

  return (
    <Column maxWidth="m" gap="64" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <RevealFx translateY="16" speed="slow" fillWidth>
        <Column fillWidth gap="m">
          <Hero />
        </Column>
      </RevealFx>
      
      <Column fillWidth gap="32" paddingX="l">
        <RevealFx translateY="16" speed="medium">
          <Heading as="h2" variant="display-strong-s">
            Últimos Lançamentos
          </Heading>
        </RevealFx>
        <RevealFx delay={0.2} translateY="12" speed="medium" fillWidth>
          <Projects posts={allProjects} range={[1, 6]} display="row" />
        </RevealFx>
      </Column>

      {routes["/blog"] && (
        <Column fillWidth gap="32" marginBottom="l">
          <Row fillWidth gap="24" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <RevealFx translateY="16" speed="medium">
                <Heading as="h2" variant="display-strong-s" wrap="balance">
                  Editoriais
                </Heading>
              </RevealFx>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts range={[1, 4]} columns="2" direction="column" variant="home" stagger />
            </Row>
          </Row>
        </Column>
      )}

      <RevealFx delay={0.2} translateY="8" fillWidth>
        <Mailchimp marginBottom="l" />
      </RevealFx>
    </Column>
  );
}
