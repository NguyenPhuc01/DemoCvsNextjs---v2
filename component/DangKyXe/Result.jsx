import React, { useState } from 'react'
import { Menu } from 'antd';

const getConfidence = confidence => {
    return (confidence * 100).toFixed(2) + '%'
}

export default function Result({ result }) {

    const { data, errorCode, errorMessage } = result || {}
    const { info, type } = data || {}
    const [current, setCurrent] = useState('1')

    return (
        <>
            {data ? (
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
                            {type === 'vehicle_registration_front' && <DangKyXeMatTruoc data={info} />}
                            {type === 'vehicle_registration_back' && <DangKyXeMatSau data={info} />}
                        </> :
                        <img alt='img' src={`data:image/png;base64,${info?.image}`} width='100%' />
                    }
                </div>
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


function DangKyXeMatTruoc({ data }) {
    const { id, id_confidence, name, name_confidence, address, address_confidence, plate, plate_confidence, issued_at, issued_at_confidence
    } = data || {}

    return (
        <>
            <Field name='ID' value={id} confidence={id_confidence} />
            {name && <Field name='Tên chủ xe' value={name} confidence={name_confidence} />}
            {address && <Field name='Địa chỉ' value={address} confidence={address_confidence} />}
            {plate && <Field name='Biển số xe' value={plate} confidence={plate_confidence} />}
            {issued_at && <Field name='Nơi cấp' value={issued_at} confidence={issued_at_confidence} />}
        </>
    )
}

function DangKyXeMatSau({ data }) {
    const { name, name_confidence, address, address_confidence, engine, engine_confidence, brand, brand_confidence, model, model_confidence,
        color, color_confidence, capacity, capacity_confidence, issued_at, issued_at_confidence, first_issue_date, first_issue_date_confidence,
        last_issue_date, last_issue_date_confidence, year_of_manufacture, year_of_manufacture_confidence, plate, plate_confidence, chassis, chassis_confidence,
        pay_load, pay_load_confidence
    } = data || {}

    return (
        <>
            <Field name='Tên chủ xe' value={name} confidence={name_confidence} />
            <Field name='Địa chỉ' value={address} confidence={address_confidence} />
            <Field name='Số máy' value={engine} confidence={engine_confidence} />
            <Field name='Số khung' value={chassis} confidence={chassis_confidence} />
            <Field name='Nhãn hiệu' value={brand} confidence={brand_confidence} />
            <Field name='Số loại' value={model} confidence={model_confidence} />
            <Field name='Màu sơn' value={color} confidence={color_confidence} />
            <Field name='Dung tích' value={capacity} confidence={capacity_confidence} />
            <Field name='Nơi đăng ký' value={issued_at} confidence={issued_at_confidence} />
            <Field name='Ngày đăng ký đầu tiên' value={first_issue_date} confidence={first_issue_date_confidence} />
            <Field name='Ngày đăng ký cuối cùng' value={last_issue_date} confidence={last_issue_date_confidence} />
            <Field name='Năm sản xuất' value={year_of_manufacture} confidence={year_of_manufacture_confidence} />
            <Field name='Biển số xe' value={plate} confidence={plate_confidence} />
            <Field name='Trọng tải' value={pay_load} confidence={pay_load_confidence} />
        </>
    )
}
