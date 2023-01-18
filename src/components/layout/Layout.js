import PropTypes from "prop-types";
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

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
