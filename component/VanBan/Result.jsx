import React, { useState, Fragment } from "react";
import { Button, Space, Menu, Table } from "antd";
import styled from "styled-components";
import { ChipIdCardBack, ChipIdCardFront } from "../OCR/Result";
import { WarningFilled } from "@ant-design/icons";

const getConfidence = (confidence) => {
  return (confidence * 100).toFixed(2) + "%";
};

export default function Result({ result, type }) {
  const { result: data, data: data2 = [] } = result || {};
  const [current, setCurrent] = useState("1");
  const [currentPage, setCurrentPage] = useState(0);
  const resultOptions = {
    "van-ban-tong-quat": (
      <VanBanScan data={data || data2[currentPage]?.result} />
    ),
    "hoa-don-xe": <HoaDonXe data={data2[currentPage]?.info} />,
    "pvi-hoa-don": <HoaDonXe data={data2[currentPage]?.info} />,
    "hoa-don-vat": <HoaDonVAT data={data2[currentPage]?.info} />,
    "bang-ke": <BangKe data={data2[currentPage]?.info} />,
    "phieu-kham-benh": <PhieuKhamBenh data={data2[currentPage]?.info} />,
    "boi-thuong-bao-hiem": <BoiThuongBH data={data2[currentPage]?.info} />,
    "e-claim": (
      <BVCare data={data2[currentPage]?.info} type={data2[currentPage]?.type} />
    ),

    "ho-chieu-vn": (
      <GiayToTuyThanApiV3
        data={data2?.info}
        type={data2?.type}
        result={result}
      />
    ),
    "CMND/CCCD": (
      <GiayToTuyThanApiV3
        data={data2?.info}
        type={data2?.type}
        result={result}
      />
    ),
    "giay-phep-lai-xe-1": (
      <GiayToTuyThanApiV3
        data={data2?.info}
        type={data2?.type}
        result={result}
      />
    ),
    "giay-phep-lai-xe-2": (
      <GiayToTuyThanApiV3
        data={data2?.info}
        type={data2?.type}
        result={result}
      />
    ),

    "giay-ra-vien": <GiayRaVien data={data2[currentPage]?.info} />,
    "bao-gia-xe": <BaoGiaXe data={data2[currentPage]?.info} />,
    "hoa-don-full": <HoaDonFull data={data2[currentPage]?.info} />,
    "so-khai-sinh": <SoKhaiSinh data={data2[currentPage]?.info} />,
    "de-nghi-thanh-toan": <DeNghiThanhToan data={data2[currentPage]?.info} />,
    "dang-ky-du-tuyen": <DangKyDuTuyen data={data2[currentPage]?.info} />,
    a4: <A4 data={data2[currentPage]?.data} type={data2[currentPage]?.type} />,
    "bang-tot-nghiep": <BangTotNghiep data={data2[currentPage]?.info} />,
    "giay-khai-tu": <GiayKhaiTu data={data2[currentPage]?.info} />,
    "dang-ky-thue": <DangKyThue data={data2[currentPage]?.info} />,
    "so-ho-khau": <SoHoKhau data={data2[currentPage]?.info} />,
    "ly-lich-tu-phap": <LyLichTuPhap data={data2[currentPage]?.info} />,
    dcttcn: <DCTTCN data={data2[currentPage]?.info} />,
    "uy-nhiem-chi": <UyNhiemChi data={data2[currentPage]?.info} />,
    "dang-ky-bao-hiem": <DangKyBaoHiem data={data2[currentPage]?.info} />,
    "the-tong-quat": <VanBanScan data={data2[currentPage]?.result} />,
    cv: <CV data={data2} />,
    "giay-nop-tien": <GiayNopTien data={data2[currentPage]?.info} />,
    visa: <Visa data={data2[currentPage]?.info} />,
    "hop-dong-trai-phieu": <HopDongTraiPhieu data={data2[currentPage]?.info} />,
    "sms-video": <SmsVideo data={data2} />,
    "car-damage-assessment": <TonThatXe data={data2} />,
    "credit-card": <CreditCard data={data2[currentPage]?.info} />,
    "so-do": <SoDo data={data2?.info} type={data2?.type} />,
    "phieu-lao-dong": <PhieuLaoDong data={data2?.info} />,
    "de-nghi-vay-von": <DeNghiVanVon data={data2?.info} />,
  };
  return (
    <>
      {data || data2 ? (
        <>
          <div
            className="result-wrapper"
            style={
              type === "sms-video"
                ? { maxHeight: 600, overflow: "auto" }
                : {
                    overflowX:
                      type === "van-ban-tong-quat" ? "auto" : "inherit",
                    padding: current === "2" && 0,
                  }
            }
          >
            {current === "1" ? (
              <>{resultOptions[type]}</>
            ) : (
              <img
                alt="img"
                src={`data:image/png;base64,${data2[currentPage].info.image}`}
                width="100%"
              />
            )}
          </div>
          {type !== "sms-video" &&
            type !== "car-damage-assessment" &&
            data2?.length > 1 && (
              <div style={{ textAlign: "center", marginTop: 6 }}>
                <Space>
                  <Button
                    type="text"
                    onClick={() => setCurrentPage((page) => page - 1)}
                    disabled={currentPage === 0}
                  >
                    Tr?????c
                  </Button>
                  <span>
                    {currentPage + 1}/{data2.length}
                  </span>
                  <Button
                    type="text"
                    onClick={() => setCurrentPage((page) => page + 1)}
                    disabled={currentPage === data2.length - 1}
                  >
                    Ti???p
                  </Button>
                </Space>
              </div>
            )}
        </>
      ) : (
        <div className="error">Kh??ng t??m th???y n???i dung. Vui l??ng th??? l???i!</div>
      )}
    </>
  );
}

function VanBanScan({ data }) {
  return (
    <>
      {data.map((item) => {
        return (
          <div>
            {item.map((children) => {
              return (
                <div style={{ whiteSpace: "nowrap" }}>
                  {children.map((box) => (
                    <span>{box.text} </span>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

function Field({ name, value, confidence, en }) {
  return (
    <div className="field">
      {name && <div className="field-name">{name}:</div>}
      <div className="field-value">
        {value}
        {confidence ? (
          <>
            <span className="confidence-label">
              {" "}
              - {en ? "Confidence: " : "????? tin c???y: "}
            </span>
            {getConfidence(confidence)}
          </>
        ) : null}
      </div>
    </div>
  );
}

function GiayNopTien({ data }) {
  const {
    nguoinop,
    nguoinop_confidence,
    so_cmnd,
    so_cmnd_confidence,
    nguoinhan,
    nguoinhan_confidence,
    stk_nguoinhan,
    stk_nguoinhan_confidence,
    nganhang_nguoinhan,
    nganhang_nguoinhan_confidence,
    sotien,
    sotien_confidence,
    phichuyentien,
    phichuyentien_confidence,
    noidung,
    noidung_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="H??? t??n ng?????i n???p ti???n"
        value={nguoinop}
        confidence={nguoinop_confidence}
      />
      <Field
        name="S??? CMND/H??? chi???u/Passport ng?????i n???p ti???n"
        value={so_cmnd}
        confidence={so_cmnd_confidence}
      />
      <Field
        name="H??? t??n ng?????i nh???n ti???n"
        value={nguoinhan}
        confidence={nguoinhan_confidence}
      />
      <Field
        name="S??? t??i kho???n ng?????i nh???n"
        value={stk_nguoinhan}
        confidence={stk_nguoinhan_confidence}
      />
      <Field
        name="T??n ng??n h??ng ng?????i nh???n"
        value={nganhang_nguoinhan}
        confidence={nganhang_nguoinhan_confidence}
      />
      <Field
        name="S??? ti???n chuy???n kho???n"
        value={sotien}
        confidence={sotien_confidence}
      />
      <Field
        name="Ph?? chuy???n kho???n"
        value={phichuyentien}
        confidence={phichuyentien_confidence}
      />
      <Field
        name="N???i dung chuy???n kho???n"
        value={noidung}
        confidence={noidung_confidence}
      />
    </>
  );
}

function Visa({ data }) {
  const {
    name,
    name_confidence,
    date_of_birth,
    date_of_birth_confidence,
    gender,
    gender_confidence,
    nationality,
    nationality_confidence,
    passport_number,
    passport_number_confidence,
    visa_number,
    visa_number_confidence,
    period_of_stay,
    period_of_stay_confidence,
    number_of_entries,
    number_of_entries_confidence,
    date_of_issue,
    date_of_issue_confidence,
    expiry_date,
    expiry_date_confidence,
    intended_date,
    intended_date_confidence,
  } = data || {};

  return (
    <>
      <Field name="T??n c???a kh??ch" value={name} confidence={name_confidence} />
      <Field
        name="Ng??y sinh c???a kh??ch"
        value={date_of_birth}
        confidence={date_of_birth_confidence}
      />
      <Field
        name="Gi???i t??nh c???a kh??ch"
        value={gender}
        confidence={gender_confidence}
      />
      <Field
        name="Qu???c t???ch c???a kh??ch"
        value={nationality}
        confidence={nationality_confidence}
      />
      <Field
        name="S??? h??? chi???u c???a kh??ch"
        value={passport_number}
        confidence={passport_number_confidence}
      />
      <Field
        name="S??? visa c???a kh??ch"
        value={visa_number}
        confidence={visa_number_confidence}
      />
      <Field
        name="Th???i gian l??u tr??"
        value={period_of_stay}
        confidence={period_of_stay_confidence}
      />
      <Field
        name="S??? l?????ng ????ng k??"
        value={number_of_entries}
        confidence={number_of_entries_confidence}
      />
      <Field
        name="Ng??y ????ng k??"
        value={date_of_issue}
        confidence={date_of_issue_confidence}
      />
      <Field
        name="Ng??y h???t h???n"
        value={expiry_date}
        confidence={expiry_date_confidence}
      />
      <Field
        name="Ng??y d??? ki???n ?????n"
        value={intended_date}
        confidence={intended_date_confidence}
      />
    </>
  );
}

function HopDongTraiPhieu({ data }) {
  const {
    so_hd,
    so_hd_confidence,
    ten_ben_ban,
    ten_ben_ban_confidence,
    so_cmnd,
    so_cmnd_confidence,
    noi_cap,
    noi_cap_confidence,
    ngay_cap,
    ngay_cap_confidence,
    dia_chi,
    dia_chi_confidence,
    so_tkgdck,
    so_tkgdck_confidence,
    ten_trai_phieu,
    ten_trai_phieu_confidence,
    to_chuc_phat_hanh,
    to_chuc_phat_hanh_confidence,
    dai_ly,
    dai_ly_confidence,
    ngay_phat_hanh,
    ngay_phat_hanh_confidence,
    ngay_dao_han,
    ngay_dao_han_confidence,
    menh_gia,
    menh_gia_confidence,
    ngay_thanh_toan,
    ngay_thanh_toan_confidence,
    so_luong_trai_phieu,
    so_luong_trai_phieu_confidence,
    don_gia_trai_phieu,
    don_gia_trai_phieu_confidence,
    tong_gia_trai_phieu,
    tong_gia_trai_phieu_confidence,
    thue_thu_ca_nhan,
    thue_thu_ca_nhan_confidence,
    phi_quan_ly,
    phi_quan_ly_confidence,
    so_tien_ben_ban,
    so_tien_ben_ban_confidence,
    nguoi_thu_huong,
    nguoi_thu_huong_confidence,
    so_tai_khoan,
    so_tai_khoan_confidence,
    mo_tai,
    mo_tai_confidence,
    noi_dung,
    noi_dung_confidence,
  } = data || {};

  return (
    <>
      <Field name="S??? H??" value={so_hd} confidence={so_hd_confidence} />
      <Field
        name="T??n b??n b??n"
        value={ten_ben_ban}
        confidence={ten_ben_ban_confidence}
      />
      <Field name="S??? CMND" value={so_cmnd} confidence={so_cmnd_confidence} />
      <Field name="N??i c???p" value={noi_cap} confidence={noi_cap_confidence} />
      <Field
        name="Ng??y c???p"
        value={ngay_cap}
        confidence={ngay_cap_confidence}
      />
      <Field name="?????a ch???" value={dia_chi} confidence={dia_chi_confidence} />
      <Field
        name="S??? TKGDCK"
        value={so_tkgdck}
        confidence={so_tkgdck_confidence}
      />
      <Field
        name="T??n tr??i phi???u"
        value={ten_trai_phieu}
        confidence={ten_trai_phieu_confidence}
      />
      <Field
        name="T??? ch???c ph??t h??nh"
        value={to_chuc_phat_hanh}
        confidence={to_chuc_phat_hanh_confidence}
      />
      <Field
        name="?????i l?? ????ng k?? l??u k?? v?? ?????i l?? thanh to??n"
        value={dai_ly}
        confidence={dai_ly_confidence}
      />
      <Field
        name="Ng??y ph??t h??nh"
        value={ngay_phat_hanh}
        confidence={ngay_phat_hanh_confidence}
      />
      <Field
        name="Ng??y ????o h???n"
        value={ngay_dao_han}
        confidence={ngay_dao_han_confidence}
      />
      <Field
        name="M???nh gi??"
        value={menh_gia}
        confidence={menh_gia_confidence}
      />
      <Field
        name="Ng??y thanh to??n"
        value={ngay_thanh_toan}
        confidence={ngay_thanh_toan_confidence}
      />
      <Field
        name="S??? l?????ng Tr??i phi???u giao d???ch"
        value={so_luong_trai_phieu}
        confidence={so_luong_trai_phieu_confidence}
      />
      <Field
        name="????n gi?? b??n Tr??i phi???u"
        value={don_gia_trai_phieu}
        confidence={don_gia_trai_phieu_confidence}
      />
      <Field
        name="T???ng gi?? b??n Tr??i phi???u"
        value={tong_gia_trai_phieu}
        confidence={tong_gia_trai_phieu_confidence}
      />
      <Field
        name="Thu??? thu nh???p c?? nh??n"
        value={thue_thu_ca_nhan}
        confidence={thue_thu_ca_nhan_confidence}
      />
      <Field
        name="Ph?? qu???n l?? chuy???n nh?????ng"
        value={phi_quan_ly}
        confidence={phi_quan_ly_confidence}
      />
      <Field
        name="S??? ti???n b??n b??n th???c nh???n"
        value={so_tien_ben_ban}
        confidence={so_tien_ben_ban_confidence}
      />
      <Field
        name="Ng?????i th??? h?????ng"
        value={nguoi_thu_huong}
        confidence={nguoi_thu_huong_confidence}
      />
      <Field
        name="S??? t??i kho???n"
        value={so_tai_khoan}
        confidence={so_tai_khoan_confidence}
      />
      <Field name="M??? t???i" value={mo_tai} confidence={mo_tai_confidence} />
      <Field
        name="N???i dung"
        value={noi_dung}
        confidence={noi_dung_confidence}
      />
    </>
  );
}

function CreditCard({ data }) {
  const {
    due_date,
    due_date_confidence,
    issue_date,
    issue_date_confidence,
    name,
    name_confidence,
    number,
    number_confidence,
  } = data || {};

  return (
    <>
      <Field name="S??? th???" value={number} confidence={number_confidence} />
      <Field name="H??? t??n ch??? th???" value={name} confidence={name_confidence} />
      <Field
        name="Ng??y h???t h???n"
        value={due_date}
        confidence={due_date_confidence}
      />
      <Field
        name="Ng??y c???p"
        value={issue_date}
        confidence={issue_date_confidence}
      />
    </>
  );
}

function DeNghiVanVon({ data }) {
  const {
    ten_khach_hang,
    ten_khach_hang_confidence,
    so_cmt_khach_hang,
    so_cmt_khach_hang_confidence,
    ngay_cap_khach_hang,
    ngay_cap_khach_hang_confidence,
    noi_cap_khach_hang,
    noi_cap_khach_hang_confidence,
    so_cmt_cu_khach_hang,
    so_cmt_cu_khach_hang_confidence,
    ngay_sinh_khach_hang,
    ngay_sinh_khach_hang_confidence,
    gioi_tinh_khach_hang,
    gioi_tinh_khach_hang_confidence,
    so_dien_thoai_khach_hang,
    so_dien_thoai_khach_hang_confidence,
    email_khach_hang,
    email_khach_hang_confidence,
    dc_thuong_tru_khach_hang,
    dc_thuong_tru_khach_hang_confidence,
    dc_lien_he_khach_hang,
    dc_lien_he_khach_hang_confidence,
    tinh_trang_hon_nhan,
    tinh_trang_hon_nhan_confidence,
    ten_vo_chong,
    ten_vo_chong_confidence,
    so_cmt_vo_chong,
    so_cmt_vo_chong_confidence,
    ngay_cap_vo_chong,
    ngay_cap_vo_chong_confidence,
    noi_cap_vo_chong,
    noi_cap_vo_chong_confidence,
    ngay_sinh_vo_chong,
    ngay_sinh_vo_chong_confidence,
    gioi_tinh_vo_chong,
    gioi_tinh_vo_chong_confidence,
    so_dien_thoai_vo_chong,
    so_dien_thoai_vo_chong_confidence,
    email_vo_chong,
    email_vo_chong_confidence,
    dc_thuong_tru_vo_chong,
    dc_thuong_tru_vo_chong_confidence,
    dc_lien_he_vo_chong,
    dc_lien_he_vo_chong_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="T??n kh??ch h??ng"
        value={ten_khach_hang}
        confidence={ten_khach_hang_confidence}
      />
      <Field
        name="S??? CMT kh??ch h??ng"
        value={so_cmt_khach_hang}
        confidence={so_cmt_khach_hang_confidence}
      />
      <Field
        name="Ng??y c???p kh??ch h??ng"
        value={ngay_cap_khach_hang}
        confidence={ngay_cap_khach_hang_confidence}
      />
      <Field
        name="N??i c???p kh??ch h??ng"
        value={noi_cap_khach_hang}
        confidence={noi_cap_khach_hang_confidence}
      />
      <Field
        name="S??? CMT kh??ch h??ng"
        value={so_cmt_cu_khach_hang}
        confidence={so_cmt_cu_khach_hang_confidence}
      />
      <Field
        name="Ng??y sinh kh??ch h??ng"
        value={ngay_sinh_khach_hang}
        confidence={ngay_sinh_khach_hang_confidence}
      />
      <Field
        name="Gi???i t??nh kh??ch h??ng"
        value={gioi_tinh_khach_hang}
        confidence={gioi_tinh_khach_hang_confidence}
      />
      <Field
        name="SDT kh??ch h??ng"
        value={so_dien_thoai_khach_hang}
        confidence={so_dien_thoai_khach_hang_confidence}
      />
      <Field
        name="Email kh??ch h??ng"
        value={email_khach_hang}
        confidence={email_khach_hang_confidence}
      />
      <Field
        name="?????a ch??? th?????ng tr?? kh??ch h??ng"
        value={dc_thuong_tru_khach_hang}
        confidence={dc_thuong_tru_khach_hang_confidence}
      />
      <Field
        name="?????a ch??? li??n h??? kh??ch h??ng"
        value={dc_lien_he_khach_hang}
        confidence={dc_lien_he_khach_hang_confidence}
      />
      <Field
        name="T??nh tr???ng h??n nh??n kh??ch h??ng"
        value={tinh_trang_hon_nhan}
        confidence={tinh_trang_hon_nhan_confidence}
      />
      <Field
        name="T??n v???/ch???ng"
        value={ten_vo_chong}
        confidence={ten_vo_chong_confidence}
      />
      <Field
        name="S??? CMT v???/ch???ng"
        value={so_cmt_vo_chong}
        confidence={so_cmt_vo_chong_confidence}
      />
      <Field
        name="Ng??y c???p v???/ch???ng"
        value={ngay_cap_vo_chong}
        confidence={ngay_cap_vo_chong_confidence}
      />
      <Field
        name="N??i c???p v???/ch???ng"
        value={noi_cap_vo_chong}
        confidence={noi_cap_vo_chong_confidence}
      />
      <Field
        name="Ng??y sinh v???/ch???ng"
        value={ngay_sinh_vo_chong}
        confidence={ngay_sinh_vo_chong_confidence}
      />
      <Field
        name="Gi???i t??nh v???/ch???ng"
        value={gioi_tinh_vo_chong}
        confidence={gioi_tinh_vo_chong_confidence}
      />
      <Field
        name="S??? ??i???n tho???i v???/ch???ng"
        value={so_dien_thoai_vo_chong}
        confidence={so_dien_thoai_vo_chong_confidence}
      />
      <Field
        name="Email v???/ch???ng"
        value={email_vo_chong}
        confidence={email_vo_chong_confidence}
      />
      <Field
        name="?????a ch??? th?????ng tr?? v???/ch???ng"
        value={dc_thuong_tru_vo_chong}
        confidence={dc_thuong_tru_vo_chong_confidence}
      />
      <Field
        name="?????a ch??? li??n h??? v???/ch???ng"
        value={dc_lien_he_vo_chong}
        confidence={dc_lien_he_vo_chong_confidence}
      />
    </>
  );
}

function PhieuLaoDong({ data }) {
  const {
    chuyen_nganh_dao_tao,
    cong_viec_cu_the_dang_lam,
    dia_chi_noi_lam_viec,
    doi_tuong_uu_tien,
    gioi_tinh,
    ho_ten,
    hop_dong_lao_dong,
    loai_BHXH,
    loai_hinh_doanh_nghiep,
    loai_hinh_noi_lam_viec,
    loai_hop_dong_lao_dong,
    loai_that_nghiep,
    ly_do_khong_tham_gia,
    ma_dan_toc,
    ma_ho_gia_dinh,
    ma_quan_huyen,
    ma_so_bhxh,
    ma_thon_to,
    ma_tinh_thanh_pho,
    ma_xa_phuong,
    ngay_sinh,
    noi_dang_ky_thuong_tru,
    noi_lam_viec,
    noi_o_hien_tai,
    quan_he_voi_chu_ho,
    quan_huyen,
    so_cccd_cmnd,
    ten_dan_toc,
    tham_gia_BHXH,
    thoi_gian_bat_dau_thuc_hien_hdld,
    thoi_gian_that_nghiep,
    thon_to,
    tinh_thanh_pho,
    tinh_trang_tham_gia_lao_dong,
    trinh_do_chuyen_mon_ky_thuat,
    trinh_do_giao_duc_pho_thong,
    vi_the_viec_lam,
    xa_phuong,
  } = data || {};

  const textMaps = {
    IsAnh: "Anh",
    IsCha_me: "Cha/M???",
    IsChau_ruot: "Ch??u ru???t",
    IsChi: "Ch???",
    IsChu_ho: "Ch??? h???",
    IsCon: "Con",
    IsEm: "Em",
    IsKhac: "Kh??c",
    IsOng_ba: "??ng/B??",
    IsVo_chong: "V???/Ch???ng",
    IsNam: "Nam",
    IsNu: "N???",
    IsDan_toc_thieu_so: "D??n t???c thi???u s???",
    IsNguoi_khuyet_tat: "Ng?????i khuy???t t???t",
    IsThan_nhan_cua_nguoi_co_cong_voi_cach_mang:
      "Th??n nh??n c???a ng?????i c?? c??ng v???i c??ch m???ng",
    IsThuoc_ho_bi_thu_hoi_dat: "Thu???c h??? b??? thu h???i ?????t",
    IsThuoc_ho_can_ngheo: "Thu???c h??? c???n ngh??o",
    IsThuoc_ho_ngheo: "Thu???c h??? ngh??o",
    IsChua_hoc_xong_tieu_hoc: "Ch??a h???c xong Ti???u h???c",
    IsTot_nghiep_THCS: "T???t nghi???p THCS",
    IsTot_nghiep_THPT: "T???t nghi???p THPT",
    IsTot_nghiep_tieu_hoc: "T???t nghi???p Ti???u h???c",
    IsCNKT_khong_co_bang: "CNKT kh??ng c?? b???ng",
    IsCao_dang: "Cao ?????ng",
    IsChua_qua_dao_tao: "Ch??a qua ????o t???o",
    IsChung_chi_nghe_D3T: "Ch???ng ch??? ngh??? d?????i 3 th??ng",
    IsDai_hoc: "?????i h???c",
    IsSo_cap: "S?? c???p",
    IsTren_dai_hoc: "Tr??n ?????i h???c",
    IsTrung_cap: "Trung c???p",
    IsKhong_tham_gia_lao_dong: "Kh??ng tham gia ho???t ?????ng kinh t???",
    IsNguoi_co_viec_lam: "Ng?????i c?? vi???c l??m",
    IsNguoi_that_nghiep: "Ng?????i th???t nghi???p",
    IsChu_co_so_SXKD: "Ch??? c?? s??? SXKD",
    IsLam_cong_an_luong: "L??m c??ng ??n l????ng",
    IsLao_dong_gia_dinh: "Lao ?????ng gia ????nh",
    IsTu_lam: "T??? l??m",
    IsXa_vien_HTX: "X?? vi??n HTX",
    IsCo: "C??",
    IsKhong: "Kh??ng",
    IsHDLD_khong_xac_dinh_thoi_han: "H??L?? kh??ng x??c ?????nh th???i h???n",
    IsHDLD_xac_dinh_thoi_han: "H??L?? x??c ?????nh th???i h???n",
    IsCa_nhan_lam_tu_do: "C?? nh??n l??m t??? do",
    IsCo_so_kinh_doanh_ca_the: "C?? s??? kinh doanh c?? th???",
    IsDoanh_nghiep: "Doanh nghi???p",
    IsDon_vi_su_nghiep_ngoai_nha_nuoc: "????n v??? s??? nghi???p ngo??i nh?? n?????c",
    IsHo_nong_lam_ngiep_thuy_san: "H??? n??ng, l??m nghi???p, th???y s???n",
    IsHop_tac_xa: "H???p t??c x??",
    IsKhu_vuc_nha_nuoc: "Khu v???c nh?? n?????c",
    IsKhu_vuc_nuoc_ngoai: "Khu v???c n?????c ngo??i",
    IsTo_chuc_doan_the_khac: "T?? ch???c ??o??n th??? kh??c",
    IsChua_bao_gio_lam_viec: "Ch??a bao gi??? l??m vi???c",
    IsDa_tung_lam_viec: "???? t??? l??m vi???c",
    IsDuoi_3_thang: "D?????i 3 th??ng",
    IsTren_1_nam: "Tr??n 1 n??m",
    IsTu_3_thang_den_1_nam: "T??? 3 th??ng ?????n 1 n??m",
    IsBat_buoc: "B???t bu???c",
    IsTu_nguyen: "T??? nguy???n",
    IsDi_hoc: "??i h???c",
    IsHuu_tri: "H??u tr??",
    IsKhac: "Kh??c",
    IsKhuyet_tat: "Khuy???t t???t",
    IsNoi_tro: "N???i tr???",
    IsDN_FDI: "DN FDI",
    IsDN_ngoai_nha_nuoc: "DN ngo??i Nh?? n?????c",
    IsDN_nha_nuoc: "DN N?? n?????c",
  };

  const format = (obj) =>
    Object.keys(obj)
      .filter((key) => obj[key])
      .map((key) => textMaps[key])
      .join(", ");

  return (
    <>
      <Field name="T???nh/th??nh ph???" value={tinh_thanh_pho} />
      <Field name="M?? t???nh/th??nh ph???" value={ma_tinh_thanh_pho} />
      <Field name="Qu???n/huy???n" value={quan_huyen} />
      <Field name="M?? qu???n/huy???n" value={ma_quan_huyen} />
      <Field name="X??/ph?????ng" value={xa_phuong} />
      <Field name="M?? x??/ph?????ng" value={ma_xa_phuong} />
      <Field name="Th??n/t???" value={thon_to} />
      <Field name="M?? th??n/t???" value={ma_thon_to} />
      <Field name="M?? h??? gia ????nh" value={ma_ho_gia_dinh} />
      <Field name="H??? t??n" value={ho_ten} />
      <Field name="Quan h??? v???i ch??? h???" value={format(quan_he_voi_chu_ho)} />
      <Field name="Ng??y sinh" value={ngay_sinh} />
      <Field name="Gi???i t??nh" value={format(gioi_tinh)} />
      <Field name="S??? CCCD/CMND" value={so_cccd_cmnd} />
      <Field name="M?? s??? BHXH" value={ma_so_bhxh} />
      <Field name="N??i ????ng k?? th?????ng tr??" value={noi_dang_ky_thuong_tru} />
      <Field name="N??i ??? hi???n t???i" value={noi_o_hien_tai} />
      <Field name="?????i t?????ng ??u ti??n" value={format(doi_tuong_uu_tien)} />
      <Field name="T??n d??n t???c" value={ten_dan_toc} />
      <Field name="M?? d??n t???c" value={ma_dan_toc} />
      <Field
        name="Tr??nh ????? gi??o d???c ph??? th??ng cao nh???t ???? t???t nghi???p"
        value={format(trinh_do_giao_duc_pho_thong)}
      />
      <Field
        name="Tr??nh ????? chuy??n m??n k??? thu???t cao nh???t ?????t ???????c"
        value={format(trinh_do_chuyen_mon_ky_thuat)}
      />
      <Field name="Chuy??n ng??nh ????o t???o" value={chuyen_nganh_dao_tao} />
      <Field
        name="T??nh tr???ng tham gia ho???t ?????ng kinh t???"
        value={format(tinh_trang_tham_gia_lao_dong)}
      />
      <Field name="L?? do kh??ng tham gia" value={format(ly_do_khong_tham_gia)} />
      <Field name="V??? th??? vi???c l??m" value={format(vi_the_viec_lam)} />
      <Field
        name="C??ng vi???c c??? th??? ??ang l??m"
        value={cong_viec_cu_the_dang_lam}
      />
      <Field name="Tham gia BHXH" value={format(tham_gia_BHXH)} />
      <Field name="Lo???i BHXH" value={format(loai_BHXH)} />
      <Field name="H???p ?????ng lao ?????ng" value={format(hop_dong_lao_dong)} />
      <Field
        name="Lo???i h???p ?????ng lao ?????ng"
        value={format(loai_hop_dong_lao_dong)}
      />
      <Field
        name="Th???i gian b???t ?????u th???c hi???n H??L??"
        value={thoi_gian_bat_dau_thuc_hien_hdld}
      />
      <Field name="N??i l??m vi???c" value={noi_lam_viec} />
      <Field
        name="Lo???i h??nh n??i l??m vi???c"
        value={format(loai_hinh_noi_lam_viec)}
      />
      <Field
        name="Lo???i h??nh doanh nghi???p"
        value={format(loai_hinh_doanh_nghiep)}
      />
      <Field name="?????a ch??? n??i l??m vi???c" value={dia_chi_noi_lam_viec} />
      <Field name="Lo???i th???t nghi???p" value={format(loai_that_nghiep)} />
      <Field
        name="Th???i gian th???t nghi???p"
        value={format(thoi_gian_that_nghiep)}
      />
    </>
  );
}

function SmsVideo({ data }) {
  const dataSource = data.map((d, index) => ({ id: index, ...d }));
  const columns = [
    {
      title: "img",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <img
          alt="img"
          src={`data:image/png;base64,${img}`}
          style={{ width: 150 }}
        />
      ),
    },
    {
      title: "text",
      dataIndex: "text",
      key: "text",
      render: (text) => <span style={{ whiteSpace: "pre-line" }}>{text}</span>,
    },
  ];

  return (
    <>
      {data.map((d, i) => {
        const { img, text } = d;
        return (
          <Space
            size={16}
            style={{ marginBottom: 20, width: "100%" }}
            align="start"
            key={i}
          >
            <picture>
              <img
                alt="img"
                src={`data:image/png;base64,${img}`}
                style={{ width: 150 }}
              />
            </picture>
            <span style={{ whiteSpace: "pre-line" }}>{text}</span>
          </Space>
        );
      })}
    </>
  );

  return (
    <TableWrapper>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(row) => row.id}
        showHeader={false}
        size="small"
        scroll={{ y: 600 }}
        paginnation={false}
      />
    </TableWrapper>
  );
}

function TonThatXe({ data }) {
  const typeOptions = {
    dent: "Xe b??? m??p (dent)",
    scratch: "Xe b??? tr???y, x?????c (scratch)",
    torn: "Xe b??? r??ch (torn)",
    broken: "Xe b??? v??? (broken)",
  };

  return (
    <>
      {data.map((d, index) => {
        const { damage_score, damage_type } = d;
        return (
          <Field
            key={index}
            value={typeOptions[damage_type]}
            confidence={damage_score}
          />
        );
      })}
    </>
  );
}

function CV({ data }) {
  console.log("???? ~ file: Result.jsx:964 ~ CV ~ data", data);
  // const { EDUCATION, EXPERIENCE, INFORMATION } = data;
  // const { CERT, GRAD = [], SPEC } = EDUCATION;
  // const { COMP = [], SKILL = [] } = EXPERIENCE;
  // const {
  //   ADDRESS,
  //   DOB,
  //   EMAIL = [],
  //   FACEBOOK = [],
  //   GENDER,
  //   HOME,
  //   LINKEDIN = [],
  //   NAME,
  //   OTHER = [],
  //   PHONE = [],
  // } = INFORMATION;

  return (
    <>
      <div style={{ color: "rgba(255,255,255,0.34)", padding: "12px 0" }}>
        -- TH??NG TIN --
      </div>
      {/* <Field name="H??? t??n" value={NAME} />
      <Field name="Gi???i t??nh" value={GENDER} />
      <Field name="Ng??y sinh" value={DOB} />
      <Field name="?????a ch???" value={ADDRESS} />
      <Field name="Nh??" value={HOME} />
      <div className="field">
        <div className="field-name">Email:</div>
        {EMAIL.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>
      <div className="field">
        <div className="field-name">Facebook:</div>
        {FACEBOOK.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>
      <div className="field">
        <div className="field-name">LinkedIn:</div>
        {LINKEDIN.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>
      <div className="field">
        <div className="field-name">??i???n tho???i:</div>
        {PHONE.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>
      <div className="field">
        <div className="field-name">Kh??c:</div>
        {OTHER.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>

      <div style={{ color: "rgba(255,255,255,0.34)", padding: "12px 0" }}>
        -- H???C V???N --
      </div>
      <div className="field">
        <div className="field-name">T???t nghi???p tr?????ng:</div>
        {GRAD.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>
      <Field name="Chuy??n ng??nh" value={SPEC} />
      <Field name="Ch???ng ch???" value={CERT} />

      <div style={{ color: "rgba(255,255,255,0.34)", padding: "12px 0" }}>
        -- K??? N??NG & KINH NGHI???M --
      </div>
      <div className="field">
        <div className="field-name">K??? n??ng:</div>
        {SKILL.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>
      <div className="field">
        <div className="field-name">C??ng ty:</div>
        {COMP.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div> */}
    </>
  );
}

function BangKe({ data }) {
  const {
    medical_facility,
    table_number,
    table_date,
    patient_name,
    address,
    pid,
    total_payment,
    medical_facility_confidence,
    table_number_confidence,
    table_date_confidence,
    patient_name_confidence,
    address_confidence,
    pid_confidence,
    total_payment_confidence,
    table,
  } = data || {};

  return (
    <>
      <Field
        name="T??n c?? s??? y t???"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="S??? b???ng k??"
        value={table_number}
        confidence={table_number_confidence}
      />
      <Field
        name="Ng??y b???ng k??"
        value={table_date}
        confidence={table_date_confidence}
      />
      <Field
        name="T??n b???nh nh??n"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field
        name="M?? y t???/M?? b???nh nh??n"
        value={pid}
        confidence={pid_confidence}
      />
      <Field
        name="T???ng ti???n thanh to??n"
        value={total_payment}
        confidence={total_payment_confidence}
      />
      {table?.info_table?.length ? (
        <BangTongQuat
          data={table.info_table.flatMap((table) => table)}
          scroll={{ x: 513, y: 400 }}
          type="bang-ke"
        />
      ) : null}
    </>
  );
}

function BangTongQuat({ data, type, ...props }) {
  const columns = data?.[0].map((item, index) => {
    const { value, box } = item;
    return {
      title: value,
      key: index,
      dataIndex: index,
      width: type === "bang-ke" && index === 1 ? 140 : "auto",
    };
  });

  const dataSource = data?.slice(1).map((row) => {
    let obj = {};
    row.forEach((e, index) => {
      obj[index] = e.value;
    });
    return obj;
  });

  return (
    <>
      {data?.length ? (
        <TableWrapper>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ x: 513 }}
            {...props}
          />
        </TableWrapper>
      ) : null}
    </>
  );
}

function HoaDonXe({ data }) {
  const {
    date,
    form,
    invoice_no,
    serial_no,
    supplier,
    tax_code,
    total_amount,
    info_goods,
    date_confidence,
    form_confidence,
    invoice_no_confidence,
    serial_no_confidence,
    supplier_confidence,
    tax_code_confidence,
    total_amount_confidence,
    payment_method,
    payment_method_box,
    payment_method_confidence,
    sub_total,
    sub_total_box,
    sub_total_confidence,
    vat_amount,
    vat_amount_box,
    vat_amount_confidence,
    purchaser_name,
    purchaser_name_box,
    purchaser_name_confidence,
    supplier_address,
    supplier_address_confidence,
    vat_rate,
    vat_rate_confidence,
    account_bank,
  } = data || {};

  const columns = [
    {
      title: "T??n h??ng h??a, d???ch v???",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Th??nh ti???n",
      dataIndex: "coin",
      key: "coin",
    },
  ];

  return (
    <>
      <Field name="Ng??y h??a ????n" value={date} confidence={date_confidence} />
      <Field name="M???u s???" value={form} confidence={form_confidence} />
      <Field
        name="S??? h??a ????n"
        value={invoice_no}
        confidence={invoice_no_confidence}
      />
      <Field
        name="S??? k?? hi???u h??a ????n"
        value={serial_no}
        confidence={serial_no_confidence}
      />
      <Field
        name="Nh?? cung c???p"
        value={supplier}
        confidence={supplier_confidence}
      />
      <Field
        name="M?? s??? thu??? nh?? cung c???p"
        value={tax_code}
        confidence={tax_code_confidence}
      />
      <Field
        name="H??nh th???c thanh to??n"
        value={payment_method}
        confidence={payment_method_confidence}
      />
      <Field
        name="Ti???n tr?????c thu???"
        value={sub_total}
        confidence={sub_total_confidence}
      />
      <Field
        name="Ti???n thu???"
        value={vat_amount}
        confidence={vat_amount_confidence}
      />
      <Field
        name="T??n ????n v???"
        value={purchaser_name}
        confidence={purchaser_name_confidence}
      />
      <Field
        name="?????a ch??? nh?? cung c???p"
        value={supplier_address}
        confidence={supplier_address_confidence}
      />
      <Field
        name="Thu??? su???t VAT"
        value={vat_rate}
        confidence={vat_rate_confidence}
      />
      {info_goods?.length ? (
        <TableWrapper>
          <Table dataSource={info_goods} columns={columns} pagination={false} />
        </TableWrapper>
      ) : null}
      <Field
        name="T???ng c???ng"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <div className="field">
        <div className="field-name">T??i kho???n ng??n h??ng:</div>
        <div className="field-value">
          {account_bank.map((item) => {
            const {
              account_no,
              account_no_box,
              account_no_confidence,
              bank,
              bank_box,
              bank_confidence,
            } = item;
            return (
              <div key={account_no} style={{ marginBottom: 8 }}>
                {account_no}{" "}
                <span className="confidence-label">- ????? tin c???y: </span>
                {getConfidence(account_no_confidence)}
                <br />
                {bank && (
                  <>
                    {bank}{" "}
                    <span className="confidence-label">- ????? tin c???y: </span>
                    {getConfidence(bank_confidence)}
                    <br />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function HoaDonVAT({ data }) {
  const {
    date,
    form,
    invoice_no,
    serial_no,
    supplier,
    tax_code,
    total_amount,
    info_goods,
    date_confidence,
    form_confidence,
    invoice_no_confidence,
    serial_no_confidence,
    supplier_confidence,
    tax_code_confidence,
    total_amount_confidence,
    payment_method,
    payment_method_box,
    payment_method_confidence,
    sub_total,
    sub_total_box,
    sub_total_confidence,
    vat_amount,
    vat_amount_box,
    vat_amount_confidence,
    purchaser_name,
    purchaser_name_box,
    purchaser_name_confidence,
    supplier_address,
    supplier_address_confidence,
    vat_rate,
    vat_rate_confidence,
    account_bank,
  } = data || {};

  const columns = [
    {
      title: "T??n h??ng h??a, d???ch v???",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Th??nh ti???n",
      dataIndex: "coin",
      key: "coin",
    },
  ];

  return (
    <>
      <Field name="Ng??y h??a ????n" value={date} confidence={date_confidence} />
      <Field name="M???u s???" value={form} confidence={form_confidence} />
      <Field
        name="S??? h??a ????n"
        value={invoice_no}
        confidence={invoice_no_confidence}
      />
      <Field
        name="S??? k?? hi???u h??a ????n"
        value={serial_no}
        confidence={serial_no_confidence}
      />
      <Field
        name="Nh?? cung c???p"
        value={supplier}
        confidence={supplier_confidence}
      />
      <Field
        name="M?? s??? thu??? nh?? cung c???p"
        value={tax_code}
        confidence={tax_code_confidence}
      />
      <Field
        name="H??nh th???c thanh to??n"
        value={payment_method}
        confidence={payment_method_confidence}
      />
      <Field
        name="?????a ch??? nh?? cung c???p"
        value={supplier_address}
        confidence={supplier_address_confidence}
      />
      <Field
        name="Thu??? su???t VAT"
        value={vat_rate}
        confidence={vat_rate_confidence}
      />
      {info_goods?.length ? (
        <TableWrapper>
          <Table dataSource={info_goods} columns={columns} pagination={false} />
        </TableWrapper>
      ) : null}
      <Field
        name="T???ng c???ng"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <div className="field">
        <div className="field-name">T??i kho???n ng??n h??ng:</div>
        <div className="field-value">
          {account_bank.map((item) => {
            const {
              account_no,
              account_no_box,
              account_no_confidence,
              bank,
              bank_box,
              bank_confidence,
            } = item;
            return (
              <div key={account_no} style={{ marginBottom: 8 }}>
                {account_no}{" "}
                <span className="confidence-label">- ????? tin c???y: </span>
                {getConfidence(account_no_confidence)}
                <br />
                {bank && (
                  <>
                    {bank}{" "}
                    <span className="confidence-label">- ????? tin c???y: </span>
                    {getConfidence(bank_confidence)}
                    <br />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function GiayKhaiTu({ data }) {
  const {
    so_khai_tu,
    so_khai_tu_confidence,
    ngay_khai_tu,
    ngay_khai_tu_confidence,
    ho_va_ten,
    ho_va_ten_confidence,
    ngay_sinh,
    ngay_sinh_confidence,
    gioi_tinh,
    gioi_tinh_confidence,
    dan_toc,
    dan_toc_confidence,
    quoc_tich,
    quoc_tich_confidence,
    so_dinh_danh,
    so_dinh_danh_confidence,
    so_cmnd_nguoi_mat,
    so_cmnd_nguoi_mat_confidence,
    noi_cap_cmnd_nguoi_mat,
    noi_cap_cmnd_nguoi_mat_confidence,
    ngay_cap_cmnd_nguoi_mat,
    ngay_cap_cmnd_nguoi_mat_confidence,
    nguyen_nhan_chet,
    nguyen_nhan_chet_confidence,
    nguoi_khai_tu,
    nguoi_khai_tu_confidence,
    so_cmnd_nguoi_khai_tu,
    so_cmnd_nguoi_khai_tu_confidence,
    noi_cap_cmnd_nguoi_khai_tu,
    noi_cap_cmnd_nguoi_khai_tu_confidence,
    ngay_cap_cmnd_nguoi_khai_tu,
    ngay_cap_cmnd_nguoi_khai_tu_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="S??? khai t???"
        value={so_khai_tu}
        confidence={so_khai_tu_confidence}
      />
      <Field
        name="Ng??y khai t???"
        value={ngay_khai_tu}
        confidence={ngay_khai_tu_confidence}
      />
      <Field
        name="H??? v?? t??n"
        value={ho_va_ten}
        confidence={ho_va_ten_confidence}
      />
      <Field
        name="Ng??y sinh"
        value={ngay_sinh}
        confidence={ngay_sinh_confidence}
      />
      <Field
        name="Gi???i t??nh"
        value={gioi_tinh}
        confidence={gioi_tinh_confidence}
      />
      <Field name="D??n t???c" value={dan_toc} confidence={dan_toc_confidence} />
      <Field
        name="Qu???c t???ch"
        value={quoc_tich}
        confidence={quoc_tich_confidence}
      />
      <Field
        name="S??? ?????nh danh"
        value={so_dinh_danh}
        confidence={so_dinh_danh_confidence}
      />
      <Field
        name="S??? CMND ng?????i m???t"
        value={so_cmnd_nguoi_mat}
        confidence={so_cmnd_nguoi_mat_confidence}
      />
      <Field
        name="N??i c???p CMND ng?????i m???t"
        value={noi_cap_cmnd_nguoi_mat}
        confidence={noi_cap_cmnd_nguoi_mat_confidence}
      />
      <Field
        name="Ng??y c???p CMND ng?????i m???t"
        value={ngay_cap_cmnd_nguoi_mat}
        confidence={ngay_cap_cmnd_nguoi_mat_confidence}
      />
      <Field
        name="Nguy??n nh??n ch???t"
        value={nguyen_nhan_chet}
        confidence={nguyen_nhan_chet_confidence}
      />
      <Field
        name="Ng?????i ??i khai t???"
        value={nguoi_khai_tu}
        confidence={nguoi_khai_tu_confidence}
      />
      <Field
        name="S??? CMND ng?????i khai t???"
        value={so_cmnd_nguoi_khai_tu}
        confidence={so_cmnd_nguoi_khai_tu_confidence}
      />
      <Field
        name="N??i c???p CMND ng?????i khai t???"
        value={noi_cap_cmnd_nguoi_khai_tu}
        confidence={noi_cap_cmnd_nguoi_khai_tu_confidence}
      />
      <Field
        name="Ng??y c???p CMND ng?????i khai t???"
        value={ngay_cap_cmnd_nguoi_khai_tu}
        confidence={ngay_cap_cmnd_nguoi_khai_tu_confidence}
      />
    </>
  );
}

function DangKyThue({ data }) {
  const {
    CMND,
    chung_nhan_DKKD,
    co_quan_quan_ly,
    ma_so_thue,
    ngay_cap_MST,
    quyet_dinh,
    ten_nguoi_nop_thue,
  } = data || {};

  return (
    <>
      <Field name="M?? s??? thu???" value={ma_so_thue} />
      <Field name="T??n ng?????i n???p thu???" value={ten_nguoi_nop_thue} />
      <Field
        name="Ng??y ch???ng nh???n ????ng k?? kinh doanh"
        value={chung_nhan_DKKD}
      />
      <Field name="Ng??y quy???t ?????nh th??nh l???p" value={quyet_dinh} />
      <Field name="S??? CMND" value={CMND} />
      <Field name="Ng??y c???p m?? s??? thu???" value={ngay_cap_MST} />
      <Field name="C?? quan qu???n l??" value={co_quan_quan_ly} />
    </>
  );
}

function SoHoKhau({ data }) {
  const {
    chu_ho,
    chu_ho_confidence,
    cmnd,
    cmnd_confidence,
    dan_toc,
    dan_toc_confidence,
    gioi_tinh,
    gioi_tinh_confidence,
    ho_va_ten,
    ho_va_ten_confidence,
    ngay_sinh,
    ngay_sinh_confidence,
    nguyen_quan,
    nguyen_quan_confidence,
    quan_he_chu_ho,
    quan_he_chu_ho_confidence,
    quoc_tich,
    quoc_tich_confidence,
    so,
    so_confidence,
    thuong_tru,
    thuong_tru_confidence,
    ton_giao,
    ton_giao_confidence,
  } = data || {};

  return (
    <>
      <Field name="S???" value={so} confidence={so_confidence} />
      <Field name="Ch??? h???" value={chu_ho} confidence={chu_ho_confidence} />
      <Field
        name="?????a ch??? th?????ng tr??"
        value={thuong_tru}
        confidence={thuong_tru_confidence}
      />
      <Field
        name="Quan h??? v???i ch??? h???"
        value={quan_he_chu_ho}
        confidence={quan_he_chu_ho_confidence}
      />
      <Field
        name="H??? v?? t??n th??nh vi??n"
        value={ho_va_ten}
        confidence={ho_va_ten_confidence}
      />
      <Field
        name="Ng??y sinh c???a th??nh vi??n"
        value={ngay_sinh}
        confidence={ngay_sinh_confidence}
      />
      <Field
        name="Gi???i t??nh c???a th??nh vi??n"
        value={gioi_tinh}
        confidence={gioi_tinh_confidence}
      />
      <Field
        name="Nguy??n qu??n c???a th??nh vi??n"
        value={nguyen_quan}
        confidence={nguyen_quan_confidence}
      />
      <Field
        name="D??n t???c c???a th??nh vi??n"
        value={dan_toc}
        confidence={dan_toc_confidence}
      />
      <Field
        name="T??n gi??o c???a th??nh vi??n"
        value={ton_giao}
        confidence={ton_giao_confidence}
      />
      <Field
        name="Qu???c t???ch c???a th??nh vi??n"
        value={quoc_tich}
        confidence={quoc_tich_confidence}
      />
      <Field
        name="S??? CMND c???a th??nh vi??n"
        value={cmnd}
        confidence={cmnd_confidence}
      />
    </>
  );
}

function LyLichTuPhap({ data }) {
  const {
    an_tich,
    an_tich_confidence,
    gioitinh,
    gioitinh_confidence,
    ho_va_ten,
    ho_va_ten_confidence,
    nam_tot_nghiep,
    nam_tot_nghiep_confidence,
    noi_sinh,
    noi_sinh_confidence,
    quoc_tich,
    quoc_tich_confidence,
    so_CCCD,
    so_CCCD_confidence,
    tam_tru,
    tam_tru_confidence,
    thuong_tru,
    thuong_tru_confidence,
    so,
    so_confidence,
    ngaycap,
    ngaycap_confidence,
    ngaycap_cmnd,
    ngaycap_cmnd_confidence,
    noicap_cmnd,
    noicap_cmnd_confidence,
  } = data || {};

  return (
    <>
      <Field name="S??? l?? l???ch t?? ph??p" value={so} confidence={so_confidence} />
      <Field
        name="Ng??y c???p l?? l???ch t?? ph??p"
        value={ngaycap}
        confidence={ngaycap_confidence}
      />
      <Field name="??n t??ch" value={an_tich} confidence={an_tich_confidence} />
      <Field
        name="Gi???i t??nh"
        value={gioitinh}
        confidence={gioitinh_confidence}
      />
      <Field
        name="H??? v?? t??n"
        value={ho_va_ten}
        confidence={ho_va_ten_confidence}
      />
      <Field
        name="N??m t???t nghi???p"
        value={nam_tot_nghiep}
        confidence={nam_tot_nghiep_confidence}
      />
      <Field
        name="N??i sinh"
        value={noi_sinh}
        confidence={noi_sinh_confidence}
      />
      <Field
        name="Qu???c t???ch"
        value={quoc_tich}
        confidence={quoc_tich_confidence}
      />
      <Field name="S??? CCCD" value={so_CCCD} confidence={so_CCCD_confidence} />
      <Field name="T???m tr??" value={tam_tru} confidence={tam_tru_confidence} />
      <Field
        name="Th?????ng tr??"
        value={thuong_tru}
        confidence={thuong_tru_confidence}
      />
      <Field
        name="Ng??y c???p CMND/H??? chi???u/TCC"
        value={ngaycap_cmnd}
        confidence={ngaycap_cmnd_confidence}
      />
      <Field
        name="N??i c???p CMND/H??? chi???u/TCC"
        value={noicap_cmnd}
        confidence={noicap_cmnd_confidence}
      />
    </>
  );
}

function DCTTCN({ data }) {
  const {
    so_hdbh,
    so_hdbh_confidence,
    ten_bmbh,
    ten_bmbh_confidence,
    so_cmnd,
    so_cmnd_confidence,
    ten_ndbh,
    ten_ndbh_confidence,
    diachi,
    diachi_confidence,
    dt_nha_rieng,
    dt_nha_rieng_confidence,
    dt_di_dong,
    dt_di_dong_confidence,
    email,
    email_confidence,
    ngay_thang_nam,
    ngay_thang_nam_confidence,
    ten_dkkd,
    ten_dkkd_confidence,
    ma_so_dkkd,
    ma_so_dkkd_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="S??? h???p ?????ng b???o hi???m"
        value={so_hdbh}
        confidence={so_hdbh_confidence}
      />
      <Field
        name="T??n b??n mua b???o hi???m"
        value={ten_bmbh}
        confidence={ten_bmbh_confidence}
      />
      <Field
        name="S??? CMND/ CCCD/ H??? chi???u"
        value={so_cmnd}
        confidence={so_cmnd_confidence}
      />
      <Field
        name="T??n N??BH 1"
        value={ten_ndbh}
        confidence={ten_ndbh_confidence}
      />
      <Field
        name="?????a ch??? li??n l???c"
        value={diachi}
        confidence={diachi_confidence}
      />
      <Field
        name="??T nh?? ri??ng"
        value={dt_nha_rieng}
        confidence={dt_nha_rieng_confidence}
      />
      <Field
        name="??T di ?????ng"
        value={dt_di_dong}
        confidence={dt_di_dong_confidence}
      />
      <Field name="Email" value={email} confidence={email_confidence} />
      <Field
        name="Ng??y/th??ng/n??m"
        value={ngay_thang_nam}
        confidence={ngay_thang_nam_confidence}
      />
      <Field
        name="T??n ??DKD"
        value={ten_dkkd}
        confidence={ten_dkkd_confidence}
      />
      <Field
        name="M?? s??? ??DKD"
        value={ma_so_dkkd}
        confidence={ma_so_dkkd_confidence}
      />
    </>
  );
}

function UyNhiemChi({ data }) {
  const {
    hotennguoitratien,
    hotennguoitratien_confidence,
    diachinguoitratien,
    diachinguoitratien_confidence,
    stk_nguoitratien,
    stk_nguoitratien_confidence,
    hotennguoihuong,
    hotennguoihuong_confidence,
    diachinguoihuong,
    diachinguoihuong_confidence,
    stk_nguoihuong,
    stk_nguoihuong_confidence,
    ngaylap,
    ngaylap_confidence,
    sotien,
    sotien_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="H??? t??n ng?????i tr??? ti???n"
        value={hotennguoitratien}
        confidence={hotennguoitratien_confidence}
      />
      <Field
        name="?????a ch??? ng?????i tr??? ti???n"
        value={diachinguoitratien}
        confidence={diachinguoitratien_confidence}
      />
      <Field
        name="S??? t??i kho???n ng?????i tr??? ti???n"
        value={stk_nguoitratien}
        confidence={stk_nguoitratien_confidence}
      />
      <Field
        name="H??? t??n ng?????i h?????ng"
        value={hotennguoihuong}
        confidence={hotennguoihuong_confidence}
      />
      <Field
        name="?????a ch??? ng?????i h?????ng"
        value={diachinguoihuong}
        confidence={diachinguoihuong_confidence}
      />
      <Field
        name="S??? t??i kho???n ng?????i h?????ng"
        value={stk_nguoihuong}
        confidence={stk_nguoihuong_confidence}
      />
      <Field name="Ng??y l???p" value={ngaylap} confidence={ngaylap_confidence} />
      <Field
        name="S??? ti???n b???ng s???"
        value={sotien}
        confidence={sotien_confidence}
      />
    </>
  );
}

function DangKyBaoHiem({ data }) {
  const {
    MBH_Ten,
    MBH_Ten_confidence,
    MBH_NgaySinh,
    MBH_NgaySinh_confidence,
    MBH_ID,
    MBH_ID_confidence,
    MBH_SDT,
    MBH_SDT_confidence,
    MBH_Email,
    MBH_Email_confidence,
    MBH_DiaChi,
    MBH_DiaChi_confidence,
    DBH_QH,
    DBH_QH_confidence,
    DBH_Ten,
    DBH_Ten_confidence,
    DBH_NgaySinh,
    DBH_NgaySinh_confidence,
    DBH_ID,
    DBH_ID_confidence,
    CT_ABYV,
    CT_ABYV_confidence,
    CT_ASHP,
    CT_ASHP_confidence,
    KKSK_1,
    KKSK_1_confidence,
    KKSK_2,
    KKSK_2_confidence,
    TenBenh,
    TenBenh_confidence,
    Ngay,
    Ngay_confidence,
    MaDL,
    MaDL_confidence,
    CongTy,
    CongTy_confidence,
    Phong,
    Phong_confidence,
    Co_Chu_Ky,
  } = data || {};

  return (
    <>
      <Field
        name="T??n ng?????i mua"
        value={MBH_Ten}
        confidence={MBH_Ten_confidence}
      />
      <Field
        name="Ng??y sinh ng?????i mua "
        value={MBH_NgaySinh}
        confidence={MBH_NgaySinh_confidence}
      />
      <Field
        name="S??? CMND/CCCD/HS/GKS ng?????i mua "
        value={MBH_ID}
        confidence={MBH_ID_confidence}
      />
      <Field
        name="S??? ??i???n tho???i ng?????i mua"
        value={MBH_SDT}
        confidence={MBH_SDT_confidence}
      />
      <Field
        name="Email ng?????i mua"
        value={MBH_Email}
        confidence={MBH_Email_confidence}
      />
      <Field
        name="?????a ch??? ng?????i mua"
        value={MBH_DiaChi}
        confidence={MBH_DiaChi_confidence}
      />
      <Field
        name="Ng?????i ???????c b???o hi???m l??"
        value={DBH_QH}
        confidence={DBH_QH_confidence}
      />
      <Field
        name="H??? t??n ng?????i ???????c b???o hi???m"
        value={DBH_Ten}
        confidence={DBH_Ten_confidence}
      />
      <Field
        name="Ng??y sinh ng?????i ???????c b???o hi???m"
        value={DBH_NgaySinh}
        confidence={DBH_NgaySinh_confidence}
      />
      <Field
        name="S??? CMND/CCCD/HS/GKS ng?????i ???????c b???o hi???m"
        value={DBH_ID}
        confidence={DBH_ID_confidence}
      />
      <Field name="G??i ABYV" value={CT_ABYV} confidence={CT_ABYV_confidence} />
      <Field name="G??i ASHP" value={CT_ASHP} confidence={CT_ASHP_confidence} />
      <Field
        name="K?? khai s???c kh???e 1"
        value={KKSK_1}
        confidence={KKSK_1_confidence}
      />
      <Field
        name="K?? khai s???c kh???e 2"
        value={KKSK_2}
        confidence={KKSK_2_confidence}
      />
      <Field
        name="T??n b???nh n???u c??"
        value={TenBenh}
        confidence={TenBenh_confidence}
      />
      <Field
        name="Ng??y vi???t y??u c???u b???o hi???m"
        value={Ngay}
        confidence={Ngay_confidence}
      />
      <Field name="M?? ?????i l??" value={MaDL} confidence={MaDL_confidence} />
      <Field name="T??n c??ng ty" value={CongTy} confidence={CongTy_confidence} />
      <Field name="T??n ph??ng" value={Phong} confidence={Phong_confidence} />
      <Field name="C?? ch??? k??" value={Co_Chu_Ky ? "C??" : "Kh??ng"} />
    </>
  );
}

function PhieuKhamBenh({ data }) {
  const {
    patient_address,
    patient_dob,
    patient_gender,
    patient_name,
    patient_nationality,
    patient_address_confidence,
    patient_dob_confidence,
    patient_gender_confidence,
    patient_name_confidence,
    patient_nationality_confidence,
    patient_address_box,
    patient_dob_box,
    patient_gender_box,
    patient_name_box,
    patient_nationality_box,
  } = data || {};

  return (
    <>
      <Field
        name="H??? t??n"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field
        name="Ng??y sinh"
        value={patient_dob}
        confidence={patient_dob_confidence}
      />
      <Field
        name="Gi???i t??nh"
        value={patient_gender}
        confidence={patient_gender_confidence}
      />
      <Field
        name="Qu???c t???ch"
        value={patient_nationality}
        confidence={patient_nationality_confidence}
      />
      <Field
        name="?????a ch???"
        value={patient_address}
        confidence={patient_address_confidence}
      />
    </>
  );
}

function GiayRaVien({ data }) {
  const {
    address,
    address_confidence,
    department,
    department_confidence,
    diagnose,
    diagnose_confidence,
    gender,
    gender_confidence,
    year_of_birth,
    year_of_birth_confidence,
    treatments,
    treatments_confidence,
    pid,
    pid_confidence,
    patient_name,
    patient_name_confidence,
    medical_facility,
    medical_facility_confidence,
    hospital_discharge_date,
    hospital_discharge_date_confidence,
    hospitalization_date,
    hospitalization_date_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="C?? s??? y t???"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Khoa"
        value={department}
        confidence={department_confidence}
      />
      <Field
        name="H??? v?? t??n"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field
        name="N??m sinh/Tu???i"
        value={year_of_birth}
        confidence={year_of_birth_confidence}
      />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field name="M?? y t???" value={pid} confidence={pid_confidence} />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field
        name="Ng??y v??o vi???n"
        value={hospitalization_date}
        confidence={hospitalization_date_confidence}
      />
      <Field
        name="Ng??y ra vi???n"
        value={hospital_discharge_date}
        confidence={hospital_discharge_date_confidence}
      />
      <Field
        name="Ch???n ??o??n"
        value={diagnose}
        confidence={diagnose_confidence}
      />
      <Field
        name="Ph????ng ph??p ??i???u tr???"
        value={treatments}
        confidence={treatments_confidence}
      />
    </>
  );
}

function HoaDon({ data }) {
  const {
    date,
    form,
    invoice_no,
    serial_no,
    supplier,
    tax_code,
    total_amount,
    info_goods,
    date_confidence,
    form_confidence,
    invoice_no_confidence,
    serial_no_confidence,
    supplier_confidence,
    tax_code_confidence,
    total_amount_confidence,
    payment_method,
    payment_method_box,
    payment_method_confidence,
    sub_total,
    sub_total_box,
    sub_total_confidence,
    vat_amount,
    vat_amount_box,
    vat_amount_confidence,
    purchaser_name,
    purchaser_name_box,
    purchaser_name_confidence,
    supplier_address,
    supplier_address_confidence,
    vat_rate,
    vat_rate_confidence,
    account_bank,
    table,
  } = data || {};

  const columns = table?.[0]?.map((item, index) => {
    const { value, box } = item;
    return { title: value, key: index, dataIndex: index };
  });

  const dataSource = table?.slice(1)?.map((row) => {
    let obj = {};
    row.forEach((e, index) => {
      obj[index] = e.value;
    });
    return obj;
  });

  return (
    <>
      <Field name="Ng??y h??a ????n" value={date} confidence={date_confidence} />
      <Field name="M???u s???" value={form} confidence={form_confidence} />
      <Field
        name="S??? h??a ????n"
        value={invoice_no}
        confidence={invoice_no_confidence}
      />
      <Field
        name="S??? k?? hi???u h??a ????n"
        value={serial_no}
        confidence={serial_no_confidence}
      />
      <Field
        name="Nh?? cung c???p"
        value={supplier}
        confidence={supplier_confidence}
      />
      <Field
        name="M?? s??? thu??? nh?? cung c???p"
        value={tax_code}
        confidence={tax_code_confidence}
      />
      <Field
        name="H??nh th???c thanh to??n"
        value={payment_method}
        confidence={payment_method_confidence}
      />
      <Field
        name="Ti???n tr?????c thu???"
        value={sub_total}
        confidence={sub_total_confidence}
      />
      <Field
        name="Ti???n thu???"
        value={vat_amount}
        confidence={vat_amount_confidence}
      />
      <Field
        name="T??n ????n v???"
        value={purchaser_name}
        confidence={purchaser_name_confidence}
      />
      <Field
        name="?????a ch??? nh?? cung c???p"
        value={supplier_address}
        confidence={supplier_address_confidence}
      />
      <Field
        name="Thu??? su???t VAT"
        value={vat_rate}
        confidence={vat_rate_confidence}
      />
      {table?.length ? (
        <TableWrapper>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ x: 513 }}
          />
        </TableWrapper>
      ) : null}
      <Field
        name="T???ng c???ng"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <div className="field">
        <div className="field-name">T??i kho???n ng??n h??ng:</div>
        <div className="field-value">
          {account_bank.map((item) => {
            const {
              account_no,
              account_no_box,
              account_no_confidence,
              bank,
              bank_box,
              bank_confidence,
            } = item;
            return (
              <div key={account_no} style={{ marginBottom: 8 }}>
                {account_no}{" "}
                <span className="confidence-label">- ????? tin c???y: </span>
                {getConfidence(account_no_confidence)}
                <br />
                {bank && (
                  <>
                    {bank}{" "}
                    <span className="confidence-label">- ????? tin c???y: </span>
                    {getConfidence(bank_confidence)}
                    <br />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function BaoGiaXe({ data }) {
  const {
    name_of_garage,
    name_of_garage_confidence,
    quotation_date,
    quotation_date_confidence,
    estimated_delivery_date,
    estimated_delivery_date_confidence,
    total_amount,
    total_amount_confidence,
    sub_total,
    sub_total_confidence,
    vat_amount,
    vat_amount_confidence,
    table,
  } = data || {};

  const columns = [
    {
      title: "T??n ph??? t??ng, v???t t??",
      key: "description",
      dataIndex: "description",
      width: 200,
    },
    {
      title: "S??? l?????ng",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "????n gi??",
      key: "unit_price",
      dataIndex: "unit_price",
    },
    {
      title: "Ph???n tr??m gi???m gi??",
      key: "percent_discount",
      dataIndex: "percent_discount",
    },
    {
      title: "Gi???m gi??",
      key: "discount",
      dataIndex: "discount",
    },
    {
      title: "Ph???n tr??m thu???",
      key: "tax",
      dataIndex: "tax",
    },
    {
      title: "Th??nh ti???n",
      key: "amount_total",
      dataIndex: "amount_total",
    },
  ];

  return (
    <>
      <Field
        name="T??n gara, x?????ng s???a ch???a"
        value={name_of_garage}
        confidence={name_of_garage_confidence}
      />
      <Field
        name="Ng??y b??o gi??"
        value={quotation_date}
        confidence={quotation_date_confidence}
      />
      <Field
        name="Ng??y d??? ki???n giao xe"
        value={estimated_delivery_date}
        confidence={estimated_delivery_date_confidence}
      />
      <Field
        name="T???ng ti???n sau thu???"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <Field
        name="T???ng ti???n tr?????c thu???"
        value={sub_total}
        confidence={sub_total_confidence}
      />
      <Field
        name="Ti???n thu???"
        value={vat_amount}
        confidence={vat_amount_confidence}
      />
      {table?.length ? (
        <TableWrapper>
          <Table
            dataSource={table}
            columns={columns}
            pagination={false}
            scroll={{ x: 513 }}
          />
        </TableWrapper>
      ) : null}
    </>
  );
}

function HoaDonFull({ data }) {
  const {
    date,
    form,
    invoice_no,
    serial_no,
    supplier,
    tax_code,
    total_amount,
    info_goods,
    date_confidence,
    form_confidence,
    invoice_no_confidence,
    serial_no_confidence,
    supplier_confidence,
    tax_code_confidence,
    total_amount_confidence,
    payment_method,
    payment_method_box,
    payment_method_confidence,
    sub_total,
    sub_total_box,
    sub_total_confidence,
    vat_amount,
    vat_amount_box,
    vat_amount_confidence,
    purchaser_name,
    purchaser_name_box,
    purchaser_name_confidence,
    supplier_address,
    supplier_address_confidence,
    vat_rate,
    vat_rate_confidence,
    account_bank,
    table,
  } = data || {};

  const columns = table?.[0]?.map((item, index) => {
    const { value, box } = item;
    return { title: value, key: index, dataIndex: index };
  });

  const dataSource = table?.slice(1)?.map((row) => {
    let obj = {};
    row.forEach((e, index) => {
      obj[index] = e.value;
    });
    return obj;
  });

  return (
    <>
      <Field name="Ng??y h??a ????n" value={date} confidence={date_confidence} />
      <Field name="M???u s???" value={form} confidence={form_confidence} />
      <Field
        name="S??? h??a ????n"
        value={invoice_no}
        confidence={invoice_no_confidence}
      />
      <Field
        name="S??? k?? hi???u h??a ????n"
        value={serial_no}
        confidence={serial_no_confidence}
      />
      <Field
        name="Nh?? cung c???p"
        value={supplier}
        confidence={supplier_confidence}
      />
      <Field
        name="M?? s??? thu??? nh?? cung c???p"
        value={tax_code}
        confidence={tax_code_confidence}
      />
      <Field
        name="H??nh th???c thanh to??n"
        value={payment_method}
        confidence={payment_method_confidence}
      />
      <Field
        name="Ti???n tr?????c thu???"
        value={sub_total}
        confidence={sub_total_confidence}
      />
      <Field
        name="Ti???n thu???"
        value={vat_amount}
        confidence={vat_amount_confidence}
      />
      <Field
        name="T??n ????n v???"
        value={purchaser_name}
        confidence={purchaser_name_confidence}
      />
      <Field
        name="?????a ch??? nh?? cung c???p"
        value={supplier_address}
        confidence={supplier_address_confidence}
      />
      <Field
        name="Thu??? su???t VAT"
        value={vat_rate}
        confidence={vat_rate_confidence}
      />
      {table?.length ? (
        <TableWrapper>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ x: 513 }}
          />
        </TableWrapper>
      ) : null}
      <Field
        name="T???ng c???ng"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <div className="field">
        <div className="field-name">T??i kho???n ng??n h??ng:</div>
        <div className="field-value">
          {account_bank?.map((item) => {
            const {
              account_no,
              account_no_box,
              account_no_confidence,
              bank,
              bank_box,
              bank_confidence,
            } = item;
            return (
              <div key={account_no} style={{ marginBottom: 8 }}>
                {account_no}{" "}
                <span className="confidence-label">- ????? tin c???y: </span>
                {getConfidence(account_no_confidence)}
                <br />
                {bank && (
                  <>
                    {bank}{" "}
                    <span className="confidence-label">- ????? tin c???y: </span>
                    {getConfidence(bank_confidence)}
                    <br />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function BoiThuongBH({ data }) {
  const {
    phone_number,
    policy_no,
    email,
    phone_number_confidence,
    policy_no_confidence,
    email_confidence,
    insure_name,
    insure_name_confidence,

    date_of_accident,
    date_of_accident_confidence,
    treatment_method,
    treatment_method_confidence,
    medical_facility,
    medical_facility_confidence,
    diagnose,
    diagnose_confidence,
    total_insured_amount,
    total_insured_amount_confidence,
    beneficiary,
    beneficiary_confidence,
    bank,
    bank_confidence,
    account_number,
    account_number_confidence,
    cash,
    cash_confidence,
    id_card,
    id_card_confidence,
    claimant,
    claimant_confidence,
    claimant_phone,
    claimant_phone_confidence,
    claimant_address,
    claimant_address_confidence,
    claimant_email,
    claimant_email_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="T??n ng?????i ???????c b???o hi???m"
        value={insure_name}
        confidence={insure_name_confidence}
      />
      <Field
        name="S??? th??? b???o hi???m"
        value={policy_no}
        confidence={policy_no_confidence}
      />
      <Field
        name="S??? ??i???n tho???i"
        value={phone_number}
        confidence={phone_number_confidence}
      />
      <Field name="Email" value={email} confidence={email_confidence} />
      <Field
        name="Ng??y x???y ra"
        value={date_of_accident}
        confidence={date_of_accident_confidence}
      />
      <Field
        name="H??nh th???c ??i???u tr???"
        value={treatment_method}
        confidence={treatment_method_confidence}
      />
      <Field
        name="Kh??m/??i???u tr??? t???i"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Ch???n ??o??n"
        value={diagnose}
        confidence={diagnose_confidence}
      />
      <Field
        name="T???ng s??? ti???n y??u c???u b???i th?????ng"
        value={total_insured_amount}
        confidence={total_insured_amount_confidence}
      />
      <Field
        name="T??n t??i kho???n"
        value={beneficiary}
        confidence={beneficiary_confidence}
      />
      <Field name="T??n ng??n h??ng" value={bank} confidence={bank_confidence} />
      <Field
        name="S??? t??i kho???n"
        value={account_number}
        confidence={account_number_confidence}
      />
      <Field
        name="H??nh th???c nh???n ti???n"
        value={cash}
        confidence={cash_confidence}
      />
      <Field
        name="S??? CMND nh???n ti???n m???t"
        value={id_card}
        confidence={id_card_confidence}
      />
      <Field
        name="H??? t??n ng?????i y??u c???u"
        value={claimant}
        confidence={claimant_confidence}
      />
      <Field
        name="S??? ??i???n tho???i ng?????i y??u c???u"
        value={claimant_phone}
        confidence={claimant_phone_confidence}
      />
      <Field
        name="?????a ch??? ng?????i y??u c???u"
        value={claimant_address}
        confidence={claimant_address_confidence}
      />
      <Field
        name="Email ng?????i y??u c???u"
        value={claimant_email}
        confidence={claimant_email_confidence}
      />
    </>
  );
}

function BVCard({ data }) {
  const {
    name,
    name_confidence,
    plan,
    plan_confidence,
    company,
    company_confidence,
    valid,
    valid_confidence,
    policy_no,
    policy_no_confidence,
  } = data || {};

  return (
    <>
      <Field name="H??? t??n" value={name} confidence={name_confidence} />
      <Field
        name="S??? th???"
        value={policy_no}
        confidence={policy_no_confidence}
      />
      <Field name="C??ng ty" value={company} confidence={company_confidence} />
      <Field name="Hi???u l???c t???" value={valid} confidence={valid_confidence} />
      <Field name="Ch????ng tr??nh" value={plan} confidence={plan_confidence} />
    </>
  );
}

function IdCard12Back({ data }) {
  const { issue_date, issue_date_confidence, issued_at, issued_at_confidence } =
    data || {};

  return (
    <>
      <Field
        name="Ng??y c???p"
        value={issue_date}
        confidence={issue_date_confidence}
      />
      <Field
        name="N??i c???p"
        value={issued_at}
        confidence={issued_at_confidence}
      />
    </>
  );
}

function IdCard9Back({ data }) {
  const {
    issue_date,
    issue_date_confidence,
    issued_at,
    issued_at_confidence,
    ethnicity,
    ethnicity_confidence,
    religious,
    religious_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="D??n t???c"
        value={ethnicity}
        confidence={ethnicity_confidence}
      />
      <Field
        name="T??n gi??o"
        value={religious}
        confidence={religious_confidence}
      />
      <Field
        name="Ng??y c???p"
        value={issue_date}
        confidence={issue_date_confidence}
      />
      <Field
        name="N??i c???p"
        value={issued_at}
        confidence={issued_at_confidence}
      />
    </>
  );
}

function IdCard12Front({ data }) {
  const {
    id,
    id_confidence,
    name,
    name_confidence,
    dob,
    dob_confidence,
    gender,
    gender_confidence,
    nationality,
    nationality_confidence,
    ethnicity,
    ethnicity_confidence,
    hometown,
    hometown_town_code,
    hometown_town,
    hometown_confidence,
    hometown_district_code,
    hometown_district,
    hometown_ward_code,
    hometown_ward,
    address,
    address_confidence,
    address_town_code,
    address_town,
    address_district_code,
    address_district,
    address_ward_code,
    address_ward,
    due_date,
    due_date_confidence,
  } = data || {};

  return (
    <>
      <Field name="S??? th???" value={id} confidence={id_confidence} />
      <Field name="H??? t??n" value={name} confidence={name_confidence} />
      <Field name="Ng??y sinh" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field
        name="Qu???c t???ch"
        value={nationality}
        confidence={nationality_confidence}
      />
      <Field
        name="D??n t???c"
        value={ethnicity}
        confidence={ethnicity_confidence}
      />
      <div className="field">
        <div className="field-name">Qu?? qu??n:</div>
        <div className="field-value">
          {hometown}{" "}
          {hometown_confidence && (
            <>
              {" "}
              <span className="confidence-label">- ????? tin c???y: </span>
              {getConfidence(hometown_confidence)}
            </>
          )}
          <br />
          T???nh/TP:{" "}
          {hometown_town_code >= 0 && (
            <>
              {hometown_town_code} - {hometown_town}
            </>
          )}
          <br />
          Qu???n/Huy???n:{" "}
          {hometown_district_code >= 0 && (
            <>
              {hometown_district_code} - {hometown_district}
            </>
          )}
          <br />
          Ph?????ng/X??:{" "}
          {hometown_ward_code >= 0 && (
            <>
              {hometown_ward_code} - {hometown_ward}
            </>
          )}
        </div>
      </div>
      <div className="field">
        <div className="field-name">Th?????ng tr??:</div>
        <div className="field-value">
          {address}{" "}
          {address_confidence && (
            <>
              <span className="confidence-label">- ????? tin c???y: </span>
              {getConfidence(address_confidence)}
            </>
          )}{" "}
          <br />
          T???nh/TP:{" "}
          {address_town_code >= 0 && (
            <>
              {address_town_code} - {address_town}
            </>
          )}
          <br />
          Qu???n/Huy???n:{" "}
          {address_district_code >= 0 && (
            <>
              {address_district_code} - {address_district}
            </>
          )}
          <br />
          Ph?????ng/X??:{" "}
          {address_ward_code >= 0 && (
            <>
              {address_ward_code} - {address_ward}
            </>
          )}
        </div>
      </div>
      <Field
        name="Gi?? tr??? ?????n ng??y"
        value={due_date}
        confidence={due_date_confidence}
      />
    </>
  );
}

function IdCard9Front({ data }) {
  const {
    id,
    id_confidence,
    name,
    name_confidence,
    dob,
    dob_confidence,
    hometown,
    hometown_town_code,
    hometown_town,
    hometown_confidence,
    hometown_district_code,
    hometown_district,
    hometown_ward_code,
    hometown_ward,
    address,
    address_confidence,
    address_town_code,
    address_town,
    address_district_code,
    address_district,
    address_ward_code,
    address_ward,
  } = data || {};

  return (
    <>
      <Field name="S??? th???" value={id} confidence={id_confidence} />
      <Field name="H??? t??n" value={name} confidence={name_confidence} />
      <Field name="Ng??y sinh" value={dob} confidence={dob_confidence} />
      <div className="field">
        <div className="field-name">Qu?? qu??n:</div>
        <div className="field-value">
          {hometown}{" "}
          {hometown_confidence && (
            <>
              {" "}
              <span className="confidence-label">- ????? tin c???y: </span>
              {getConfidence(hometown_confidence)}
            </>
          )}
          <br />
          T???nh/TP:{" "}
          {hometown_town_code >= 0 && (
            <>
              {hometown_town_code} - {hometown_town}
            </>
          )}
          <br />
          Qu???n/Huy???n:{" "}
          {hometown_district_code >= 0 && (
            <>
              {hometown_district_code} - {hometown_district}
            </>
          )}
          <br />
          Ph?????ng/X??:{" "}
          {hometown_ward_code >= 0 && (
            <>
              {hometown_ward_code} - {hometown_ward}
            </>
          )}
        </div>
      </div>
      <div className="field">
        <div className="field-name">Th?????ng tr??:</div>
        <div className="field-value">
          {address}{" "}
          {address_confidence && (
            <>
              <span className="confidence-label">- ????? tin c???y: </span>
              {getConfidence(address_confidence)}
            </>
          )}{" "}
          <br />
          T???nh/TP:{" "}
          {address_town_code >= 0 && (
            <>
              {address_town_code} - {address_town}
            </>
          )}
          <br />
          Qu???n/Huy???n:{" "}
          {address_district_code >= 0 && (
            <>
              {address_district_code} - {address_district}
            </>
          )}
          <br />
          Ph?????ng/X??:{" "}
          {address_ward_code >= 0 && (
            <>
              {address_ward_code} - {address_ward}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function Passport({ data }) {
  const {
    id,
    person_number,
    sur_name,
    given_name,
    gender,
    dob,
    nationality,
    country,
    due_date,
    confidence,
    id_confidence,
    dob_confidence,
    full_name_confidence,
    full_name,
    gender_confidence,
    nationality_confidence,
    due_date_confidence,
    person_number_confidence,
    issue_date,
    issue_date_confidence,
    issued_at_confidence,
    issued_at,
    place_of_birth,
    place_of_birth_confidence,
  } = data || {};

  return (
    <>
      <Field name="S??? th???" value={id} confidence={id_confidence} />
      <Field name="H???" value={sur_name} />
      <Field name="T??n" value={given_name} />
      <Field
        name="H??? v?? t??n"
        value={full_name}
        confidence={full_name_confidence}
      />
      <Field name="Ng??y sinh" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field name="Qu???c gia" value={country} />
      <Field
        name="Qu???c t???ch"
        value={nationality}
        confidence={nationality_confidence}
      />
      <Field
        name="Ng??y h???t h???n"
        value={due_date}
        confidence={due_date_confidence}
      />

      <Field
        name="M?? s??? c??ng d??n"
        value={person_number}
        confidence={person_number_confidence}
      />
      <Field
        name="Ng??y c???p"
        value={issue_date}
        confidence={issue_date_confidence}
      />
      <Field
        name="N??i c???p"
        value={issued_at}
        confidence={issued_at_confidence}
      />
      <Field
        name="N??i sinh"
        value={place_of_birth}
        confidence={place_of_birth_confidence}
      />
      <Field name="????? tin c???y " value={`${(confidence * 100).toFixed(2)}%`} />
    </>
  );
}
export function BangLaiXe({ data }) {
  const {
    id,
    name,
    due_date_confidence,
    due_date,
    dob,
    nationality,
    confidence,
    id_confidence,
    dob_confidence,

    nationality_confidence,
    issue_date,
    issue_date_confidence,

    address,
    address_confidence,
    address_district,
    address_town,
    address_ward,
    address_town_code,
    address_district_code,
    address_ward_code,
    name_confidence,
    class_confidence,
  } = data || {};

  return (
    <>
      <Field name="S??? th???" value={id} confidence={id_confidence} />
      <Field name="H??? v?? t??n" value={name} confidence={name_confidence} />
      <Field name="Ng??y sinh" value={dob} confidence={dob_confidence} />
      <Field name="H???ng" value={data.class} confidence={class_confidence} />
      <Field
        name="Qu???c t???ch"
        value={nationality}
        confidence={nationality_confidence}
      />
      <Field
        name="Ng??y ph??t h??nh"
        value={issue_date}
        confidence={issue_date_confidence}
      />
      <Field
        name="Ng??y h???t h???n"
        value={due_date}
        confidence={due_date_confidence}
      />
      {/* <Field
        name="N??i c?? tr??"
        value={address}
        confidence={address_confidence}
      /> */}
      <div className="field">
        <div className="field-name">Qu?? qu??n:</div>
        <div className="field-value">
          {address}{" "}
          {address_confidence && (
            <>
              {" "}
              <span className="confidence-label">- ????? tin c???y: </span>
              {getConfidence(address_confidence)}
            </>
          )}
          <br />
          T???nh/TP:{" "}
          {address_town_code >= 0 && (
            <>
              {address_town_code} - {address_town}
            </>
          )}
          <br />
          Qu???n/Huy???n:{" "}
          {address_district_code >= 0 && (
            <>
              {address_district_code} - {address_district}
            </>
          )}
          <br />
          Ph?????ng/X??:{" "}
          {address_ward_code >= 0 && (
            <>
              {address_ward_code} - {address_ward}
            </>
          )}
        </div>
      </div>
      <div className="field"></div>

      {/* <Field name="T???nh/th??nh ph???" value={address_town} />
      <Field name="Qu???n/huy???n" value={address_district} />
      <Field name="Ph?????ng/x??" value={address_ward} />
      <Field name="M?? t???nh/th??nh ph???" value={address_town_code} />
      <Field name="M?? qu???n/huy???n" value={address_district_code} />
      <Field name="M?? ph?????ng/x??" value={address_ward_code} /> */}
    </>
  );
}

function BVCare({ data, type }) {
  return (
    <>
      {type === "chip_id_card_front" && <ChipIdCardFront data={data} />}
      {type === "chip_id_card_back" && <ChipIdCardBack data={data} />}
      {type === "12_id_card_back" && <IdCard12Back data={data} />}
      {type === "9_id_card_back" && <IdCard9Back data={data} />}
      {type === "12_id_card_front" && <IdCard12Front data={data} />}
      {type === "9_id_card_front" && <IdCard9Front data={data} />}
      {type === "passport" && <Passport data={data} />}

      {type === "claim_form" && <BoiThuongBH data={data} />}
      {type === "bvcard" && <BVCard data={data} />}
      {type === "hospital_discharge_paper" && <GiayRaVien data={data} />}
      {type === "invoice" && <HoaDon data={data} />}
      {type === "list_expense" && <BangKe data={data} />}
      {type === "id_doc" && <IdDoc data={data} />}
      {type === "prescription" && <DonThuoc data={data} />}
      {type === "guarantee_confirmation" && <GiayXacNhanBaoLanh data={data} />}
      {type === "surgical_certificate" && (
        <GiayChungNhanPhauThuat data={data} />
      )}
      {type === "discharge_report" && <BaoCaoRaVien data={data} />}
      {type === "medical_report" && <BaoCaoYTe data={data} />}
      {type === "specify_vote" && <PhieuChiDinh data={data} />}
      {type === "test_results" && <KetQuaXetNghiem data={data} />}
      {type === "accident_report" && <TuongTrinhTaiNan data={data} />}
      {type === "bill" && <BienLai data={data} />}
      {type === "receipts" && <PhieuThu data={data} />}
      {type === "health_records" && <SoKhamBenh data={data} />}
      {type === "medical_examination" && <PhieuKham data={data} />}
      {!type && null}
    </>
  );
}

function GiayToTuyThanApiV3({ data, type, result }) {
  const { valid, invalidMessage } = result.data || {};
  return (
    <>
      {valid === "False" && (
        <div style={{ fontSize: 14, marginBottom: 20 }}>
          <WarningFilled style={{ color: "#F29C1F" }} /> {invalidMessage}
        </div>
      )}
      {type === "chip_id_card_front" && <ChipIdCardFront data={data} />}
      {type === "chip_id_card_back" && <ChipIdCardBack data={data} />}
      {type === "12_id_card_back" && <IdCard12Back data={data} />}
      {type === "9_id_card_back" && <IdCard9Back data={data} />}
      {type === "12_id_card_front" && <IdCard12Front data={data} />}
      {type === "9_id_card_front" && <IdCard9Front data={data} />}
      {type === "passport" && <Passport data={data} />}
      {type === "driving_license" && <BangLaiXe data={data} />}
    </>
  );
}

function SoDoMau1({ data }) {
  const {
    so_so,
    so_so_confidence,
    noi_cap,
    noi_cap_confidence,
    ngay_cap,
    ngay_cap_confidence,
    so_vao_so,
    so_vao_so_confidence,
    thong_tin_thua_dat,
    thong_tin_thua_dat_confidence,
    thong_tin_nha_o,
    thong_tin_nha_o_confidence,
    thong_tin_ghi_chu,
    thong_tin_ghi_chu_confidence,
    noi_dung_chu_dat,
  } = data || {};

  return (
    <>
      <Field name="S??? s???" value={so_so} confidence={so_so_confidence} />
      <Field name="N??i c???p" value={noi_cap} confidence={noi_cap_confidence} />
      <Field
        name="Ng??y c???p"
        value={ngay_cap}
        confidence={ngay_cap_confidence}
      />
      <Field
        name="S??? v??o s??? c???p GCN"
        value={so_vao_so}
        confidence={so_vao_so_confidence}
      />
      <Field
        name="Th??ng tin c???a th???a ?????t"
        value={thong_tin_thua_dat}
        confidence={thong_tin_thua_dat_confidence}
      />
      <Field
        name="Th??ng tin c???a nh?? ???"
        value={thong_tin_nha_o}
        confidence={thong_tin_nha_o_confidence}
      />
      <Field
        name="Th??ng tin ghi ch??"
        value={thong_tin_ghi_chu}
        confidence={thong_tin_ghi_chu_confidence}
      />
      <div className="field">
        <div className="field-name">N???i dung c???a ch??? ?????t:</div>
        {noi_dung_chu_dat?.map((nd) => {
          const {
            ten,
            ten_confidence,
            nam_sinh,
            nam_sinh_confidence,
            so_cmt,
            so_cmt_confidence,
            dia_chi,
            dia_chi_confidence,
          } = nd;
          return (
            <div style={{ marginLeft: 20, marginBottom: 20 }}>
              <Field name="H??? t??n" value={ten} confidence={ten_confidence} />
              <Field
                name="N??m sinh"
                value={nam_sinh}
                confidence={nam_sinh_confidence}
              />
              <Field
                name="S??? cmnd, h??? chi???u"
                value={so_cmt}
                confidence={so_cmt_confidence}
              />
              <Field
                name="S??? v??o s??? c???p GCN?????a ch??? th?????ng tr??"
                value={dia_chi}
                confidence={dia_chi_confidence}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

function SoDoMau2({ data }) {
  const {
    so_so,
    so_so_confidence,
    noi_cap,
    noi_cap_confidence,
    ngay_cap,
    ngay_cap_confidence,
    so_vao_so,
    so_vao_so_confidence,
    dia_chi_thua_dat,
    dia_chi_thua_dat_confidence,
    thong_tin_thua_dat,
    thong_tin_thua_dat_confidence,
    noi_dung_chu_dat,
  } = data || {};

  return (
    <>
      <Field name="S??? s???" value={so_so} confidence={so_so_confidence} />
      <Field name="N??i c???p" value={noi_cap} confidence={noi_cap_confidence} />
      <Field
        name="Ng??y c???p"
        value={ngay_cap}
        confidence={ngay_cap_confidence}
      />
      <Field
        name="S??? v??o s??? c???p GCN"
        value={so_vao_so}
        confidence={so_vao_so_confidence}
      />
      <Field
        name="?????a ch??? c???a th???a ?????t"
        value={dia_chi_thua_dat}
        confidence={dia_chi_thua_dat_confidence}
      />
      <Field
        name="Th??ng tin c???a th???a ?????t"
        value={thong_tin_thua_dat}
        confidence={thong_tin_thua_dat_confidence}
      />
      <div className="field">
        <div className="field-name">N???i dung c???a ch??? ?????t:</div>
        {noi_dung_chu_dat?.map((nd) => {
          const {
            ten,
            ten_confidence,
            nam_sinh,
            nam_sinh_confidence,
            so_cmt,
            so_cmt_confidence,
            dia_chi,
            dia_chi_confidence,
          } = nd;
          return (
            <div style={{ marginLeft: 20, marginBottom: 20 }}>
              <Field name="H??? t??n" value={ten} confidence={ten_confidence} />
              <Field
                name="N??m sinh"
                value={nam_sinh}
                confidence={nam_sinh_confidence}
              />
              <Field
                name="S??? cmnd, h??? chi???u"
                value={so_cmt}
                confidence={so_cmt_confidence}
              />
              <Field
                name="S??? v??o s??? c???p GCN?????a ch??? th?????ng tr??"
                value={dia_chi}
                confidence={dia_chi_confidence}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

function SoDoMau3({ data }) {
  const {
    so_so,
    so_so_confidence,
    noi_cap,
    noi_cap_confidence,
    ngay_cap,
    ngay_cap_confidence,
    so_vao_so,
    so_vao_so_confidence,
    thong_tin_thua_dat,
    thong_tin_thua_dat_confidence,
    noi_dung_chu_dat,
  } = data || {};

  return (
    <>
      <Field name="S??? s???" value={so_so} confidence={so_so_confidence} />
      <Field name="N??i c???p" value={noi_cap} confidence={noi_cap_confidence} />
      <Field
        name="Ng??y c???p"
        value={ngay_cap}
        confidence={ngay_cap_confidence}
      />
      <Field
        name="S??? v??o s??? c???p GCN"
        value={so_vao_so}
        confidence={so_vao_so_confidence}
      />
      <Field
        name="Th??ng tin c???a th???a ?????t"
        value={thong_tin_thua_dat}
        confidence={thong_tin_thua_dat_confidence}
      />
      <div className="field">
        <div className="field-name">N???i dung c???a ch??? ?????t:</div>
        {noi_dung_chu_dat?.map((nd) => {
          const {
            ten,
            ten_confidence,
            nam_sinh,
            nam_sinh_confidence,
            so_cmt,
            so_cmt_confidence,
            dia_chi,
            dia_chi_confidence,
          } = nd;
          return (
            <div style={{ marginLeft: 20, marginBottom: 20 }}>
              <Field name="H??? t??n" value={ten} confidence={ten_confidence} />
              <Field
                name="N??m sinh"
                value={nam_sinh}
                confidence={nam_sinh_confidence}
              />
              <Field
                name="S??? cmnd, h??? chi???u"
                value={so_cmt}
                confidence={so_cmt_confidence}
              />
              <Field
                name="S??? v??o s??? c???p GCN?????a ch??? th?????ng tr??"
                value={dia_chi}
                confidence={dia_chi_confidence}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

function SoDo({ data, type }) {
  return (
    <>
      {type === "giay_cnqshdd_mau_1" && <SoDoMau1 data={data} />}
      {type === "giay_cnqshdd_mau_2" && <SoDoMau2 data={data} />}
      {type === "giay_cnqshdd_mau_3" && <SoDoMau3 data={data} />}
      {!type && null}
    </>
  );
}

function A4({ data, type }) {
  return (
    <>
      {type === "tcc" && <TCC data={data} />}
      {type === "cmt" && <CMT data={data} />}
      {type === "matsautcc" && <MatSauTCC data={data} />}
      {type === "matsaucmt" && <MatSauCMT data={data} />}
      {type === "tcc_chip" && <ChipIdCardFrontOld data={data} />}
      {type === "matsautcc_chip" && <ChipIdCardBackOld data={data} />}
      {type === "blx" && <DrivingLicenseOld data={data} />}
      {type === "passport" && <PassportOld data={data} />}
      {type === "bvcard" && <BVCard data={data} />}
      {!type && null}
    </>
  );
}

function DrivingLicenseOld({ data }) {
  const {
    id,
    id_confidence,
    name,
    name_confidence,
    born,
    born_confidence,
    class: class_license,
    class_confidence,
    nation,
    nation_confidence,
    dateissue,
    dateissue_confidence,
    duedate,
    duedate_confidence,
    address,
    address_confidence,
  } = data || {};

  return (
    <>
      <Field name="S??? th???" value={id} confidence={id_confidence} />
      <Field name="H??? t??n" value={name} confidence={name_confidence} />
      <Field name="Ng??y sinh" value={born} confidence={born_confidence} />
      <Field name="H???ng" value={class_license} confidence={class_confidence} />
      <Field name="Qu???c t???ch" value={nation} confidence={nation_confidence} />
      <Field
        name="Ng??y ph??t h??nh"
        value={dateissue}
        confidence={dateissue_confidence}
      />
      <Field
        name="Gi?? tr??? ?????n ng??y"
        value={duedate}
        confidence={duedate_confidence}
      />
      <Field
        name="N??i c?? tr??"
        value={address}
        confidence={address_confidence}
      />
    </>
  );
}

function ChipIdCardFrontOld({ data }) {
  const {
    id,
    id_confidence,
    name,
    name_confidence,
    born,
    born_confidence,
    sex,
    sex_confidence,
    quoctich,
    quoctich_confidence,
    country,
    country_confidence,
    address,
    address_confidence,
    diachi_tinh,
    diachi_tinh_name,
    diachi_huyen,
    diachi_huyen_name,
    diachi_phuong,
    diachi_phuong_name,
    duedate,
    duedate_confidence,
    quequan_tinh,
    quequan_tinh_name,
    quequan_huyen,
    quequan_huyen_name,
    quequan_phuong,
    quequan_phuong_name,
  } = data || {};

  return (
    <>
      <Field name="S??? th???" value={id} confidence={id_confidence} />
      <Field name="H??? t??n" value={name} confidence={name_confidence} />
      <Field name="Ng??y sinh" value={born} confidence={born_confidence} />
      <Field name="Gi???i t??nh" value={sex} confidence={sex_confidence} />
      <Field
        name="Qu???c t???ch"
        value={quoctich}
        confidence={quoctich_confidence}
      />
      <div className="field">
        <div className="field-name">Qu?? qu??n:</div>
        <div className="field-value">
          {country} <br />
          T???nh/TP: {quequan_tinh} - {quequan_tinh_name}
          <br />
          Qu???n/Huy???n: {quequan_huyen} - {quequan_huyen_name}
          <br />
          Ph?????ng/X??: {quequan_phuong} - {quequan_phuong_name}
        </div>
      </div>
      <div className="field">
        <div className="field-name">Th?????ng tr??:</div>
        <div className="field-value">
          {address} <br />
          T???nh/TP: {diachi_tinh} - {diachi_tinh_name}
          <br />
          Qu???n/Huy???n: {diachi_huyen} - {diachi_huyen_name}
          <br />
          Ph?????ng/X??: {diachi_phuong} - {diachi_phuong_name}
        </div>
      </div>
      <Field
        name="Gi?? tr??? ?????n ng??y"
        value={duedate}
        confidence={duedate_confidence}
      />
    </>
  );
}

function ChipIdCardBackOld({ data }) {
  const {
    nationality,
    checksum_final,
    checksum_final_validate,
    country,
    dob,
    dob_checksum,
    dob_checksum_validate,
    document_number,
    document_number_checksum,
    document_number_checksum_validate,
    due_date,
    due_date_checksum,
    due_date_checksum_validate,
    gender,
    given_name,
    date,
    issue_date_confidence,
    noicap,
    issued_at_confidence,
    person_number,
    sur_name,
    mrz_confidence,
  } = data || {};

  return (
    <>
      <Field name="Checksum final" value={checksum_final} />
      <Field name="Checksum final validate" value={checksum_final_validate} />
      <Field name="Country" value={country} />
      <Field name="Dob" value={dob} />
      <Field name="Dob checksum" value={dob_checksum} />
      <Field name="Dob checksum validate" value={dob_checksum_validate} />
      <Field name="Document number" value={document_number} />
      <Field name="Document number checksum" value={document_number_checksum} />
      <Field
        name="Document number checksum validate"
        value={document_number_checksum_validate}
      />
      <Field name="Due date" value={due_date} />
      <Field name="Due date checksum" value={due_date_checksum} />
      <Field
        name="Due date checksum validate"
        value={due_date_checksum_validate}
      />
      <Field name="Gender" value={gender} />
      <Field name="Given name" value={given_name} />
      <Field name="Issue date" value={date} en />
      <Field name="Issued at" value={noicap} en />
      <Field name="Nationality" value={nationality} />
      <Field name="Person number" value={person_number} />
      <Field name="Sur name" value={sur_name} />
      {/* <Field name='Mrz confidence' value={`${(mrz_confidence * 100).toFixed(2)}%`} /> */}
    </>
  );
}

function MatSauCMT({ data }) {
  const {
    date,
    issue_date_confidence,
    noicap,
    issued_at_confidence,
    dantoc,
    ethnicity_confidence,
    tongiao,
    religious_confidence,
  } = data || {};

  return (
    <>
      <Field name="D??n t???c" value={dantoc} confidence={ethnicity_confidence} />
      <Field
        name="T??n gi??o"
        value={tongiao}
        confidence={religious_confidence}
      />
      <Field name="Ng??y c???p" value={date} confidence={issue_date_confidence} />
      <Field name="N??i c???p" value={noicap} confidence={issued_at_confidence} />
    </>
  );
}

function MatSauTCC({ data }) {
  const { date, issue_date_confidence, noicap, issued_at_confidence } =
    data || {};

  return (
    <>
      <Field name="Ng??y c???p" value={date} confidence={issue_date_confidence} />
      <Field name="N??i c???p" value={noicap} confidence={issued_at_confidence} />
    </>
  );
}

function CMT({ data }) {
  const {
    id,
    id_confidence,
    name,
    name_confidence,
    born,
    dob_confidence,
    country,
    quequan_tinh,
    quequan_tinh_name,
    hometown_confidence,
    quequan_huyen,
    quequan_huyen_name,
    quequan_phuong,
    quequan_phuong_name,
    address,
    address_confidence,
    diachi_tinh,
    diachi_tinh_name,
    diachi_huyen,
    diachi_huyen_name,
    diachi_phuong,
    diachi_phuong_name,
  } = data || {};

  return (
    <>
      <Field name="S??? th???" value={id} confidence={id_confidence} />
      <Field name="H??? t??n" value={name} confidence={name_confidence} />
      <Field name="Ng??y sinh" value={born} confidence={dob_confidence} />
      <div className="field">
        <div className="field-name">Qu?? qu??n:</div>
        <div className="field-value">
          {country} <br />
          T???nh/TP: {quequan_tinh} - {quequan_tinh_name}
          <br />
          Qu???n/Huy???n: {quequan_huyen} - {quequan_huyen_name}
          <br />
          Ph?????ng/X??: {quequan_phuong} - {quequan_phuong_name}
        </div>
      </div>
      <div className="field">
        <div className="field-name">Th?????ng tr??:</div>
        <div className="field-value">
          {address} <br />
          T???nh/TP: {diachi_tinh} - {diachi_tinh_name}
          <br />
          Qu???n/Huy???n: {diachi_huyen} - {diachi_huyen_name}
          <br />
          Ph?????ng/X??: {diachi_phuong} - {diachi_phuong_name}
        </div>
      </div>
    </>
  );
}

function TCC({ data }) {
  const {
    id,
    id_confidence,
    name,
    name_confidence,
    born,
    dob_confidence,
    sex,
    gender_confidence,
    quoctich,
    nationality_confidence,
    dantoc,
    ethnicity_confidence,
    country,
    quequan_tinh,
    quequan_tinh_name,
    hometown_confidence,
    quequan_huyen,
    quequan_huyen_name,
    quequan_phuong,
    quequan_phuong_name,
    address,
    address_confidence,
    diachi_tinh,
    diachi_tinh_name,
    diachi_huyen,
    diachi_huyen_name,
    diachi_phuong,
    diachi_phuong_name,
    duedate,
    due_date_confidence,
  } = data || {};

  return (
    <>
      <Field name="S??? th???" value={id} confidence={id_confidence} />
      <Field name="H??? t??n" value={name} confidence={name_confidence} />
      <Field name="Ng??y sinh" value={born} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={sex} confidence={gender_confidence} />
      <Field
        name="Qu???c t???ch"
        value={quoctich}
        confidence={nationality_confidence}
      />
      <Field name="D??n t???c" value={dantoc} confidence={ethnicity_confidence} />
      <div className="field">
        <div className="field-name">Qu?? qu??n:</div>
        <div className="field-value">
          {country} <br />
          T???nh/TP: {quequan_tinh} - {quequan_tinh_name}
          <br />
          Qu???n/Huy???n: {quequan_huyen} - {quequan_huyen_name}
          <br />
          Ph?????ng/X??: {quequan_phuong} - {quequan_phuong_name}
        </div>
      </div>
      <div className="field">
        <div className="field-name">Th?????ng tr??:</div>
        <div className="field-value">
          {address} <br />
          T???nh/TP: {diachi_tinh} - {diachi_tinh_name}
          <br />
          Qu???n/Huy???n: {diachi_huyen} - {diachi_huyen_name}
          <br />
          Ph?????ng/X??: {diachi_phuong} - {diachi_phuong_name}
        </div>
      </div>
      <Field
        name="Gi?? tr??? ?????n ng??y"
        value={duedate}
        confidence={due_date_confidence}
      />
    </>
  );
}

function PassportOld({ data }) {
  const {
    id,
    id_checksum,
    id_checksum_validate,
    person_number,
    surname,
    given_name,
    sex,
    born,
    nationality,
    dob_checksum,
    dob_checksum_validate,
    country,
    duedate,
    duedate_checksum,
    duedate_checksum_validate,
    confidence,
  } = data || {};

  return (
    <>
      <Field name="ID" value={id} />
      <Field name="ID card" value={person_number} />
      <Field name="Surname" value={surname} />
      <Field name="Given name" value={given_name} />
      <Field name="Gender" value={sex} />
      <Field name="Dob" value={born} />
      <Field name="Country" value={country} />
      <Field name="Due date" value={duedate} />
      <Field name="Nationality" value={nationality} />
    </>
  );
}

function IdDoc({ data }) {
  const {
    address,
    address_confidence,
    dob,
    dob_confidence,
    gender,
    gender_confidence,
    name,
    name_confidence,
    nationality,
    nationality_confidence,
  } = data || {};

  return (
    <>
      <Field name="H??? t??n" value={name} confidence={name_confidence} />
      <Field name="Ng??y sinh" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field
        name="Qu???c t???ch"
        value={nationality}
        confidence={nationality_confidence}
      />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
    </>
  );
}

function DonThuoc({ data }) {
  const {
    medical_facility,
    medical_facility_confidence,
    patient_name,
    patient_name_confidence,
    year_of_birth,
    year_of_birth_confidence,
    gender,
    gender_confidence,
    address,
    address_confidence,
    pid,
    pid_confidence,
    prescription_date,
    prescription_date_confidence,
    diagnose,
    diagnose_confidence,
    drug_info,
  } = data || {};

  const columns = [
    {
      title: "T??n thu???c",
      key: "drug",
      dataIndex: "drug",
    },
    {
      title: "S??? l?????ng",
      key: "quantity",
      dataIndex: "quantity",
    },
  ];

  return (
    <>
      <Field
        name="C?? s??? y t???"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="H??? t??n b???nh nh??n"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field
        name="N??m sinh/Tu???i"
        value={year_of_birth}
        confidence={year_of_birth_confidence}
      />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field name="M?? y t???" value={pid} confidence={pid_confidence} />
      <Field
        name="Ng??y k?? ????n"
        value={prescription_date}
        confidence={prescription_date_confidence}
      />
      <Field
        name="Ch???n ??o??n"
        value={diagnose}
        confidence={diagnose_confidence}
      />
      {drug_info?.length ? (
        <TableWrapper>
          <Table
            dataSource={drug_info}
            columns={columns}
            pagination={false}
            scroll={{ x: 513 }}
          />
        </TableWrapper>
      ) : null}
    </>
  );
}

function GiayXacNhanBaoLanh({ data }) {
  const {
    claim_form_no,
    claim_form_no_confidence,
    created_date,
    created_date_confidence,
    insured,
    insured_confidence,
    dob,
    dob_confidence,
    id_no,
    id_no_confidence,
    policy_no,
    policy_no_confidence,
    policy_holder,
    policy_holder_confidence,
    period_of_insurance,
    period_of_insurance_confidence,
    date_of_consultation,
    date_of_consultation_confidence,
    medical_facility,
    medical_facility_confidence,
    rehabilitation_type,
    rehabilitation_type_confidence,
    from_date,
    from_date_confidence,
    to_date,
    to_date_confidence,
    condition,
    condition_confidence,
    conclusion,
    conclusion_confidence,
    medical_expenses,
    medical_expenses_confidence,
    guaranteed_expenses,
    guaranteed_expenses_confidence,
    paid_by_insured,
    paid_by_insured_confidence,
    warranty_notes,
    warranty_notes_confidence,
    insured_confirmation,
    insured_confirmation_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="S??? y??u c???u BT"
        value={claim_form_no}
        confidence={claim_form_no_confidence}
      />
      <Field
        name="Ng??y l???p"
        value={created_date}
        confidence={created_date_confidence}
      />
      <Field
        name="Ng?????i ???????c BH"
        value={insured}
        confidence={insured_confidence}
      />
      <Field name="Ng??y sinh" value={dob} confidence={dob_confidence} />
      <Field name="S??? CMT" value={id_no} confidence={id_no_confidence} />
      <Field
        name="S??? th??? b???o hi???m"
        value={policy_no}
        confidence={policy_no_confidence}
      />
      <Field
        name="????n v??? tham gia b???o hi???m"
        value={policy_holder}
        confidence={policy_holder_confidence}
      />
      <Field
        name="Hi???u l???c b???o hi???m"
        value={period_of_insurance}
        confidence={period_of_insurance_confidence}
      />
      <Field
        name="Ng??y kh??m"
        value={date_of_consultation}
        confidence={date_of_consultation_confidence}
      />
      <Field
        name="T??n c?? s??? y t???"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="N???i tr??/Ngo???i tr??"
        value={rehabilitation_type}
        confidence={rehabilitation_type_confidence}
      />
      <Field
        name="T??? ng??y"
        value={from_date}
        confidence={from_date_confidence}
      />
      <Field name="?????n ng??y" value={to_date} confidence={to_date_confidence} />
      <Field
        name="T??nh tr???ng b???nh/tai n???n"
        value={condition}
        confidence={condition_confidence}
      />
      <Field
        name="K???t lu???n c???a b??c s??? sau xu???t vi???n"
        value={conclusion}
        confidence={conclusion_confidence}
      />
      <Field
        name="Chi ph?? ph??t sinh"
        value={medical_expenses}
        confidence={medical_expenses_confidence}
      />
      <Field
        name="Chi ph?? b???o l??nh"
        value={guaranteed_expenses}
        confidence={guaranteed_expenses_confidence}
      />
      <Field
        name="Chi ph?? N??BH t??? tr???"
        value={paid_by_insured}
        confidence={paid_by_insured_confidence}
      />
      <Field
        name="GHI CH?? V?? X??C NH???N B???O L??NH"
        value={warranty_notes}
        confidence={warranty_notes_confidence}
      />
      <Field
        name="X??C NH???N V?? CAM K???T C???A NG?????I ???????C B???O HI???M"
        value={insured_confirmation}
        confidence={insured_confirmation_confidence}
      />
    </>
  );
}

function GiayChungNhanPhauThuat({ data }) {
  const {
    medical_facility,
    medical_facility_confidence,
    department,
    department_confidence,
    patient_name,
    patient_name_confidence,
    dob,
    dob_confidence,
    gender,
    gender_confidence,
    address,
    address_confidence,
    pid,
    pid_confidence,
    hospitalization_date,
    hospitalization_date_confidence,
    hospital_discharge_date,
    hospital_discharge_date_confidence,
    surgical_day,
    surgical_day_confidence,
    diagnose,
    diagnose_confidence,
    anesthetic_method,
    anesthetic_method_confidence,
    surgical_doctor,
    surgical_doctor_confidence,
    anesthesiologist,
    anesthesiologist_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="T??n c?? s??? y t???"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Khoa"
        value={department}
        confidence={department_confidence}
      />
      <Field
        name="H??? t??n b???nh nh??n"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="N??m sinh/Tu???i" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field name="M?? y t???/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Ng??y v??o vi???n"
        value={hospitalization_date}
        confidence={hospitalization_date_confidence}
      />
      <Field
        name="Ng??y ra vi???n"
        value={hospital_discharge_date}
        confidence={hospital_discharge_date_confidence}
      />
      <Field
        name="Ng??y ph???u thu???t"
        value={surgical_day}
        confidence={surgical_day_confidence}
      />
      <Field
        name="Ch???n ??o??n"
        value={diagnose}
        confidence={diagnose_confidence}
      />
      <Field
        name="Ph????ng ph??p v?? c???m"
        value={anesthetic_method}
        confidence={anesthetic_method_confidence}
      />
      <Field
        name="B??c s??? ph???u thu???t"
        value={surgical_doctor}
        confidence={surgical_doctor_confidence}
      />
      <Field
        name="B??c s??? g??y m??"
        value={anesthesiologist}
        confidence={anesthesiologist_confidence}
      />
    </>
  );
}

function BaoCaoRaVien({ data }) {
  const {
    department,
    department_confidence,
    patient_name,
    patient_name_confidence,
    dob,
    dob_confidence,
    gender,
    gender_confidence,
    address,
    address_confidence,
    pid,
    pid_confidence,
    hospitalization_date,
    hospitalization_date_confidence,
    discharge_date,
    discharge_date_confidence,
    hospitalization_reason,
    hospitalization_reason_confidence,
    pathological_process,
    pathological_process_confidence,
    preliminary_diagnosis,
    preliminary_diagnosis_confidence,
    definitive_diagnosis,
    definitive_diagnosis_confidence,
    treatment_method,
    treatment_method_confidence,
    prescribed_medicines,
    prescribed_medicines_confidence,
    hospital_discharge_status,
    hospital_discharge_status_confidence,
    followup_treatment_plan,
    followup_treatment_plan_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="Khoa"
        value={department}
        confidence={department_confidence}
      />
      <Field
        name="H??? t??n b???nh nh??n"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="N??m sinh/Tu???i" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field name="M?? y t???/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Ng??y v??o vi???n"
        value={hospitalization_date}
        confidence={hospitalization_date_confidence}
      />
      <Field
        name="Ng??y ra vi???n"
        value={discharge_date}
        confidence={discharge_date_confidence}
      />
      <Field
        name="L?? do v??o vi???n"
        value={hospitalization_reason}
        confidence={hospitalization_reason_confidence}
      />
      <Field
        name="Qu?? tr??nh b???nh l??/B???nh s???"
        value={pathological_process}
        confidence={pathological_process_confidence}
      />
      <Field
        name="K???t qu??? c???n l??m s??ng"
        value={preliminary_diagnosis}
        confidence={preliminary_diagnosis_confidence}
      />
      <Field
        name="Ch???n ??o??n x??c ?????nh"
        value={definitive_diagnosis}
        confidence={definitive_diagnosis_confidence}
      />
      <Field
        name="Ph????ng ph??p ??i???u tr???"
        value={treatment_method}
        confidence={treatment_method_confidence}
      />
      <Field
        name="C??c thu???c ch??nh ???? d??ng"
        value={prescribed_medicines}
        confidence={prescribed_medicines_confidence}
      />
      <Field
        name="T??nh tr???ng ra vi???n"
        value={hospital_discharge_status}
        confidence={hospital_discharge_status_confidence}
      />
      <Field
        name="K??? ho???ch ??i???u tr??? ti???p theo"
        value={followup_treatment_plan}
        confidence={followup_treatment_plan_confidence}
      />
    </>
  );
}

function BaoCaoYTe({ data }) {
  const {
    patient_name,
    patient_name_confidence,
    dob,
    dob_confidence,
    gender,
    gender_confidence,
    address,
    address_confidence,
    pid,
    pid_confidence,
    date_of_examination,
    date_of_examination_confidence,
    symptom,
    symptom_confidence,
    pathological_process,
    pathological_process_confidence,
    medical_history,
    medical_history_confidence,
    clinical_examination,
    clinical_examination_confidence,
    medical_tests,
    medical_tests_confidence,
    preliminary_diagnosis,
    preliminary_diagnosis_confidence,
    treatment_method,
    treatment_method_confidence,
    date_of_reexamination,
    date_of_reexamination_confidence,
    icd,
    icd_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="H??? t??n b???nh nh??n"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="N??m sinh/Tu???i" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field name="M?? y t???/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Ng??y kh??m"
        value={date_of_examination}
        confidence={date_of_examination_confidence}
      />
      <Field
        name="L?? do ?????n kh??m/Tri???u ch???ng"
        value={symptom}
        confidence={symptom_confidence}
      />
      <Field
        name="Qu?? tr??nh b???nh l??/B???nh s???"
        value={pathological_process}
        confidence={pathological_process_confidence}
      />
      <Field
        name="Ti???n s???"
        value={medical_history}
        confidence={medical_history_confidence}
      />
      <Field
        name="Kh??m l??m s??ng"
        value={clinical_examination}
        confidence={clinical_examination_confidence}
      />
      <Field
        name="C??c x??t nghi???m, th??m d?? ch??nh"
        value={medical_tests}
        confidence={medical_tests_confidence}
      />
      <Field
        name="Ch???n ??o??n s?? b???"
        value={preliminary_diagnosis}
        confidence={preliminary_diagnosis_confidence}
      />
      <Field
        name="H?????ng ??i???u tr???"
        value={treatment_method}
        confidence={treatment_method_confidence}
      />
      <Field
        name="H???n ng??y t??i kh??m"
        value={date_of_reexamination}
        confidence={date_of_reexamination_confidence}
      />
      <Field name="M?? icd" value={icd} confidence={icd_confidence} />
    </>
  );
}

function PhieuChiDinh({ data }) {
  const {
    medical_facility,
    medical_facility_confidence,
    patient_name,
    patient_name_confidence,
    gender,
    gender_confidence,
    address,
    address_confidence,
    pid,
    pid_confidence,
    dob,
    dob_confidence,
    designated_date,
    designated_date_confidence,
    preliminary_diagnosis,
    preliminary_diagnosis_confidence,
    designated_place,
    designated_place_confidence,
    test_place,
    test_place_confidence,
    designated_doctor,
    designated_doctor_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="T??n c?? s??? y t???"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="H??? t??n b???nh nh??n"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="N??m sinh/Tu???i" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field name="M?? y t???/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Ng??y ch??? ?????nh"
        value={designated_date}
        confidence={designated_date_confidence}
      />
      <Field
        name="Ch???n ??o??n s?? b???"
        value={preliminary_diagnosis}
        confidence={preliminary_diagnosis_confidence}
      />
      <Field
        name="N??i ch??? ?????nh"
        value={designated_place}
        confidence={designated_place_confidence}
      />
      <Field
        name="N??i th???c hi???n"
        value={test_place}
        confidence={test_place_confidence}
      />
      <Field
        name="B??c s??? ch??? ?????nh"
        value={designated_doctor}
        confidence={designated_doctor_confidence}
      />
    </>
  );
}

function KetQuaXetNghiem({ data }) {
  const {
    medical_facility,
    medical_facility_confidence,
    patient_name,
    patient_name_confidence,
    gender,
    gender_confidence,
    address,
    address_confidence,
    pid,
    pid_confidence,
    dob,
    dob_confidence,
    designated_date,
    designated_date_confidence,
    preliminary_diagnosis,
    preliminary_diagnosis_confidence,
    test_date,
    test_date_confidence,
    designated_doctor,
    designated_doctor_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="T??n c?? s??? y t???"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="H??? t??n b???nh nh??n"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="N??m sinh/Tu???i" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field name="M?? y t???/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Ch???n ??o??n s?? b???"
        value={preliminary_diagnosis}
        confidence={preliminary_diagnosis_confidence}
      />
      <Field
        name="B??c s??? ch??? ?????nh"
        value={designated_doctor}
        confidence={designated_doctor_confidence}
      />
      <Field
        name="Ng??y ch??? ?????nh"
        value={designated_date}
        confidence={designated_date_confidence}
      />
      <Field
        name="Ng??y th???c hi???n"
        value={test_date}
        confidence={test_date_confidence}
      />
    </>
  );
}

function TuongTrinhTaiNan({ data }) {
  const {
    name,
    name_confidence,
    date_of_accident,
    date_of_accident_confidence,
    location,
    location_confidence,
    address,
    address_confidence,
  } = data || {};

  return (
    <>
      <Field name="H??? t??n" value={name} confidence={name_confidence} />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field
        name="Th???i gian"
        value={date_of_accident}
        confidence={date_of_accident_confidence}
      />
      <Field
        name="?????a ??i???m"
        value={location}
        confidence={location_confidence}
      />
    </>
  );
}

function BienLai({ data }) {
  const {
    medical_facility,
    medical_facility_confidence,
    insure_name,
    insure_name_confidence,
    dob,
    dob_confidence,
    gender,
    gender_confidence,
    address,
    address_confidence,
    total_amount,
    total_amount_confidence,
    date,
    date_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="T??n c?? s??? y t???"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="T??n ng?????i ???????c b???o hi???m"
        value={insure_name}
        confidence={insure_name_confidence}
      />
      <Field name="N??m sinh/tu???i" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field
        name="T???ng ti???n"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <Field name="Ng??y bi??n lai" value={date} confidence={date_confidence} />
    </>
  );
}

function PhieuThu({ data }) {
  const {
    medical_facility,
    medical_facility_confidence,
    insure_name,
    insure_name_confidence,
    dob,
    dob_confidence,
    gender,
    gender_confidence,
    address,
    address_confidence,
    total_amount,
    total_amount_confidence,
    date,
    date_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="T??n c?? s??? y t???"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="T??n ng?????i ???????c b???o hi???m"
        value={insure_name}
        confidence={insure_name_confidence}
      />
      <Field name="N??m sinh/tu???i" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field
        name="T???ng ti???n"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <Field name="Ng??y phi???u thu" value={date} confidence={date_confidence} />
    </>
  );
}

function SoKhamBenh({ data }) {
  const {
    medical_facility,
    medical_facility_confidence,
    insure_name,
    insure_name_confidence,
    dob,
    dob_confidence,
    gender,
    gender_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="T??n c?? s??? y t???"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="T??n ng?????i ???????c b???o hi???m"
        value={insure_name}
        confidence={insure_name_confidence}
      />
      <Field name="N??m sinh/tu???i" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
    </>
  );
}

function PhieuKham({ data }) {
  const {
    medical_facility,
    medical_facility_confidence,
    patient_name,
    patient_name_confidence,
    dob,
    dob_confidence,
    gender,
    gender_confidence,
    address,
    address_confidence,
    pid,
    pid_confidence,
    date_of_examination,
    date_of_examination_confidence,
    symptom,
    symptom_confidence,
    pathological_process,
    pathological_process_confidence,
    preliminary_diagnosis,
    preliminary_diagnosis_confidence,
    medical_history,
    medical_history_confidence,
  } = data || {};

  return (
    <>
      <Field
        name="T??n c?? s??? y t???"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="H??? t??n b???nh nh??n"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="N??m sinh/Tu???i" value={dob} confidence={dob_confidence} />
      <Field name="Gi???i t??nh" value={gender} confidence={gender_confidence} />
      <Field name="?????a ch???" value={address} confidence={address_confidence} />
      <Field name="M?? y t???/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Ng??y kh??m"
        value={date_of_examination}
        confidence={date_of_examination_confidence}
      />
      <Field
        name="L?? do ?????n kh??m/Tri???u ch???ng"
        value={symptom}
        confidence={symptom_confidence}
      />
      <Field
        name="Qu?? tr??nh b???nh l??/B???nh s???"
        value={pathological_process}
        confidence={pathological_process_confidence}
      />
      <Field
        name="Ch???n ??o??n s?? b???"
        value={preliminary_diagnosis}
        confidence={preliminary_diagnosis_confidence}
      />
      <Field
        name="Ti???n s???"
        value={medical_history}
        confidence={medical_history_confidence}
      />
    </>
  );
}

function SoKhaiSinh({ data }) {
  const {
    date,
    dob,
    ethnicity,
    father_address,
    father_dob,
    father_ethnicity,
    father_name,
    father_nationality,
    gender,
    id,
    mother_name,
    mother_dob,
    mother_address,
    name,
    nationality,
    number,
    place_of_birth,
    registrant_id,
    registrant_name,
    sign_name,
    mother_ethnicity,
    mother_nationality,
  } = data || {};

  return (
    <>
      <Field name="S???" value={number} />
      <Field name="Ng?????i ???????c ????ng k?? khai sinh" value={name} />
      <Field name="Ng??y ????ng k??" value={date} />
      <Field name="Ng??y sinh" value={dob} />
      <Field name="Gi???i t??nh" value={gender} />
      <Field name="D??n t???c" value={ethnicity} />
      <Field name="Qu???c t???ch" value={nationality} />
      <Field name="N??i sinh" value={place_of_birth} />
      <Field name="S??? ?????nh danh c?? nh??n" value={id} />
      <Field name="H??? t??n m???" value={mother_name} />
      <Field name="N??m sinh m???" value={mother_dob} />
      <Field name="D??n t???c m???" value={mother_ethnicity} />
      <Field name="Qu???c t???ch m???" value={mother_nationality} />
      <Field name="N??i cu tr?? m???" value={mother_address} />
      <Field name="H??? t??n cha" value={father_name} />
      <Field name="N??m sinh cha" value={father_dob} />
      <Field name="D??n t???c cha" value={father_ethnicity} />
      <Field name="Qu???c t???ch cha" value={father_nationality} />
      <Field name="N??i cu tr?? cha" value={father_address} />
      <Field name="Ng?????i ??i khai sinh" value={registrant_name} />
      <Field name="Gi???y t??? t??y th??n" value={registrant_id} />
      <Field name="Ng?????i k?? gi???y khai sinh" value={sign_name} />
    </>
  );
}

function DeNghiThanhToan({ data }) {
  const {
    chu_dau_tu,
    de_nghi_so,
    de_nghi_so_ngay,
    hop_dong_so,
    hop_dong_so_ngay,
    kinh_gui,
    luy_ke,
    ma_du_an,
    ma_so_dvsdns,
    nh_ngoai_nuoc,
    nh_trong_nuoc,
    phu_luc_so,
    phu_luc_so_ngay,
    so,
    so_du_tam_ung,
    stk_ngoai_nuoc,
    stk_trong_nuoc,
    ten_du_an,
    thuoc_ke_hoach_von,
    thuoc_nguon_von,
    tong_tien_de_nghi,
    von_trong_nuoc_tt,
    von_ngoai_nuoc_tt,
    thue,
    chuyen_tien_bao_hanh,
    so_tra_dvth,
    von_trong_nuoc_dvth,
    von_ngoai_nuoc_dvth,
    ten_dvth,
    stk_dvth,
  } = data || {};

  return (
    <>
      <Field name="Ch??? ?????u t??" value={chu_dau_tu} />
      <Field name="????? ngh??? s???" value={de_nghi_so} />
      <Field name="????? ngh??? s??? ng??y" value={de_nghi_so_ngay} />
      <Field name="H???p ?????ng s???" value={hop_dong_so} />
      <Field name="H???p ?????ng s??? ng??y" value={hop_dong_so_ngay} />
      <Field name="K??nh g???i" value={kinh_gui} />
      <Field name="L??y k???" value={luy_ke} />
      <Field name="M?? d??? ??n" value={ma_du_an} />
      <Field name="M?? s??? ??VSDNS" value={ma_so_dvsdns} />
      <Field name="V???n ngo??i n?????c t???i" value={nh_ngoai_nuoc} />
      <Field name="V???n trong n?????c t???i" value={nh_trong_nuoc} />
      <Field name="Ph??? l???c s???" value={phu_luc_so} />
      <Field name="Ph??? l???c s??? ng??y" value={phu_luc_so_ngay} />
      <Field name="S???" value={so} />
      <Field name="S??? d?? t???m ???ng" value={so_du_tam_ung} />
      <Field name="S??? t??i kho???n ngo??i n?????c" value={stk_ngoai_nuoc} />
      <Field name="S??? t??i kho???n trong n?????c" value={stk_trong_nuoc} />
      <Field name="T??n d??? ??n" value={ten_du_an} />
      <Field name="Thu???c k??? ho???ch v???n" value={thuoc_ke_hoach_von} />
      <Field name="Thu???c ngu???n v???n" value={thuoc_nguon_von} />
      <Field name="T???ng ti???n ????? ngh???" value={tong_tien_de_nghi} />
      <Field name="V???n trong n?????c thanh to??n" value={von_trong_nuoc_tt} />
      <Field name="V???n ngo??i n?????c thanh to??n" value={von_ngoai_nuoc_tt} />
      <Field name="Thu??? gi?? tr??? gia t??ng" value={thue} />
      <Field name="Chuy???n ti???n b???o hi???m" value={chuyen_tien_bao_hanh} />
      <Field name="S??? tr??? ????n v??? th??? h?????ng" value={so_tra_dvth} />
      <Field
        name="V???n trong n?????c ????n v??? th??? h?????ng"
        value={von_trong_nuoc_dvth}
      />
      <Field
        name="V???n ngo??i n?????c ????n v??? th??? h?????ng"
        value={von_ngoai_nuoc_dvth}
      />
      <Field name="T??n ????n v??? th??? h?????ng" value={ten_dvth} />
      <Field name="S??? t??i kho???n ????n b??? th??? h?????ng" value={stk_dvth} />
    </>
  );
}

function DangKyDuTuyen({ data }) {
  const {
    da_tot_nghiep,
    dan_toc,
    dia_chi,
    gioi_tinh,
    ho_khau_tt,
    ho_ten,
    nganh,
    nganh_tot_nghiep,
    ngay_sinh,
    noi_sinh,
    sdt,
    socmnd,
  } = data || {};

  return (
    <>
      <Field name="T???t nghi???p" value={da_tot_nghiep} />
      <Field name="D??n t???c" value={dan_toc} />
      <Field name="?????a ch???" value={dia_chi} />
      <Field name="Gi???i t??nh" value={gioi_tinh} />
      <Field name="H??? kh???u th?????ng tr??" value={ho_khau_tt} />
      <Field name="H??? t??n" value={ho_ten} />
      <Field name="Ng??nh" value={nganh} />
      <Field name="Ng??nh t???t nghi???p" value={nganh_tot_nghiep} />
      <Field name="Ng??y sinh" value={ngay_sinh} />
      <Field name="N??i sinh" value={noi_sinh} />
      <Field name="S??? ??i???n tho???i" value={sdt} />
      <Field name="S??? CMND" value={socmnd} />
    </>
  );
}

function BangTotNghiep({ data }) {
  const { noi_cap_bang, ho_va_ten, ngay_sinh, nam_tot_nghiep } = data || {};

  return (
    <>
      <Field name="N??i c???p b???ng" value={noi_cap_bang} />
      <Field name="H??? v?? t??n" value={ho_va_ten} />
      <Field name="Ng??y sinh" value={ngay_sinh} />
      <Field name="N??m t???t nghi???p" value={nam_tot_nghiep} />
    </>
  );
}

const TableWrapper = styled.div`
  margin-bottom: 12px;
  .ant-table {
    background: #1d1e22 !important;
    color: #fff;
  }
  .ant-table-thead > tr > th {
    background: #1d1e22;
    color: #ffffff57;
    border: 1px solid #f0f0f0;

    &:first-child {
      border-right: 0;
    }
  }
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: #1d1e22;
  }
  .ant-table-tbody > tr > td {
    border: 1px solid #f0f0f0;
    border-top: 0;

    &:first-child {
      border-right: 0;
    }
  }
  .ant-table-body {
    margin-right: -8px;
    &::-webkit-scrollbar {
      height: 8px;
      width: 8px;
      background: transparent;
    }
    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #69696999;
      -webkit-border-radius: 50px;
    }
  }
`;
