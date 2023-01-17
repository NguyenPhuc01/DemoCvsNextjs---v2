import { Button, Space, Divider, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import DemoBSX from "../component/BSX/DemoBSX";
import DemoCambodia from "../component/Cambodia/DemoCambodia";
import DemoDangKiemXe from "../component/DangKiemXe/DemoDangKiemXe";
import DemoDangKyDoanhNghiep from "../component/DangKyDoanhNghiep/DemoDangKyDoanhNghiep";
import DemoDangKyXe from "../component/DangKyXe/DemoDangKyXe";
import DemoTable from "../component/DuLieuDangBang/DemoTable";
import DemoGiayKhaiSinh from "../component/GiayKhaiSinh/DemoGiayKhaiSinh";
import DemoMyanmar from "../component/Myanmar/DemoMyanmar";
import DemoCMND from "../component/OCR/DemoCMND";
import DemoHoChieuQuocTe from "../component/Passport/DemoHoChieuQuocTe";
import DemoPhilippines from "../component/Philippines/DemoPhilippines";
import DemoVanBan from "../component/VanBan/DemoVanBan";
import { useQueryParams, StringParam, withDefault } from "use-query-params";

const { TabPane } = Tabs;

const types1 = [
  { id: 10, name: "CMND/CCCD", key: "CMND/CCCD" },
  { id: 11, name: "Hộ chiếu Việt Nam", key: "ho-chieu-vn" },
  { id: 12, name: "Giấy phép lái xe", key: "giay-phep-lai-xe-1" },
  { id: 13, name: "Universal Passport", key: "ho-chieu-quoc-te" },
  { id: 14, name: "Giấy khai sinh", key: "giay-khai-sinh" },
];

const types2 = [
  { id: 20, name: "Giấy phép lái xe", key: "giay-phep-lai-xe-2" },
  { id: 21, name: "Đăng ký xe", key: "dang-ky-xe" },
  { id: 22, name: "Đăng kiểm xe", key: "dang-kiem-xe" },
  { id: 23, name: "Biển số xe", key: "bien-so-xe" },
];

const types3 = [
  { id: 30, name: "Hoá đơn tổng quát", key: "hoa-don-full" },
  { id: 31, name: "Giấy đăng ký doanh nghiệp", key: "dang-ky-doanh-nghiep" },
  { id: 33, name: "Đề nghị thanh toán", key: "de-nghi-thanh-toan" },
  { id: 34, name: "Hồ sơ nhân sự", key: "ho-so-nhan-su" },
  { id: 35, name: "CV", key: "cv" },
  // { id: 36, name: "Hợp đồng mua bán trái phiếu", key: "hop-dong-trai-phieu" },
  { id: 37, name: "Hồ sơ trái phiếu", key: "ho-so-trai-phieu" },
];

const types4 = [
  { id: 40, name: "Giấy ra viện", key: "giay-ra-vien" },
  { id: 41, name: "Báo giá xe", key: "bao-gia-xe" },
  { id: 42, name: "eClaim", key: "e-claim" },
  { id: 43, name: "Hoá đơn xe", key: "hoa-don-xe" },
  { id: 44, name: "Hóa đơn viện phí", key: "pvi-hoa-don" },
  { id: 45, name: "Sổ khai sinh", key: "so-khai-sinh" },
  { id: 46, name: "Phiếu khám bệnh", key: "phieu-kham-benh" },
  { id: 47, name: "Bồi thường bảo hiểm", key: "boi-thuong-bao-hiem" },
];

const types5 = [
  { id: 50, name: "ID Card Myanmar", key: "id-card-myanmar" },
  { id: 51, name: "ID Card Cambodia", key: "id-card-cambodia" },
  { id: 52, name: "ID Card Philippines", key: "id-card-philippines" },
];

const types6 = [
  { id: 60, name: "Bảng tổng quát", key: "bang-tong-quat" },
  { id: 62, name: "Văn bản tổng quát", key: "van-ban-tong-quat" },
  { id: 63, name: "Giấy đăng ký dự tuyển", key: "dang-ky-du-tuyen" },
  { id: 64, name: "A4", key: "a4" },
  { id: 65, name: "Bằng tốt nghiệp", key: "bang-tot-nghiep" },
  { id: 66, name: "Giấy khai tử", key: "giay-khai-tu" },
  { id: 67, name: "Đăng ký thuế", key: "dang-ky-thue" },
  // { id: 31, name: "Sổ hộ khẩu", key: "so-ho-khau" },
  { id: 68, name: "Lý lịch tư pháp", key: "ly-lich-tu-phap" },
  { id: 69, name: "DCTTCN", key: "dcttcn" },
  { id: 611, name: "Giấy đăng ký bảo hiểm", key: "dang-ky-bao-hiem" },
  { id: 612, name: "Thẻ tổng quát", key: "the-tong-quat" },
  { id: 613, name: "Visa", key: "visa" },
  { id: 614, name: "SMS Video", key: "sms-video" },
  { id: 615, name: "Thẻ ngân hàng", key: "credit-card" },
  { id: 616, name: "Sổ đỏ", key: "so-do" },
  { id: 617, name: "Phiếu lao động", key: "phieu-lao-dong" },
];

const types7 = [
  { id: 70, name: "Báo cáo tài chính", key: "bao-cao-tai-chinh" },
  { id: 71, name: "Sao kê ngân hàng", key: "sao-ke-ngan-hang" },
  { id: 72, name: "Giấy nộp tiền", key: "giay-nop-tien" },
  { id: 73, name: "Ủy nhiệm chi", key: "uy-nhiem-chi" },
  { id: 74, name: "Đề nghị vay vốn", key: "de-nghi-vay-von" },
];

const tabs = [
  { key: "id_card", name: "Giấy tờ tùy thân", types: types1 },
  { key: "vehicle_document", name: "Giấy tờ xe", types: types2 },
  { key: "business", name: "Tài liệu doanh nghiệp", types: types3 },
  { key: "insurance", name: "Giấy tờ bảo hiểm", types: types4 },
  { key: "fintech", name: "Tài chính - Ngân hàng", types: types7 },
  { key: "sea_id_card", name: "SEA ID Card", types: types5 },
  { key: "other", name: "Khác", types: types6 },
];

export default function DemoPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [result, setResult] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [query, setQuery] = useQueryParams({
    tab: withDefault(StringParam, "id_card"),
    type: withDefault(StringParam, "CMND/CCCD"),
  });
  const { tab, type } = query;

  const demoOptions = {
    "CMND/CCCD": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),

    "ho-chieu-vn": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "giay-phep-lai-xe-1": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "giay-phep-lai-xe-2": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),

    "dang-ky-xe": <DemoDangKyXe result={result} setResult={setResult} />,
    "dang-kiem-xe": <DemoDangKiemXe result={result} setResult={setResult} />,
    "bien-so-xe": <DemoBSX result={result} setResult={setResult} />,
    "giay-khai-sinh": (
      <DemoGiayKhaiSinh result={result} setResult={setResult} />
    ),
    "dang-ky-doanh-nghiep": (
      <DemoDangKyDoanhNghiep result={result} setResult={setResult} />
    ),

    "bang-diem": (
      <DemoTable currentType={type} result={result} setResult={setResult} />
    ),
    "sao-ke-ngan-hang": (
      <DemoTable currentType={type} result={result} setResult={setResult} />
    ),
    "bang-ke-vien-phi": (
      <DemoTable currentType={type} result={result} setResult={setResult} />
    ),
    "bao-cao-tai-chinh": (
      <DemoTable currentType={type} result={result} setResult={setResult} />
    ),
    "bang-tong-quat": (
      <DemoTable currentType={type} result={result} setResult={setResult} />
    ),

    "ho-chieu-quoc-te": (
      <DemoHoChieuQuocTe result={result} setResult={setResult} />
    ),
    "id-card-myanmar": <DemoMyanmar result={result} setResult={setResult} />,
    "id-card-cambodia": <DemoCambodia result={result} setResult={setResult} />,
    "id-card-philippines": (
      <DemoPhilippines result={result} setResult={setResult} />
    ),

    "van-ban-tong-quat": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "hoa-don-xe": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "hoa-don-vat": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "hoa-don-full": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "bang-ke": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "phieu-kham-benh": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "boi-thuong-bao-hiem": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "e-claim": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),

    "giay-ra-vien": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "bao-gia-xe": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "pvi-hoa-don": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "so-khai-sinh": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "de-nghi-thanh-toan": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "dang-ky-du-tuyen": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    a4: <DemoVanBan currentType={type} result={result} setResult={setResult} />,
    "bang-tot-nghiep": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "giay-khai-tu": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "dang-ky-thue": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "so-ho-khau": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "ly-lich-tu-phap": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    dcttcn: (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "uy-nhiem-chi": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "ho-so-nhan-su": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "dang-ky-bao-hiem": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "the-tong-quat": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    cv: <DemoVanBan currentType={type} result={result} setResult={setResult} />,
    "giay-nop-tien": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    visa: (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "hop-dong-trai-phieu": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "ho-so-trai-phieu": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "sms-video": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "credit-card": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "so-do": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "phieu-lao-dong": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "de-nghi-vay-von": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
  };

  function callback(key) {
    setResult(null);
    switch (key) {
      case "id_card":
        setQuery({ tab: key, type: types1[0].key }, "replaceIn");
        return;
      case "vehicle_document":
        setQuery({ tab: key, type: types2[0].key }, "replaceIn");
        return;
      case "business":
        setQuery({ tab: key, type: types3[0].key }, "replaceIn");
        return;
      case "insurance":
        setQuery({ tab: key, type: types4[0].key }, "replaceIn");
        return;
      case "fintech":
        setQuery({ tab: key, type: types7[0].key }, "replaceIn");
        return;
      case "sea_id_card":
        setQuery({ tab: key, type: types5[0].key }, "replaceIn");
        return;
      case "other":
        setQuery({ tab: key, type: types6[0].key }, "replaceIn");
        return;
      default:
        break;
    }
  }

  return (
    <div className="home-page-wrapper demo-wrapper">
      <div className="home-page demo">
        <div className="title-wrapper">Nhận diện ký tự</div>
        <Divider
          style={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "22px",
            fontFamily: "SFProDisplay",
            color: "rgba(0, 0, 0, 0.85)",
          }}
          orientation="left"
        >
          Chọn loại tài liệu
        </Divider>
        <div className="content-wrapper">
          <Tabs onChange={callback} activeKey={tab}>
            {tabs.map((tab) => {
              const { key, name, types } = tab;
              return (
                <TabPane tab={name} key={key}>
                  <Space
                    size={[8, 8]}
                    wrap
                    align="center"
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      marginBottom: 10,
                    }}
                  >
                    {types.map((t) => {
                      const { id, name, key } = t;
                      return (
                        <Button
                          key={id}
                          type={key === type ? "primary" : "default"}
                          onClick={() => {
                            setResult(null);
                            setQuery({ type: key }, "replaceIn");
                          }}
                        >
                          {name}
                        </Button>
                      );
                    })}
                  </Space>
                </TabPane>
              );
            })}
          </Tabs>
        </div>
        <Divider
          style={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "22px",
            fontFamily: "SFProDisplay",
            color: "rgba(0, 0, 0, 0.85)",
          }}
          orientation="left"
        >
          Tải ảnh từ máy của bạn lên
        </Divider>
        <div className="upload-wrapper">{demoOptions[type]}</div>
      </div>
    </div>
  );
}
