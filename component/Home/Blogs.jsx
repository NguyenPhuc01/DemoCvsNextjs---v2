import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { trackEvent } from '../utils'
import { FormattedMessage, Link } from "gatsby-plugin-intl"


export default function Blogs(props) {
    const { dataSource: posts, isMobile, } = props;
    const firstBlog = posts[0]
    const { img, id, title, description, slug } = firstBlog
    const anotherBlogs = isMobile ? posts : posts.splice(1)

    return (
        <div className='home-page-wrapper blogs-wrapper'>
            <div className='home-page blogs'>
                <div className='title-wrapper' >
                    Bạn muốn tìm hiểu thêm về xu hướng ứng dụng trí tuệ nhân tạo?
                </div>
                {!isMobile && <div className='blog-first' style={{ backgroundImage: `url(${img})` }} >
                    <div className='blog-first-content'>
                        <div className='blog-first-title'>
                            {title}
                        </div>
                        <div className='blog-first-description'>{description}</div>
                        <Button className='blog-first-button'>Đọc tiếp</Button>
                    </div>
                </div>}
                <div className='another-blogs'>
                    {anotherBlogs.map(blog => {
                        const { id, title, description, slug, img } = blog
                        return (
                            <div key={id} className='blogs-block-item'>
                                <div className='blogs-block-item-left'><img src={img} alt='img' /></div>
                                <div className='blogs-block-item-right'>
                                    <div className='blogs-title'>{title}</div>
                                    <div className='blogs-description'>{description}</div>
                                    <a href={slug}>Đọc tiếp</a>
                                </div>
                            </div>

                        )
                    })}
                </div>
                <Button danger className='view-all-button' >Xem tất cả</Button>
            </div>
        </div>
    );

}

