import React from "react"
import { Col, Row } from "antd"
import styled from "styled-components"
import { getChildrenToRender } from "../utils"

export default function Deployment({ dataSource, isMobile, ...tagProps }) {
    return (
        <Background {...tagProps} {...dataSource.wrapper} isMobile={isMobile}>
            <div {...dataSource.page}>
                <div {...dataSource.childWrapper}>
                    {dataSource.childWrapper.children.map(getChildrenToRender)}
                    <Row gutter={[48, 24]}>
                        {dataSource.content.map((item, key) => {
                            const { image, title, description, ...rest } = item
                            return (
                                <Col md={12} key={key}>
                                    <div {...rest} >
                                        <img alt='img' {...image} width={60} height={60} />
                                        <div {...title} />
                                        <div {...description} />
                                    </div>
                                </Col>
                            )
                        })}

                    </Row>
                </div>
            </div>
            {isMobile && <div {...dataSource.image}>
                <img src={dataSource.image.children} width="100%" alt="img" />
            </div>}
        </Background>
    )
}

const Background = styled.div`
  background-image: ${props => (props.isMobile ? null : `url('/deployment.jpg')`)};
`;
