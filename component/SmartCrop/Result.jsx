import React from 'react'
import { WarningFilled } from '@ant-design/icons'
import styled from 'styled-components'

export default function Result({ result, cropPerson }) {

    const { url, errorCode, errorMessage, invalidCode, invalidMessage } = result || {}

    return (
        <>
            {url ? (
                <>
                    <div className='result-wrapper'>
                        <Style>
                            {cropPerson && <>{invalidCode !== 0 && <div style={{ fontSize: 14, marginBottom: 20 }} ><WarningFilled style={{ color: '#F29C1F' }} /> {invalidMessage}</div>}</>}
                            <img alt='img' src={url} style={{ maxWidth: '100%' }} />
                        </Style>
                    </div>
                </>
            ) :
                <div className='error'>
                    Không tìm thấy nội dung. Vui lòng thử lại!
                </div>}
        </>
    )
}

const Style = styled.div`
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

