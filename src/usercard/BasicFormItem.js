import React from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;

let BasicFormItem = (props)=>{
    return (
        <FormItem
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            label={ props.name }
        >
            { props.edit_flag === 'Edit' ? props.children : props.value }
        </FormItem>
    )
}
export default BasicFormItem;