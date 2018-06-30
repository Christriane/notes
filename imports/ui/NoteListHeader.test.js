import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import { NoteListHeader } from './NoteListHeader';

if(Meteor.isClient){
    describe('NoteListHeader', function(){
        it('should call meteorCall on click', function(){
            const spy = expect.createSpy();
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<NoteListHeader meteorCall={spy}/>, options.get());

            wrapper.find('button').simulate('click');
            expect(spy).toHaveBeenCalledWith('notes.insert');
        });
    });
}