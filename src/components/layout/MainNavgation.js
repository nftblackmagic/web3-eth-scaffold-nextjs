import React from "react";
import Link from "next/link";
import classes from "../../../styles/MainNavgation.module.css";
import { BasciConnect } from "../ConnectButton";
import SignInButton from "../button/SignInButton";
import { useRouter } from "next/router";

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
            My account
          </SignInButton>
        </li>
      </ul>
      <BasciConnect />
    </nav>
  );
};

export default MainNavgation;
