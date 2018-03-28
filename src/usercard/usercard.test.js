import React from 'react';
import Enzyme,{shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import UserCard from './usercard';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Enzyme Shallow', () => {
  it('UserCard should have three <Todo /> components', () => {
    const app = shallow(<UserCard />)
    expect(app.find('BasicFormItem').length).to.equal(3)
  })
});