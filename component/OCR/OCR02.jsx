import React from 'react';


export default function OCR02({ isMobile, dataSource }) {

    const { title, image, description } = dataSource

    return (
        <div className="home-page-wrapper ocr02-wrapper">
            <div className="home-page ocr02">
                <div className="title-wrapper">
                    {title}
                </div>
                <div className='ocr02-process'>
                    {image}
                </div>
                <div className='ocr02-description'>
                    {description}
                </div>
            </div>
        </div>
    )

}

