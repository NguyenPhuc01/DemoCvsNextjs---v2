import { WarningFilled } from '@ant-design/icons'
import React, { useState } from 'react'
import { Menu } from 'antd';


const getConfidence = confidence => {
    return (confidence * 100).toFixed(2) + '%'
}

export default function Result({ result }) {

    const { data, errorCode, errorMessage } = result || {}
    const { info, type, validCode, validMessage } = data || {}
    const [current, setCurrent] = useState('1')

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
                                {validCode !== 0 && <div style={{ fontSize: 14, marginBottom: 20 }} ><WarningFilled style={{ color: '#F29C1F' }} /> {validMessage}</div>}
                                <Cambodia data={info} />
                            </> :
                            <img alt='img' src={`data:image/png;base64,${info.image}`} width='100%' />
                        }
                    </div>
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


function Cambodia({ data }) {
    const { dob, dob_checksum, dob_checksum_validate, document_number, document_number_checksum, document_number_checksum_validate,
        id, id_confidence, sur_name, given_name, due_date, document_type, due_date_checksum, due_date_checksum_validate, gender,
        country, nationality, mrz_confidence,
    } = data || {}

    return (
        <>
            <Field name='ID' value={id} confidence={id_confidence} />
            <Field name='Surname' value={sur_name} />
            <Field name='Given name' value={given_name} />
            <Field name='Dob' value={dob} />
            <Field name='Dob checksum' value={dob_checksum} />
            <Field name='Dob checksum validate' value={dob_checksum_validate} />
            <Field name='Document number' value={document_number} />
            <Field name='Document number checksum' value={document_number_checksum} />
            <Field name='Document number checksum validate' value={document_number_checksum_validate} />
            <Field name='Document type' value={document_type} />
            <Field name='Due date' value={due_date} />
            <Field name='Due date checksum' value={due_date_checksum} />
            <Field name='Due date checksum validate' value={due_date_checksum_validate} />
            <Field name='Gender' value={gender} />
            <Field name='Country' value={country} />
            <Field name='Nationality' value={nationality} />
            <Field name='Mrz confidence' value={`${(mrz_confidence * 100).toFixed(2)}%`} />

        </>
    )
}
