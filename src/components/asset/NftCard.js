import Image from "next/image";
import Link from "next/link";
export const NftCard = (props) => {
  return (
    <div>
      <Link
        href={{
          pathname: `/user/${props.tokenId}`,
          query: {
            promptId: props.promptId,
          },
        }}
      >
        <>
          <Image
            src={props.imageUrl}
            alt={props.tokenId}
            width={100}
            height={100}
          />
          <p>{props.name}</p>
          <p>{`#${props.tokenId}`}</p>
        </>
      </Link>
    </div>
  );
};
