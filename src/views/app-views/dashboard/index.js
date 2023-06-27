import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Pagination, message, Row, Col, Card, DatePicker, Modal, Popover } from 'antd';
import ItemInfo from 'components/shared-components/Card/ItemInfo';
import ItemHeader from 'components/shared-components/Card/ItemHeader';
import Flex from 'components/shared-components/Flex';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import BiddingService from 'services/BiddingService';
import BiddingDetails from './BiddingDetails';

const Dashboard = () => {

	const [bids, setBids] = useState();
	const [selectedBindding, setSelectedBindding] = useState();
	const [totalItens, setTotalItens] = useState();
	const [totalPages, setTotalPages] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [date, setDate] = useState(moment("20220622", 'YYYYMMDD'));
	const [displayDate, setDisplayDate] = useState(new Date("2022-06-23"));
	const [loading, setLoading] = useState(false);

	const [biddingDetailsVisible, setBiddingDetailsVisible] = useState(false);

	const closeBiddingDetailsVisible = () => {
		setBiddingDetailsVisible(false);
		setSelectedBindding(null);
	}

	const showBiddingDetailsVisible = biddingDetails => {
		setBiddingAsVisible(biddingDetails.id)
		setBiddingDetailsVisible(true);
		setSelectedBindding(biddingDetails);
	}
	
	const getBids = (page = "0") => {
		setLoading(true);
		BiddingService.getBids(date.format('YYYYMMDD'), page, pageSize).then( (response) => {
			setBids(response.content);
			setTotalItens(response.totalElements);
			setTotalPages(response.totalPages);
			setLoading(false);

		}).catch(error => {
			setLoading(false);
			console.log(error);
			message.error(error);
		});
	}

	const setBiddingAsVisible = (id) => {
		var payload = {
			"biddingId": `${id}`
		}

		BiddingService.setBiddingAsVisualized(payload).then( (response) => {
			getBids(Number(currentPage)-1);			
		});
	}

	const onChangePublicationDate = (dateString) => {

		if(dateString != null){
			console.log('teste');
			setCurrentPage(1);
			setDate(dateString);
		} 
		
	}

	const onChangePage = (page, pageSize) => {
		setCurrentPage(page)
		getBids(Number(page)-1);
	}

	useEffect(() => {
		getBids();
	}, []);

	useEffect(() => {
		getBids(0, 10);
	}, [date]);

	return (
		<>
			<PageHeaderAlt className="border-bottom">
				<div className="container-fluid">
					<Flex justifyContent="between" alignItems="center" className="py-4">
						<h2>Licitações</h2>
						
					</Flex>
					<Row className="w-100">
						<Col>
							<Popover className='mr-3' content={"A consulta pode levar tempo a mais do que o esperado."} >
									<ExclamationCircleOutlined style={{ marginTop: '10px', fontSize: '20px', color: 'blue' }} />
							</Popover>
						</Col>
						<Col>
							<DatePicker allowClear={false} defaultValue={moment(displayDate, 'YYYY-MM-DD')} disabled={loading} onChange={onChangePublicationDate} placeholder="Selecione uma data para consultar" disabledDate={d => d.isAfter(displayDate)} />	
						</Col>
					</Row>
					
				</div>
			</PageHeaderAlt>
			<div className={`my-4 container-fluid`}>
				<Row gutter={16}>
					{bids?.map(elm => (
						<Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={elm.id}>
								<Card loading={loading} onClick={() => showBiddingDetailsVisible(elm)}>
									<Flex alignItems="center" justifyContent="between">
										<ItemHeader name={elm?.nome_responsavel.split(" ")[0]} visualized={elm?.visualized} />
									</Flex>
									<div className="mt-2">
										<ItemInfo 
											uasg={elm?.numero_item_licitacao}
											visualized={elm?.visualized}
											closeProposalDate={elm?.data_abertura_proposta}
										/>
									</div>
								</Card>
								
						</Col>
					))}
				</Row>
				<Modal
					title='Detalhes da Licitação'
					open={biddingDetailsVisible}
					onCancel={closeBiddingDetailsVisible}
					width={1000}
					footer={null}
				>
					<BiddingDetails 
						selectedBindding={selectedBindding} 
						handleCancel={closeBiddingDetailsVisible}
						loading={loading} 
					/>
				</Modal>
				<Pagination showSizeChanger={false} showLessItems={true}current={currentPage} onChange={onChangePage} defaultCurrent={1} total={totalItens} />
			</div>
		</>
	)
}

export default Dashboard