import React, { useState } from 'react'
import { Menu } from 'antd';
import { WarningFilled } from '@ant-design/icons';


const getConfidence = confidence => {
    return (confidence * 100).toFixed(2) + '%'
}

export default function Result({ result }) {

    const { data, errorCode, errorMessage } = result || {}
    const { info, type, valid, valid_message, vn_info, image } = data || {}
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
                                {valid !== 0 && <div style={{ fontSize: 14, marginBottom: 20 }} ><WarningFilled style={{ color: '#F29C1F' }} /> {valid_message}</div>}
                                {info && <Passport data={info} />}
                                {vn_info && <PassportVN data={vn_info} />}
                            </> :
                            <img alt='img' src={`data:image/png;base64,${image}`} width='100%' />
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


function PassportVN({ data }) {
    const { date_of_expiry, date_of_expiry_confidence, date_of_issue, date_of_issue_confidence, nationality, nationality_confidence,
        id_card_number, full_name, full_name_confidence, code, code_confidence, place_of_birth, place_of_birth_confidence,
        date_of_birth, date_of_birth_confidence, passport_number, passport_number_confidence, id_card_number_confidence,
        place_of_issue, place_of_issue_confidence, sex, sex_confidence, type, type_confidence
    } = data || {}

    return (
        <>
            <Field name='Id card number' value={id_card_number} confidence={id_card_number_confidence} />
            <Field name='Full name' value={full_name} confidence={full_name_confidence} />
            <Field name='Code' value={code} confidence={code_confidence} />
            <Field name='Date of birth' value={date_of_birth} confidence={date_of_birth_confidence} />
            <Field name='Date of expiry' value={date_of_expiry} confidence={date_of_expiry_confidence} />
            <Field name='Date of issue' value={date_of_issue} confidence={date_of_issue_confidence} />
            <Field name='Nationality' value={nationality} confidence={nationality_confidence} />
            <Field name='Passport number' value={passport_number} confidence={passport_number_confidence} />
            <Field name='Place of birth' value={place_of_birth} confidence={place_of_birth_confidence} />
            <Field name='Place of issue' value={place_of_issue} confidence={place_of_issue_confidence} />
            <Field name='Sex' value={sex} confidence={sex_confidence} />
            <Field name='Type' value={type} confidence={type_confidence} />
        </>
    )
}

function Passport({ data }) {
    const { id, id_checksum, id_checksum_validate, person_number, person_number_checksum, person_number_checksum_validate,
        sur_name, given_name, gender, dob, dob_checksum, dob_checksum_validate, country,
        due_date, due_date_checksum, due_date_checksum_validate, nationality, checksum_final,
        checksum_final_validate, confidence
    } = data || {}

    return (
        <>
            <Field name='ID' value={id} />
            <Field name='ID checksum' value={id_checksum} />
            <Field name='ID checksum validate' value={id_checksum_validate} />
            <Field name='Person number' value={person_number} />
            <Field name='Person number checksum' value={person_number_checksum} />
            <Field name='Person number checksum validate' value={person_number_checksum_validate} />
            <Field name='Surname' value={sur_name} />
            <Field name='Given name' value={given_name} />
            <Field name='Gender' value={gender} />
            <Field name='Dob' value={dob} />
            <Field name='Dob checksum' value={dob_checksum} />
            <Field name='Dob checksum validate' value={dob_checksum_validate} />
            <Field name='Country' value={country} />
            <Field name='Due date' value={due_date} />
            <Field name='Due date checksum' value={due_date_checksum} />
            <Field name='Due date checksum validate' value={due_date_checksum_validate} />
            <Field name='Nationality' value={nationality} />
            <Field name='Checksum final' value={checksum_final} />
            <Field name='Checksum final validate' value={checksum_final_validate} />
            <Field name='Confidence' value={`${(confidence * 100).toFixed(2)}%`} />
        </>
    )
}
