import React from 'react'
import styled from 'styled-components';

export default function Result({ result }) {
    console.log(result);

    const { data, errorCode, errorMessage, type } = result || {}
    // const { info, type } = data || {}

    return (
        <>
            {data ? (
                <div className='result-wrapper'>
                    <BSX data={data} />
                </div>
            ) :
                <div className='error'>
                    Không tìm thấy nội dung. Vui lòng thử lại!
                </div>}
        </>
    )
}

function BSX({ data }) {

    return (
        <BSXStyle>
            {data.map((item, key) => {
                const { image, plate } = item
                return <div key={key} style={{ textAlign: 'center', fontSize: 48, fontWeight: 600 }}>
                    <div>{plate}</div>
                    <img alt='img' src={`data:image/png;base64,${image}`} width={240} />
                </div>
            })}
        </BSXStyle>
    )
}

const BSXStyle = styled.div`
    font-size: 48px;
    font-weight: 600;
    min-height: 454px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`