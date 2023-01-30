import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AssetContainer } from "../../components/asset/AssetCotainer";

const UserContainer = () => {
  const router = useRouter();
  useEffect(() => {
    const signature = JSON.parse(localStorage.getItem("signature"));
    if (signature) {
      console.log("signature", signature);
    } else {
      console.log("no signature");
      router.push({ pathname: "/" });
    }
  }, []);

  return (
    <div id="mainContainer">
      <h1>The User Page</h1>
      <AssetContainer />
    </div>
  );
};

export default UserContainer;
