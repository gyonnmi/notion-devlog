import TagList from "components/card/tags/TagList";
import Pagination from "components/common/Pagination";
import { POSTS_PER_PAGE } from "const/const";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAlltags } from "utils/getAllTags";
import { getCachedDatabaseItems } from "utils/getCachedDatabaseItems";
import { insertPreviewImage } from "utils/previewImage";
import CardList from "../components/card/CardList";
import PageHead from "../components/common/PageHead";
import HeroSection from "../components/Intro/HeroSection";
import { CardData } from "../types/types";
import { parseDatabaseItems } from "../utils/parseDatabaseItems";

interface HomeProps {
  data: CardData[];
  allTags: CardData["tags"];
}

const Home = ({ data, allTags }: HomeProps) => {
  const { query } = useRouter();
  const currentPage = query.page ? parseInt(query.page.toString()) : 1;

  const [postData, setPostData] = useState(
    data.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)
  );

  useEffect(() => {
    setPostData(
      data.slice(
        POSTS_PER_PAGE * (currentPage - 1),
        POSTS_PER_PAGE * currentPage
      )
    );
  }, [currentPage, data]);

  return (
    <>
      <PageHead />
      <HeroSection />

      <section className="m-4 min-h-[50vh] max-w-5xl mx-auto flex flex-col-reverse md:flex-row gap-8 px-4">
        <aside className="basis-[25%]">
          <div className="p-4 rounded-xl border shadow-md">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-b from-gray-400 to-gray-500 bg-clip-text text-transparent">
              Tags
            </h2>
            <TagList tags={allTags} />
          </div>
        </aside>
        <div className="flex-grow">
          <h3 className="font-bold text-2xl mb-4 bg-gradient-to-b from-gray-400 to-gray-500 bg-clip-text text-transparent">
            Devlog
          </h3>
          <CardList data={postData} />
          <div className="my-4 flex justify-center">
            <Pagination current={currentPage} total={data.length} />
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getCachedDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await insertPreviewImage(parsedData);

  const allTags = getAlltags(parsedData);

  return {
    props: {
      data: dataWithPreview,
      allTags,
    },
    revalidate: 60,
  };
};
