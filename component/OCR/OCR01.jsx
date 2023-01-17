import React from 'react';
import { Row, Col, Button } from 'antd';
import { trackEvent } from '../utils'
import { FormattedMessage, Link } from "gatsby-plugin-intl"

export default function ocr01(props) {
    const { dataSource, isMobile, style, ...rest } = props;
    const {
        wrapper,
        titleWrapper,
        explainWrapper,
        page,
        content,
    } = dataSource;

    return (
        <div {...rest} {...wrapper}>
            <div {...page}>
                <div className='description'>
                    <div {...titleWrapper} />
                    <div {...explainWrapper} />
                </div>
                <Row gutter={[32, 40]}>
                    {content.map((item, key) => {
                        const { img, title, content, link, linkEvent } = item
                        return (
                            <Col md={8} xs={24} key={key} >
                                <div className='ocr01-block-item' style={style}>
                                    <div className='ocr01-block-item-left'>{img}</div>
                                    <div className='ocr01-block-item-right'>
                                        <div className='ocr01-block-title'>{title}</div>
                                        <div className='ocr01-block-description'>{content}</div>
                                        <Link to={link}>
                                            <Button type="link" className='ocr01-block-button' onClick={() => trackEvent(linkEvent || link)}>
                                                <FormattedMessage id="common.button.more" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Col>

                        )
                    })}
                </Row>
            </div>
        </div>
    );

}

