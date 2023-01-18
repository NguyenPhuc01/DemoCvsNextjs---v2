import React from "react";
import Head from "next/head";
import DemoPage2 from "../../component/DemoPage2";
function FaceMatching(props) {
  return (
    <>
      <Head>
        <title>Nhận diện khuôn mặt</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <DemoPage2 />
    </>
  );
}

export default FaceMatching;
FaceMatching.auth = true;
