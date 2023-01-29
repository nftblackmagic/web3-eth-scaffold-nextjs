import PropTypes from "prop-types";
import React from "react";
import WriteButton from "../../components/button/WriteButton";
import { ABI } from "../../config/constant";

const MintPage = (props) => {
  return (
    <div id="mainContainer">
      <h1>The Mint Page</h1>
      <WriteButton
        abi={props.abi}
        functionName={"mint"}
        args={[1]}
        value={"0.000001"}
      >
        Mint
      </WriteButton>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      abi: ABI,
    }, // will be passed to the page component as props
  };
}

MintPage.propTypes = {
  abi: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MintPage;
