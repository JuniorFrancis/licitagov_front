import React from 'react';
import { Card, Tag } from 'antd';
import ItemInfo from 'components/shared-components/Card/ItemInfo';
import ItemHeader from 'components/shared-components/Card/ItemHeader';
import Flex from 'components/shared-components/Flex';

import BiddingDetails from '../../../views/app-views/dashboard/BiddingDetails';



export const GridItem = ({ biddingDetailsVisible, setBiddingDetailsVisible, showBiddingDetailsVisible, closeBiddingDetailsVisible, loading, data}) => {
	return (
        <>
        <Card loading={loading} onClick={() => showBiddingDetailsVisible(data)}>
            <Flex alignItems="center" justifyContent="between">
            <ItemHeader name={data.nome_responsavel.split(" ")[0]} visualized={data?.visualized} />
            </Flex>
            <div className="mt-2">
                <ItemInfo 
                    uasg={data?.numero_item_licitacao}
                    visualized={data?.visualized}
                    closeProposalDate={data?.data_abertura_proposta}
                />
            </div>
        </Card>
        <BiddingDetails data={data} visible={biddingDetailsVisible} close={()=> {closeBiddingDetailsVisible()}}/>
        </>
    )
}

export default GridItem;