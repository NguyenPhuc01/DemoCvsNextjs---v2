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
                            <DangKiemXe data={info} />
                        </> :
                        <img alt='img' src={`data:image/png;base64,${info.image}`} width='100%' />
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


function DangKiemXe({ data }) {
    const { issued_on, issued_on_confidence, life_time_limit, life_time_limit_confidence, manufactured_country, manufactured_country_confidence,
        commercial_use, commercial_use_confidence, design_pay_load, design_pay_load_confidence, design_towed_mass, design_towed_mass_confidence,
        inside_cargo_container_dimension, inside_cargo_container_dimension_confidence, manufactured_year, manufactured_year_confidence,
        mark, mark_confidence, model_code, model_code_confidence, modification, modification_confidence, permissible_no, permissible_no_confidence,
        regis_date, regis_date_confidence, registration_number, registration_number_confidence, seri, seri_confidence, tire_size, tire_size_confidence,
        chassis_number, chassis_number_confidence, engine_number, engine_number_confidence, type, type_confidence, valid_until, valid_until_confidence,
        wheel_form, wheel_form_confidence,
        capacity, capacity_confidence,
        report_number, report_number_confidence,
        authorized_pay_load, authorized_pay_load_confidence,
    } = data || {}

    return (
        <>
            <Field name='Commercial use' value={commercial_use} confidence={commercial_use_confidence} />
            <Field name='Design payload' value={design_pay_load} confidence={design_pay_load_confidence} />
            <Field name='Design towed mass' value={design_towed_mass} confidence={design_towed_mass_confidence} />
            <Field name='Inside cargo container dimension' value={inside_cargo_container_dimension} confidence={inside_cargo_container_dimension_confidence} />
            <Field name='Issued on' value={issued_on} confidence={issued_on_confidence} />
            <Field name='Life time limit' value={life_time_limit} confidence={life_time_limit_confidence} />
            <Field name='Manufactured country' value={manufactured_country} confidence={manufactured_country_confidence} />
            <Field name='Manufactured year' value={manufactured_year} confidence={manufactured_year_confidence} />
            <Field name='Mark' value={mark} confidence={mark_confidence} />
            <Field name='Model code' value={model_code} confidence={model_code_confidence} />
            <Field name='Modification' value={modification} confidence={modification_confidence} />
            <Field name='Permissible no' value={permissible_no} confidence={permissible_no_confidence} />
            <Field name='Regis date' value={regis_date} confidence={regis_date_confidence} />
            <Field name='Registration number' value={registration_number} confidence={registration_number_confidence} />
            <Field name='Seri' value={seri} confidence={seri_confidence} />
            <Field name='Tire size' value={tire_size.join(", ")} confidence={tire_size_confidence} />
            <Field name='Chassis number' value={chassis_number} confidence={chassis_number_confidence} />
            <Field name='Engine number' value={engine_number} confidence={engine_number_confidence} />
            <Field name='Type' value={type} confidence={type_confidence} />
            <Field name='Valid until' value={valid_until} confidence={valid_until_confidence} />
            <Field name='Wheel form' value={wheel_form} confidence={wheel_form_confidence} />
            <Field name='Capacity' value={capacity} confidence={capacity_confidence} />
            <Field name='Report number' value={report_number} confidence={report_number_confidence} />
            <Field name='Authorized payload' value={authorized_pay_load} confidence={authorized_pay_load_confidence} />
        </>
    )
}
