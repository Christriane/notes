import React from 'react';
import { Session } from 'meteor/session';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default class Dashboard extends React.Component {

    constructor(props){
        super(props);

    }

    componentWillMount(){
        Session.set('selectedNoteId', this.props.match.params.id)
    }

    render(props){
        return(
            <div>
                <PrivateHeader title="Dashboard"/>
                <div className="page-content">
                    <div className="page-content__sidebar">
                        <NoteList />
                    </div>
                    <div className="page-content__main">
                        <Editor />
                    </div>
                </div>
            </div>
        );
    }
    
}