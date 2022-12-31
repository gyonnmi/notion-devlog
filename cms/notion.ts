import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

export const propertyTable = {
  Public: "Public",
  Published: "Published",
};

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabaseItems = async (databaseId: string) => {
  const databaseItems = await notion.databases.query({
    database_id: databaseId,
    // Public 속성이 true인 페이지만 가져오기
    filter: {
      property: "Public",
      checkbox: {
        equals: true,
      },
    },
    // Published 속성을 기준으로 내림차순 정렬
    sorts: [
      {
        property: propertyTable.Published,
        direction: "descending",
      },
    ],
  });

  return databaseItems.results;
};

export const getPageItem = async (pageId: string) => {
  const pageItem = await notion.pages.retrieve({
    page_id: pageId,
  });

  return pageItem;
};

export const reactNotionApi = new NotionAPI();

export const getPageContent = async (pageId: string) => {
  const recordMap = await reactNotionApi.getPage(pageId);

  return recordMap;
};
