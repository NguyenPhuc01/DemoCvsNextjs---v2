import React from "react";
import DemoPage from "../../component/DemoPage";
import Head from "next/head";

function ocr(props) {
  return (
    <>
      <Head>
        <title>Nhận diện ký tự</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <DemoPage />
    </>
  );
}

export default ocr;
ocr.auth = true;
