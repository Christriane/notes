import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import NoteListItem from './NoteListItem';

if(Meteor.isClient){
        describe('NoteListItem', function(){
            it('should renter title and timestamp', function (){
                const options = new ReactRouterEnzymeContext();
                const title = 'My title here';
                const updateAt = 1530394961827;
                const wrapper = mount(<NoteListItem note={{title, updateAt }} />, options.get());
                
                expect(wrapper.find('h5').text()).toBe(title);
                expect(wrapper.find('p').text()).toBe('6/30/18');
            });

            it('should set default title if not title set', function(){
                const options = new ReactRouterEnzymeContext();
                const title = '';
                const updateAt = 1530394961827;
                const wrapper = mount(<NoteListItem note={{title, updateAt }} />, options.get());
                
                expect(wrapper.find('h5').text()).toBe('Untitled note');
            });
        });
}
