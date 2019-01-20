import React, { Component } from 'react';
import dateFns from "date-fns";



export default class Schedule extends Component {
    render() {
        return (
            <React.Fragment>
                 {dateFns.format(this.props.schedule.date, 'YYYY-MM-DD')===dateFns.format(this.props.selectedDate, 'YYYY-MM-DD')
                 
                 ? <li>{dateFns.format(this.props.schedule.start_time,'hh:mm a')} - 
                    {dateFns.format(this.props.schedule.end_time, 'hh:mm a')} ---  
                    {this.props.schedule.event}</li>
                :null
                }
             </React.Fragment>
        );
    }
};
