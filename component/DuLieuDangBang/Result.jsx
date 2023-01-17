import { Button, Table, Space } from 'antd';
import React, { useState } from 'react'
import styled from 'styled-components';


const getConfidence = confidence => {
    return (confidence * 100).toFixed(2) + '%'
}


export default function Result({ result, type }) {

    const { data, errorCode, errorMessage } = result || {}

    return (
        <>
            {data ? (
                <>
                    {type === 'bang-tong-quat' ?
                        <BangTongQuatResult data={data} type={type} /> :
                        type === 'bao-cao-tai-chinh' ? <BangTongQuatResult data={data.origin} type={type} /> :
                            // <ExcelResult data={data} />
                            <BangTongQuatResult data={data} type={type} />
                    }
                </>
            ) :
                <div className='error'>
                    Không tìm thấy nội dung. Vui lòng thử lại!
                </div>}
        </>
    )
}

function ExcelResult({ data }) {
    const [currentRecordId, setCurrentRecordId] = useState(0)

    const onPrev = () => {
        // disableScroll.on()
        setCurrentRecordId(id => id - 1)
    }

    const onNext = () => {
        // disableScroll.on()
        setCurrentRecordId(id => id + 1)
    }
    return (
        <>
            {data.map((item, key) => {
                if (key !== currentRecordId) return null
                return <iframe
                    key={item.excel}
                    src={`https://docs.google.com/spreadsheets/d/${item.excel}/edit?widget=true&headers=true&embedded=true`}
                    // onLoad={onLoadIframe}
                    title={item.excel}
                    width='100%'
                    height='100%'
                ></iframe>
            })}
            {data.length > 1 && (
                <PrevNextButtonWrapper>
                    <Button onClick={onPrev} type='text' disabled={currentRecordId === 0}>Trước</Button>
                    <Button onClick={onNext} type='text' disabled={currentRecordId === data.length - 1} >Kế tiếp</Button>
                </PrevNextButtonWrapper>
            )}
            {data.length === 0 && (
                <div className='error'>
                    Không tìm thấy nội dung. Vui lòng thử lại!
                </div>
            )}
        </>
    )
}

function BangTongQuatResult({ data, type }) {
    const [currentPage, setCurrentPage] = useState(0)

    const resultOptions = {
        'bang-tong-quat': <BangTongQuat data={data[currentPage]?.json} />,
        'bao-cao-tai-chinh': <BaoCaoTaiChinh data={data[currentPage]?.json} title={data[currentPage]?.title} />,
        'sao-ke-ngan-hang': <SaoKeNganHang data={data[currentPage]?.json} />
    }

    return (
        <>
            <div className='result-wrapper' style={{ padding: '12px 8px' }} >
                {resultOptions[type]}
            </div>
            {data?.length > 1 && <div style={{ textAlign: 'center', marginTop: 6 }}>
                <Space>
                    <Button type='text' onClick={() => setCurrentPage(page => page - 1)} disabled={currentPage === 0} >Trước</Button>
                    <Button type='text' onClick={() => setCurrentPage(page => page + 1)} disabled={currentPage === data.length - 1} >Tiếp</Button>
                </Space>
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



function BangTongQuat({ data }) {

    const columns = data?.[0].map((item, index) => {
        const { value, box } = item
        return { title: value, key: index, dataIndex: index }
    })

    const dataSource = data?.slice(1).map(row => {
        let obj = {}
        row.forEach((e, index) => {
            obj[index] = e.value
        });
        return obj
    })


    return (
        <>
            {data?.length ? <TableWrapper>
                <Table dataSource={dataSource} columns={columns} pagination={false}
                    scroll={{ x: 545 }}
                />
            </TableWrapper> : null}
        </>
    )
}


function SaoKeNganHang({ data }) {

    const columns = data?.[0][0].map((item, index) => {
        const { value, box } = item
        return { key: index, dataIndex: index }
    })

    return (
        <>
            {data?.length ? <>
                {data.map(table => {

                    const dataSource = table?.map(row => {
                        let obj = {}
                        row.forEach((e, index) => {
                            obj[index] = e.value
                        });
                        return obj
                    })

                    return (
                        <TableWrapper>
                            <Table dataSource={dataSource} columns={columns} pagination={false}
                                showHeader={false}
                                scroll={{ x: 545 }}
                            />
                        </TableWrapper>
                    )
                })}
            </>
                : null}
        </>
    )
}


function BaoCaoTaiChinh({ data, title }) {

    const columns = data?.[0].map((item, index) => {
        const { value, box } = item
        return { title: value, key: index, dataIndex: index }
    })

    const dataSource = data?.slice(1).map(row => {
        let obj = {}
        row.forEach((e, index) => {
            obj[index] = e.value
        });
        return obj
    })

    const titleNameMap = {
        luuchuyentiente: 'Bảng lưu chuyển tiền tệ',
        ketquakinhdoanh: 'Bảng kết quả hoạt động kinh doanh',
        bangcandoiketoan: 'Bảng cân đối kế toán',
    }


    return (
        <>
            <Field name='Tiêu đề' value={titleNameMap[title]} />
            {data?.length ? <TableWrapper>
                <Table dataSource={dataSource} columns={columns} pagination={false}
                    scroll={{ x: 545 }}
                />
            </TableWrapper> : null}
        </>
    )
}

const PrevNextButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: -40px;
    width: 200px;
    left: 50%;
    transform: translateX(-100px);
`


const TableWrapper = styled.div`
    margin-bottom: 12px;
    .ant-table {
        background: #1d1e22 !important;
        color: #fff;
    }
    .ant-table-thead > tr > th {
        background: #1d1e22;
        color: #ffffff57;
        border: 1px solid #f0f0f0;
        padding: 8px 6px;

        &:first-child {
            border-right: 0;
        }
    }
    .ant-table-tbody > tr.ant-table-row:hover > td {
        background: #1d1e22
    }
    .ant-table-tbody > tr > td {
        border: 1px solid #f0f0f0;
        border-top: 0;
        padding: 8px 6px;

        &:first-child {
            border-right: 0;
        }
    }
`