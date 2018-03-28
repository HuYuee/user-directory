import React, { Component } from 'react';
import {Form,Card,Button,Input,Radio} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import './usercard.css';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const propTypes = {
    index: PropTypes.number,
    user: PropTypes.object,
    edit_flag: PropTypes.string,
    operateUser: PropTypes.func,
    random: PropTypes.func
};
const defaultProps = {
    index: 0,
    user: {
      name:{
        first:'',
        last:''
      },
      gender:''
    },
    edit_flag: 'Edit',
    operateUser: ()=>'',
    random: ()=>''
};
let BasicFormItem = (props)=>{
    return (
        <FormItem
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        label={props.name}
        >
        {props.edit_flag === 'Edit'?props.children:props.value}
        </FormItem>
    )
}
//user card component
class UserCard extends Component{
  constructor(props){
    super(props);
    let prop = this.props,
        {edit_flag,user} = prop,
        {name,gender} = user,
        {first,last} = name;
    this.state ={
      edit_flag:edit_flag,
      first:first,
      last:last,
      gender:gender
    }
  }
  componentWillReceiveProps(nextProps){
    let obj = {},
        user = this.props.user,
        nextUser = nextProps.user,
        {name,gender} = user,
        {first,last} = name,
        {name:nextName,gender:nextGender} = nextUser,
        {first:nextFirst,last:nextLast} = nextName;
    if(first !== nextFirst){
        obj.first = nextFirst;
    }
    if(last !== nextLast){
        obj.last = nextLast;
    }
    if(gender !== nextGender){
        obj.gender = nextGender;
    }
    if(obj){
      this.setState(obj)
    }
    if(this.props.edit_flag !== nextProps.edit_flag){
      this.setState({
        edit_flag:nextProps.edit_flag
      })
    }
  }
  Random=()=>{
    let this_ = this;
    axios.get('https://randomuser.me/api',{responseEncoding: 'utf8'})
    .then(function (response) {
      let data = response.data.results;
      if(response.status === 200 && data && data.length > 0){
        this_.props.random(this_.props.index,data[0]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  firstChange=(e)=>{
    this.setState({
      first:e.target.value
    })
  }
  lastChange=(e)=>{
    this.setState({
      last:e.target.value
    })
  }
  radioChange=(e)=>{
    this.setState({
      gender:e.target.value
    })
    
  }
  editClick=()=>{
    this.props.operateUser(this.props.index,'edit');
  }
  saveClick=()=>{
    this.props.operateUser(this.props.index,'save');
  }
  cancelClick=()=>{
    this.props.operateUser(this.props.index,'del')
  }
  render(){
    let state = this.state;
    let {
      edit_flag,
      first,
      last,
      gender
    } = state;
    return (
      <Card style={{marginTop:"24px"}}>
      <Form>
        <BasicFormItem name="First" value={first} edit_flag={edit_flag}>
          <Input value={first} onChange={this.firstChange} />
        </BasicFormItem>
        <BasicFormItem name="Last" value={last} edit_flag={edit_flag}>
          <Input value={last} onChange={this.lastChange} />
        </BasicFormItem>
        <BasicFormItem name="Gender" value={gender} edit_flag={edit_flag}>
          <RadioGroup value={gender} onChange={this.radioChange}>
            <Radio value="male">male</Radio>
            <Radio value="female">female</Radio>
          </RadioGroup>
        </BasicFormItem>
        {edit_flag === 'Edit'?
          <FormItem 
            wrapperCol={{span:8,offset: 16}}
            >
          <Button className="split" type="primary" onClick={this.Random}>Random User</Button>
          <Button className="split" type="primary" onClick={this.saveClick}>Save</Button>
          <Button className="split cancel"type="primary" onClick={this.cancelClick}>Cancel</Button>
        </FormItem>
          :
        <FormItem 
          wrapperCol={{span:5,offset: 19}}
          >
          <Button className="split" type="primary" onClick={this.editClick}>Edit</Button>
          <Button className="split" type="primary" onClick={this.cancelClick}>Delete</Button>
        </FormItem>
        }
        
      </Form>
        </Card>
    )
  }
}

UserCard.propTypes = propTypes;
UserCard.defaultProps = defaultProps;

export default UserCard;