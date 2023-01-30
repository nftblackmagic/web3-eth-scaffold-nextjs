const nft = async (req, res) => {
  const { user, contract } = req.body;
  console.log("api call entry", contract, user);
  if (!user) {
    res.status(400).json({ error: "User is required" });
    return;
  }
  if (!contract) {
    res.status(400).json({ error: "Contract is required" });
    return;
  }
  const data = await getNFTMetadata(user, contract);
  res.status(200).json({ data });
  return;
};

const getNFTMetadata = async (user, contract) => {
  const url = `https://restapi.nftscan.com/api/v2/account/own/${user}?erc_type=erc721&contract_address=${contract}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "Lq1uNuZg",
    },
  }).then((res) => res.json());
  if (response.data) {
    console.log("Hook api call response", response.data);
    return response.data;
  } else {
    throw new Error("NFT metadata not found");
  }
};

export default nft;
