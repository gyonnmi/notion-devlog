import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import HeaderMenu from "./HeaderMenu";
import Backdrop from "./Backdrop";

const Header = () => {
  const { pathname } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = isMenuOpen ? "isMenuOpen" : "";
  }, [isMenuOpen]);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 bg-white/40 backdrop-blur-md z-50">
        <div className="p-4 flex flex-row justify-between max-w-2xl mx-auto">
          <button
            className="p-1 hover:bg-gray-200 rounded-lg"
            onClick={() => {
              setIsMenuOpen(true);
            }}
          >
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
      <HeaderMenu isMenuOpen={isMenuOpen} />
      {isMenuOpen ? <Backdrop onClick={() => setIsMenuOpen(false)} /> : null}
    </>
  );
};

export default Header;
