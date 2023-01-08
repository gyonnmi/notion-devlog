import Giscus from "@giscus/react";
import { getPageContent } from "cms/notion";
import LoadingSpiner from "components/common/LoadingSpiner";
import NotionPageRenderer from "components/notion/NotionPageRenderer";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ExtendedRecordMap } from "notion-types";
import React from "react";
import { getCachedDatabaseItems } from "utils/getCachedDatabaseItems";
import { insertPreviewImageToRecordMap } from "utils/previewImage";

interface BlogDetailPageProps {
  recordMap: ExtendedRecordMap;
}

const BlogDetailPage = ({ recordMap }: BlogDetailPageProps) => {
  const { isFallback } = useRouter();

  if (isFallback)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <LoadingSpiner />
      </div>
    );

  return (
    <section>
      <NotionPageRenderer recordMap={recordMap} />
      <div className="max-w-4xl mx-auto my-8">
        <Giscus
          id="comments"
          term="blog"
          repo="gyonnmi/notion-devlog"
          repoId="R_kgDOIp4nGQ"
          category="General"
          categoryId="DIC_kwDOIp4nGc4CTeC-"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="ko"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default BlogDetailPage;

export const getStaticProps: GetStaticProps<BlogDetailPageProps> = async ({
  params,
}) => {
  const pageId = params?.pageId;

  if (!pageId) throw new Error("pageId is not defined");

  const recordMap = await getPageContent(pageId.toString());

  const preview_images = await insertPreviewImageToRecordMap(recordMap);

  return {
    props: {
      recordMap: { ...recordMap, preview_images },
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error("DATABASE_ID is not defind");

  const databaseItems = await getCachedDatabaseItems(databaseId);

  const paths = databaseItems.map(({ id: pageId }) => {
    return {
      params: {
        pageId,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};
