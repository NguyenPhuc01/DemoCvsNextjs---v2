import React, { useState } from 'react'
import { Menu, Space, Button } from 'antd';

const getConfidence = confidence => {
  return (confidence * 100).toFixed(2) + '%'
}

export default function Result({ result }) {

  const { data, errorCode, errorMessage } = result || {}
  // const { info, type } = data || {}
  const [current, setCurrent] = useState('1')
  const [currentPage, setCurrentPage] = useState(0)


  return (
    <>
      {data ? (
        <>
          <div className='result-wrapper' style={{ padding: current === '2' && 0 }}>
            <div className='menu'>
              <Menu mode="horizontal" onClick={(e) => setCurrent(e.key)} selectedKeys={[current]}>
                <Menu.Item key="1" >
                  Thông tin
                </Menu.Item>
                <Menu.Item key="2">
                  Hình ảnh
                </Menu.Item>
              </Menu>
            </div>
            {current === '1' ?
              <>
                <DangKyDoanhNghiep data={data[currentPage].info} />
              </> :
              <img alt='img' src={`data:image/png;base64,${data[currentPage].info.image}`} width='100%' />
            }
          </div>
          {data?.length > 1 && <div style={{ textAlign: 'center', marginTop: 6 }}>
            <Space>
              <Button type='text' onClick={() => setCurrentPage(page => page - 1)} disabled={currentPage === 0} >Trước</Button>
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

function Field({ name, value, confidence, en }) {
  return (
    <div className='field'>
      <div className='field-name'>{name}:</div>
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


function DangKyDoanhNghiep({ data }) {
  const {
    company_name, company_name_confidence,
    english_name, english_name_confidence,
    short_name, short_name_confidence,
    business_code, business_code_confidence,
    regis_date, regis_date_confidence,
    date_of_change, date_of_change_confidence,
    address, address_confidence,
    company_phone, company_phone_confidence,
    fax, fax_confidence,
    email, email_confidence,
    website, website_confidence,
    authorized_capital, authorized_capital_confidence,
    par_value, par_value_confidence,
    total_shares, total_shares_confidence,
    representative_name, representative_name_confidence,
    representative_title, representative_title_confidence,
    gender, gender_confidence,
    dob, dob_confidence,
    ethnicity, ethnicity_confidence,
    nationality, nationality_confidence,
    document_type, document_type_confidence,
    number_of_idcard, number_of_idcard_confidence,
    issue_date, issue_date_confidence,
    issued_at, issued_at_confidence,
    household_address, household_address_confidence,
    representative_address, representative_address_confidence,
  } = data || {}

  return (
    <>
      <Field name='Tên doanh nghiệp' value={company_name} confidence={company_name_confidence} />
      <Field name='Tên nước ngoài' value={english_name} confidence={english_name_confidence} />
      <Field name='Tên viết tắt' value={short_name} confidence={short_name_confidence} />
      <Field name='Mã số doanh nghiệp' value={business_code} confidence={business_code_confidence} />
      <Field name='Ngày đăng ký' value={regis_date} confidence={regis_date_confidence} />
      <Field name='Ngày thay đổi' value={date_of_change} confidence={date_of_change_confidence} />
      <Field name='Địa chỉ' value={address} confidence={address_confidence} />
      <Field name='Điện thoại' value={company_phone} confidence={company_phone_confidence} />
      <Field name='Fax' value={fax} confidence={fax_confidence} />
      <Field name='Email' value={email} confidence={email_confidence} />
      <Field name='Website' value={website} confidence={website_confidence} />
      <Field name='Vốn điều lệ' value={authorized_capital} confidence={authorized_capital_confidence} />
      <Field name='Mệnh giá cổ phần' value={par_value} confidence={par_value_confidence} />
      <Field name='Tổng số cổ phần' value={total_shares} confidence={total_shares_confidence} />
      <Field name='Họ tên người đại diện' value={representative_name} confidence={representative_name_confidence} />
      <Field name='Chức danh người đại diện' value={representative_title} confidence={representative_title_confidence} />
      <Field name='Giới tính' value={gender} confidence={gender_confidence} />
      <Field name='Ngày sinh' value={dob} confidence={dob_confidence} />
      <Field name='Dân tộc' value={ethnicity} confidence={ethnicity_confidence} />
      <Field name='Quốc tịch' value={nationality} confidence={nationality_confidence} />
      <Field name='Loại giấy tờ' value={document_type} confidence={document_type_confidence} />
      <Field name='Số giấy tờ' value={number_of_idcard} confidence={number_of_idcard_confidence} />
      <Field name='Ngày cấp' value={issue_date} confidence={issue_date_confidence} />
      <Field name='Nơi cấp' value={issued_at} confidence={issued_at_confidence} />
      <Field name='Địa chỉ hộ khẩu' value={household_address} confidence={household_address_confidence} />
      <Field name='Nơi ở hiện tại' value={representative_address} confidence={representative_address_confidence} />
    </>
  )
}