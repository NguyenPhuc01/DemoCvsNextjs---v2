import { WarningFilled } from '@ant-design/icons'
import React, { useState } from 'react'
import { Menu } from 'antd';

const getConfidence = confidence => {
    return (confidence * 100).toFixed(2) + '%'
}

export default function Result({ result }) {

    const { data, errorCode, errorMessage } = result || {}
    const { info, type, valid, invalidMessage } = data || {}
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
                                {/* {valid !== 0 && <div style={{ fontSize: 14, marginBottom: 20 }} ><WarningFilled style={{ color: '#F29C1F' }} /> {invalidMessage}</div>} */}
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
    const { dob, address, full_name, gender, given_name, id, middle_name, sur_name } = data || {}

    return (
        <>
            <Field name='ID' value={id} />
            <Field name='Full name' value={full_name} />
            <Field name='Gender' value={gender} />
            <Field name='Given name' value={given_name} />
            <Field name='Middle name' value={middle_name} />
            <Field name='Surname' value={sur_name} />
            <Field name='Date of birth' value={dob} />
            <Field name='Address' value={address} />
        </>
    )
}
