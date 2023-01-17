import React from "react";
import DemoPage4 from "../../component/DemoPage4";
import Head from "next/head";
function eKYC() {
  return (
    <>
      <Head>
        <title>Ekyc</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <DemoPage4 />
    </>
  );
}

export default eKYC;
eKYC.auth = true;
