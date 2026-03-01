import React from "react";
import Link from "next/link";
import { Flex, Heading, Avatar } from "@once-ui-system/core";
import { about } from "@/resources";

export function TeamSection() {
  return (
    <Flex fillWidth gap="24" s={{ direction: "column" }}>
      <Flex flex={1} paddingLeft="l" paddingTop="24" horizontal="end">
        <Heading as="h2" variant="display-strong-xs" wrap="balance">
          Equipe
        </Heading>
      </Flex>
      {/* Avatares lado a lado */}
      <Flex flex={8} wrap>
        {about.work.experiences.map((member) => (
          <Link key={member.company} href="/artistas" passHref>
            <Avatar
              src={member.image}
              style={{ cursor: "pointer" }}
            />
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
