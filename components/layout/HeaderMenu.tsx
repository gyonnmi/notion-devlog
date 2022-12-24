import Image from "next/image";
import React from "react";
import Rizy from "../../public/Rizy.png";
import {
  AiOutlineHome,
  AiOutlineTags,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import Link from "next/link";

const NavTable = {
  "/": {
    name: "Home",
    icon: <AiOutlineHome />,
  },
  "/tags": {
    name: "Tags",
    icon: <AiOutlineTags />,
  },
  "/search": {
    name: "Search",
    icon: <AiOutlineSearch />,
  },
  "/profile": {
    name: "Profile",
    icon: <AiOutlineUser />,
  },
};

const HeaderMenu = () => {
  return (
    <aside className="z-50 bg-white fixed top-0 left-0 bottom-0 w-3/5 max-w-sm border-r">
      <div className="py-8 flex flex-col h-full">
        <div className="relative w-full h-1/3">
          <Image
            src={Rizy}
            alt="Profile Image"
            objectFit="contain"
            layout="fill"
          />
        </div>
        <h1 className="text-center font-bold text-xl">
          <Link href="/profile">Rizy</Link>
        </h1>

        <ul className="mt-8">
          {Object.entries(NavTable).map(([href, value]) => (
            <li
              key={href}
              className="hover:bg-gray-200 hover:text-red-400 text-black/70"
            >
              <Link href={href}>
                <a className="flex flex-row gap-2 items-center p-4">
                  <span>{value.icon}</span>
                  {value.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default HeaderMenu;
