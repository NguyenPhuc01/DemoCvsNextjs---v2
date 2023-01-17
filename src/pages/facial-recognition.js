import React from "react";
import Head from "next/head";
import DemoPage2 from "../../component/DemoPage2";
function FaceMatching(props) {
  return (
    <>
      <Head>
        <title>Nhận diện khuôn mặt</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <DemoPage2 />
    </>
  );
}

export default FaceMatching;
FaceMatching.auth = true;
