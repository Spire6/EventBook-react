import React, { Component } from 'react'
import BrowseEventsButton from './Event/BrowseEventsButton';
import CreateEventButton from './Event/CreateEventButton';

class Dashboard extends Component {
    render() {
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">

                            <BrowseEventsButton />

                        </div>

                        <div className="col-sm-6">

                            <CreateEventButton />

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Dashboard;
