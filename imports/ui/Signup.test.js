import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

import { Signup } from './Signup';

if(Meteor.isClient){
    describe('Signup', function(){
        it('should show error messages', function(){
            const error ='This is not working';
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Signup createUser={() => {}}/>, options.get());
            
            wrapper.setState({ error });
            expect(wrapper.find('p').text()).toBe(error);
            
            wrapper.setState({ error: ''});
            expect(wrapper.find('p').length).toBe(0);
        });
        
        it('should call createdUser with the form data', function(){
            const email = 'test@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Signup createUser={spy}/>, options.get())
            
            wrapper.instance('Signup').refs.email.value = email;
            wrapper.instance('Signup').refs.password.value = password;
            wrapper.find('form').simulate('submit');
            
            expect(spy.calls[0].arguments[0]).toEqual({ email, password });
        });
        
        it('should set error if short password', function(){
            const email = 'test@test.com';
            const password = 'pass';
            const spy = expect.createSpy();
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Signup createUser={spy}/>, options.get())
            
            wrapper.instance('Signup').refs.email.value = email;
            wrapper.instance('Signup').refs.password.value = password;
            wrapper.find('form').simulate('submit');
            
            expect(wrapper.state('error').length).toBeGreaterThan(0);
        });
        
        it('should set createUser callback errors', function() {
            const password = 'password123!';
            const reason = 'This is why it failed';
            const spy = expect.createSpy();
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Signup createUser={spy}/>, options.get());
            
            wrapper.instance('Signup').refs.password.value = password;
            wrapper.find('form').simulate('submit');
            
            spy.calls[0].arguments[1]({ reason });
            expect(wrapper.state('error')).toBe(reason);
            
            spy.calls[0].arguments[1]();
            expect(wrapper.state('error').length).toBe(0);
        });
    });
}