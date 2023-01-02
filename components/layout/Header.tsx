import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import HeaderMenu from "./HeaderMenu";
import Backdrop from "./Backdrop";

const Header = () => {
  const { pathname } = useRouter(); // 현재 페이지 경로
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 사이드메뉴 열림 여부

  // 사이드메뉴 열림 여부에 따라 body에 클래스 추가
  useEffect(() => {
    // window.innerWidth : 스크롤바를 포함한 전체 화면의 너비
    // document.body.clientWidth : 스크롤바를 제외한 화면의 너비
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    // isMenuOpen이 true면 "isMenuOpen" 클래스 추가, false면 제거
    document.body.className = isMenuOpen ? "isMenuOpen" : "";
  }, [isMenuOpen]);

  // 페이지 이동 시 사이드메뉴 닫기
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
            <Link href={`/search`}>
              <span>
                <AiOutlineSearch size="2rem" />
              </span>
            </Link>
          </button>
        </div>
      </header>
      <HeaderMenu isMenuOpen={isMenuOpen} />
      {isMenuOpen ? <Backdrop onClick={() => setIsMenuOpen(false)} /> : null}
    </>
  );
};

export default Header;
