// Landing page
import React from "react";
import PropTypes from "prop-types";
import { ABI, DEFAULT_CONTRACT_ADDRESS } from "../config/constant";
import { ethers } from "ethers";

function HomePage(props) {
  return (
    <div id="mainContainer">
      <h1>The Home Page</h1>
      <h2>{`The static props value from contract: ${props.name}`}</h2>
    </div>
  );
}

HomePage.propTypes = {
  name: PropTypes.string,
};

export async function getStaticProps() {
  const abi = ABI;

  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.NEXT_PUBLIC_INFURA_API
  );

  const contract = new ethers.Contract(DEFAULT_CONTRACT_ADDRESS, abi, provider);
  const name = await contract.name();
  console.log("NAME", name);

  return {
    props: {
      name,
      abi,
    }, // will be passed to the page component as props
  };
}

export default HomePage;
