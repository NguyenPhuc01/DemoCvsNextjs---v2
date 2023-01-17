import { Space } from 'antd'
import React from 'react'
import { WarningFilled } from '@ant-design/icons'

const getConfidence = confidence => {
    return (confidence * 100).toFixed(2) + '%'
}

export default function Result({ result }) {

    const { data, errorCode, errorMessage } = result || {}
    const { face1, face2, matching, invalidCode, invalidMessage } = data || {}

    return (
        <>
            {data ? (
                <div className='result-wrapper'>
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>

                        {invalidCode !== 0 && <div style={{ fontSize: 18, marginBottom: 20 }} ><WarningFilled style={{ color: '#F29C1F' }} /> {invalidMessage}</div>}
                        <div style={{ fontSize: 32, fontWeight: 600, marginBottom: 20 }}>Matching = {parseFloat(matching).toFixed(2)}%</div>
                        <Space size={40}>
                            <img src={`data:image/png;base64,${face1}`} alt='img' />
                            <img src={`data:image/png;base64,${face2}`} alt='img' />
                        </Space>
                    </div>

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

