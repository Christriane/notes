import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if(Meteor.isClient){
    describe('Editor', function(){
        let history;
        let call;
        
        beforeEach(function(){
            history = {
                push: expect.createSpy()
            }    
            call = expect.createSpy(); 
        });
        
       it('should render pick note message', function(){
            const wrapper = mount(<Editor history={history} call={call}/>);
            
            expect(wrapper.find('p').text()).toBe('Pick or create a note to get started');
            
       });
       
       it('should render not found message', function(){
            const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id}/>);
            
            expect(wrapper.find('p').text()).toBe('Note note found.');
       });
       
       it('should remove note', function(){
            const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);
             
            wrapper.find('button').simulate('click');
            
            expect(history.push).toHaveBeenCalledWith('/dashboard');
            expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
       });
       
       it('should update the note title on input change', function(){
           const newTitle = 'New Title Text';
            const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);
            wrapper.find('input').simulate('change', {
               target: {
                   value: newTitle
               } 
            });
            
            expect(wrapper.state('newTitle')).toBe(newTitle);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
       });
       
       it('should update the note body on textarea change', function(){
           const newBody = 'New Body Text';
            const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);
            wrapper.find('textarea').simulate('change', {
               target: {
                   value: newBody
               } 
            });
            
            expect(wrapper.state('body')).toBe(newBody);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
       });
       
       it('should set state for new note', function(){
            const wrapper = mount(<Editor history={history} call={call}/>);
            wrapper.setProps({
               selectedNoteId: notes[0]._id,
               note: notes[0]
            });
            
            expect(wrapper.state('title')).toBe(notes[0].title);
            expect(wrapper.state('body')).toBe(notes[0].body);
       });
       
        it('should note set state if note prop not provided', function(){
            const wrapper = mount(<Editor history={history} call={call}/>);
            wrapper.setProps({
               selectedNoteId: notes[0]._id,
            });
            
            expect(wrapper.state('title')).toBe('');
            expect(wrapper.state('body')).toBe('');
       });
    });
}