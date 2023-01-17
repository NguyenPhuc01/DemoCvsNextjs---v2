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
    cv: <CV data={data} />,
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
                    Trước
                  </Button>
                  <span>
                    {currentPage + 1}/{data2.length}
                  </span>
                  <Button
                    type="text"
                    onClick={() => setCurrentPage((page) => page + 1)}
                    disabled={currentPage === data2.length - 1}
                  >
                    Tiếp
                  </Button>
                </Space>
              </div>
            )}
        </>
      ) : (
        <div className="error">Không tìm thấy nội dung. Vui lòng thử lại!</div>
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
              - {en ? "Confidence: " : "Độ tin cậy: "}
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
        name="Họ tên người nộp tiền"
        value={nguoinop}
        confidence={nguoinop_confidence}
      />
      <Field
        name="Số CMND/Hộ chiếu/Passport người nộp tiền"
        value={so_cmnd}
        confidence={so_cmnd_confidence}
      />
      <Field
        name="Họ tên người nhận tiền"
        value={nguoinhan}
        confidence={nguoinhan_confidence}
      />
      <Field
        name="Số tài khoản người nhận"
        value={stk_nguoinhan}
        confidence={stk_nguoinhan_confidence}
      />
      <Field
        name="Tên ngân hàng người nhận"
        value={nganhang_nguoinhan}
        confidence={nganhang_nguoinhan_confidence}
      />
      <Field
        name="Số tiền chuyển khoản"
        value={sotien}
        confidence={sotien_confidence}
      />
      <Field
        name="Phí chuyển khoản"
        value={phichuyentien}
        confidence={phichuyentien_confidence}
      />
      <Field
        name="Nội dung chuyển khoản"
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
      <Field name="Tên của khách" value={name} confidence={name_confidence} />
      <Field
        name="Ngày sinh của khách"
        value={date_of_birth}
        confidence={date_of_birth_confidence}
      />
      <Field
        name="Giới tính của khách"
        value={gender}
        confidence={gender_confidence}
      />
      <Field
        name="Quốc tịch của khách"
        value={nationality}
        confidence={nationality_confidence}
      />
      <Field
        name="Số hộ chiếu của khách"
        value={passport_number}
        confidence={passport_number_confidence}
      />
      <Field
        name="Số visa của khách"
        value={visa_number}
        confidence={visa_number_confidence}
      />
      <Field
        name="Thời gian lưu trú"
        value={period_of_stay}
        confidence={period_of_stay_confidence}
      />
      <Field
        name="Số lượng đăng ký"
        value={number_of_entries}
        confidence={number_of_entries_confidence}
      />
      <Field
        name="Ngày đăng ký"
        value={date_of_issue}
        confidence={date_of_issue_confidence}
      />
      <Field
        name="Ngày hết hạn"
        value={expiry_date}
        confidence={expiry_date_confidence}
      />
      <Field
        name="Ngày dự kiến đến"
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
      <Field name="Số HĐ" value={so_hd} confidence={so_hd_confidence} />
      <Field
        name="Tên bên bán"
        value={ten_ben_ban}
        confidence={ten_ben_ban_confidence}
      />
      <Field name="Số CMND" value={so_cmnd} confidence={so_cmnd_confidence} />
      <Field name="Nơi cấp" value={noi_cap} confidence={noi_cap_confidence} />
      <Field
        name="Ngày cấp"
        value={ngay_cap}
        confidence={ngay_cap_confidence}
      />
      <Field name="Địa chỉ" value={dia_chi} confidence={dia_chi_confidence} />
      <Field
        name="Số TKGDCK"
        value={so_tkgdck}
        confidence={so_tkgdck_confidence}
      />
      <Field
        name="Tên trái phiếu"
        value={ten_trai_phieu}
        confidence={ten_trai_phieu_confidence}
      />
      <Field
        name="Tổ chức phát hành"
        value={to_chuc_phat_hanh}
        confidence={to_chuc_phat_hanh_confidence}
      />
      <Field
        name="Đại lý đăng ký lưu ký và Đại lý thanh toán"
        value={dai_ly}
        confidence={dai_ly_confidence}
      />
      <Field
        name="Ngày phát hành"
        value={ngay_phat_hanh}
        confidence={ngay_phat_hanh_confidence}
      />
      <Field
        name="Ngày đáo hạn"
        value={ngay_dao_han}
        confidence={ngay_dao_han_confidence}
      />
      <Field
        name="Mệnh giá"
        value={menh_gia}
        confidence={menh_gia_confidence}
      />
      <Field
        name="Ngày thanh toán"
        value={ngay_thanh_toan}
        confidence={ngay_thanh_toan_confidence}
      />
      <Field
        name="Số lượng Trái phiếu giao dịch"
        value={so_luong_trai_phieu}
        confidence={so_luong_trai_phieu_confidence}
      />
      <Field
        name="Đơn giá bán Trái phiếu"
        value={don_gia_trai_phieu}
        confidence={don_gia_trai_phieu_confidence}
      />
      <Field
        name="Tổng giá bán Trái phiếu"
        value={tong_gia_trai_phieu}
        confidence={tong_gia_trai_phieu_confidence}
      />
      <Field
        name="Thuế thu nhập cá nhân"
        value={thue_thu_ca_nhan}
        confidence={thue_thu_ca_nhan_confidence}
      />
      <Field
        name="Phí quản lý chuyển nhượng"
        value={phi_quan_ly}
        confidence={phi_quan_ly_confidence}
      />
      <Field
        name="Số tiền bên bán thực nhận"
        value={so_tien_ben_ban}
        confidence={so_tien_ben_ban_confidence}
      />
      <Field
        name="Người thụ hưởng"
        value={nguoi_thu_huong}
        confidence={nguoi_thu_huong_confidence}
      />
      <Field
        name="Số tài khoản"
        value={so_tai_khoan}
        confidence={so_tai_khoan_confidence}
      />
      <Field name="Mở tại" value={mo_tai} confidence={mo_tai_confidence} />
      <Field
        name="Nội dung"
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
      <Field name="Số thẻ" value={number} confidence={number_confidence} />
      <Field name="Họ tên chủ thẻ" value={name} confidence={name_confidence} />
      <Field
        name="Ngày hết hạn"
        value={due_date}
        confidence={due_date_confidence}
      />
      <Field
        name="Ngày cấp"
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
        name="Tên khách hàng"
        value={ten_khach_hang}
        confidence={ten_khach_hang_confidence}
      />
      <Field
        name="Số CMT khách hàng"
        value={so_cmt_khach_hang}
        confidence={so_cmt_khach_hang_confidence}
      />
      <Field
        name="Ngày cấp khách hàng"
        value={ngay_cap_khach_hang}
        confidence={ngay_cap_khach_hang_confidence}
      />
      <Field
        name="Nơi cấp khách hàng"
        value={noi_cap_khach_hang}
        confidence={noi_cap_khach_hang_confidence}
      />
      <Field
        name="Số CMT khách hàng"
        value={so_cmt_cu_khach_hang}
        confidence={so_cmt_cu_khach_hang_confidence}
      />
      <Field
        name="Ngày sinh khách hàng"
        value={ngay_sinh_khach_hang}
        confidence={ngay_sinh_khach_hang_confidence}
      />
      <Field
        name="Giới tính khách hàng"
        value={gioi_tinh_khach_hang}
        confidence={gioi_tinh_khach_hang_confidence}
      />
      <Field
        name="SDT khách hàng"
        value={so_dien_thoai_khach_hang}
        confidence={so_dien_thoai_khach_hang_confidence}
      />
      <Field
        name="Email khách hàng"
        value={email_khach_hang}
        confidence={email_khach_hang_confidence}
      />
      <Field
        name="Địa chỉ thường trú khách hàng"
        value={dc_thuong_tru_khach_hang}
        confidence={dc_thuong_tru_khach_hang_confidence}
      />
      <Field
        name="Địa chỉ liên hệ khách hàng"
        value={dc_lien_he_khach_hang}
        confidence={dc_lien_he_khach_hang_confidence}
      />
      <Field
        name="Tình trạng hôn nhân khách hàng"
        value={tinh_trang_hon_nhan}
        confidence={tinh_trang_hon_nhan_confidence}
      />
      <Field
        name="Tên vợ/chồng"
        value={ten_vo_chong}
        confidence={ten_vo_chong_confidence}
      />
      <Field
        name="Số CMT vợ/chồng"
        value={so_cmt_vo_chong}
        confidence={so_cmt_vo_chong_confidence}
      />
      <Field
        name="Ngày cấp vợ/chồng"
        value={ngay_cap_vo_chong}
        confidence={ngay_cap_vo_chong_confidence}
      />
      <Field
        name="Nơi cấp vợ/chồng"
        value={noi_cap_vo_chong}
        confidence={noi_cap_vo_chong_confidence}
      />
      <Field
        name="Ngày sinh vợ/chồng"
        value={ngay_sinh_vo_chong}
        confidence={ngay_sinh_vo_chong_confidence}
      />
      <Field
        name="Giới tính vợ/chồng"
        value={gioi_tinh_vo_chong}
        confidence={gioi_tinh_vo_chong_confidence}
      />
      <Field
        name="Số điện thoại vợ/chồng"
        value={so_dien_thoai_vo_chong}
        confidence={so_dien_thoai_vo_chong_confidence}
      />
      <Field
        name="Email vợ/chồng"
        value={email_vo_chong}
        confidence={email_vo_chong_confidence}
      />
      <Field
        name="Địa chỉ thường trú vợ/chồng"
        value={dc_thuong_tru_vo_chong}
        confidence={dc_thuong_tru_vo_chong_confidence}
      />
      <Field
        name="Địa chỉ liên hệ vợ/chồng"
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
    IsCha_me: "Cha/Mẹ",
    IsChau_ruot: "Cháu ruột",
    IsChi: "Chị",
    IsChu_ho: "Chủ hộ",
    IsCon: "Con",
    IsEm: "Em",
    IsKhac: "Khác",
    IsOng_ba: "Ông/Bà",
    IsVo_chong: "Vợ/Chồng",
    IsNam: "Nam",
    IsNu: "Nữ",
    IsDan_toc_thieu_so: "Dân tộc thiểu số",
    IsNguoi_khuyet_tat: "Người khuyết tật",
    IsThan_nhan_cua_nguoi_co_cong_voi_cach_mang:
      "Thân nhân của người có công với cách mạng",
    IsThuoc_ho_bi_thu_hoi_dat: "Thuộc hộ bị thu hồi đất",
    IsThuoc_ho_can_ngheo: "Thuộc hộ cận nghèo",
    IsThuoc_ho_ngheo: "Thuộc hộ nghèo",
    IsChua_hoc_xong_tieu_hoc: "Chưa học xong Tiểu học",
    IsTot_nghiep_THCS: "Tốt nghiệp THCS",
    IsTot_nghiep_THPT: "Tốt nghiệp THPT",
    IsTot_nghiep_tieu_hoc: "Tốt nghiệp Tiểu học",
    IsCNKT_khong_co_bang: "CNKT không có bằng",
    IsCao_dang: "Cao đẳng",
    IsChua_qua_dao_tao: "Chưa qua đào tạo",
    IsChung_chi_nghe_D3T: "Chứng chỉ nghề dưới 3 tháng",
    IsDai_hoc: "Đại học",
    IsSo_cap: "Sơ cấp",
    IsTren_dai_hoc: "Trên đại học",
    IsTrung_cap: "Trung cấp",
    IsKhong_tham_gia_lao_dong: "Không tham gia hoạt động kinh tế",
    IsNguoi_co_viec_lam: "Người có việc làm",
    IsNguoi_that_nghiep: "Người thất nghiệp",
    IsChu_co_so_SXKD: "Chủ cơ sở SXKD",
    IsLam_cong_an_luong: "Làm công ăn lương",
    IsLao_dong_gia_dinh: "Lao động gia đình",
    IsTu_lam: "Tự làm",
    IsXa_vien_HTX: "Xã viên HTX",
    IsCo: "Có",
    IsKhong: "Không",
    IsHDLD_khong_xac_dinh_thoi_han: "HĐLĐ không xác định thời hạn",
    IsHDLD_xac_dinh_thoi_han: "HĐLĐ xác định thời hạn",
    IsCa_nhan_lam_tu_do: "Cá nhân làm tự do",
    IsCo_so_kinh_doanh_ca_the: "Cơ sở kinh doanh cá thể",
    IsDoanh_nghiep: "Doanh nghiệp",
    IsDon_vi_su_nghiep_ngoai_nha_nuoc: "Đơn vị sự nghiệp ngoài nhà nước",
    IsHo_nong_lam_ngiep_thuy_san: "Hộ nông, lâm nghiệp, thủy sản",
    IsHop_tac_xa: "Hợp tác xã",
    IsKhu_vuc_nha_nuoc: "Khu vực nhà nước",
    IsKhu_vuc_nuoc_ngoai: "Khu vực nước ngoài",
    IsTo_chuc_doan_the_khac: "Tô chức đoàn thể khác",
    IsChua_bao_gio_lam_viec: "Chưa bao giờ làm việc",
    IsDa_tung_lam_viec: "Đã từ làm việc",
    IsDuoi_3_thang: "Dưới 3 tháng",
    IsTren_1_nam: "Trên 1 năm",
    IsTu_3_thang_den_1_nam: "Từ 3 tháng đến 1 năm",
    IsBat_buoc: "Bắt buộc",
    IsTu_nguyen: "Tự nguyện",
    IsDi_hoc: "Đi học",
    IsHuu_tri: "Hưu trí",
    IsKhac: "Khác",
    IsKhuyet_tat: "Khuyết tật",
    IsNoi_tro: "Nội trợ",
    IsDN_FDI: "DN FDI",
    IsDN_ngoai_nha_nuoc: "DN ngoài Nhà nước",
    IsDN_nha_nuoc: "DN Nà nước",
  };

  const format = (obj) =>
    Object.keys(obj)
      .filter((key) => obj[key])
      .map((key) => textMaps[key])
      .join(", ");

  return (
    <>
      <Field name="Tỉnh/thành phố" value={tinh_thanh_pho} />
      <Field name="Mã tỉnh/thành phố" value={ma_tinh_thanh_pho} />
      <Field name="Quận/huyện" value={quan_huyen} />
      <Field name="Mã quận/huyện" value={ma_quan_huyen} />
      <Field name="Xã/phường" value={xa_phuong} />
      <Field name="Mã xã/phường" value={ma_xa_phuong} />
      <Field name="Thôn/tổ" value={thon_to} />
      <Field name="Mã thôn/tổ" value={ma_thon_to} />
      <Field name="Mã hộ gia đình" value={ma_ho_gia_dinh} />
      <Field name="Họ tên" value={ho_ten} />
      <Field name="Quan hệ với chủ hộ" value={format(quan_he_voi_chu_ho)} />
      <Field name="Ngày sinh" value={ngay_sinh} />
      <Field name="Giới tính" value={format(gioi_tinh)} />
      <Field name="Số CCCD/CMND" value={so_cccd_cmnd} />
      <Field name="Mã số BHXH" value={ma_so_bhxh} />
      <Field name="Nơi đăng ký thường trú" value={noi_dang_ky_thuong_tru} />
      <Field name="Nơi ở hiện tại" value={noi_o_hien_tai} />
      <Field name="Đối tượng ưu tiên" value={format(doi_tuong_uu_tien)} />
      <Field name="Tên dân tộc" value={ten_dan_toc} />
      <Field name="Mã dân tộc" value={ma_dan_toc} />
      <Field
        name="Trình độ giáo dục phổ thông cao nhất đã tốt nghiệp"
        value={format(trinh_do_giao_duc_pho_thong)}
      />
      <Field
        name="Trình độ chuyên môn kỹ thuật cao nhất đạt được"
        value={format(trinh_do_chuyen_mon_ky_thuat)}
      />
      <Field name="Chuyên ngành đào tạo" value={chuyen_nganh_dao_tao} />
      <Field
        name="Tình trạng tham gia hoạt động kinh tế"
        value={format(tinh_trang_tham_gia_lao_dong)}
      />
      <Field name="Lý do không tham gia" value={format(ly_do_khong_tham_gia)} />
      <Field name="Vị thế việc làm" value={format(vi_the_viec_lam)} />
      <Field
        name="Công việc cụ thể đang làm"
        value={cong_viec_cu_the_dang_lam}
      />
      <Field name="Tham gia BHXH" value={format(tham_gia_BHXH)} />
      <Field name="Loại BHXH" value={format(loai_BHXH)} />
      <Field name="Hợp đồng lao động" value={format(hop_dong_lao_dong)} />
      <Field
        name="Loại hợp đồng lao động"
        value={format(loai_hop_dong_lao_dong)}
      />
      <Field
        name="Thời gian bắt đầu thực hiện HĐLĐ"
        value={thoi_gian_bat_dau_thuc_hien_hdld}
      />
      <Field name="Nơi làm việc" value={noi_lam_viec} />
      <Field
        name="Loại hình nơi làm việc"
        value={format(loai_hinh_noi_lam_viec)}
      />
      <Field
        name="Loại hình doanh nghiệp"
        value={format(loai_hinh_doanh_nghiep)}
      />
      <Field name="Địa chỉ nơi làm việc" value={dia_chi_noi_lam_viec} />
      <Field name="Loại thất nghiệp" value={format(loai_that_nghiep)} />
      <Field
        name="Thời gian thất nghiệp"
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
    dent: "Xe bị móp (dent)",
    scratch: "Xe bị trầy, xước (scratch)",
    torn: "Xe bị rách (torn)",
    broken: "Xe bị vỡ (broken)",
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
  const { EDUCATION, EXPERIENCE, INFORMATION } = data;
  const { CERT, GRAD = [], SPEC } = EDUCATION;
  const { COMP = [], SKILL = [] } = EXPERIENCE;
  const {
    ADDRESS,
    DOB,
    EMAIL = [],
    FACEBOOK = [],
    GENDER,
    HOME,
    LINKEDIN = [],
    NAME,
    OTHER = [],
    PHONE = [],
  } = INFORMATION;

  return (
    <>
      <div style={{ color: "rgba(255,255,255,0.34)", padding: "12px 0" }}>
        -- THÔNG TIN --
      </div>
      <Field name="Họ tên" value={NAME} />
      <Field name="Giới tính" value={GENDER} />
      <Field name="Ngày sinh" value={DOB} />
      <Field name="Địa chỉ" value={ADDRESS} />
      <Field name="Nhà" value={HOME} />
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
        <div className="field-name">Điện thoại:</div>
        {PHONE.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>
      <div className="field">
        <div className="field-name">Khác:</div>
        {OTHER.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>

      <div style={{ color: "rgba(255,255,255,0.34)", padding: "12px 0" }}>
        -- HỌC VẤN --
      </div>
      <div className="field">
        <div className="field-name">Tốt nghiệp trường:</div>
        {GRAD.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>
      <Field name="Chuyên ngành" value={SPEC} />
      <Field name="Chứng chỉ" value={CERT} />

      <div style={{ color: "rgba(255,255,255,0.34)", padding: "12px 0" }}>
        -- KỸ NĂNG & KINH NGHIỆM --
      </div>
      <div className="field">
        <div className="field-name">Kỹ năng:</div>
        {SKILL.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>
      <div className="field">
        <div className="field-name">Công ty:</div>
        {COMP.map((item) => (
          <div className="field-value">{item}</div>
        ))}
      </div>
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
        name="Tên cơ sở y tế"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Số bảng kê"
        value={table_number}
        confidence={table_number_confidence}
      />
      <Field
        name="Ngày bảng kê"
        value={table_date}
        confidence={table_date_confidence}
      />
      <Field
        name="Tên bệnh nhân"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field
        name="Mã y tế/Mã bệnh nhân"
        value={pid}
        confidence={pid_confidence}
      />
      <Field
        name="Tổng tiền thanh toán"
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
      title: "Tên hàng hóa, dịch vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thành tiền",
      dataIndex: "coin",
      key: "coin",
    },
  ];

  return (
    <>
      <Field name="Ngày hóa đơn" value={date} confidence={date_confidence} />
      <Field name="Mẫu số" value={form} confidence={form_confidence} />
      <Field
        name="Số hóa đơn"
        value={invoice_no}
        confidence={invoice_no_confidence}
      />
      <Field
        name="Số ký hiệu hóa đơn"
        value={serial_no}
        confidence={serial_no_confidence}
      />
      <Field
        name="Nhà cung cấp"
        value={supplier}
        confidence={supplier_confidence}
      />
      <Field
        name="Mã số thuế nhà cung cấp"
        value={tax_code}
        confidence={tax_code_confidence}
      />
      <Field
        name="Hình thức thanh toán"
        value={payment_method}
        confidence={payment_method_confidence}
      />
      <Field
        name="Tiền trước thuế"
        value={sub_total}
        confidence={sub_total_confidence}
      />
      <Field
        name="Tiền thuế"
        value={vat_amount}
        confidence={vat_amount_confidence}
      />
      <Field
        name="Tên đơn vị"
        value={purchaser_name}
        confidence={purchaser_name_confidence}
      />
      <Field
        name="Địa chỉ nhà cung cấp"
        value={supplier_address}
        confidence={supplier_address_confidence}
      />
      <Field
        name="Thuế suất VAT"
        value={vat_rate}
        confidence={vat_rate_confidence}
      />
      {info_goods?.length ? (
        <TableWrapper>
          <Table dataSource={info_goods} columns={columns} pagination={false} />
        </TableWrapper>
      ) : null}
      <Field
        name="Tổng cộng"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <div className="field">
        <div className="field-name">Tài khoản ngân hàng:</div>
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
                <span className="confidence-label">- Độ tin cậy: </span>
                {getConfidence(account_no_confidence)}
                <br />
                {bank && (
                  <>
                    {bank}{" "}
                    <span className="confidence-label">- Độ tin cậy: </span>
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
      title: "Tên hàng hóa, dịch vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thành tiền",
      dataIndex: "coin",
      key: "coin",
    },
  ];

  return (
    <>
      <Field name="Ngày hóa đơn" value={date} confidence={date_confidence} />
      <Field name="Mẫu số" value={form} confidence={form_confidence} />
      <Field
        name="Số hóa đơn"
        value={invoice_no}
        confidence={invoice_no_confidence}
      />
      <Field
        name="Số ký hiệu hóa đơn"
        value={serial_no}
        confidence={serial_no_confidence}
      />
      <Field
        name="Nhà cung cấp"
        value={supplier}
        confidence={supplier_confidence}
      />
      <Field
        name="Mã số thuế nhà cung cấp"
        value={tax_code}
        confidence={tax_code_confidence}
      />
      <Field
        name="Hình thức thanh toán"
        value={payment_method}
        confidence={payment_method_confidence}
      />
      <Field
        name="Địa chỉ nhà cung cấp"
        value={supplier_address}
        confidence={supplier_address_confidence}
      />
      <Field
        name="Thuế suất VAT"
        value={vat_rate}
        confidence={vat_rate_confidence}
      />
      {info_goods?.length ? (
        <TableWrapper>
          <Table dataSource={info_goods} columns={columns} pagination={false} />
        </TableWrapper>
      ) : null}
      <Field
        name="Tổng cộng"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <div className="field">
        <div className="field-name">Tài khoản ngân hàng:</div>
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
                <span className="confidence-label">- Độ tin cậy: </span>
                {getConfidence(account_no_confidence)}
                <br />
                {bank && (
                  <>
                    {bank}{" "}
                    <span className="confidence-label">- Độ tin cậy: </span>
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
        name="Số khai tử"
        value={so_khai_tu}
        confidence={so_khai_tu_confidence}
      />
      <Field
        name="Ngày khai tử"
        value={ngay_khai_tu}
        confidence={ngay_khai_tu_confidence}
      />
      <Field
        name="Họ và tên"
        value={ho_va_ten}
        confidence={ho_va_ten_confidence}
      />
      <Field
        name="Ngày sinh"
        value={ngay_sinh}
        confidence={ngay_sinh_confidence}
      />
      <Field
        name="Giới tính"
        value={gioi_tinh}
        confidence={gioi_tinh_confidence}
      />
      <Field name="Dân tộc" value={dan_toc} confidence={dan_toc_confidence} />
      <Field
        name="Quốc tịch"
        value={quoc_tich}
        confidence={quoc_tich_confidence}
      />
      <Field
        name="Số định danh"
        value={so_dinh_danh}
        confidence={so_dinh_danh_confidence}
      />
      <Field
        name="Số CMND người mất"
        value={so_cmnd_nguoi_mat}
        confidence={so_cmnd_nguoi_mat_confidence}
      />
      <Field
        name="Nơi cấp CMND người mất"
        value={noi_cap_cmnd_nguoi_mat}
        confidence={noi_cap_cmnd_nguoi_mat_confidence}
      />
      <Field
        name="Ngày cấp CMND người mất"
        value={ngay_cap_cmnd_nguoi_mat}
        confidence={ngay_cap_cmnd_nguoi_mat_confidence}
      />
      <Field
        name="Nguyên nhân chết"
        value={nguyen_nhan_chet}
        confidence={nguyen_nhan_chet_confidence}
      />
      <Field
        name="Người đi khai tử"
        value={nguoi_khai_tu}
        confidence={nguoi_khai_tu_confidence}
      />
      <Field
        name="Số CMND người khai tử"
        value={so_cmnd_nguoi_khai_tu}
        confidence={so_cmnd_nguoi_khai_tu_confidence}
      />
      <Field
        name="Nơi cấp CMND người khai tử"
        value={noi_cap_cmnd_nguoi_khai_tu}
        confidence={noi_cap_cmnd_nguoi_khai_tu_confidence}
      />
      <Field
        name="Ngày cấp CMND người khai tử"
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
      <Field name="Mã số thuế" value={ma_so_thue} />
      <Field name="Tên người nộp thuế" value={ten_nguoi_nop_thue} />
      <Field
        name="Ngày chứng nhận đăng ký kinh doanh"
        value={chung_nhan_DKKD}
      />
      <Field name="Ngày quyết định thành lập" value={quyet_dinh} />
      <Field name="Số CMND" value={CMND} />
      <Field name="Ngày cấp mã số thuế" value={ngay_cap_MST} />
      <Field name="Cơ quan quản lý" value={co_quan_quan_ly} />
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
      <Field name="Số" value={so} confidence={so_confidence} />
      <Field name="Chủ hộ" value={chu_ho} confidence={chu_ho_confidence} />
      <Field
        name="Địa chỉ thường trú"
        value={thuong_tru}
        confidence={thuong_tru_confidence}
      />
      <Field
        name="Quan hệ với chủ hộ"
        value={quan_he_chu_ho}
        confidence={quan_he_chu_ho_confidence}
      />
      <Field
        name="Họ và tên thành viên"
        value={ho_va_ten}
        confidence={ho_va_ten_confidence}
      />
      <Field
        name="Ngày sinh của thành viên"
        value={ngay_sinh}
        confidence={ngay_sinh_confidence}
      />
      <Field
        name="Giới tính của thành viên"
        value={gioi_tinh}
        confidence={gioi_tinh_confidence}
      />
      <Field
        name="Nguyên quán của thành viên"
        value={nguyen_quan}
        confidence={nguyen_quan_confidence}
      />
      <Field
        name="Dân tộc của thành viên"
        value={dan_toc}
        confidence={dan_toc_confidence}
      />
      <Field
        name="Tôn giáo của thành viên"
        value={ton_giao}
        confidence={ton_giao_confidence}
      />
      <Field
        name="Quốc tịch của thành viên"
        value={quoc_tich}
        confidence={quoc_tich_confidence}
      />
      <Field
        name="Số CMND của thành viên"
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
      <Field name="Số lý lịch tư pháp" value={so} confidence={so_confidence} />
      <Field
        name="Ngày cấp lý lịch tư pháp"
        value={ngaycap}
        confidence={ngaycap_confidence}
      />
      <Field name="Án tích" value={an_tich} confidence={an_tich_confidence} />
      <Field
        name="Giới tính"
        value={gioitinh}
        confidence={gioitinh_confidence}
      />
      <Field
        name="Họ và tên"
        value={ho_va_ten}
        confidence={ho_va_ten_confidence}
      />
      <Field
        name="Năm tốt nghiệp"
        value={nam_tot_nghiep}
        confidence={nam_tot_nghiep_confidence}
      />
      <Field
        name="Nơi sinh"
        value={noi_sinh}
        confidence={noi_sinh_confidence}
      />
      <Field
        name="Quốc tịch"
        value={quoc_tich}
        confidence={quoc_tich_confidence}
      />
      <Field name="Số CCCD" value={so_CCCD} confidence={so_CCCD_confidence} />
      <Field name="Tạm trú" value={tam_tru} confidence={tam_tru_confidence} />
      <Field
        name="Thường trú"
        value={thuong_tru}
        confidence={thuong_tru_confidence}
      />
      <Field
        name="Ngày cấp CMND/Hộ chiếu/TCC"
        value={ngaycap_cmnd}
        confidence={ngaycap_cmnd_confidence}
      />
      <Field
        name="Nơi cấp CMND/Hộ chiếu/TCC"
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
        name="Số hợp đồng bảo hiểm"
        value={so_hdbh}
        confidence={so_hdbh_confidence}
      />
      <Field
        name="Tên bên mua bảo hiểm"
        value={ten_bmbh}
        confidence={ten_bmbh_confidence}
      />
      <Field
        name="Số CMND/ CCCD/ Hộ chiếu"
        value={so_cmnd}
        confidence={so_cmnd_confidence}
      />
      <Field
        name="Tên NĐBH 1"
        value={ten_ndbh}
        confidence={ten_ndbh_confidence}
      />
      <Field
        name="Địa chỉ liên lạc"
        value={diachi}
        confidence={diachi_confidence}
      />
      <Field
        name="ĐT nhà riêng"
        value={dt_nha_rieng}
        confidence={dt_nha_rieng_confidence}
      />
      <Field
        name="ĐT di động"
        value={dt_di_dong}
        confidence={dt_di_dong_confidence}
      />
      <Field name="Email" value={email} confidence={email_confidence} />
      <Field
        name="Ngày/tháng/năm"
        value={ngay_thang_nam}
        confidence={ngay_thang_nam_confidence}
      />
      <Field
        name="Tên ĐDKD"
        value={ten_dkkd}
        confidence={ten_dkkd_confidence}
      />
      <Field
        name="Mã số ĐDKD"
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
        name="Họ tên người trả tiền"
        value={hotennguoitratien}
        confidence={hotennguoitratien_confidence}
      />
      <Field
        name="Địa chỉ người trả tiền"
        value={diachinguoitratien}
        confidence={diachinguoitratien_confidence}
      />
      <Field
        name="Số tài khoản người trả tiền"
        value={stk_nguoitratien}
        confidence={stk_nguoitratien_confidence}
      />
      <Field
        name="Họ tên người hưởng"
        value={hotennguoihuong}
        confidence={hotennguoihuong_confidence}
      />
      <Field
        name="Địa chỉ người hưởng"
        value={diachinguoihuong}
        confidence={diachinguoihuong_confidence}
      />
      <Field
        name="Số tài khoản người hưởng"
        value={stk_nguoihuong}
        confidence={stk_nguoihuong_confidence}
      />
      <Field name="Ngày lập" value={ngaylap} confidence={ngaylap_confidence} />
      <Field
        name="Số tiền bằng số"
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
        name="Tên người mua"
        value={MBH_Ten}
        confidence={MBH_Ten_confidence}
      />
      <Field
        name="Ngày sinh người mua "
        value={MBH_NgaySinh}
        confidence={MBH_NgaySinh_confidence}
      />
      <Field
        name="Số CMND/CCCD/HS/GKS người mua "
        value={MBH_ID}
        confidence={MBH_ID_confidence}
      />
      <Field
        name="Số điện thoại người mua"
        value={MBH_SDT}
        confidence={MBH_SDT_confidence}
      />
      <Field
        name="Email người mua"
        value={MBH_Email}
        confidence={MBH_Email_confidence}
      />
      <Field
        name="Địa chỉ người mua"
        value={MBH_DiaChi}
        confidence={MBH_DiaChi_confidence}
      />
      <Field
        name="Người được bảo hiểm là"
        value={DBH_QH}
        confidence={DBH_QH_confidence}
      />
      <Field
        name="Họ tên người được bảo hiểm"
        value={DBH_Ten}
        confidence={DBH_Ten_confidence}
      />
      <Field
        name="Ngày sinh người được bảo hiểm"
        value={DBH_NgaySinh}
        confidence={DBH_NgaySinh_confidence}
      />
      <Field
        name="Số CMND/CCCD/HS/GKS người được bảo hiểm"
        value={DBH_ID}
        confidence={DBH_ID_confidence}
      />
      <Field name="Gói ABYV" value={CT_ABYV} confidence={CT_ABYV_confidence} />
      <Field name="Gói ASHP" value={CT_ASHP} confidence={CT_ASHP_confidence} />
      <Field
        name="Kê khai sức khỏe 1"
        value={KKSK_1}
        confidence={KKSK_1_confidence}
      />
      <Field
        name="Kê khai sức khỏe 2"
        value={KKSK_2}
        confidence={KKSK_2_confidence}
      />
      <Field
        name="Tên bệnh nếu có"
        value={TenBenh}
        confidence={TenBenh_confidence}
      />
      <Field
        name="Ngày viết yêu cầu bảo hiểm"
        value={Ngay}
        confidence={Ngay_confidence}
      />
      <Field name="Mã đại lý" value={MaDL} confidence={MaDL_confidence} />
      <Field name="Tên công ty" value={CongTy} confidence={CongTy_confidence} />
      <Field name="Tên phòng" value={Phong} confidence={Phong_confidence} />
      <Field name="Có chữ ký" value={Co_Chu_Ky ? "Có" : "Không"} />
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
        name="Họ tên"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field
        name="Ngày sinh"
        value={patient_dob}
        confidence={patient_dob_confidence}
      />
      <Field
        name="Giới tính"
        value={patient_gender}
        confidence={patient_gender_confidence}
      />
      <Field
        name="Quốc tịch"
        value={patient_nationality}
        confidence={patient_nationality_confidence}
      />
      <Field
        name="Địa chỉ"
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
        name="Cơ sở y tế"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Khoa"
        value={department}
        confidence={department_confidence}
      />
      <Field
        name="Họ và tên"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field
        name="Năm sinh/Tuổi"
        value={year_of_birth}
        confidence={year_of_birth_confidence}
      />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field name="Mã y tế" value={pid} confidence={pid_confidence} />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field
        name="Ngày vào viện"
        value={hospitalization_date}
        confidence={hospitalization_date_confidence}
      />
      <Field
        name="Ngày ra viện"
        value={hospital_discharge_date}
        confidence={hospital_discharge_date_confidence}
      />
      <Field
        name="Chẩn đoán"
        value={diagnose}
        confidence={diagnose_confidence}
      />
      <Field
        name="Phương pháp điều trị"
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
      <Field name="Ngày hóa đơn" value={date} confidence={date_confidence} />
      <Field name="Mẫu số" value={form} confidence={form_confidence} />
      <Field
        name="Số hóa đơn"
        value={invoice_no}
        confidence={invoice_no_confidence}
      />
      <Field
        name="Số ký hiệu hóa đơn"
        value={serial_no}
        confidence={serial_no_confidence}
      />
      <Field
        name="Nhà cung cấp"
        value={supplier}
        confidence={supplier_confidence}
      />
      <Field
        name="Mã số thuế nhà cung cấp"
        value={tax_code}
        confidence={tax_code_confidence}
      />
      <Field
        name="Hình thức thanh toán"
        value={payment_method}
        confidence={payment_method_confidence}
      />
      <Field
        name="Tiền trước thuế"
        value={sub_total}
        confidence={sub_total_confidence}
      />
      <Field
        name="Tiền thuế"
        value={vat_amount}
        confidence={vat_amount_confidence}
      />
      <Field
        name="Tên đơn vị"
        value={purchaser_name}
        confidence={purchaser_name_confidence}
      />
      <Field
        name="Địa chỉ nhà cung cấp"
        value={supplier_address}
        confidence={supplier_address_confidence}
      />
      <Field
        name="Thuế suất VAT"
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
        name="Tổng cộng"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <div className="field">
        <div className="field-name">Tài khoản ngân hàng:</div>
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
                <span className="confidence-label">- Độ tin cậy: </span>
                {getConfidence(account_no_confidence)}
                <br />
                {bank && (
                  <>
                    {bank}{" "}
                    <span className="confidence-label">- Độ tin cậy: </span>
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
      title: "Tên phụ tùng, vật tư",
      key: "description",
      dataIndex: "description",
      width: 200,
    },
    {
      title: "Số lượng",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Đơn giá",
      key: "unit_price",
      dataIndex: "unit_price",
    },
    {
      title: "Phần trăm giảm giá",
      key: "percent_discount",
      dataIndex: "percent_discount",
    },
    {
      title: "Giảm giá",
      key: "discount",
      dataIndex: "discount",
    },
    {
      title: "Phần trăm thuế",
      key: "tax",
      dataIndex: "tax",
    },
    {
      title: "Thành tiền",
      key: "amount_total",
      dataIndex: "amount_total",
    },
  ];

  return (
    <>
      <Field
        name="Tên gara, xưởng sửa chữa"
        value={name_of_garage}
        confidence={name_of_garage_confidence}
      />
      <Field
        name="Ngày báo giá"
        value={quotation_date}
        confidence={quotation_date_confidence}
      />
      <Field
        name="Ngày dự kiến giao xe"
        value={estimated_delivery_date}
        confidence={estimated_delivery_date_confidence}
      />
      <Field
        name="Tổng tiền sau thuế"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <Field
        name="Tổng tiền trước thuế"
        value={sub_total}
        confidence={sub_total_confidence}
      />
      <Field
        name="Tiền thuế"
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
      <Field name="Ngày hóa đơn" value={date} confidence={date_confidence} />
      <Field name="Mẫu số" value={form} confidence={form_confidence} />
      <Field
        name="Số hóa đơn"
        value={invoice_no}
        confidence={invoice_no_confidence}
      />
      <Field
        name="Số ký hiệu hóa đơn"
        value={serial_no}
        confidence={serial_no_confidence}
      />
      <Field
        name="Nhà cung cấp"
        value={supplier}
        confidence={supplier_confidence}
      />
      <Field
        name="Mã số thuế nhà cung cấp"
        value={tax_code}
        confidence={tax_code_confidence}
      />
      <Field
        name="Hình thức thanh toán"
        value={payment_method}
        confidence={payment_method_confidence}
      />
      <Field
        name="Tiền trước thuế"
        value={sub_total}
        confidence={sub_total_confidence}
      />
      <Field
        name="Tiền thuế"
        value={vat_amount}
        confidence={vat_amount_confidence}
      />
      <Field
        name="Tên đơn vị"
        value={purchaser_name}
        confidence={purchaser_name_confidence}
      />
      <Field
        name="Địa chỉ nhà cung cấp"
        value={supplier_address}
        confidence={supplier_address_confidence}
      />
      <Field
        name="Thuế suất VAT"
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
        name="Tổng cộng"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <div className="field">
        <div className="field-name">Tài khoản ngân hàng:</div>
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
                <span className="confidence-label">- Độ tin cậy: </span>
                {getConfidence(account_no_confidence)}
                <br />
                {bank && (
                  <>
                    {bank}{" "}
                    <span className="confidence-label">- Độ tin cậy: </span>
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
        name="Tên người được bảo hiểm"
        value={insure_name}
        confidence={insure_name_confidence}
      />
      <Field
        name="Số thẻ bảo hiểm"
        value={policy_no}
        confidence={policy_no_confidence}
      />
      <Field
        name="Số điện thoại"
        value={phone_number}
        confidence={phone_number_confidence}
      />
      <Field name="Email" value={email} confidence={email_confidence} />
      <Field
        name="Ngày xảy ra"
        value={date_of_accident}
        confidence={date_of_accident_confidence}
      />
      <Field
        name="Hình thức điều trị"
        value={treatment_method}
        confidence={treatment_method_confidence}
      />
      <Field
        name="Khám/Điều trị tại"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Chẩn đoán"
        value={diagnose}
        confidence={diagnose_confidence}
      />
      <Field
        name="Tổng số tiền yêu cầu bồi thường"
        value={total_insured_amount}
        confidence={total_insured_amount_confidence}
      />
      <Field
        name="Tên tài khoản"
        value={beneficiary}
        confidence={beneficiary_confidence}
      />
      <Field name="Tên ngân hàng" value={bank} confidence={bank_confidence} />
      <Field
        name="Số tài khoản"
        value={account_number}
        confidence={account_number_confidence}
      />
      <Field
        name="Hình thức nhận tiền"
        value={cash}
        confidence={cash_confidence}
      />
      <Field
        name="Số CMND nhận tiền mặt"
        value={id_card}
        confidence={id_card_confidence}
      />
      <Field
        name="Họ tên người yêu cầu"
        value={claimant}
        confidence={claimant_confidence}
      />
      <Field
        name="Số điện thoại người yêu cầu"
        value={claimant_phone}
        confidence={claimant_phone_confidence}
      />
      <Field
        name="Địa chỉ người yêu cầu"
        value={claimant_address}
        confidence={claimant_address_confidence}
      />
      <Field
        name="Email người yêu cầu"
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
      <Field name="Họ tên" value={name} confidence={name_confidence} />
      <Field
        name="Số thẻ"
        value={policy_no}
        confidence={policy_no_confidence}
      />
      <Field name="Công ty" value={company} confidence={company_confidence} />
      <Field name="Hiệu lực từ" value={valid} confidence={valid_confidence} />
      <Field name="Chương trình" value={plan} confidence={plan_confidence} />
    </>
  );
}

function IdCard12Back({ data }) {
  const { issue_date, issue_date_confidence, issued_at, issued_at_confidence } =
    data || {};

  return (
    <>
      <Field
        name="Ngày cấp"
        value={issue_date}
        confidence={issue_date_confidence}
      />
      <Field
        name="Nơi cấp"
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
        name="Dân tộc"
        value={ethnicity}
        confidence={ethnicity_confidence}
      />
      <Field
        name="Tôn giáo"
        value={religious}
        confidence={religious_confidence}
      />
      <Field
        name="Ngày cấp"
        value={issue_date}
        confidence={issue_date_confidence}
      />
      <Field
        name="Nơi cấp"
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
      <Field name="Số thẻ" value={id} confidence={id_confidence} />
      <Field name="Họ tên" value={name} confidence={name_confidence} />
      <Field name="Ngày sinh" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field
        name="Quốc tịch"
        value={nationality}
        confidence={nationality_confidence}
      />
      <Field
        name="Dân tộc"
        value={ethnicity}
        confidence={ethnicity_confidence}
      />
      <div className="field">
        <div className="field-name">Quê quán:</div>
        <div className="field-value">
          {hometown}{" "}
          {hometown_confidence && (
            <>
              {" "}
              <span className="confidence-label">- Độ tin cậy: </span>
              {getConfidence(hometown_confidence)}
            </>
          )}
          <br />
          Tỉnh/TP:{" "}
          {hometown_town_code >= 0 && (
            <>
              {hometown_town_code} - {hometown_town}
            </>
          )}
          <br />
          Quận/Huyện:{" "}
          {hometown_district_code >= 0 && (
            <>
              {hometown_district_code} - {hometown_district}
            </>
          )}
          <br />
          Phường/Xã:{" "}
          {hometown_ward_code >= 0 && (
            <>
              {hometown_ward_code} - {hometown_ward}
            </>
          )}
        </div>
      </div>
      <div className="field">
        <div className="field-name">Thường trú:</div>
        <div className="field-value">
          {address}{" "}
          {address_confidence && (
            <>
              <span className="confidence-label">- Độ tin cậy: </span>
              {getConfidence(address_confidence)}
            </>
          )}{" "}
          <br />
          Tỉnh/TP:{" "}
          {address_town_code >= 0 && (
            <>
              {address_town_code} - {address_town}
            </>
          )}
          <br />
          Quận/Huyện:{" "}
          {address_district_code >= 0 && (
            <>
              {address_district_code} - {address_district}
            </>
          )}
          <br />
          Phường/Xã:{" "}
          {address_ward_code >= 0 && (
            <>
              {address_ward_code} - {address_ward}
            </>
          )}
        </div>
      </div>
      <Field
        name="Giá trị đến ngày"
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
      <Field name="Số thẻ" value={id} confidence={id_confidence} />
      <Field name="Họ tên" value={name} confidence={name_confidence} />
      <Field name="Ngày sinh" value={dob} confidence={dob_confidence} />
      <div className="field">
        <div className="field-name">Quê quán:</div>
        <div className="field-value">
          {hometown}{" "}
          {hometown_confidence && (
            <>
              {" "}
              <span className="confidence-label">- Độ tin cậy: </span>
              {getConfidence(hometown_confidence)}
            </>
          )}
          <br />
          Tỉnh/TP:{" "}
          {hometown_town_code >= 0 && (
            <>
              {hometown_town_code} - {hometown_town}
            </>
          )}
          <br />
          Quận/Huyện:{" "}
          {hometown_district_code >= 0 && (
            <>
              {hometown_district_code} - {hometown_district}
            </>
          )}
          <br />
          Phường/Xã:{" "}
          {hometown_ward_code >= 0 && (
            <>
              {hometown_ward_code} - {hometown_ward}
            </>
          )}
        </div>
      </div>
      <div className="field">
        <div className="field-name">Thường trú:</div>
        <div className="field-value">
          {address}{" "}
          {address_confidence && (
            <>
              <span className="confidence-label">- Độ tin cậy: </span>
              {getConfidence(address_confidence)}
            </>
          )}{" "}
          <br />
          Tỉnh/TP:{" "}
          {address_town_code >= 0 && (
            <>
              {address_town_code} - {address_town}
            </>
          )}
          <br />
          Quận/Huyện:{" "}
          {address_district_code >= 0 && (
            <>
              {address_district_code} - {address_district}
            </>
          )}
          <br />
          Phường/Xã:{" "}
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
      <Field name="Số thẻ" value={id} confidence={id_confidence} />
      <Field name="Họ" value={sur_name} />
      <Field name="Tên" value={given_name} />
      <Field
        name="Họ và tên"
        value={full_name}
        confidence={full_name_confidence}
      />
      <Field name="Ngày sinh" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field name="Quốc gia" value={country} />
      <Field
        name="Quốc tịch"
        value={nationality}
        confidence={nationality_confidence}
      />
      <Field
        name="Ngày hết hạn"
        value={due_date}
        confidence={due_date_confidence}
      />

      <Field
        name="Mã số công dân"
        value={person_number}
        confidence={person_number_confidence}
      />
      <Field
        name="Ngày cấp"
        value={issue_date}
        confidence={issue_date_confidence}
      />
      <Field
        name="Nơi cấp"
        value={issued_at}
        confidence={issued_at_confidence}
      />
      <Field
        name="Nơi sinh"
        value={place_of_birth}
        confidence={place_of_birth_confidence}
      />
      <Field name="Độ tin cậy " value={`${(confidence * 100).toFixed(2)}%`} />
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
      <Field name="Số thẻ" value={id} confidence={id_confidence} />
      <Field name="Họ và tên" value={name} confidence={name_confidence} />
      <Field name="Ngày sinh" value={dob} confidence={dob_confidence} />
      <Field name="Hạng" value={data.class} confidence={class_confidence} />
      <Field
        name="Quốc tịch"
        value={nationality}
        confidence={nationality_confidence}
      />
      <Field
        name="Ngày phát hành"
        value={issue_date}
        confidence={issue_date_confidence}
      />
      <Field
        name="Ngày hết hạn"
        value={due_date}
        confidence={due_date_confidence}
      />
      {/* <Field
        name="Nơi cư trú"
        value={address}
        confidence={address_confidence}
      /> */}
      <div className="field">
        <div className="field-name">Quê quán:</div>
        <div className="field-value">
          {address}{" "}
          {address_confidence && (
            <>
              {" "}
              <span className="confidence-label">- Độ tin cậy: </span>
              {getConfidence(address_confidence)}
            </>
          )}
          <br />
          Tỉnh/TP:{" "}
          {address_town_code >= 0 && (
            <>
              {address_town_code} - {address_town}
            </>
          )}
          <br />
          Quận/Huyện:{" "}
          {address_district_code >= 0 && (
            <>
              {address_district_code} - {address_district}
            </>
          )}
          <br />
          Phường/Xã:{" "}
          {address_ward_code >= 0 && (
            <>
              {address_ward_code} - {address_ward}
            </>
          )}
        </div>
      </div>
      <div className="field"></div>

      {/* <Field name="Tỉnh/thành phố" value={address_town} />
      <Field name="Quận/huyện" value={address_district} />
      <Field name="Phường/xã" value={address_ward} />
      <Field name="Mã tỉnh/thành phố" value={address_town_code} />
      <Field name="Mã quận/huyện" value={address_district_code} />
      <Field name="Mã phường/xã" value={address_ward_code} /> */}
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
      <Field name="Số sổ" value={so_so} confidence={so_so_confidence} />
      <Field name="Nơi cấp" value={noi_cap} confidence={noi_cap_confidence} />
      <Field
        name="Ngày cấp"
        value={ngay_cap}
        confidence={ngay_cap_confidence}
      />
      <Field
        name="Số vào sổ cấp GCN"
        value={so_vao_so}
        confidence={so_vao_so_confidence}
      />
      <Field
        name="Thông tin của thửa đất"
        value={thong_tin_thua_dat}
        confidence={thong_tin_thua_dat_confidence}
      />
      <Field
        name="Thông tin của nhà ở"
        value={thong_tin_nha_o}
        confidence={thong_tin_nha_o_confidence}
      />
      <Field
        name="Thông tin ghi chú"
        value={thong_tin_ghi_chu}
        confidence={thong_tin_ghi_chu_confidence}
      />
      <div className="field">
        <div className="field-name">Nội dung của chủ đất:</div>
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
              <Field name="Họ tên" value={ten} confidence={ten_confidence} />
              <Field
                name="Năm sinh"
                value={nam_sinh}
                confidence={nam_sinh_confidence}
              />
              <Field
                name="Số cmnd, hộ chiếu"
                value={so_cmt}
                confidence={so_cmt_confidence}
              />
              <Field
                name="Số vào sổ cấp GCNĐịa chỉ thường trú"
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
      <Field name="Số sổ" value={so_so} confidence={so_so_confidence} />
      <Field name="Nơi cấp" value={noi_cap} confidence={noi_cap_confidence} />
      <Field
        name="Ngày cấp"
        value={ngay_cap}
        confidence={ngay_cap_confidence}
      />
      <Field
        name="Số vào sổ cấp GCN"
        value={so_vao_so}
        confidence={so_vao_so_confidence}
      />
      <Field
        name="Địa chỉ của thửa đất"
        value={dia_chi_thua_dat}
        confidence={dia_chi_thua_dat_confidence}
      />
      <Field
        name="Thông tin của thửa đất"
        value={thong_tin_thua_dat}
        confidence={thong_tin_thua_dat_confidence}
      />
      <div className="field">
        <div className="field-name">Nội dung của chủ đất:</div>
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
              <Field name="Họ tên" value={ten} confidence={ten_confidence} />
              <Field
                name="Năm sinh"
                value={nam_sinh}
                confidence={nam_sinh_confidence}
              />
              <Field
                name="Số cmnd, hộ chiếu"
                value={so_cmt}
                confidence={so_cmt_confidence}
              />
              <Field
                name="Số vào sổ cấp GCNĐịa chỉ thường trú"
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
      <Field name="Số sổ" value={so_so} confidence={so_so_confidence} />
      <Field name="Nơi cấp" value={noi_cap} confidence={noi_cap_confidence} />
      <Field
        name="Ngày cấp"
        value={ngay_cap}
        confidence={ngay_cap_confidence}
      />
      <Field
        name="Số vào sổ cấp GCN"
        value={so_vao_so}
        confidence={so_vao_so_confidence}
      />
      <Field
        name="Thông tin của thửa đất"
        value={thong_tin_thua_dat}
        confidence={thong_tin_thua_dat_confidence}
      />
      <div className="field">
        <div className="field-name">Nội dung của chủ đất:</div>
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
              <Field name="Họ tên" value={ten} confidence={ten_confidence} />
              <Field
                name="Năm sinh"
                value={nam_sinh}
                confidence={nam_sinh_confidence}
              />
              <Field
                name="Số cmnd, hộ chiếu"
                value={so_cmt}
                confidence={so_cmt_confidence}
              />
              <Field
                name="Số vào sổ cấp GCNĐịa chỉ thường trú"
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
      <Field name="Số thẻ" value={id} confidence={id_confidence} />
      <Field name="Họ tên" value={name} confidence={name_confidence} />
      <Field name="Ngày sinh" value={born} confidence={born_confidence} />
      <Field name="Hạng" value={class_license} confidence={class_confidence} />
      <Field name="Quốc tịch" value={nation} confidence={nation_confidence} />
      <Field
        name="Ngày phát hành"
        value={dateissue}
        confidence={dateissue_confidence}
      />
      <Field
        name="Giá trị đến ngày"
        value={duedate}
        confidence={duedate_confidence}
      />
      <Field
        name="Nơi cư trú"
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
      <Field name="Số thẻ" value={id} confidence={id_confidence} />
      <Field name="Họ tên" value={name} confidence={name_confidence} />
      <Field name="Ngày sinh" value={born} confidence={born_confidence} />
      <Field name="Giới tính" value={sex} confidence={sex_confidence} />
      <Field
        name="Quốc tịch"
        value={quoctich}
        confidence={quoctich_confidence}
      />
      <div className="field">
        <div className="field-name">Quê quán:</div>
        <div className="field-value">
          {country} <br />
          Tỉnh/TP: {quequan_tinh} - {quequan_tinh_name}
          <br />
          Quận/Huyện: {quequan_huyen} - {quequan_huyen_name}
          <br />
          Phường/Xã: {quequan_phuong} - {quequan_phuong_name}
        </div>
      </div>
      <div className="field">
        <div className="field-name">Thường trú:</div>
        <div className="field-value">
          {address} <br />
          Tỉnh/TP: {diachi_tinh} - {diachi_tinh_name}
          <br />
          Quận/Huyện: {diachi_huyen} - {diachi_huyen_name}
          <br />
          Phường/Xã: {diachi_phuong} - {diachi_phuong_name}
        </div>
      </div>
      <Field
        name="Giá trị đến ngày"
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
      <Field name="Dân tộc" value={dantoc} confidence={ethnicity_confidence} />
      <Field
        name="Tôn giáo"
        value={tongiao}
        confidence={religious_confidence}
      />
      <Field name="Ngày cấp" value={date} confidence={issue_date_confidence} />
      <Field name="Nơi cấp" value={noicap} confidence={issued_at_confidence} />
    </>
  );
}

function MatSauTCC({ data }) {
  const { date, issue_date_confidence, noicap, issued_at_confidence } =
    data || {};

  return (
    <>
      <Field name="Ngày cấp" value={date} confidence={issue_date_confidence} />
      <Field name="Nơi cấp" value={noicap} confidence={issued_at_confidence} />
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
      <Field name="Số thẻ" value={id} confidence={id_confidence} />
      <Field name="Họ tên" value={name} confidence={name_confidence} />
      <Field name="Ngày sinh" value={born} confidence={dob_confidence} />
      <div className="field">
        <div className="field-name">Quê quán:</div>
        <div className="field-value">
          {country} <br />
          Tỉnh/TP: {quequan_tinh} - {quequan_tinh_name}
          <br />
          Quận/Huyện: {quequan_huyen} - {quequan_huyen_name}
          <br />
          Phường/Xã: {quequan_phuong} - {quequan_phuong_name}
        </div>
      </div>
      <div className="field">
        <div className="field-name">Thường trú:</div>
        <div className="field-value">
          {address} <br />
          Tỉnh/TP: {diachi_tinh} - {diachi_tinh_name}
          <br />
          Quận/Huyện: {diachi_huyen} - {diachi_huyen_name}
          <br />
          Phường/Xã: {diachi_phuong} - {diachi_phuong_name}
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
      <Field name="Số thẻ" value={id} confidence={id_confidence} />
      <Field name="Họ tên" value={name} confidence={name_confidence} />
      <Field name="Ngày sinh" value={born} confidence={dob_confidence} />
      <Field name="Giới tính" value={sex} confidence={gender_confidence} />
      <Field
        name="Quốc tịch"
        value={quoctich}
        confidence={nationality_confidence}
      />
      <Field name="Dân tộc" value={dantoc} confidence={ethnicity_confidence} />
      <div className="field">
        <div className="field-name">Quê quán:</div>
        <div className="field-value">
          {country} <br />
          Tỉnh/TP: {quequan_tinh} - {quequan_tinh_name}
          <br />
          Quận/Huyện: {quequan_huyen} - {quequan_huyen_name}
          <br />
          Phường/Xã: {quequan_phuong} - {quequan_phuong_name}
        </div>
      </div>
      <div className="field">
        <div className="field-name">Thường trú:</div>
        <div className="field-value">
          {address} <br />
          Tỉnh/TP: {diachi_tinh} - {diachi_tinh_name}
          <br />
          Quận/Huyện: {diachi_huyen} - {diachi_huyen_name}
          <br />
          Phường/Xã: {diachi_phuong} - {diachi_phuong_name}
        </div>
      </div>
      <Field
        name="Giá trị đến ngày"
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
      <Field name="Họ tên" value={name} confidence={name_confidence} />
      <Field name="Ngày sinh" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field
        name="Quốc tịch"
        value={nationality}
        confidence={nationality_confidence}
      />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
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
      title: "Tên thuốc",
      key: "drug",
      dataIndex: "drug",
    },
    {
      title: "Số lượng",
      key: "quantity",
      dataIndex: "quantity",
    },
  ];

  return (
    <>
      <Field
        name="Cơ sở y tế"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Họ tên bệnh nhân"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field
        name="Năm sinh/Tuổi"
        value={year_of_birth}
        confidence={year_of_birth_confidence}
      />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field name="Mã y tế" value={pid} confidence={pid_confidence} />
      <Field
        name="Ngày kê đơn"
        value={prescription_date}
        confidence={prescription_date_confidence}
      />
      <Field
        name="Chẩn đoán"
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
        name="Số yêu cầu BT"
        value={claim_form_no}
        confidence={claim_form_no_confidence}
      />
      <Field
        name="Ngày lập"
        value={created_date}
        confidence={created_date_confidence}
      />
      <Field
        name="Người được BH"
        value={insured}
        confidence={insured_confidence}
      />
      <Field name="Ngày sinh" value={dob} confidence={dob_confidence} />
      <Field name="Số CMT" value={id_no} confidence={id_no_confidence} />
      <Field
        name="Số thẻ bảo hiểm"
        value={policy_no}
        confidence={policy_no_confidence}
      />
      <Field
        name="Đơn vị tham gia bảo hiểm"
        value={policy_holder}
        confidence={policy_holder_confidence}
      />
      <Field
        name="Hiệu lực bảo hiểm"
        value={period_of_insurance}
        confidence={period_of_insurance_confidence}
      />
      <Field
        name="Ngày khám"
        value={date_of_consultation}
        confidence={date_of_consultation_confidence}
      />
      <Field
        name="Tên cơ sở y tế"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Nội trú/Ngoại trú"
        value={rehabilitation_type}
        confidence={rehabilitation_type_confidence}
      />
      <Field
        name="Từ ngày"
        value={from_date}
        confidence={from_date_confidence}
      />
      <Field name="Đến ngày" value={to_date} confidence={to_date_confidence} />
      <Field
        name="Tình trạng bệnh/tai nạn"
        value={condition}
        confidence={condition_confidence}
      />
      <Field
        name="Kết luận của bác sỹ sau xuất viện"
        value={conclusion}
        confidence={conclusion_confidence}
      />
      <Field
        name="Chi phí phát sinh"
        value={medical_expenses}
        confidence={medical_expenses_confidence}
      />
      <Field
        name="Chi phí bảo lãnh"
        value={guaranteed_expenses}
        confidence={guaranteed_expenses_confidence}
      />
      <Field
        name="Chi phí NĐBH tự trả"
        value={paid_by_insured}
        confidence={paid_by_insured_confidence}
      />
      <Field
        name="GHI CHÚ VÀ XÁC NHẬN BẢO LÃNH"
        value={warranty_notes}
        confidence={warranty_notes_confidence}
      />
      <Field
        name="XÁC NHẬN VÀ CAM KẾT CỦA NGƯỜI ĐƯỢC BẢO HIỂM"
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
        name="Tên cơ sở y tế"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Khoa"
        value={department}
        confidence={department_confidence}
      />
      <Field
        name="Họ tên bệnh nhân"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="Năm sinh/Tuổi" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field name="Mã y tế/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Ngày vào viện"
        value={hospitalization_date}
        confidence={hospitalization_date_confidence}
      />
      <Field
        name="Ngày ra viện"
        value={hospital_discharge_date}
        confidence={hospital_discharge_date_confidence}
      />
      <Field
        name="Ngày phẫu thuật"
        value={surgical_day}
        confidence={surgical_day_confidence}
      />
      <Field
        name="Chẩn đoán"
        value={diagnose}
        confidence={diagnose_confidence}
      />
      <Field
        name="Phương pháp vô cảm"
        value={anesthetic_method}
        confidence={anesthetic_method_confidence}
      />
      <Field
        name="Bác sỹ phẫu thuật"
        value={surgical_doctor}
        confidence={surgical_doctor_confidence}
      />
      <Field
        name="Bác sỹ gây mê"
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
        name="Họ tên bệnh nhân"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="Năm sinh/Tuổi" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field name="Mã y tế/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Ngày vào viện"
        value={hospitalization_date}
        confidence={hospitalization_date_confidence}
      />
      <Field
        name="Ngày ra viện"
        value={discharge_date}
        confidence={discharge_date_confidence}
      />
      <Field
        name="Lý do vào viện"
        value={hospitalization_reason}
        confidence={hospitalization_reason_confidence}
      />
      <Field
        name="Quá trình bệnh lý/Bệnh sử"
        value={pathological_process}
        confidence={pathological_process_confidence}
      />
      <Field
        name="Kết quả cận lâm sàng"
        value={preliminary_diagnosis}
        confidence={preliminary_diagnosis_confidence}
      />
      <Field
        name="Chẩn đoán xác định"
        value={definitive_diagnosis}
        confidence={definitive_diagnosis_confidence}
      />
      <Field
        name="Phương pháp điều trị"
        value={treatment_method}
        confidence={treatment_method_confidence}
      />
      <Field
        name="Các thuốc chính đã dùng"
        value={prescribed_medicines}
        confidence={prescribed_medicines_confidence}
      />
      <Field
        name="Tình trạng ra viện"
        value={hospital_discharge_status}
        confidence={hospital_discharge_status_confidence}
      />
      <Field
        name="Kế hoạch điều trị tiếp theo"
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
        name="Họ tên bệnh nhân"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="Năm sinh/Tuổi" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field name="Mã y tế/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Ngày khám"
        value={date_of_examination}
        confidence={date_of_examination_confidence}
      />
      <Field
        name="Lý do đến khám/Triệu chứng"
        value={symptom}
        confidence={symptom_confidence}
      />
      <Field
        name="Quá trình bệnh lý/Bệnh sử"
        value={pathological_process}
        confidence={pathological_process_confidence}
      />
      <Field
        name="Tiền sử"
        value={medical_history}
        confidence={medical_history_confidence}
      />
      <Field
        name="Khám lâm sàng"
        value={clinical_examination}
        confidence={clinical_examination_confidence}
      />
      <Field
        name="Các xét nghiệm, thăm dò chính"
        value={medical_tests}
        confidence={medical_tests_confidence}
      />
      <Field
        name="Chẩn đoán sơ bộ"
        value={preliminary_diagnosis}
        confidence={preliminary_diagnosis_confidence}
      />
      <Field
        name="Hướng điều trị"
        value={treatment_method}
        confidence={treatment_method_confidence}
      />
      <Field
        name="Hẹn ngày tái khám"
        value={date_of_reexamination}
        confidence={date_of_reexamination_confidence}
      />
      <Field name="Mã icd" value={icd} confidence={icd_confidence} />
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
        name="Tên cơ sở y tế"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Họ tên bệnh nhân"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="Năm sinh/Tuổi" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field name="Mã y tế/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Ngày chỉ định"
        value={designated_date}
        confidence={designated_date_confidence}
      />
      <Field
        name="Chẩn đoán sơ bộ"
        value={preliminary_diagnosis}
        confidence={preliminary_diagnosis_confidence}
      />
      <Field
        name="Nơi chỉ định"
        value={designated_place}
        confidence={designated_place_confidence}
      />
      <Field
        name="Nơi thực hiện"
        value={test_place}
        confidence={test_place_confidence}
      />
      <Field
        name="Bác sỹ chỉ định"
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
        name="Tên cơ sở y tế"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Họ tên bệnh nhân"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="Năm sinh/Tuổi" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field name="Mã y tế/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Chẩn đoán sơ bộ"
        value={preliminary_diagnosis}
        confidence={preliminary_diagnosis_confidence}
      />
      <Field
        name="Bác sỹ chỉ định"
        value={designated_doctor}
        confidence={designated_doctor_confidence}
      />
      <Field
        name="Ngày chỉ định"
        value={designated_date}
        confidence={designated_date_confidence}
      />
      <Field
        name="Ngày thực hiện"
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
      <Field name="Họ tên" value={name} confidence={name_confidence} />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field
        name="Thời gian"
        value={date_of_accident}
        confidence={date_of_accident_confidence}
      />
      <Field
        name="Địa điểm"
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
        name="Tên cơ sở y tế"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Tên người được bảo hiểm"
        value={insure_name}
        confidence={insure_name_confidence}
      />
      <Field name="Năm sinh/tuổi" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field
        name="Tổng tiền"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <Field name="Ngày biên lai" value={date} confidence={date_confidence} />
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
        name="Tên cơ sở y tế"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Tên người được bảo hiểm"
        value={insure_name}
        confidence={insure_name_confidence}
      />
      <Field name="Năm sinh/tuổi" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field
        name="Tổng tiền"
        value={total_amount}
        confidence={total_amount_confidence}
      />
      <Field name="Ngày phiếu thu" value={date} confidence={date_confidence} />
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
        name="Tên cơ sở y tế"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Tên người được bảo hiểm"
        value={insure_name}
        confidence={insure_name_confidence}
      />
      <Field name="Năm sinh/tuổi" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
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
        name="Tên cơ sở y tế"
        value={medical_facility}
        confidence={medical_facility_confidence}
      />
      <Field
        name="Họ tên bệnh nhân"
        value={patient_name}
        confidence={patient_name_confidence}
      />
      <Field name="Năm sinh/Tuổi" value={dob} confidence={dob_confidence} />
      <Field name="Giới tính" value={gender} confidence={gender_confidence} />
      <Field name="Địa chỉ" value={address} confidence={address_confidence} />
      <Field name="Mã y tế/PID" value={pid} confidence={pid_confidence} />
      <Field
        name="Ngày khám"
        value={date_of_examination}
        confidence={date_of_examination_confidence}
      />
      <Field
        name="Lý do đến khám/Triệu chứng"
        value={symptom}
        confidence={symptom_confidence}
      />
      <Field
        name="Quá trình bệnh lý/Bệnh sử"
        value={pathological_process}
        confidence={pathological_process_confidence}
      />
      <Field
        name="Chẩn đoán sơ bộ"
        value={preliminary_diagnosis}
        confidence={preliminary_diagnosis_confidence}
      />
      <Field
        name="Tiền sử"
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
      <Field name="Số" value={number} />
      <Field name="Người được đăng ký khai sinh" value={name} />
      <Field name="Ngày đăng ký" value={date} />
      <Field name="Ngày sinh" value={dob} />
      <Field name="Giới tính" value={gender} />
      <Field name="Dân tộc" value={ethnicity} />
      <Field name="Quốc tịch" value={nationality} />
      <Field name="Nơi sinh" value={place_of_birth} />
      <Field name="Số định danh cá nhân" value={id} />
      <Field name="Họ tên mẹ" value={mother_name} />
      <Field name="Năm sinh mẹ" value={mother_dob} />
      <Field name="Dân tộc mẹ" value={mother_ethnicity} />
      <Field name="Quốc tịch mẹ" value={mother_nationality} />
      <Field name="Nơi cu trú mẹ" value={mother_address} />
      <Field name="Họ tên cha" value={father_name} />
      <Field name="Năm sinh cha" value={father_dob} />
      <Field name="Dân tộc cha" value={father_ethnicity} />
      <Field name="Quốc tịch cha" value={father_nationality} />
      <Field name="Nơi cu trú cha" value={father_address} />
      <Field name="Người đi khai sinh" value={registrant_name} />
      <Field name="Giấy tờ tùy thân" value={registrant_id} />
      <Field name="Người ký giấy khai sinh" value={sign_name} />
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
      <Field name="Chủ đầu tư" value={chu_dau_tu} />
      <Field name="Đề nghị số" value={de_nghi_so} />
      <Field name="Đề nghị số ngày" value={de_nghi_so_ngay} />
      <Field name="Hợp đồng số" value={hop_dong_so} />
      <Field name="Hợp đồng số ngày" value={hop_dong_so_ngay} />
      <Field name="Kính gửi" value={kinh_gui} />
      <Field name="Lũy kế" value={luy_ke} />
      <Field name="Mã dự án" value={ma_du_an} />
      <Field name="Mã số ĐVSDNS" value={ma_so_dvsdns} />
      <Field name="Vốn ngoài nước tại" value={nh_ngoai_nuoc} />
      <Field name="Vốn trong nước tại" value={nh_trong_nuoc} />
      <Field name="Phụ lục số" value={phu_luc_so} />
      <Field name="Phụ lục số ngày" value={phu_luc_so_ngay} />
      <Field name="Số" value={so} />
      <Field name="Số dư tạm ứng" value={so_du_tam_ung} />
      <Field name="Số tài khoản ngoài nước" value={stk_ngoai_nuoc} />
      <Field name="Số tài khoản trong nước" value={stk_trong_nuoc} />
      <Field name="Tên dự án" value={ten_du_an} />
      <Field name="Thuộc kế hoạch vốn" value={thuoc_ke_hoach_von} />
      <Field name="Thuộc nguồn vốn" value={thuoc_nguon_von} />
      <Field name="Tổng tiền đề nghị" value={tong_tien_de_nghi} />
      <Field name="Vốn trong nước thanh toán" value={von_trong_nuoc_tt} />
      <Field name="Vốn ngoài nước thanh toán" value={von_ngoai_nuoc_tt} />
      <Field name="Thuế giá trị gia tăng" value={thue} />
      <Field name="Chuyển tiền bảo hiểm" value={chuyen_tien_bao_hanh} />
      <Field name="Số trả đơn vị thụ hưởng" value={so_tra_dvth} />
      <Field
        name="Vốn trong nước đơn vị thụ hưởng"
        value={von_trong_nuoc_dvth}
      />
      <Field
        name="Vốn ngoài nước đơn vị thụ hưởng"
        value={von_ngoai_nuoc_dvth}
      />
      <Field name="Tên đơn vị thụ hưởng" value={ten_dvth} />
      <Field name="Số tài khoản đơn bị thụ hưởng" value={stk_dvth} />
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
      <Field name="Tốt nghiệp" value={da_tot_nghiep} />
      <Field name="Dân tộc" value={dan_toc} />
      <Field name="Địa chỉ" value={dia_chi} />
      <Field name="Giới tính" value={gioi_tinh} />
      <Field name="Hộ khẩu thường trú" value={ho_khau_tt} />
      <Field name="Họ tên" value={ho_ten} />
      <Field name="Ngành" value={nganh} />
      <Field name="Ngành tốt nghiệp" value={nganh_tot_nghiep} />
      <Field name="Ngày sinh" value={ngay_sinh} />
      <Field name="Nơi sinh" value={noi_sinh} />
      <Field name="Số điện thoại" value={sdt} />
      <Field name="Số CMND" value={socmnd} />
    </>
  );
}

function BangTotNghiep({ data }) {
  const { noi_cap_bang, ho_va_ten, ngay_sinh, nam_tot_nghiep } = data || {};

  return (
    <>
      <Field name="Nơi cấp bằng" value={noi_cap_bang} />
      <Field name="Họ và tên" value={ho_va_ten} />
      <Field name="Ngày sinh" value={ngay_sinh} />
      <Field name="Năm tốt nghiệp" value={nam_tot_nghiep} />
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
