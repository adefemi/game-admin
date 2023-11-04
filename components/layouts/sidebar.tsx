import React from "react";
import Logo from "../common/logo";
import Link from "next/link";
import { Gamepad } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-full">
      <div className="pl-5 pt-5">
        <Logo classContent="w-24" />
      </div>
      <nav className="mx-5 mt-12">
        <NavItem href="/" icon={<Gamepad size={18}/>} title="Games" />
      </nav>
    </div>
  );
};

const NavItem = ({
  href,
  icon,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <Link href={href} className="text-accent flex items-center px-4 py-2 rounded-lg mt-5 text-sm bg-secondary">
      {" "}
      <span className="mr-2">{icon}</span> {title}
    </Link>
  );
};
export default Sidebar;
