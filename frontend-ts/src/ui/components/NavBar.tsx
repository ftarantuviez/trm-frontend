"use client";

import Image from "next/image";
import { ThemeToggle } from "./ThemToggle";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NavBar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-6 border-b">
      <div className="flex items-center gap-4">
        <Image
          src="https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/149/100/original/TRM_LogoDark_2x.png?1621363470"
          alt="Logo"
          width={100}
          height={100}
        />
        <span className="text-xl font-bold">|</span>
        <h1 className="text-xl font-bold">Blockchain Explorer</h1>
      </div>
      <div className="flex items-center gap-4">
        <ConnectButton />
        <ThemeToggle />
      </div>
    </nav>
  );
};
