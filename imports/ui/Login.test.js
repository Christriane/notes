import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

import { Login } from './Login';

if(Meteor.isClient){
    describe('Login', function(){
        it('should show error messages', function(){
            const error ='This is not working';
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Login loginWithPassword={() => {}}/>, options.get());
            
            wrapper.setState({ error });
            expect(wrapper.find('p').text()).toBe(error);
            
            wrapper.setState({ error: ''});
            expect(wrapper.find('p').length).toBe(0);
        });
        
        it('should call loginWithPassword with the form data', function(){
            const email = 'test@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Login loginWithPassword={spy}/>, options.get());

            wrapper.instance('Login').refs.email.value = email;
            wrapper.instance('Login').refs.password.value = password;            
            wrapper.find('form').simulate('submit');
            
            expect(spy.calls[0].arguments[0]).toEqual({ email });
            expect(spy.calls[0].arguments[1]).toBe(password);
        });
        
        it('should set loginWithPassword callback errors', function() {
            const spy = expect.createSpy();
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Login loginWithPassword={spy}/>,  options.get());
            
            wrapper.find('form').simulate('submit');
            
            spy.calls[0].arguments[2]({});
            expect(wrapper.state('error').length).toNotBe(0);
            
            spy.calls[0].arguments[2]();
            expect(wrapper.state('error').length).toBe(0);
        });
    });
}