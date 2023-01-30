import { useRouter } from "next/router";
import { ChatContainer } from "../../components/chat/ChatContainer";

const AssetDetail = (props) => {
  const router = useRouter();
  const { tokenId } = router.query;

  return (
    <div id="mainContainer">
      <h1>{`Let's chat with BoxCatPlanet #${tokenId}`}</h1>
      <ChatContainer promptId={props.promptId} />
    </div>
  );
};

export const getServerSideProps = (context) => {
  console.log(context.query);
  return {
    props: {
      promptId: context.query.promptId, //pass it to the page props
    },
  };
};

export default AssetDetail;
