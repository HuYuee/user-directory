import React from 'react';
import Enzyme,{shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import UserDirec from './userlist';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


describe('Enzyme Shallow', () => {
  it('UserDirec\'s title should be User Directory', () => {
    const app = shallow(<UserDirec />)
    expect(app.find('h1').text()).to.equal('User Directory')
  })
});

describe('Enzyme Render', () => {
  it('UserDirec should have one userContent class', () => {
    const app = shallow(<UserDirec />);
    expect(app.find('.userContent').length).to.equal(1)
  })
});

describe('Enzyme Mount', function () {
  it('Add Todo', function () {
    let app = mount(<UserDirec/>);
    let todoLength = app.find('UserCard').length;
    app.find('button.addUser').at(0).simulate('click');
    app.find('button.cancel').at(0).simulate('click');
    expect(app.find('UserCard').length).to.equal(todoLength);
  });
});
