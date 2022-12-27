import { CardData } from "types/types";

export const getAlltags = (
  data: CardData[] //CardData에서 data 가져오기
) =>
  // CardData의 data에서 tags만 가져오기
  data.reduce<CardData["tags"]>((acc, { tags }) => {
    // tags의 tag들을 하나하나 가져오기
    tags.forEach((tag) => {
      // id값을 하나하나 비교해서 배열 안에 들어있나 확인(유니크값 id로 비교)
      if (!acc.find((item) => item.id === tag.id)) {
        // 배열 안에 없으면 push
        acc.push(tag);
      }
    });

    return acc;
  }, []);
