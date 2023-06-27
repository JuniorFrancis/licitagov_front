import React, { useEffect } from 'react';
import { Row, Descriptions, Button, Col, Modal, message } from 'antd';
import { useState } from 'react';

import ProposalForm from './ProposalForm';

export const BiddingDetails = ({ selectedBindding, handleCancel, loading }) => {

    const [data, setData] = useState();
    const [visibleModalProposal, setVisibleModalProposal] = useState(false);
    const [proposal, setProposal] = useState();
    
    const openModalPropose = () => {

        setProposal({
            "amount": 0,
            "message": ""
        });

        setVisibleModalProposal(true);
    }

    const closeModalPropose = () => {
        setVisibleModalProposal(false);
    }

    const onFinishProposal = () => {
        message.success('Proposal sent successfully');
    }

    const onFinishProposalWithFailed = () => {
        message.success('Error');
    }


    useEffect(() =>{
        setData({selectedBindding});
    }, [])
    return (
        <>
            <Row>
                <Descriptions title={selectedBindding.identificador + " - " + selectedBindding.numero_item_licitacao}/>

                <Descriptions>
                    <Descriptions.Item label="Recurso">{selectedBindding.tipo_recurso}</Descriptions.Item>
                </Descriptions>

                <Descriptions>
                    <Descriptions.Item label="Número do Item da Licitação">{selectedBindding.numero_item_licitacao}</Descriptions.Item>
                </Descriptions>

                <Descriptions>
                    <Descriptions.Item label="Identificador">{selectedBindding.identificador}</Descriptions.Item>
                </Descriptions>

                <Descriptions>
                    <Descriptions.Item label="UASG">{selectedBindding.uasg}</Descriptions.Item>
                </Descriptions>

                <Descriptions>
                    <Descriptions.Item label="Pregão">{selectedBindding.tipo_pregao}</Descriptions.Item>
                </Descriptions>

                <Descriptions>
                    <Descriptions.Item label="Número do processo">{selectedBindding.numero_processo}</Descriptions.Item>
                </Descriptions>

                <Descriptions>
                    <Descriptions.Item label="Responsável">{selectedBindding.nome_responsavel}</Descriptions.Item>
                </Descriptions>

                <Descriptions>
                    <Descriptions.Item label="Objeto">{selectedBindding.objeto}</Descriptions.Item>
                </Descriptions>
            </Row>
            <Row className="w-100 mt-4">
                <Col sm={24} >
                    <Button className="float-right" type="primary" onClick={handleCancel} loading={loading}> OK </Button>
                </Col>
            </Row>
        </>
    )
}

export default BiddingDetails