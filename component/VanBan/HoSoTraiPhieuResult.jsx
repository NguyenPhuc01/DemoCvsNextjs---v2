import React, { useState, Fragment, useEffect } from 'react'
import { Button, Space, Menu, Table } from 'antd';
import styled from 'styled-components';

const getConfidence = confidence => {
  return (confidence * 100).toFixed(2) + '%'
}

function Field({ name, value, confidence, en }) {
  return (
    <div className='field'>
      <div className='field-name' style={{ color: 'rgba(255,255,255,0.44)' }} >{name}:</div>
      <div className='field-value'>{value}
        {confidence ? <>
          <span className='confidence-label'> - {en ? 'Confidence: ' : 'Độ tin cậy: '}
          </span>
          {getConfidence(confidence)}
        </> : null}
      </div>
    </div>
  )
}

export default function HoSoTraiPhieuResult({ result }) {

  const { data } = result || {}
  const [current, setCurrent] = useState('id_card')
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const { hd_mua_ban_tp, hd_mua_ban_tp_2, gcn_quyen_so_huu_tp, thong_bao_ban_tp, de_nghi_chuyen_nhuong } = data
    const initCurrent = hd_mua_ban_tp ? 'hd_mua_ban_tp' :
      hd_mua_ban_tp_2 ? 'hd_mua_ban_tp_2' :
        gcn_quyen_so_huu_tp ? 'gcn_quyen_so_huu_tp' :
          thong_bao_ban_tp ? 'thong_bao_ban_tp' :
            'de_nghi_chuyen_nhuong'
    setCurrent(initCurrent)
  }, [data])

  const resultOptions = {
    'hd_mua_ban_tp': <HDMuaBanTP data={data[current]?.info} />,
    'hd_mua_ban_tp_2': <HDMuaBanTP2 data={data[current]?.info} />,
    'gcn_quyen_so_huu_tp': <GCNQuyenSuHuuTP data={data[current]?.info} />,
    'thong_bao_ban_tp': <ThongBaoBanTP data={data[current]?.info} />,
    'de_nghi_chuyen_nhuong': <DeNgheChuyenNhuong data={data[current]?.info} />,
  }

  return (
    <>
      {(data) ? (
        <>
          <div className='result-wrapper' style={{ overflowX: 'inherit', }}>
            <div className='menu'>
              <Menu mode="horizontal" onClick={(e) => setCurrent(e.key)} selectedKeys={[current]}>
                {data['hd_mua_ban_tp'] && <Menu.Item key="hd_mua_ban_tp">
                  Hợp đồng mua bán trái phiếu
                </Menu.Item>}
                {data['hd_mua_ban_tp_2'] && <Menu.Item key="hd_mua_ban_tp_2">
                  Hợp đồng mua bán trái phiếu 2
                </Menu.Item>}
                {data['gcn_quyen_so_huu_tp'] && <Menu.Item key="gcn_quyen_so_huu_tp">
                  GCN quyền sử hữu trái phiếu
                </Menu.Item>}
                {data['thong_bao_ban_tp'] && <Menu.Item key="thong_bao_ban_tp">
                  Thông báo bán trái phiếu
                </Menu.Item>}
                {data['de_nghi_chuyen_nhuong'] && <Menu.Item key="de_nghi_chuyen_nhuong">
                  Đề nghị chuyển nhượng
                </Menu.Item>}

              </Menu>
            </div>
            {resultOptions[current]}
          </div>
          {data?.length > 1 && <div style={{ textAlign: 'center', marginTop: 6 }}>
            <Space>
              <Button type='text' onClick={() => setCurrentPage(page => page - 1)} disabled={currentPage === 0} >Trước</Button>
              <span>{currentPage + 1}/{data.length}</span>
              <Button type='text' onClick={() => setCurrentPage(page => page + 1)} disabled={currentPage === data.length - 1} >Tiếp</Button>
            </Space>
          </div>}
        </>
      ) :
        <div className='error'>
          Không tìm thấy nội dung. Vui lòng thử lại!
        </div>}
    </>
  )
}

function HDMuaBanTP({ data = [] }) {

  const [page, setPage] = useState(0)
  const {
    so_hd, so_hd_confidence,
    ten_ben_ban, ten_ben_ban_confidence,
    so_cmnd, so_cmnd_confidence,
    noi_cap, noi_cap_confidence,
    ngay_cap, ngay_cap_confidence,
    dia_chi, dia_chi_confidence,
    so_tkgdck, so_tkgdck_confidence,
    ten_trai_phieu, ten_trai_phieu_confidence,
    to_chuc_phat_hanh, to_chuc_phat_hanh_confidence,
    dai_ly, dai_ly_confidence,
    ngay_phat_hanh, ngay_phat_hanh_confidence,
    ngay_dao_han, ngay_dao_han_confidence,
    menh_gia, menh_gia_confidence,
    ngay_thanh_toan, ngay_thanh_toan_confidence,
    so_luong_trai_phieu, so_luong_trai_phieu_confidence,
    don_gia_trai_phieu, don_gia_trai_phieu_confidence,
    tong_gia_trai_phieu, tong_gia_trai_phieu_confidence,
    thue_thu_ca_nhan, thue_thu_ca_nhan_confidence,
    phi_quan_ly, phi_quan_ly_confidence,
    so_tien_ben_ban, so_tien_ben_ban_confidence,
    nguoi_thu_huong, nguoi_thu_huong_confidence,
    so_tai_khoan, so_tai_khoan_confidence,
    mo_tai, mo_tai_confidence,
    noi_dung, noi_dung_confidence,
  } = data[page]?.info || {}

  return (
    <>
      <Field name='Số HĐ' value={so_hd} confidence={so_hd_confidence} />
      <Field name='Tên bên bán' value={ten_ben_ban} confidence={ten_ben_ban_confidence} />
      <Field name='Số CMND' value={so_cmnd} confidence={so_cmnd_confidence} />
      <Field name='Nơi cấp' value={noi_cap} confidence={noi_cap_confidence} />
      <Field name='Ngày cấp' value={ngay_cap} confidence={ngay_cap_confidence} />
      <Field name='Địa chỉ' value={dia_chi} confidence={dia_chi_confidence} />
      <Field name='Số TKGDCK' value={so_tkgdck} confidence={so_tkgdck_confidence} />
      <Field name='Tên trái phiếu' value={ten_trai_phieu} confidence={ten_trai_phieu_confidence} />
      <Field name='Tổ chức phát hành' value={to_chuc_phat_hanh} confidence={to_chuc_phat_hanh_confidence} />
      <Field name='Đại lý đăng ký lưu ký và Đại lý thanh toán' value={dai_ly} confidence={dai_ly_confidence} />
      <Field name='Ngày phát hành' value={ngay_phat_hanh} confidence={ngay_phat_hanh_confidence} />
      <Field name='Ngày đáo hạn' value={ngay_dao_han} confidence={ngay_dao_han_confidence} />
      <Field name='Mệnh giá' value={menh_gia} confidence={menh_gia_confidence} />
      <Field name='Ngày thanh toán' value={ngay_thanh_toan} confidence={ngay_thanh_toan_confidence} />
      <Field name='Số lượng Trái phiếu giao dịch' value={so_luong_trai_phieu} confidence={so_luong_trai_phieu_confidence} />
      <Field name='Đơn giá bán Trái phiếu' value={don_gia_trai_phieu} confidence={don_gia_trai_phieu_confidence} />
      <Field name='Tổng giá bán Trái phiếu' value={tong_gia_trai_phieu} confidence={tong_gia_trai_phieu_confidence} />
      <Field name='Thuế thu nhập cá nhân' value={thue_thu_ca_nhan} confidence={thue_thu_ca_nhan_confidence} />
      <Field name='Phí quản lý chuyển nhượng' value={phi_quan_ly} confidence={phi_quan_ly_confidence} />
      <Field name='Số tiền bên bán thực nhận' value={so_tien_ben_ban} confidence={so_tien_ben_ban_confidence} />
      <Field name='Người thụ hưởng' value={nguoi_thu_huong} confidence={nguoi_thu_huong_confidence} />
      <Field name='Số tài khoản' value={so_tai_khoan} confidence={so_tai_khoan_confidence} />
      <Field name='Mở tại' value={mo_tai} confidence={mo_tai_confidence} />
      <Field name='Nội dung' value={noi_dung} confidence={noi_dung_confidence} />
      {data.length > 1 && <div style={{ textAlign: 'center', marginTop: 12 }}>
        <Space>
          <Button type='text' style={{ color: '#fff' }} onClick={() => setPage(page => page - 1)} disabled={page === 0} >Trước</Button>
          <span>{page + 1}/{data.length}</span>
          <Button type='text' style={{ color: '#fff' }} onClick={() => setPage(page => page + 1)} disabled={page === data.length - 1} >Tiếp</Button>
        </Space>
      </div>
      }
    </>
  )
}

function HDMuaBanTP2({ data }) {
  const {
    so_hd, so_hd_confidence,
    ten_ben_ban, ten_ben_ban_confidence,
    so_cmnd, so_cmnd_confidence,
    noi_cap, noi_cap_confidence,
    ngay_cap, ngay_cap_confidence,
    dia_chi, dia_chi_confidence,
    so_dien_thoai, so_dien_thoai_confidence,
    tai_khoan_dang_ky, tai_khoan_dang_ky_confidence,
    so_tai_khoan_ben_ban, so_tai_khoan_ben_ban_confidence,
    ngan_hang, ngan_hang_confidence,
    ten_trai_phieu, ten_trai_phieu_confidence,
    to_chuc_phat_hanh, to_chuc_phat_hanh_confidence,
    hinh_thuc, hinh_thuc_confidence,
    to_chuc_quan_ly, to_chuc_quan_ly_confidence,
    ngay_phat_hanh, ngay_phat_hanh_confidence,
    menh_gia, menh_gia_confidence,
    ky_han, ky_han_confidence,
    ngay_giao_dich, ngay_giao_dich_confidence,
    so_luong_trai_phieu, so_luong_trai_phieu_confidence,
    don_gia_trai_phieu, don_gia_trai_phieu_confidence,
    tong_gia_trai_phieu, tong_gia_trai_phieu_confidence,
    thue_thu_ca_nhan, thue_thu_ca_nhan_confidence,
    phi_quan_ly, phi_quan_ly_confidence,
    so_tien_ben_ban, so_tien_ben_ban_confidence,
    nguoi_thu_huong, nguoi_thu_huong_confidence,
    so_tai_khoan, so_tai_khoan_confidence,
    mo_tai, mo_tai_confidence,
    noi_dung, noi_dung_confidence,
  } = data || {}

  return (
    <>
      <Field name='Số HĐ' value={so_hd} confidence={so_hd_confidence} />
      <Field name='Tên bên bán' value={ten_ben_ban} confidence={ten_ben_ban_confidence} />
      <Field name='Số CMND' value={so_cmnd} confidence={so_cmnd_confidence} />
      <Field name='Nơi cấp' value={noi_cap} confidence={noi_cap_confidence} />
      <Field name='Ngày cấp' value={ngay_cap} confidence={ngay_cap_confidence} />
      <Field name='Địa chỉ' value={dia_chi} confidence={dia_chi_confidence} />
      <Field name='Số điện thoại' value={so_dien_thoai} confidence={so_dien_thoai_confidence} />
      <Field name='Tài khoản đăng ký' value={tai_khoan_dang_ky} confidence={tai_khoan_dang_ky_confidence} />
      <Field name='Số tài khoản bên bán' value={so_tai_khoan_ben_ban} confidence={so_tai_khoan_ben_ban_confidence} />
      <Field name='Ngân hàng' value={ngan_hang} confidence={ngan_hang_confidence} />
      <Field name='Tên trái phiếu' value={ten_trai_phieu} confidence={ten_trai_phieu_confidence} />
      <Field name='Tổ chức phát hành' value={to_chuc_phat_hanh} confidence={to_chuc_phat_hanh_confidence} />
      <Field name='Hình thức' value={hinh_thuc} confidence={hinh_thuc_confidence} />
      <Field name='Tổ chức quản lý TSBĐ' value={to_chuc_quan_ly} confidence={to_chuc_quan_ly_confidence} />
      <Field name='Ngày phát hành' value={ngay_phat_hanh} confidence={ngay_phat_hanh_confidence} />
      <Field name='Mệnh giá' value={menh_gia} confidence={menh_gia_confidence} />
      <Field name='Kỳ hạn' value={ky_han} confidence={ky_han_confidence} />
      <Field name='Ngày giao dịch' value={ngay_giao_dich} confidence={ngay_giao_dich_confidence} />
      <Field name='Số lượng Trái phiếu giao dịch' value={so_luong_trai_phieu} confidence={so_luong_trai_phieu_confidence} />
      <Field name='Đơn giá bán Trái phiếu' value={don_gia_trai_phieu} confidence={don_gia_trai_phieu_confidence} />
      <Field name='Tổng giá bán Trái phiếu' value={tong_gia_trai_phieu} confidence={tong_gia_trai_phieu_confidence} />
      <Field name='Thuế thu nhập cá nhân' value={thue_thu_ca_nhan} confidence={thue_thu_ca_nhan_confidence} />
      <Field name='Phí quản lý chuyển nhượng' value={phi_quan_ly} confidence={phi_quan_ly_confidence} />
      <Field name='Số tiền bên bán thực nhận' value={so_tien_ben_ban} confidence={so_tien_ben_ban_confidence} />
      <Field name='Người thụ hưởng' value={nguoi_thu_huong} confidence={nguoi_thu_huong_confidence} />
      <Field name='Số tài khoản' value={so_tai_khoan} confidence={so_tai_khoan_confidence} />
      <Field name='Mở tại' value={mo_tai} confidence={mo_tai_confidence} />
      <Field name='Nội dung' value={noi_dung} confidence={noi_dung_confidence} />
    </>
  )
}

function GCNQuyenSuHuuTP({ data }) {
  const {
    so_gcn, so_gcn_confidence,
    ho_ten, ho_ten_confidence,
    ten_trai_phieu, ten_trai_phieu_confidence,
    so_luong_tp, so_luong_tp_confidence,
    menh_gia, menh_gia_confidence,
  } = data || {}

  return (
    <>
      <Field name='Số giấy chứng nhận' value={so_gcn} confidence={so_gcn_confidence} />
      <Field name='Họ tên chủ sở hữu' value={ho_ten} confidence={ho_ten_confidence} />
      <Field name='Tên trái phiếu' value={ten_trai_phieu} confidence={ten_trai_phieu_confidence} />
      <Field name='Số lượng trái phiếu' value={so_luong_tp} confidence={so_luong_tp_confidence} />
      <Field name='Mệnh giá trái phiếu' value={menh_gia} confidence={menh_gia_confidence} />
    </>
  )
}

function ThongBaoBanTP({ data }) {
  const {
    so_hd_mua_ban, so_hd_mua_ban_confidence,
    so_hd_moi_gioi, so_hd_moi_gioi_confidence,
    ho_ten, ho_ten_confidence,
    so_cmnd, so_cmnd_confidence,
    so_dien_thoai, so_dien_thoai_confidence,
    tai_khoan_luu_ky, tai_khoan_luu_ky_confidence,
    noi_cap, noi_cap_confidence,
    dia_chi, dia_chi_confidence,
    ma_trai_phieu, ma_trai_phieu_confidence,
    ngay_mua, ngay_mua_confidence,
    so_luong_tp, so_luong_tp_confidence,
    tong_gia_tri_ban, tong_gia_tri_ban_confidence,
    ngay_giao_dich, ngay_giao_dich_confidence,
  } = data || {}

  return (
    <>
      <Field name='Số hợp đồng mua bán TP' value={so_hd_mua_ban} confidence={so_hd_mua_ban_confidence} />
      <Field name='Số hợp đồng môi giới TP' value={so_hd_moi_gioi} confidence={so_hd_moi_gioi_confidence} />
      <Field name='Họ tên nhà đầu tư' value={ho_ten} confidence={ho_ten_confidence} />
      <Field name='Số chứng minh nhân dân' value={so_cmnd} confidence={so_cmnd_confidence} />
      <Field name='Số điện thoại' value={so_dien_thoai} confidence={so_dien_thoai_confidence} />
      <Field name='Tài khoản lưu ký' value={tai_khoan_luu_ky} confidence={tai_khoan_luu_ky_confidence} />
      <Field name='Nơi cấp' value={noi_cap} confidence={noi_cap_confidence} />
      <Field name='Địa chỉ' value={dia_chi} confidence={dia_chi_confidence} />
      <Field name='Mã trái phiếu' value={ma_trai_phieu} confidence={ma_trai_phieu_confidence} />
      <Field name='Ngày mua' value={ngay_mua} confidence={ngay_mua_confidence} />
      <Field name='Số lượng trái phiếu' value={so_luong_tp} confidence={so_luong_tp_confidence} />
      <Field name='Tổng giá trị bán' value={tong_gia_tri_ban} confidence={tong_gia_tri_ban_confidence} />
      <Field name='Ngày giao dịch' value={ngay_giao_dich} confidence={ngay_giao_dich_confidence} />
    </>
  )
}

function DeNgheChuyenNhuong({ data }) {
  const {
    so_to_de_nghi, so_to_de_nghi_confidence,
    ho_ten, ho_ten_confidence,
    so_cmnd, so_cmnd_confidence,
    ngay_cap, ngay_cap_confidence,
    noi_cap, noi_cap_confidence,
    dia_chi, dia_chi_confidence,
    so_dien_thoai, so_dien_thoai_confidence,
    email, email_confidence,
    so_luong_tp, so_luong_tp_confidence,
    menh_gia, menh_gia_confidence,
    tong_gia_tri_tp_chuyen_nhuong_menh_gia, tong_gia_tri_tp_chuyen_nhuong_menh_gia_confidence,
    tong_gia_tri_tp_chuyen_nhuong, tong_gia_tri_tp_chuyen_nhuong_confidence,
    phi_chuyen_nhuong, phi_chuyen_nhuong_confidence,
    thue_tncn, thue_tncn_confidence,
  } = data || {}

  return (
    <>
      <Field name='Số tờ đề nghị' value={so_to_de_nghi} confidence={so_to_de_nghi_confidence} />
      <Field name='Họ và tên bên chuyển nhượng' value={ho_ten} confidence={ho_ten_confidence} />
      <Field name='Số chứng minh nhân dân' value={so_cmnd} confidence={so_cmnd_confidence} />
      <Field name='Ngày cấp chứng minh nhân dân' value={ngay_cap} confidence={ngay_cap_confidence} />
      <Field name='Nơi cấp chứng minh nhân dân' value={noi_cap} confidence={noi_cap_confidence} />
      <Field name='Địa chỉ' value={dia_chi} confidence={dia_chi_confidence} />
      <Field name='Số điện thoại' value={so_dien_thoai} confidence={so_dien_thoai_confidence} />
      <Field name='Địa chỉ thư điện tử' value={email} confidence={email_confidence} />
      <Field name='Số lượng trái phiếu' value={so_luong_tp} confidence={so_luong_tp_confidence} />
      <Field name='Mệnh giá' value={menh_gia} confidence={menh_gia_confidence} />
      <Field name='Tổng giá trị TP chuyển nhượng theo mệnh giá' value={tong_gia_tri_tp_chuyen_nhuong_menh_gia} confidence={tong_gia_tri_tp_chuyen_nhuong_menh_gia_confidence} />
      <Field name='Tổng giá trị TP chuyển nhượng' value={tong_gia_tri_tp_chuyen_nhuong} confidence={tong_gia_tri_tp_chuyen_nhuong_confidence} />
      <Field name='Phí chuyển nhượng' value={phi_chuyen_nhuong} confidence={phi_chuyen_nhuong_confidence} />
      <Field name='Thuế TNCN' value={thue_tncn} confidence={thue_tncn_confidence} />
    </>
  )
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
        background: #1d1e22
    }
    .ant-table-tbody > tr > td {
        border: 1px solid #f0f0f0;
        border-top: 0;

        &:first-child {
            border-right: 0;
        }
    }
`