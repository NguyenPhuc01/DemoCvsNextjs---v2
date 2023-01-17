import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd'
import React from 'react'


function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={`${className} arrow-custom`} onClick={onClick}>
            <ArrowRightOutlined />
        </div>
    );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={`${className} arrow-custom`} onClick={onClick}>
            <ArrowLeftOutlined />
        </div>
    );
}


export default function ExamImage({ onChangeFile1, onChangeFile2, file1, file2 }) {

    const content = [
        { id: 4, src: '/fm_exam_2.jpg' },
        { id: 3, src: '/fm_exam_1.jpg' },
        { id: 2, src: '/fm_exam_4.jpg' },
        { id: 2, src: '/fm_exam_3.jpg' },
        { id: 1, src: '/fm_exam_6.jpg' },
        { id: 7, src: '/fm_exam_5.jpg' },
    ]

    const onChooseImage = (id, src) => {
        fetch(src)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], `demo_${id}.`, blob)
                // onChangeFile({ file })
                if (!file1) {
                    onChangeFile1({ file })
                }
                if (file1 && !file2) {
                    onChangeFile2({ file })
                }
            })
    }

    return (
        <div className='exam-image-wrapper'>
            <Carousel
                dots={false}
                infinite={true}
                slidesToShow={6}
                slidesToScroll={6}
                arrows={true}
                nextArrow={<NextArrow className="arrow-custom" />}
                prevArrow={<PrevArrow className="arrow-custom" />}
                responsive={[
                    {
                        breakpoint: 1600,
                        settings: {
                            slidesToShow: 6,
                            slidesToScroll: 6,
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
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        },
                    },
                ]}
            >
                {content.map(item => {
                    const { id, src } = item
                    return (
                        <div key={id} className='exam-image-block'>
                            <img alt='img' src={src} width={80} onClick={() => onChooseImage(id, src)} />
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}
