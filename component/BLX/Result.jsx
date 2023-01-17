import React from 'react'

const getConfidence = confidence => {
    return (confidence * 100).toFixed(2) + '%'
}

export default function Result({ result }) {

    const { data, errorCode, errorMessage } = result || {}
    const { info, type } = data || {}

    return (
        <>
            {data ? (
                <div className='result-wrapper'>
                    <BLX data={info} />
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


function BLX({ data }) {
    const { nationality, nationality_confidence, issue_date, issue_date_confidence, due_date, due_date_confidence,
        id, id_confidence, name, name_confidence, dob, dob_confidence, address_district_code, address_district,
        class: class_license, class_confidence, address, address_confidence, address_town_code, address_town,
        address_ward_code, address_ward
    } = data || {}

    return (
        <>
            <Field name='Số thẻ' value={id} confidence={id_confidence} />
            <Field name='Họ tên' value={name} confidence={name_confidence} />
            <Field name='Ngày sinh' value={dob} confidence={dob_confidence} />
            <Field name='Hạng' value={class_license} confidence={class_confidence} />
            <Field name='Quốc tịch' value={nationality} confidence={nationality_confidence} />
            <Field name='Ngày phát hành' value={issue_date} confidence={issue_date_confidence} />
            <Field name='Có giá trị đến' value={due_date} confidence={due_date_confidence} />
            <div className='field'>
                <div className='field-name'>Thường trú:</div>
                <div className='field-value'>
                    {address} <span className='confidence-label'>- Độ tin cậy: </span>{getConfidence(address_confidence)} <br />
                    Tỉnh/TP: {address_town_code} - {address_town}<br />
                    Quận/Huyện: {address_district_code} - {address_district}<br />
                    Phường/Xã: {address_ward_code} - {address_ward}
                </div>
            </div>
        </>
    )
}
