import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { trackEvent } from '../utils'
import { FormattedMessage, Link } from "gatsby-plugin-intl"

export default function EKYC01(props) {
    const { dataSource, isMobile, ...rest } = props;
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
                    {/* <div {...explainWrapper} /> */}
                </div>
                <Row gutter={[32, 40]}>
                    {content.map((item, key) => {
                        const { img_big, img, title, content, link } = item
                        return (
                            <Col md={8} xs={24} key={key} >
                                <div className='ekyc01-block-wrapper'>
                                    <div className='ekyc01-block-image'>
                                        {img_big}
                                    </div>
                                    <div className='ekyc01-block-item'>
                                        <div className='ekyc01-block-item-left'>{img}</div>
                                        <div className='ekyc01-block-item-right'>
                                            <div className='ekyc01-block-title'>{title}</div>
                                        </div>
                                    </div>
                                    <div className='ekyc01-block-description'>
                                        {content}
                                        <div className='ekyc01-block-button'>
                                            <Link to={link}>
                                                <Button danger onClick={() => trackEvent(link)}>
                                                    <FormattedMessage id="common.button.more" />
                                                </Button>
                                            </Link>
                                        </div>
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

