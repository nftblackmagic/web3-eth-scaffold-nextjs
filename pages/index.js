// Landing page
import React, { useEffect, useState } from "react";
import { CustomConnect } from "../src/components/ConnectButton";
import { API_DB, DEFAULT_CONTRACT_ADDRESS } from "../src/config/constant";
import * as _ from "lodash";
import { ethers } from "ethers";
import { useCustomContract } from "../src/hooks/useContract";
import { useRouter } from "next/router";
import SignInButton from "../src/components/button/SignInButton";

function HomePage(props) {
  const { chain } = useCustomContract(DEFAULT_CONTRACT_ADDRESS, props.abi);
  const router = useRouter();
  const [message, setMessage] = useState("Hello World");

  const handleUserClick = () => {
    router.push("/user");
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <h2>{props.name}</h2>
    </div>
  );
}

export async function getStaticProps() {
  const abi = await fetch(
    API_DB +
      "abi/" +
      Number(process.env.NEXT_PUBLIC_CHAIN_ID) +
      "/" +
      DEFAULT_CONTRACT_ADDRESS,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then(async (response) => {
      const dataFromDb = _.get(response, ["Item", "Abi"]);
      if (dataFromDb) {
        return JSON.parse(dataFromDb);
      } else {
        throw new Error("Cannot find abi");
      }
    })
    .catch((error) => {
      console.error(error);
    });

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
