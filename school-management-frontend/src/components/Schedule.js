import React, { Component } from 'react';
import BookingForm from './BookingForm';
import dateFns from "date-fns";
import UpdateForm from './updateForm';



export default class Schedule extends Component {
    state={
        toggleEdit:false
    }

    toggleEditHandler=() => {
        this.setState({
            toggleEdit:!this.state.toggleEdit
        })
    }
    formatTime=(time) => {
        // const convertion=05:00;
        const convertUTC=time.slice(0,time.length-1);
        const localDateTime=new Date(convertUTC+'-05:00');//concating -5:00 to convertUTC string
        const localTime=dateFns.format(localDateTime, 'hh:mm a')
        return localTime;
    }
    render() {
        return (
            <React.Fragment>
                 {dateFns.format(this.props.schedule.date, 'YYYY-MM-DD')===dateFns.format(this.props.selectedDate, 'YYYY-MM-DD')
                 
                 ? <li>{this.formatTime(this.props.schedule.start_time)} - 
                    {this.formatTime(this.props.schedule.end_time)} ---  
                    {this.props.schedule.event}<br/>
                    
                    {this.state.toggleEdit
                        ? <UpdateForm
                            toggleEdit={this.state.toggleEdit}
                            onEditHandler={this.props.onEditHandler}
                            onChangeBookForm={this.props.onChangeBookForm}
                            schedule={this.props.schedule}
                            toggleEditHandler={this.toggleEditHandler}

                             />
                        : null
                    }
                    <button onClick={()=>this.toggleEditHandler()}>Edit Schedule</button>
                    
                    <button onClick={(e)=>this.props.onDeleteHandler(this.props.schedule)}>Delete</button>
                    </li>
                :null
                }
             </React.Fragment>
        );
    }
};
