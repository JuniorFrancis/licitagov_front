import React from 'react';
import ItemInfo from 'components/shared-components/Card/ItemInfo';
import ItemHeader from 'components/shared-components/Card/ItemHeader';
import { Row, Col } from 'antd';

export const ListItem = ({ loading, data, removeId, setBiddingDetailsVisible}) => {
	return (
        <>
        <div className="bg-white rounded p-3 mb-3 border">
            <Row align="middle">
            <Col xs={24} sm={24} md={8}>
                    <ItemHeader name={data.name} />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ItemInfo 
                        responsible={data.nome_responsavel}
                        closeProposalDate={data.data_abertura_proposta}
                    />
                </Col>
        
            </Row>
        </div>
        </>
    )
}

export default ListItem;