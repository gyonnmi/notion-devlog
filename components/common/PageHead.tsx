import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const DEFAULT_TITLE = `Rizy's devlog ٩(๑′∀ ‵๑)۶•*¨*•.¸¸♪`;
const DEFAULT_DESCRIPTION = "풀스택 개발자를 목표로 공부하고 있습니다🐣";
const DEFAULT_OG_IMAGE_SRC = "/api/og";

interface PageHeadProps {
  title?: string;
  description?: string;
  ogImageSrc?: string;
  ogImageTitle?: string;
}

const PageHead = ({
  title,
  description,
  ogImageSrc,
  ogImageTitle,
}: PageHeadProps) => {
  const { asPath } = useRouter();

  const siteUrl = process.env.SITE_URL ?? "https://notion-devlog.vercel.app/";

  const fullUrl = `${siteUrl}${asPath}`;
  const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const fullOgImageSrc =
    ogImageSrc ??
    `${siteUrl}${DEFAULT_OG_IMAGE_SRC}${
      ogImageTitle ? `?title=${ogImageTitle}` : ""
    }`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description ?? DEFAULT_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={fullUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title ?? DEFAULT_TITLE} />
        <meta
          property="og:description"
          content={description ?? DEFAULT_DESCRIPTION}
        />
        <meta property="og:site_name" content={title ?? DEFAULT_TITLE} />
        <meta property="og:image" content={fullOgImageSrc} />
        <meta property="og:image:alt" content={title ?? DEFAULT_TITLE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={fullUrl} />
      </Head>
    </>
  );
};

export default PageHead;
