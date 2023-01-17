import React, { useState } from 'react'
import { Menu } from 'antd';
import { WarningFilled } from '@ant-design/icons';

const getConfidence = confidence => {
    return (confidence * 100).toFixed(2) + '%'
}

export default function Result({ result }) {

    const [current, setCurrent] = useState('1')

    const { data,
        errorCode,
        errorMessage,
        invalidCode,
        invalidMessage,
        type,
        valid } = result || {}


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
                            {valid === "False" && <div style={{ fontSize: 14, marginBottom: 20 }} ><WarningFilled style={{ color: '#F29C1F' }} /> {invalidMessage}</div>}
                            {type === 'chip_id_card_front' && <ChipIdCardFront data={data} />}
                            {type === 'chip_id_card_back' && <ChipIdCardBack data={data} />}
                            {type === 'driving_license' && <DrivingLicense data={data} />}
                            {type === 'passport' && <Passport data={data} />}
                            {type === 'matsautcc' && <MatSauTCC data={data} />}
                            {type === 'matsaucmt' && <MatSauCMT data={data} />}
                            {type === 'tcc' && <TCC data={data} />}
                            {type === 'cmt' && <CMT data={data} />}
                        </> :
                        <img alt='img' src={`data:image/png;base64,${data.image}`} width='100%' />
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

export function ChipIdCardFront({ data }) {
    const { id, id_confidence, name, name_confidence, dob, dob_confidence, gender, gender_confidence, nationality, nationality_confidence,
        hometown, hometown_town_code, hometown_town, hometown_confidence, hometown_district_code, hometown_district, hometown_ward_code, hometown_ward,
        address, address_confidence, address_town_code, address_town, address_district_code, address_district, address_ward_code, address_ward, due_date, due_date_confidence } = data || {}

    return (
        <>
            <Field name='Số thẻ' value={id} confidence={id_confidence} />
            <Field name='Họ tên' value={name} confidence={name_confidence} />
            <Field name='Ngày sinh' value={dob} confidence={dob_confidence} />
            <Field name='Giới tính' value={gender} confidence={gender_confidence} />
            <Field name='Quốc tịch' value={nationality} confidence={nationality_confidence} />
            <div className='field'>
                <div className='field-name'>Quê quán:</div>
                <div className='field-value'>
                    {hometown} <span className='confidence-label'>- Độ tin cậy: </span>{getConfidence(hometown_confidence)} <br />
                    Tỉnh/TP: {hometown_town_code} - {hometown_town}<br />
                    Quận/Huyện: {hometown_district_code} - {hometown_district}<br />
                    Phường/Xã: {hometown_ward_code} - {hometown_ward}
                </div>
            </div>
            <div className='field'>
                <div className='field-name'>Thường trú:</div>
                <div className='field-value'>
                    {address} <span className='confidence-label'>- Độ tin cậy: </span>{getConfidence(address_confidence)} <br />
                    Tỉnh/TP: {address_town_code} - {address_town}<br />
                    Quận/Huyện: {address_district_code} - {address_district}<br />
                    Phường/Xã: {address_ward_code} - {address_ward}
                </div>
            </div>
            <Field name='Giá trị đến ngày' value={due_date} confidence={due_date_confidence} />
        </>
    )
}

export function ChipIdCardBack({ data }) {
    const { nationality,
        checksum_final, checksum_final_validate, country, dob, dob_checksum, dob_checksum_validate, document_number, document_number_checksum, document_number_checksum_validate,
        due_date, due_date_checksum, due_date_checksum_validate, gender, given_name, issue_date, issue_date_confidence, issued_at, issued_at_confidence, person_number, sur_name, mrz_confidence
    } = data || {}

    return (
        <>
            <Field name='Checksum final' value={checksum_final} />
            <Field name='Checksum final validate' value={checksum_final_validate} />
            <Field name='Country' value={country} />
            <Field name='Dob' value={dob} />
            <Field name='Dob checksum' value={dob_checksum} />
            <Field name='Dob checksum validate' value={dob_checksum_validate} />
            <Field name='Document number' value={document_number} />
            <Field name='Document number checksum' value={document_number_checksum} />
            <Field name='Document number checksum validate' value={document_number_checksum_validate} />
            <Field name='Due date' value={due_date} />
            <Field name='Due date checksum' value={due_date_checksum} />
            <Field name='Due date checksum validate' value={due_date_checksum_validate} />
            <Field name='Gender' value={gender} />
            <Field name='Given name' value={given_name} />
            <Field name='Issue date' value={issue_date} confidence={issue_date_confidence} en />
            <Field name='Issued at' value={issued_at} confidence={issued_at_confidence} en />
            <Field name='Nationality' value={nationality} />
            <Field name='Person number' value={person_number} />
            <Field name='Sur name' value={sur_name} />
            <Field name='Mrz confidence' value={`${(mrz_confidence * 100).toFixed(2)}%`} />
        </>
    )
}


function DrivingLicense({ data }) {
    const { id, id_confidence, name, name_confidence, dob, dob_confidence, class: class_license, class_confidence, nationality, nationality_confidence, issue_date,
        issue_date_confidence, due_date, due_date_confidence, address, address_confidence } = data || {}

    return (
        <>
            <Field name='Số thẻ' value={id} confidence={id_confidence} />
            <Field name='Họ tên' value={name} confidence={name_confidence} />
            <Field name='Ngày sinh' value={dob} confidence={dob_confidence} />
            <Field name='Hạng' value={class_license} confidence={class_confidence} />
            <Field name='Quốc tịch' value={nationality} confidence={nationality_confidence} />
            <Field name='Ngày phát hành' value={issue_date} confidence={issue_date_confidence} />
            <Field name='Giá trị đến ngày' value={due_date} confidence={due_date_confidence} />
            <Field name='Nơi cư trú' value={address} confidence={address_confidence} />
        </>
    )
}

function Passport({ data }) {
    const { id, id_checksum, id_checksum_validate, person_number, surname, given_name, sex, born, nationality, dob_checksum, dob_checksum_validate,
        country, duedate, due_date_checksum, due_date_checksum_validate, confidence } = data || {}

    return (
        <>
            <Field name='ID' value={id} />
            <Field name='ID checksum' value={id_checksum} />
            <Field name='ID checksum validate' value={id_checksum_validate} />
            <Field name='ID card' value={person_number} />
            <Field name='Surname' value={surname} />
            <Field name='Given name' value={given_name} />
            <Field name='Gender' value={sex} />
            <Field name='Dob' value={born} />
            <Field name='Dob checksum' value={dob_checksum} />
            <Field name='Dob checksum validate' value={dob_checksum_validate} />
            <Field name='Country' value={country} />
            <Field name='Due date' value={duedate} />
            <Field name='Due date checksum' value={due_date_checksum} />
            <Field name='Due date checksum validate' value={due_date_checksum_validate} />
            <Field name='Nationality' value={nationality} />
            <Field name='Confidence' value={`${(confidence * 100).toFixed(2)}%`} />
        </>
    )
}

function MatSauTCC({ data }) {
    const { date, issue_date_confidence, noicap, issued_at_confidence } = data || {}

    return (
        <>
            <Field name='Ngày cấp' value={date} confidence={issue_date_confidence} />
            <Field name='Nơi cấp' value={noicap} confidence={issued_at_confidence} />
        </>
    )
}

function MatSauCMT({ data }) {
    const { date, issue_date_confidence, noicap, issued_at_confidence, dantoc, ethnicity_confidence, tongiao, religious_confidence } = data || {}

    return (
        <>
            <Field name='Dân tộc' value={dantoc} confidence={ethnicity_confidence} />
            <Field name='Tôn giáo' value={tongiao} confidence={religious_confidence} />
            <Field name='Ngày cấp' value={date} confidence={issue_date_confidence} />
            <Field name='Nơi cấp' value={noicap} confidence={issued_at_confidence} />
        </>
    )
}

function TCC({ data }) {
    const { id, id_confidence, name, name_confidence, born, dob_confidence, sex, gender_confidence, quoctich, nationality_confidence, dantoc, ethnicity_confidence,
        country, quequan_tinh, quequan_tinh_name, hometown_confidence, quequan_huyen, quequan_huyen_name, quequan_phuong, quequan_phuong_name,
        address, address_confidence, diachi_tinh, diachi_tinh_name, diachi_huyen, diachi_huyen_name, diachi_phuong, diachi_phuong_name, duedate, due_date_confidence } = data || {}

    return (
        <>
            <Field name='Số thẻ' value={id} confidence={id_confidence} />
            <Field name='Họ tên' value={name} confidence={name_confidence} />
            <Field name='Ngày sinh' value={born} confidence={dob_confidence} />
            <Field name='Giới tính' value={sex} confidence={gender_confidence} />
            <Field name='Quốc tịch' value={quoctich} confidence={nationality_confidence} />
            <Field name='Dân tộc' value={dantoc} confidence={ethnicity_confidence} />
            <div className='field'>
                <div className='field-name'>Quê quán:</div>
                <div className='field-value'>
                    {country} <span className='confidence-label'>- Độ tin cậy: </span>{getConfidence(hometown_confidence)} <br />
                    Tỉnh/TP: {quequan_tinh} - {quequan_tinh_name}<br />
                    Quận/Huyện: {quequan_huyen} - {quequan_huyen_name}<br />
                    Phường/Xã: {quequan_phuong} - {quequan_phuong_name}
                </div>
            </div>
            <div className='field'>
                <div className='field-name'>Thường trú:</div>
                <div className='field-value'>
                    {address} <span className='confidence-label'>- Độ tin cậy: </span>{getConfidence(address_confidence)} <br />
                    Tỉnh/TP: {diachi_tinh} - {diachi_tinh_name}<br />
                    Quận/Huyện: {diachi_huyen} - {diachi_huyen_name}<br />
                    Phường/Xã: {diachi_phuong} - {diachi_phuong_name}
                </div>
            </div>
            <Field name='Giá trị đến ngày' value={duedate} confidence={due_date_confidence} />
        </>
    )
}

function CMT({ data }) {
    const { id, id_confidence, name, name_confidence, born, dob_confidence,
        country, quequan_tinh, quequan_tinh_name, hometown_confidence, quequan_huyen, quequan_huyen_name, quequan_phuong, quequan_phuong_name,
        address, address_confidence, diachi_tinh, diachi_tinh_name, diachi_huyen, diachi_huyen_name, diachi_phuong, diachi_phuong_name, } = data || {}

    return (
        <>
            <Field name='Số thẻ' value={id} confidence={id_confidence} />
            <Field name='Họ tên' value={name} confidence={name_confidence} />
            <Field name='Ngày sinh' value={born} confidence={dob_confidence} />
            <div className='field'>
                <div className='field-name'>Quê quán:</div>
                <div className='field-value'>
                    {country} <span className='confidence-label'>- Độ tin cậy: </span>{getConfidence(hometown_confidence)} <br />
                    Tỉnh/TP: {quequan_tinh} - {quequan_tinh_name}<br />
                    Quận/Huyện: {quequan_huyen} - {quequan_huyen_name}<br />
                    Phường/Xã: {quequan_phuong} - {quequan_phuong_name}
                </div>
            </div>
            <div className='field'>
                <div className='field-name'>Thường trú:</div>
                <div className='field-value'>
                    {address} <span className='confidence-label'>- Độ tin cậy: </span>{getConfidence(address_confidence)} <br />
                    Tỉnh/TP: {diachi_tinh} - {diachi_tinh_name}<br />
                    Quận/Huyện: {diachi_huyen} - {diachi_huyen_name}<br />
                    Phường/Xã: {diachi_phuong} - {diachi_phuong_name}
                </div>
            </div>
        </>
    )
}