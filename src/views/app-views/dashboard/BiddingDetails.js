import React from 'react';
import { Drawer, Divider, } from 'antd';
import { UserOutlined, TagsOutlined, PicCenterOutlined, CalendarOutlined, ReadOutlined } from '@ant-design/icons';
import Title from 'antd/lib/skeleton/Title';

export const BiddingDetails = ({ data, visible, close}) => {
    return (
        <Drawer
            width={600}
            placement="right"
            onClose={close}
            closable={false}
            open={visible}
        >
            <div className="text-center mt-3">
                <h3 className="mt-2 mb-0">Detalhes</h3>
            </div>
            <Divider dashed />
            <div className="mt-5">
                <p>
                    <h5> Identificador: </h5>
                    <span className="ml-3 text-dark">{data?.identificador}</span>
                </p>
                <p>
                    <h5> Numero da solicitação: </h5>
                    <span className="ml-3 text-dark">{data?.numero_item_licitacao}</span>
                </p>
                <p>
                    <h5> Tipo de Pregão: </h5>
                    <span className="ml-3 text-dark">{data?.tipo_pregao}</span>
                </p>
                <p>
                    <h5> Objeto: </h5>
                    <span className="ml-3 text-dark">{data?.objeto}</span>
                </p>
                <p>
                    <h5> Número do processo: </h5>
                    <span className="ml-3 text-dark">{data?.objeto}</span>
                </p>
                <p>
                    <h5> Informações Gerais: </h5>
                    <span className="ml-3 text-dark">{data?.informacoes_gerais}</span>
                </p>
                <p>
                    <h5> Tipo de Recurso: </h5>
                    <span className="ml-3 text-dark">{data?.tipo_recurso}</span>
                </p>
                <p>
                    <h5> Nome do responsável: </h5>
                    <span className="ml-3 text-dark">{data?.nome_responsavel}</span>
                </p>
                <p>
                    <h5> Função do responsável: </h5>
                    <span className="ml-3 text-dark">{data?.funcao_responsavel}</span>
                </p>
                <p>
                    <h5> Data de entrega do edita; </h5>
                    <span className="ml-3 text-dark">{data?.data_entrega_edital}</span>
                </p>
                <p>
                    <h5> Endereço de entrega do edita; </h5>
                    <span className="ml-3 text-dark">{data?.endereco_entrega_edital}</span>
                </p>
            </div>
        </Drawer>
    )
}

export default BiddingDetails