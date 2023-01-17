import React from "react";
import DemoPage4 from "../../component/DemoPage4";
import Head from "next/head";
function eKYC() {
  return (
    <>
      <Head>
        <title>Ekyc</title>
      </Head>
      <DemoPage4 />
    </>
  );
}

export default eKYC;
eKYC.auth = true;
