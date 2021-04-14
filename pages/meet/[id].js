import dynamic from "next/dynamic";

const ZoomPlayer = dynamic(
  () => {
    return import("../../components/zoomPlayer");
  },
  { ssr: false }
);

// This gets called on every request
export async function getServerSideProps(context) {
  return {
    props: { query: context.query },
  };
}

const Meet = ({ query }) => {
  const {
    id: meetingNumber,
    password: passWord,
    username: userName,
    useremail: userEmail,
  } = query;
  return (
    <ZoomPlayer
      meetingNumber={meetingNumber}
      passWord={passWord}
      userName={userName}
      userEmail={userEmail}
    />
  );
};

export default Meet;
