import { Col, Row } from "antd"
import React from "react"
import styled from "styled-components"
import { getChildrenToRender } from "../utils"

export default class Feature102 extends React.PureComponent {
    render() {
        const { ...tagProps } = this.props
        const { dataSource, isMobile } = tagProps
        const { image2 } = dataSource;

        delete tagProps.dataSource
        delete tagProps.isMobile
        return (
            <Background {...tagProps} {...dataSource.wrapper}
                image={dataSource.image.children}
                isMobile={isMobile}
            >
                <div {...dataSource.page}>
                    <div {...dataSource.childWrapper}>
                        {dataSource.childWrapper.children.map(getChildrenToRender)}
                        <Row gutter={[40, 60]}>
                            {dataSource.content.map((item, key) => {
                                const { image, title, description, ...rest } = item
                                return (
                                    <Col md={12} key={key}>
                                        <div {...rest} >
                                            <div style={{ marginRight: 16 }}>
                                                <img alt='img' {...image} />
                                            </div>
                                            <div className='feature102-block-right'>
                                                <div {...title} />
                                                <div {...description} />
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })}

                        </Row>
                    </div>
                </div>
                {isMobile && image2 && (
                    <div {...dataSource.image2}>
                        <img src={dataSource.image2.children} width="100%" alt="img" />
                    </div>
                )}
            </Background>
        )
    }
}

const Background = styled.div`
  background-image: ${props => (props.isMobile ? null : `url(${props.image})`)};
`;
