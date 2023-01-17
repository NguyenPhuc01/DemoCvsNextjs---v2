import React from "react";
import { Button } from "antd";
// import { OutboundLink } from "gatsby-plugin-google-gtag";
import Link from "next/link";

export const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;
export const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf("title") === 0 ? "h1" : "div";
  // tag = item.href ? OutboundLink : tag;
  tag = item.to ? Link : tag;
  let children =
    typeof item.children === "string" && item.children.match(isImg)
      ? React.createElement("img", { src: item.children, alt: "img" })
      : item.children;
  if (item.name.indexOf("button") === 0 && typeof item.children === "object") {
    children = React.createElement(Button, {
      ...item.children,
    });
  }
  if (item.to) {
    return (
      <Link
        to={`${item.to}`}
        key={i.toString()}
        {...item}
        onClick={() => trackEvent(item.to)}
      >
        {children}
      </Link>
    );
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};

const events = new Map([
  ["/", "Trang chủ"],
  ["/products/ocr", "Nhận diện ký tự"],
  ["/products/ocr/vietnam-id-cards", "Giấy tờ tùy thân"],
  ["/products/ocr/vietnam-id-cards-1", "Hộ chiếu tiếng Việt"],
  ["/products/ocr/vietnam-id-cards-2", "Giấy phép lái xe"],
  ["/products/ocr/vehicle-registration", "Giấy đăng ký xe"],
  ["/products/ocr/vehicle-inspection-certficicate", "Giấy đăng kiểm xe"],
  ["/products/ocr/license-plate", "Biển số xe"],
  ["/products/ocr/birth-certificate", "Giấy khai sinh"],
  [
    "/products/ocr/business-registration-certificate",
    "Giấy đăng ký doanh nghiệp",
  ],
  ["/products/ocr/table", "Dữ liệu dạng bảng"],
  ["/products/ocr/passport", "Hộ chiếu quốc tế"],
  ["/products/ocr/myanmar-id-card", "Myanmar ID Card"],
  ["/products/ocr/cambodia-id-card", "Cambodia ID Card"],
  ["/products/ocr/philippines-id-card", "Philippines ID Card"],
  ["/products/ocr/image-to-text", "Nhận diện văn bản"],
  ["/products/facial-recognition", "Nhận diện khuôn mặt"],
  ["/products/facial-recognition/face-verification", "So khớp khuôn mặt"],
  ["/products/facial-recognition/face-search", "Tìm kiếm khuôn mặt"],
  ["/products/facial-recognition/smart-avatar", "Tạo ảnh đại diện"],
  ["/products/facial-recognition/face-analysis", "Phân tích khuôn mặt"],
  ["/products/facial-recognition/face-grouping", "Phân cụm khuôn mặt"],
  ["/products/image-recognition", "Nhận diện hình ảnh"],
  ["/products/image-recognition/smart-crop", "Cắt ảnh thông minh"],
  ["/products/image-recognition/tagging", "Tagging"],
  ["/solutions/e-kyc", "eKYC"],
  ["/solutions/insurance", "Insurtech "],
  ["/solutions/media-publishing", "Xuất bản nội dung"],
  ["/company/about", "Về chúng tôi"],
  ["/company/contact", "Liên hệ"],
  ["Dùng thử miễn phí", "Button Dùng thử miễn phí"],
  ["Gửi form liên hệ", "Gửi form liên hệ"],
]);

export const trackEvent = (key) => {
  if (typeof window === "undefined") return;
  if (key === "Gửi form liên hệ") {
    window.gtag("event", "Gửi form liên hệ", {
      send_to: "AW-660981705/8K4oCJSqkIYDEMmPl7sC",
    });
    return;
  }
};

const trialEvents = new Map([
  ["/products/ocr/vietnam-id-cards", "Demo Giấy tờ tùy thân"],
  ["/products/ocr/vehicle-registration", "Demo Giấy đăng ký xe"],
  ["/products/ocr/vehicle-inspection-certficicate", "Demo Giấy đăng kiểm xe"],
  ["/products/ocr/license-plate", "Demo Biển số xe"],
  ["/products/ocr/birth-certificate", "Demo Giấy khai sinh"],
  [
    "/products/ocr/business-registration-certificate",
    "Demo Giấy đăng ký doanh nghiệp",
  ],
  ["/products/ocr/table", "Demo Dữ liệu dạng bảng"],
  ["/products/ocr/passport", "Demo Hộ chiếu quốc tế"],
  ["/products/ocr/myanmar-id-card", "Demo Myanmar ID Card"],
  ["/products/ocr/cambodia-id-card", "Demo Cambodia ID Card"],
  ["/products/ocr/philippines-id-card", "Demo Philippines ID Card"],
  ["/products/ocr/image-to-text", "Demo Nhận diện văn bản"],
  ["/products/facial-recognition/face-verification", "Demo So khớp khuôn mặt"],
  ["/products/facial-recognition/face-search", "Demo Tìm kiếm khuôn mặt"],
  ["/products/facial-recognition/smart-avatar", "Demo Tạo ảnh đại diện"],
  ["/products/image-recognition/smart-crop", "Demo Cắt ảnh thông minh"],
  ["/products/image-recognition/tagging", "Demo Tagging"],
]);

export const trackTrialEvent = (key) => {
  // console.log(key);
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", trialEvents.get(key), { send_to: "G-KN187T7J22" });
  }
};

export const isURL = (str) => {
  let regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
};
