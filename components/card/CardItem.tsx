import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CardData } from "types/types";
import IconRenderer from "./IconRenderer";

interface CardItemProps {
  data: CardData;
}

const CardItem = ({ data }: CardItemProps) => {
  const { id, cover, title, description, published, icon, tags } = data;

  return (
    <li>
      <article>
        <Link href={`/blog/${id}`}>
          <a>
            <div className="relative pt-[64%] rounded-lg overflow-hidden mb-4">
              <Image src={cover} alt={title} layout="fill" objectFit="cover" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">
                <IconRenderer icon={icon} />
                {title}
              </h2>
              {description ? (
                <p className="text-gray-700">{description}</p>
              ) : null}
              <time className="text-gray-500 font-light">{published}</time>
            </div>
          </a>
        </Link>
        <div>tags</div>
      </article>
    </li>
  );
};

export default CardItem;
