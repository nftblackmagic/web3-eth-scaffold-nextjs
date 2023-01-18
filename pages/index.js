// Landing page
import React, { useEffect, useState } from "react";
import { CustomConnect } from "../src/components/ConnectButton";
import { API_DB, DEFAULT_CONTRACT_ADDRESS } from "../src/config/constant";
import * as _ from "lodash";
import { ethers } from "ethers";
import { useCustomContract } from "../src/hooks/useContract";
import { useRouter } from "next/router";
import { useAccount, useSwitchNetwork } from "wagmi";
import { useCustomSignMessage } from "../src/hooks/useSignMessage";
import useLocalStorage from "../src/hooks/useLocalStorage";

function HomePage(props) {
  const { chain } = useCustomContract(DEFAULT_CONTRACT_ADDRESS, props.abi);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [signClick, setSignClick] = useState(false);
  const { address, isConnected } = useAccount();
  const [signature, setSignature] = useLocalStorage("signature", "");

  const { switchNetwork } = useSwitchNetwork();
  const { data, isError, isSuccess } = useCustomSignMessage(
    message,
    signClick,
    chain?.id === Number(process.env.NEXT_PUBLIC_CHAIN_ID)
  );

  const handleUserClick = () => {
    console.log("chain", process.env.NEXT_PUBLIC_CHAIN_ID);
    if (chain.id !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
      switchNetwork(
        ethers.utils.hexlify(Number(process.env.NEXT_PUBLIC_CHAIN_ID))
      );
    }
    async function signCustomMessage() {
      setMessage("Hello world");
      setSignClick(true);
    }
    signCustomMessage();
  };
  useEffect(() => {
    if (isSuccess) {
      router.push({
        pathname: "/user",
      });
      setSignature(data);
      console.log("home page signature data", data);
    }
    if (isError) {
      console.log("error", isError);
    }
    setMessage("");
    setSignClick(false);
  }, [isSuccess, isError]);
  return (
    <div>
      <h1>The Home Page</h1>
      <h2>{props.name}</h2>
      <CustomConnect />
      <button onClick={handleUserClick}>Go to user page</button>
    </div>
  );
}

export async function getStaticProps() {
  const abi = await fetch(
    API_DB + "abi/" + "5" + "/" + DEFAULT_CONTRACT_ADDRESS,
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
