import Image from "next/image";
import React from "react";

const Logo = ({ classContent }: { classContent?: string }) => {
  return (
    <Image
      src="/logo.png"
      width={40}
      height={40}
      alt="logo"
      priority
      className={classContent}
    />
  );
};

export default Logo;
