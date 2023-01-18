import React from "react";
import classes from "../../../styles/Layout.module.css";
import MainNavgation from "./MainNavgation";

const Layout = ({ children }) => {
  return (
    <>
      <MainNavgation />
      <main className={classes.layout}>{children}</main>
    </>
  );
};

export default Layout;
