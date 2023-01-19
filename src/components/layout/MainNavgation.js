import React from "react";
import Link from "next/link";
import classes from "../../../styles/MainNavgation.module.css";
import SignInButton from "../button/SignInButton";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const MainNavgation = () => {
  const router = useRouter();
  const handleUserClick = () => {
    router.push("/user");
  };
  return (
    <nav className={classes.navigateBar}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/mint">Mint</Link>
        </li>
        <li>
          <SignInButton onClick={handleUserClick} message={"Hello world"}>
            My Account
          </SignInButton>
        </li>
      </ul>
      <ConnectButton />
    </nav>
  );
};

export default MainNavgation;
