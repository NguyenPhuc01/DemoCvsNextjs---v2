import { Menu, Slider, Layout } from "antd";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import logo from "../images/Web_logo.svg";
import logoSmall from "../images/Web_logo_mini.svg";
import Vector1 from "../images/Vector1.svg";
import Vector2 from "../images/Vector2.svg";
import Vector3 from "../images/Vector3.svg";
import Vector4 from "../images/Vector4.svg";
import Vector5 from "../images/Vector5.svg";
import { useRouter } from "next/router";
function SlideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const { Sider } = Layout;
  const router = useRouter();
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={"240px"}
      trigger={
        collapsed ? (
          <div className="sidebar">
            <MenuUnfoldOutlined />
          </div>
        ) : (
          <div className="sidebar">
            <MenuFoldOutlined style={{ marginRight: 10 }} />
            Thu gọn
          </div>
        )
      }
    >
      <div className="logo">
        {collapsed ? (
          <Link href="/">
            <Image
              src={logoSmall}
              alt="small logo"
              style={{
                padding: "20px 8px",
                width: "100%",
                height: "85px",
              }}
            />
          </Link>
        ) : (
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              style={{
                padding: "24px 12px 20px 12px",
                width: "100%",
                height: "85px",
              }}
            />
          </Link>
        )}
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["/"]}
        mode="inline"
        selectedKeys={[router.pathname]}
      >
        <Menu.Item
          key={["/"]}
          icon={<Image src={Vector1} alt="vector" />}
          onClick={() => {
            router.push("/");
          }}
        >
          Trang chủ
        </Menu.Item>
        <Menu.Item
          key={["/ocr"]}
          icon={<Image src={Vector2} alt="vector" />}
          onClick={() => {
            router.push("/ocr");
          }}
        >
          Nhận diện ký tự
        </Menu.Item>
        <Menu.Item
          key={["/facial-recognition"]}
          icon={<Image src={Vector3} alt="vector" />}
          onClick={() => router.push("/facial-recognition")}
        >
          Nhận diện khuôn mặt
        </Menu.Item>
        <Menu.Item
          key={["/ekyc"]}
          icon={<Image src={Vector4} alt="vector" />}
          onClick={() => router.push("/ekyc")}
        >
          eKYC
        </Menu.Item>
        <Menu.Item
          key={["/image-recognition"]}
          icon={<Image src={Vector5} alt="vector" />}
          onClick={() => router.push("/image-recognition")}
        >
          Xử lý hình ảnh
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SlideBar;
