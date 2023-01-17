import React from "react";
import Head from "next/head";
import DemoPage3 from "../../component/DemoPage3";
function ImageRecognition(props) {
  return (
    <>
      <Head>
        <title>Xử lý hình ảnh</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <DemoPage3 />
    </>
  );
}

export default ImageRecognition;
ImageRecognition.auth = true;
