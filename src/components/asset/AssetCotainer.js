import React, { useEffect } from "react";
import { useNftMetadata } from "../../hooks/useNftMetadata";
import { useAccount } from "wagmi";
import { NftCard } from "./NftCard";
import classes from "../../../styles/AssetContainer.module.css";

export const AssetContainer = () => {
  const { address } = useAccount();
  const { isLoading, isError, metadata } = useNftMetadata(
    address,
    "0x13BD972B0bfaefC9538a43c1FDA11D71C720cD47"
  );

  useEffect(() => {
    if (isError) {
      console.log("Error", isError);
    }
  }, [isError]);

  return (
    <div className={classes.assetContainer}>
      {isLoading && <p>Loading...</p>}

      {metadata.map((item, index) => {
        return (
          <NftCard
            name={item.name}
            tokenId={item.tokenId}
            imageUrl={item.imageUrl}
            promptId={item.promptId}
            key={index}
          />
        );
      })}
    </div>
  );
};
