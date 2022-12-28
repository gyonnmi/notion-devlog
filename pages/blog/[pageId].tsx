import { getDatabaseItems, getPageContent } from "cms/notion";
import { GetStaticPaths, GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";
import React from "react";

interface BlogDetailPageProps {
  recordMap: ExtendedRecordMap;
}

const BlogDetailPage = ({ recordMap }: BlogDetailPageProps) => {
  console.log("recordMap", recordMap);
  return <div>BlogDetailPage</div>;
};

export default BlogDetailPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageId = params?.pageId;

  if (!pageId) throw new Error("pageId is not defined");

  const recordMap = await getPageContent(pageId.toString());

  return {
    props: {
      recordMap,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error("DATABASE_ID is not defind");

  const databaseItems = await getDatabaseItems(databaseId);

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
