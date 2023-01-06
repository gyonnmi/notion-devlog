import React from "react";
import {
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineBold,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-300 to-orange-300 p-8 text-white text-lg">
      <div className="flex flex-row flex-wrap justify-around items-center max-w-5xl mx-auto gap-4">
        <a href="mailto:hikari980713@gmail.com" className="hover:underline">
          hikari980713@gmail.com
        </a>
        <p>&copy; Rizy&apos;s devlog</p>
        <div>
          <ul className="flex flex-row flex-wrap justify-center gap-4">
            <li className="hover:bg-white/20 rounded-lg">
              <a
                href="https://github.com/gyonnmi"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <AiOutlineGithub size="2rem" />
                </span>
              </a>
            </li>
            <li className="hover:bg-white/20 rounded-lg">
              <a
                href="https://www.instagram.com/_rariho/"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <AiOutlineInstagram size="2rem" />
                </span>
              </a>
            </li>
            <li className="hover:bg-white/20 rounded-lg">
              <a href="https://www.rizy.dev/" target="_blank" rel="noreferrer">
                <span>
                  <AiOutlineBold size="2rem" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
