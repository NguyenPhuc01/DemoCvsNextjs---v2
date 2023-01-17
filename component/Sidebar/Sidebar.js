import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { trackEvent } from "../utils";
import { Link } from "gatsby-plugin-intl";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Sider } = Layout;

class Sidebar2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed:
        localStorage.getItem("stateCollapsed") === "false" ? false : true
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
    localStorage.setItem("stateCollapsed", collapsed);
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        width={240}
        trigger={
          this.state.collapsed ? (
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
        <div
          style={
            this.state.collapsed ? { position: "" } : { position: "fixed" }
          }
        >
          {this.state.collapsed ? (
            <div className="logo_mini">
              <Link to="/" onClick={() => trackEvent("/")}>
                <img
                  src="/Web_logo_mini.svg"
                  alt="img"
                  width="100%"
                  height="85px"
                  style={{ padding: "20px 8px" }}
                />
              </Link>
            </div>
          ) : (
            <div className="logo">
              <Link to="/" onClick={() => trackEvent("/")}>
                <img
                  src="/Web_logo.svg"
                  alt="img"
                  width="100%"
                  height="85px"
                  style={{ padding: "24px 12px 20px" }}
                />
              </Link>
            </div>
          )}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[]}
            className="sidebar"
          >
            <Menu.Item
              key="1"
              icon={<img src="/Vector1.svg" alt="img" />}
              className="sidebar"
              style={{ height: 56 }}
            >
              <Link to="/" onClick={this.handle}>
                Trang chủ
              </Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<img src="/Vector2.svg" alt="img" />}
              className="sidebar"
              style={{ height: 56 }}
            >
              <Link to="/ocr" onClick={() => trackEvent("/")}>
                Nhận diện ký tự
              </Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<img src="/Vector3.svg" alt="img" />}
              className="sidebar"
              style={{ height: 56 }}
            >
              <Link to="/facial-recognition" onClick={() => trackEvent("/")}>
                Nhận diện khuôn mặt
              </Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<img src="/Vector4.svg" alt="img" />}
              className="sidebar"
              style={{ height: 56 }}
            >
              <Link to="/ekyc" onClick={() => trackEvent("/")}>
                eKYC
              </Link>
            </Menu.Item>
            <Menu.Item
              key="5"
              icon={<img src="/Vector5.svg" alt="img" />}
              className="sidebar"
              style={{ height: 56 }}
            >
              <Link to="/image-recognition" onClick={() => trackEvent("/")}>
                Xử lý hình ảnh
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
    );
  }
}

export default Sidebar2;
