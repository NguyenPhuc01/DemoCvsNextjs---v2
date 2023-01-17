import React from 'react'
import styled from 'styled-components'



export default function Result({ result }) {

    const { data, errorCode, errorMessage } = result || {}
    const sortedData = data?.sort((a, b) => b[1] - a[1])

    return (
        <>
            {data ? (
                <>
                    <div className='result-wrapper'>
                        {sortedData.slice(0, 5).map((item, key) => {
                            const [name, value] = item
                            return (
                                <Line key={key}>
                                    <Name width={`${(value * 100).toFixed(2)}%`}>
                                        <div style={{ position: 'absolute', left: '12px' }} >
                                            {name}
                                        </div>
                                    </Name>
                                    <Value>{(value * 100).toFixed(2)}%</Value>
                                </Line>
                            )
                        })}
                    </div>
                </>
            ) :
                <div className='error'>
                    Không tìm thấy nội dung. Vui lòng thử lại!
                </div>}
        </>
    )
}

const Line = styled.div`
    background: rgba(255,255,255,0.1);
    position: relative;
    margin: 20px 0;
    height: 24px;
`

const Name = styled.div`
    position: absolute;
    height: 100%;
    width: ${props => props.width};
    background: #fff;
    top: 0;
    left: 0;
    color: #000;
`

const Value = styled.div`
    position: absolute;
    right: 12px;
    top: 0;
    color: #EC1C2A;
`

