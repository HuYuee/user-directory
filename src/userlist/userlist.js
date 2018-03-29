import React, { Component } from 'react';
import {Button} from 'antd';
import UserCard from '../usercard/usercard';
import './userlist.css';

//UserDirec page component
class UserDirec extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userList : []
      }
    }
    //add user func
    addUser = () => {
      let list = [];
      const state = this.state,
        date = new Date().getTime(),
        { userList } = state;
      if(userList && userList.length){
        list = [...userList];
      }
      list.push({
        time:date
      });
      this.setState({
        userList:list
      })
    }
    //deal with random feature
    randomUser = (date,user) => {
      const {userList} = this.state;
      let list = [];
      
      if (userList && userList.length) {
        list = [...userList];
      }
      for (let i=0 ;i<list.length; i++) {
        let item = list[i];
        if (date === item.time) {
          if (i === 0 || !list[i-1].isRandom) {
            item.edit_flag = 'noEdit';
            item.user = user;
            item.isRandom = true;
            this.setState({
              userList:list
            },this.addUser)
          } else {
            list[i-1].user = user;
            this.setState({
              userList:list
            })
          }
          break;
        }
      }
    }
    //operate delete,update,save.
    operateUser = (date,type) => {
      const { userList } = this.state;
      let list = [];
      if (userList && userList.length) {
        list = [...userList];
      }
      for (let i=0;i<list.length;i++) {
        if (date === list[i].time) {
          switch (type) {
            case 'del':
              list.splice(i,1);
              break;
            case 'save':
              list[i].edit_flag = 'noEdit';
              break;
            case 'edit':
              list[i].edit_flag = 'Edit';
              break;
            default:
              list[i].edit_flag = 'noEdit';
              break;
          }
        }
      }
      this.setState({
        userList:list
      })
    }
    render() {
      const {userList} = this.state;
      return (
        <div className="userContent">
          <div className="userContent__title">
            <h1>User Directory</h1>
            <Button 
              className="addUser" 
              type="primary" 
              onClick={this.addUser}
            >
              add User
            </Button>
          </div>
          <div className="userContent__userCardContent">
            {
              (userList&&userList.length) ? userList.map((item) => {
                if(item){
                  return (
                    <UserCard 
                      index={item.time} 
                      user={item.user} 
                      edit_flag={item.edit_flag} 
                      key={item.time} 
                      operateUser={this.operateUser} 
                      random={this.randomUser}
                    />
                  )
                }else{
                  return '';
                }
              }):''
            }
          </div> 
        </div>
      )
    }
  }
export default UserDirec;