import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import useWindowSize from '../useWindowSize';


function NextArrow(props) {
    const { className, onClick, onNext } = props;
    return (
        <div className={`${className} arrow-custom`} onClick={() => {
            if (onClick) {
                onClick()
                onNext()
            }
        }}>
            <ArrowRightOutlined />
        </div>
    );
}

function PrevArrow(props) {
    const { className, onClick, onPrev } = props;
    return (
        <div className={`${className} arrow-custom`} onClick={() => {
            if (onClick) {
                onClick()
                onPrev()
            }
        }}>
            <ArrowLeftOutlined />
        </div>
    );
}


export default function Customers(props) {
    const { slidesToShow = 6, dataSource, isMobile, ...rest } = props;
    const {
        wrapper,
        titleWrapper,
        page,
        content,
    } = dataSource;

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const maxPage = parseInt(content.length / perPage)
    const { width } = useWindowSize()

    useEffect(() => {
        if (width >= 1600) {
            setPerPage(6)
        }
        if (width < 1600 && width >= 1200) {
            setPerPage(4)
        }
        if (width < 800) {
            setPerPage(2)
        }
    }, [width])

    const onNext = () => {
        if (currentPage === maxPage) return
        setCurrentPage(page => page + 1)
    }
    const onPrev = () => {
        if (currentPage === 1) return
        setCurrentPage(page => page - 1)
    }


    return (
        <div {...rest} {...wrapper}>
            <div {...page}>
                <div {...titleWrapper} />
                <div className='customers-carousel-wrapper'>
                    <Carousel
                        dots={false}
                        infinite={true}
                        slidesToShow={slidesToShow}
                        slidesToScroll={6}
                        arrows={true}
                        nextArrow={<NextArrow className="arrow-custom" onNext={onNext} />}
                        prevArrow={<PrevArrow className="arrow-custom" onPrev={onPrev} />}
                        responsive={[
                            {
                                breakpoint: 1600,
                                settings: {
                                    slidesToShow: 6,
                                    slidesToScroll: 6,
                                },
                            },
                            {
                                breakpoint: 1440,
                                settings: {
                                    slidesToShow: 5,
                                    slidesToScroll: 5,
                                },
                            },
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 4,
                                },
                            },
                            {
                                breakpoint: 800,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                },
                            },
                        ]}
                    >
                        {content.map(item => {
                            const { key, children } = item
                            return (
                                <div key={key} className='customers-block'>
                                    {children}
                                </div>
                            )
                        })}
                    </Carousel>
                    {/* <div className='customers-page'>{currentPage} / {maxPage}</div> */}
                </div>

            </div>
        </div>
    );

}

