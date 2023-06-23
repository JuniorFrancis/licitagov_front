import React, { useState } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import GridItem from 'components/shared-components/Card/GridItem'
import ListItem from 'components/shared-components/Card/ListItem'
import { Skeleton, Radio, message, Row, Col, Tooltip, Tag, Progress, Avatar, Menu, Card, DatePicker } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined, PlusOutlined } from '@ant-design/icons';

import Flex from 'components/shared-components/Flex';
import { useEffect } from 'react';

import BiddingService from 'services/BiddingService';
import BiddingDetails from './BiddingDetails';

const VIEW_LIST = 'LIST';
const VIEW_GRID = 'GRID';

const { Meta } = Card;


const Dashboard = () => {

	const [view, setView] = useState(VIEW_GRID);
	const [bids, setBids] = useState();
	const [selectedBindding, setSelectedBindding] = useState();
	const [totalItens, setTotalItens] = useState();
	const [totalPages, setTotalPages] = useState();
	const [loading, setLoading] = useState();
	const [biddingDetailsVisible, setBiddingDetailsVisible] = useState(false);

	const onChangeProjectView = e => {
		setView(e.target.value)
	}

	const closeBiddingDetailsVisible = () => {
		setBiddingDetailsVisible(false);
		setSelectedBindding(null);
	}

	const showBiddingDetailsVisible = biddingDetails => {
		setBiddingAsVisible(biddingDetails.id)
		setBiddingDetailsVisible(true);
		setSelectedBindding(biddingDetails);
	}

	
	const getBids = (publicationDate = null, page = "0", size = "10") => {
		setLoading(true);
		BiddingService.getBids(publicationDate, page, size).then( (response) => {
			setBids(response.content);
			setTotalItens(response.totalElements);
			setTotalPages(response.totalPages);

		});

		setLoading(false);
	}

	const setBiddingAsVisible = (id) => {
		setLoading(true);
		
		var payload = {
			"biddingId": `${id}`
		}

		setLoading(true);
		
		BiddingService.setVisible(payload);

		setLoading(false);
	}

	const onChange = (date, dateString) => {
		var parsedDate = dateString.replaceAll("-", "");
		getBids(parsedDate, 0, 10);
	}

	useEffect(() => {
		getBids();
	}, []);

	return (
		<>
			<PageHeaderAlt className="border-bottom">
				<div className="container-fluid">
					<Flex justifyContent="between" alignItems="center" className="py-4">
						<h2>Licitações</h2>
						
						<div>
							{/* <Radio.Group defaultValue={VIEW_GRID} onChange={e => onChangeProjectView(e)}>
								<Radio.Button value={VIEW_GRID}><AppstoreOutlined /></Radio.Button>
								<Radio.Button value={VIEW_LIST}><UnorderedListOutlined /></Radio.Button>
							</Radio.Group> */}
						</div>
					</Flex>
					<DatePicker onChange={onChange} placeholder="Selecione uma data para consultar"></DatePicker>
				</div>
			</PageHeaderAlt>
			<div className={`my-4 ${view === VIEW_LIST? 'container' : 'container-fluid'}`}>
				{
					view === VIEW_LIST ?
					bids?.map(elm => <ListItem biddingDetailsVisible={biddingDetailsVisible} setBiddingDetailsVisible={setBiddingDetailsVisible} data={elm} key={elm.id}/>)
					:
					<Row gutter={16}>
						{bids?.map(elm => (
							<Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={elm.id}>
								<GridItem 
									biddingDetailsVisible={biddingDetailsVisible} 
									setBiddingDetailsVisible={setBiddingDetailsVisible} 
									closeBiddingDetailsVisible={closeBiddingDetailsVisible}
									showBiddingDetailsVisible={ elm => showBiddingDetailsVisible(elm)}
									loading={loading} 
									data={elm} 
									
								/>
							</Col>
						))}
					</Row>
				}
			</div>
		</>
	)
}

export default Dashboard