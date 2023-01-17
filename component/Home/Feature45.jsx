import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { getChildrenToRender } from '../utils';
import { FormattedMessage } from "gatsby-plugin-intl";
import { OutboundLink } from "gatsby-plugin-google-gtag"

const { Meta } = Card

class Content extends React.PureComponent {
  render() {
    const { dataSource, isMobile, ...props } = this.props;
    const {
      wrapper,
      titleWrapper,
      page,
      childWrapper,
    } = dataSource;
    return (
      <div {...props} {...wrapper}>
        <div {...page}>
          <div {...titleWrapper}>
            {titleWrapper.children.map(getChildrenToRender)}
            <Button type="link" style={{ fontWeight: '500', display: 'none' }}><FormattedMessage id="common.button.see_all" /></Button>
          </div>
          <Row>
            {childWrapper.children.map((block, i) => {
              const { children: item, ...blockProps } = block;
              return (
                <Col key={i.toString()} {...blockProps}>
                  <OutboundLink target="_blank" rel="noopener noreferrer" href={item.href}>
                    <Card
                      hoverable
                      cover={<img alt="img" src={item.imgSource} width={360} height={232} />}
                      bordered={false}
                    >
                      <Meta title={item.title} description={<div>
                        <div className='description'>{item.description}</div>
                        <div className='view-detail-button'>Xem chi tiết</div>
                      </div>} />
                    </Card>
                  </OutboundLink>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

export default Content;
