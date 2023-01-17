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
                                <Myanmar data={info} />
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


function Myanmar({ data }) {
    const { blood, blood_confidence, religion, religion_confidence, height, height_confidence,
        id, id_confidence, name, name_confidence, father_name, father_name_confidence,
        dob, dob_confidence, issue_date, issue_date_confidence,
        id_english, id_english_confidence, name_english, name_english_confidence, father_name_english, father_name_english_confidence
    } = data || {}

    return (
        <>
            <Field name='ID' value={id} confidence={id_confidence} />
            <Field name='Name' value={name} confidence={name_confidence} />
            <Field name='Father name' value={father_name} confidence={father_name_confidence} />
            <Field name='English ID' value={id_english} confidence={id_english_confidence} />
            <Field name='English name' value={name_english} confidence={name_english_confidence} />
            <Field name='English father name' value={father_name_english} confidence={father_name_english_confidence} />
            <Field name='Date of birth' value={dob} confidence={dob_confidence} />
            <Field name='Blood' value={blood} confidence={blood_confidence} />
            <Field name='Religion' value={religion} confidence={religion_confidence} />
            <Field name='Height' value={height} confidence={height_confidence} />
            <Field name='Issue date' value={issue_date} confidence={issue_date_confidence} />
        </>
    )
}
