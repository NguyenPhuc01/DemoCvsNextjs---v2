import React from "react";
import Head from "next/head";
import DemoPage3 from "../../component/DemoPage3";
function ImageRecognition(props) {
  return (
    <>
      <Head>
        <title>Xử lý hình ảnh</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <DemoPage3 />
    </>
  );
}

export default ImageRecognition;
ImageRecognition.auth = true;
