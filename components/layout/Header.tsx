import Link from "next/link";
import React from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  return (
    <>
      <header className="sticky top-0 bg-white/40 backdrop-blur-md z-50">
        <div className="p-4 flex flex-row justify-between max-w-2xl mx-auto">
          <button className="p-1 hover:bg-gray-200 rounded-lg">
            <span>
              <AiOutlineMenu size="2rem" />
            </span>
          </button>
          <Link href={"/"}>
            <h1 className="font-bold text-2xl cursor-pointer select-none">
              Rizy&apos;s devlog
            </h1>
          </Link>
          <button className="p-1 hover:bg-gray-200 rounded-lg">
            <span>
              <AiOutlineSearch size="2rem" />
            </span>
          </button>
        </div>
      </header>
      <HeaderMenu />
    </>
  );
};

export default Header;
