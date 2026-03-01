import { NextResponse } from "next/server";
import { getPosts } from "@/utils/utils";
import { baseURL, blog } from "@/resources";

export async function GET() {
  const allPosts = getPosts(["src", "app", "blog", "posts"]);

  const sortedPosts = allPosts.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const rssItems = sortedPosts
    .map((post) => {
      const url = `${baseURL}/blog/${post.slug}`;
      return `
    <item>
      <title><![CDATA[${post.metadata.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.metadata.summary}]]></description>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${blog.title}</title>
    <link>${baseURL}/blog</link>
    <description>${blog.description}</description>
    <atom:link href="${baseURL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <language>pt-br</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
