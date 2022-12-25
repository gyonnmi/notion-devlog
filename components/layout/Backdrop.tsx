import React from "react";

interface BackdropProps {
  onClick: () => void;
}

const Backdrop = ({ onClick }: BackdropProps) => {
  return (
    <div
      className="z-40 fixed top-0 bottom-0 left-0 right-0 bg-black/70"
      onClick={onClick}
    />
  );
};

export default Backdrop;
