import CardList from "components/card/CardList";
import TagList from "components/card/tags/TagList";
import LoadingSpiner from "components/common/LoadingSpiner";
import PageHead from "components/common/PageHead";
import HeroSection from "components/Intro/HeroSection";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { CardData } from "types/types";
import { getAlltags } from "utils/getAllTags";
import { getCachedDatabaseItems } from "utils/getCachedDatabaseItems";
import { parseDatabaseItems } from "utils/parseDatabaseItems";
import { insertPreviewImage } from "utils/previewImage";

interface TagNameProps {
  data: CardData[];
  allTags: CardData["tags"];
  tagName: string;
}

const TagNamePage = ({ data, allTags, tagName }: TagNameProps) => {
  const { isFallback } = useRouter();

  if (isFallback)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingSpiner />
      </div>
    );

  return (
    <>
      <PageHead title={`${tagName} 검색 결과`} />
      <HeroSection
        title={`# ${tagName}`}
        description={`${data?.length}개의 검색 결과가 있습니다.`}
      />

      <section className="m-4 min-h-[50vh] max-w-5xl mx-auto flex flex-col-reverse md:flex-row gap-8 px-4">
        <aside className="basis-[25%]">
          <div className="p-4 rounded-xl border shadow-md">
            <h2 className="text-2xl font-bold mb-4">Tags</h2>
            <TagList tags={allTags} />
          </div>
        </aside>
        <div className="flex-grow">
          <h3 className="font-bold text-4xl mb-4 bg-gradient-to-b from-purple-300 to-purple-400 bg-clip-text text-transparent">{`#${tagName}`}</h3>
          <CardList data={data} />
        </div>
      </section>
    </>
  );
};

export default TagNamePage;

export const getStaticProps: GetStaticProps<TagNameProps> = async ({
  params,
}) => {
  const databaseId = process.env.DATABASE_ID;
  const tagName = params?.tagName?.toString().toUpperCase();

  if (!databaseId) throw new Error("DATABASE_ID is not defined");
  if (!tagName) throw new Error("tagName is not defined");

  const databaseItems = await getCachedDatabaseItems(databaseId, { tagName });

  const parsedData = parseDatabaseItems(databaseItems);
  const dataWithPreview = await insertPreviewImage(parsedData);

  const allTags = getAlltags(parsedData);

  return {
    props: {
      data: dataWithPreview,
      allTags,
      tagName,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getCachedDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  const allTags = getAlltags(parsedData);

  const paths = allTags.map(({ name: tagName }) => ({
    params: {
      tagName: tagName.toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};
