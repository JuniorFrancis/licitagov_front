import React from 'react';
import Flex from 'components/shared-components/Flex';
import { Tooltip, Tag } from 'antd';
import { 
	PaperClipOutlined, 
	ClockCircleOutlined,
    CheckOutlined
} from '@ant-design/icons';

export const ItemInfo = ({uasg, closeProposalDate, visualized}) => {

    return (
        <>
        <Flex alignItems="center">
            <div className="mr-3">
                {
                    visualized ? 
                    <Tag color="green">
                        <CheckOutlined />
                    </Tag> : null
                }
                <span className="ml-1 text-muted">UASG: {uasg}</span>
            </div>
            <div>
            <Tag>
                <ClockCircleOutlined />
                <span className="ml-2 font-weight-semibold">{closeProposalDate?.substring(0, 10)}</span>
            </Tag>
            </div>
        </Flex>
        </>
    )
}

export default ItemInfo;