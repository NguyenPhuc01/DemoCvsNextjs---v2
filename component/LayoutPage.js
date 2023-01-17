import { Breadcrumb, Layout, Menu } from "antd";
import Image from "next/image";
import React, { memo, useState } from "react";
import Link from "next/link";
import Header from "./Header";
import SlideBar from "./SlideBar";

const { Content, Footer, Sider } = Layout;

function LayoutPage({ children }) {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SlideBar />
      <Layout className="site-layout">
        <Header />
        <Content>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: "100%",
              width: "100%",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Copyright ©2020 by Computer Vision Vietnam. All Rights Reserved
        </Footer>
      </Layout>
    </Layout>
  );
}

export default memo(LayoutPage);
