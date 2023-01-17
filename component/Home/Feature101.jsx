import React, { useState } from 'react';
import { Button, Tabs } from 'antd';
import { trackEvent } from '../utils'
import { Link } from "gatsby-plugin-intl"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const { TabPane } = Tabs;


export default function Feature101(props) {
    const { dataSource, isMobile, ...rest } = props;
    const {
        wrapper,
        titleWrapper,
        page,
        content,
    } = dataSource;

    const [key, setKey] = useState('1')

    return (
        <div {...rest} {...wrapper}>
            <div {...page}>
                <div {...titleWrapper} />
                <Tabs defaultActiveKey="1" onChange={key => setKey(key)} tabPosition={isMobile ? 'top' : 'left'}>
                    {content.map(tabItem => {
                        const { tab, key, children } = tabItem
                        return (
                            <TabPane tab={tab} key={key}>
                                {children.map((item, key) => {
                                    const { img, title, content, link, href } = item
                                    return (
                                        <div className='feature101-block-item' key={key}>
                                            <div className='feature101-block-item-left'>{img}</div>
                                            <div className='feature101-block-item-right'>
                                                <div className='feature101-block-title'>{title}</div>
                                                <div className='feature101-block-description'>{content}</div>
                                                {link ?
                                                    <Link to={link}>
                                                        <Button danger className='feature101-block-button' onClick={() => trackEvent(link)}>
                                                            Xem chi tiết
                                                        </Button>
                                                    </Link>
                                                    : <OutboundLink href={href} target='_blank' rel="noopener noreferrer" >
                                                        <Button danger className='feature101-block-button'>
                                                            Xem chi tiết
                                                        </Button>
                                                    </OutboundLink>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </TabPane>
                        )
                    })}
                </Tabs>
            </div>
        </div>
    );
}

