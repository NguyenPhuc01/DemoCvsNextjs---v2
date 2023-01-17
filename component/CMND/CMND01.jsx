import React, { useState } from 'react';
import { Row, Col, Button, Tabs } from 'antd';
import { trackEvent } from '../utils'
import { FormattedMessage, Link } from "gatsby-plugin-intl"

const { TabPane } = Tabs;


export default function ocr01(props) {
    const { dataSource, isMobile, ...rest } = props;
    const {
        wrapper,
        titleWrapper,
        explainWrapper,
        page,
        content
    } = dataSource;

    return (
        <div {...rest} {...wrapper}>
            <div {...page}>
                <div className='description'>
                    <div {...titleWrapper} />
                    <div {...explainWrapper} />
                </div>
                <Row gutter={[28, 40]}>
                    {content.map((item, key) => <Col {...item} key={key} />)}
                </Row>
            </div>
        </div>
    );

}

