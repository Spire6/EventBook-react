import React, { Component } from 'react'

class AddEvent extends Component {
    render() {
        return (

            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create New Event</h5>
                            <hr /><br />
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg " placeholder="Event name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg " placeholder="Location" />
                                </div>

                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" placeholder="Event description"></textarea>
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="start_date" />
                                </div>
                                <h6>End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="end_date" />
                                </div>

                                <button type="submit" className="btn btn-info btn-block mt-4">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}

export default AddEvent;
