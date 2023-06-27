import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Popover } from 'antd';
import { useState } from 'react';
import validations from 'utils/validations';
import EasyInputNumber from 'components/shared-components/Form/EasyInputNumber';

export const BiddingDetails = ({ selectedBindding, handleCancel, loading, proposal, setProposal, onFinish, onFinishFailed }) => {

    const [data, setData] = useState();
    const [visibleModalProposal, setVisibleModalProposal] = useState(false);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
    
    const openModalPropose = () => {
        setVisibleModalProposal(true);
    }

    const closeModalPropose = () => {
        setVisibleModalProposal(false);
    }

    const handleChangeAmount = (event) => {

        setProposal({
            ...proposal,
             "amount": event,
          });


    }

    useEffect(() =>{
        setData({selectedBindding});
    }, [])
    return (
        <>
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Popover content={"Amount of proposal"}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter the bid amount' }]}
                >
                    <EasyInputNumber
                        style={{width:"95%"}}
                        name="year" 
                        size='medium'
                        min={1900} 
                        placeholder="1000"
                        rules={validations.required("Please, insert a value")}
                        onChange={handleChangeAmount} 
                    />
                </Form.Item>
            </Popover>

            <Form.Item  {...tailLayout} >
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
            </Form>
        </>
    )
}

export default BiddingDetails