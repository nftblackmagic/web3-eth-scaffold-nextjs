import React, { useEffect } from "react";
import * as _ from "lodash";

export const useNftMetadata = (user, contract) => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [metadata, setMetadata] = React.useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/nft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          contract,
        }),
      }).then((res) => res.json());
      if (response.data) {
        setMetadata(format(response.data));
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsError(false);
    setIsSuccess(false);
    setIsLoading(true);
    if (user && contract) {
      fetchData();
    }
    setIsLoading(false);
  }, [user, contract]);

  return { isSuccess, isError, isLoading, metadata };
};

const format = (metadata) => {
  const content = _.get(metadata, "content", []);
  if (content.length !== 0) {
    return content.map((item) => {
      const { token_id, contract_address, nftscan_uri, metadata_json, name } =
        item;

      return {
        tokenId: token_id,
        contractAddress: contract_address,
        imageUrl: nftscan_uri,
        metadataJson: metadata_json,
        promptId: "cld9vbw0504cni7ehaxwrt01w",
        name,
      };
    });
  }
};
