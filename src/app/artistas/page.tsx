import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            top="64"
            fitHeight
            s={{ position: "relative", style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
              >
                <Icon
                  paddingLeft="12"
                  name="calendar"
                  onBackground="brand-weak"
                />
                <Row paddingX="8">Agende conosco</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    ),
                )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column
              textVariant="body-default-l"
              fillWidth
              gap="m"
              marginBottom="xl"
            >
              {about.intro.description}
            </Column>
          )}

          <Column fillWidth paddingY="l" gap="l">
            {/* Page title */}
            <Heading as="h1" variant="display-strong-s" marginBottom="m">
              Artistas
            </Heading>

            {/* Artist experiences */}
            <Column fillWidth gap="l">
              {about.work.experiences.map((exp, idx) => (
                <Column key={idx} fillWidth gap="4">
                  {/* Company name + Instagram beside it + timeframe */}
                  <Row
                    fillWidth
                    horizontal="between"
                    vertical="center"
                    marginBottom="4"
                  >
                    <Row vertical="center" gap="8">
                      <Text variant="heading-strong-l">{exp.company}</Text>
                      {exp.instagram && (
                        <a
                          href={`https://instagram.com/${exp.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            textDecoration: "none",
                          }}
                        >
                          <Icon name="instagram" size="s" />
                          <Text variant="body-default-s">@{exp.instagram}</Text>
                        </a>
                      )}
                    </Row>
                    <Text
                      variant="heading-default-xs"
                      onBackground="neutral-weak"
                    >
                      {exp.timeframe}
                    </Text>
                  </Row>

                  {/* Role */}
                  <Text
                    variant="body-default-s"
                    onBackground="brand-weak"
                    marginBottom="m"
                  >
                    {exp.role}
                  </Text>

                  {/* Achievements list with profile pic beside */}
                  <Row fillWidth gap="l" vertical="start" s={{ direction: "column", horizontal: "center" }}>
                    <Avatar
                      src={exp.image ?? person.avatar}
                      size="xl"
                      style={{
                        width: 200,
                        height: 200,
                        flexShrink: 0,
                      }}
                    />{" "}
                    <Column as="ul" gap="16" flex={1}>
                      {exp.achievements.map((ach, i2) => (
                        <Text as="li" variant="body-default-m" key={i2}>
                          {ach}
                        </Text>
                      ))}
                    </Column>
                  </Row>
                </Column>
              ))}
            </Column>
          </Column>
        </Column>
      </Row>
    </Column>
  );
}
