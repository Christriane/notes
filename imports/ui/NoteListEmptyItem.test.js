import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import { NoteList } from './NoteList';

const notes = [
    {
        _id: 'notedId1',
        title: 'Test title',
        body: '',
        updateAt: 0,
        userId: 'userId1'
    },{
        _id: 'notedId2',
        title: '',
        body: 'sample text here',
        updateAt: 0,
        userId: 'userId2'
    }
]

if(Meteor.isClient){
    describe('NoteListEmptyItem', function(){
        it('should render NoteListItem for each note', function(){
            const wrapper = mount(<NoteList notes={notes}/>);

            expect(wrapper.find('NoteListItem').length).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
            
        });

        it('should render NoteListEmptyItem if zero notes', function(){
            const wrapper = mount(<NoteList notes={[]}/>);

            expect(wrapper.find('NoteListItem').length).toBe(0);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        });
    });
}