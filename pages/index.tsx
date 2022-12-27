import TagList from "components/card/tags/TagList";
import type { GetStaticProps } from "next";
import Image from "next/image";
import { getAlltags } from "utils/getAllTags";

import { getDatabaseItems } from "../cms/notion";
import CardList from "../components/card/CardList";
import PageHead from "../components/common/PageHead";
import HeroSection from "../components/Intro/HeroSection";
import styles from "../styles/Home.module.css";
import { CardData } from "../types/types";
import { parseDatabaseItems } from "../utils/parseDatabaseItems";

interface HomeProps {
  data: CardData[];
  allTags: CardData["tags"];
}

const Home = ({ data, allTags }: HomeProps) => {
  console.log("allTags" + allTags);

  return (
    <>
      <PageHead />
      <HeroSection />

      <section className="m-4 min-h-[50vh] max-w-5xl mx-auto flex flex-col-reverse md:flex-row gap-8 px-4">
        <aside className="basis-[25%]">
          <div className="p-4 rounded-xl border shadow-md">
            <h2 className="text-2xl font-bold mb-4">Tags</h2>
            <TagList tags={allTags} />
          </div>
        </aside>
        <div className="flex-grow">
          <h3 className="font-bold text-4xl mb-4">Devlog</h3>
          <CardList data={data} />
        </div>
      </section>
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  const allTags = getAlltags(parsedData);

  return {
    props: {
      data: parsedData,
      allTags,
    },
  };
};
