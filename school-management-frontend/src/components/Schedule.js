import React, { Component } from 'react';
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

    getModName=(modId) => {

        // console.log(modId)
        // let mod=this.props.allMods.filter(mod=>mod.id==modId)
        // console.log(mod);
        // return mod[0].name;
        return `Mod ${modId}`
    }

    getClassName=(modId) => {
        return `mod mod-${modId}`
    }

    formatTime=(time) => {
        // const convertion=05:00;
        console.log('time after clicking on a Jan 24',time);
        const convertUTC=time.slice(0,time.length-1);
        const localDateTime=new Date(convertUTC+'-05:00');//concating -5:00 to convertUTC string
        const localTime=dateFns.format(localDateTime, 'hh:mm a')
        return localTime;
    }
    render() {
        console.log('whole schedule', this.props.schedule);
        console.log('schedule date', dateFns.format(this.props.schedule.date, 'YYYY-MM-DD'))
        console.log('selectedDate from state',dateFns.format(this.props.selectedDate, 'YYYY-MM-DD'))
                 
        return (
            <React.Fragment>
                 {dateFns.format(this.props.schedule.date, 'YYYY-MM-DD')===dateFns.format(this.props.selectedDate, 'YYYY-MM-DD')
                 
                 ? <li className="reservation"> {this.formatTime(this.props.schedule.start_time)} - 
                        {this.formatTime(this.props.schedule.end_time)} ---  
                        {this.props.schedule.event} 
                        <span className={this.getClassName(this.props.schedule.mod_id)}>
                        {this.getModName(this.props.schedule.mod_id)}
                        </span><br/>
                        
                        {this.state.toggleEdit
                            ? <UpdateForm
                                toggleEdit={this.state.toggleEdit}
                                onEditHandler={this.props.onEditHandler}
                                onChangeBookForm={this.props.onChangeBookForm}
                                schedule={this.props.schedule}
                                toggleEditHandler={this.toggleEditHandler}
                                selectedMod={this.props.selectedMod}
                                selectedDate={this.props.selectedDate}
                                lectureRoom={this.props.lectureRoom}
                                bookForm={this.props.bookForm}
                                // roomSchedules={this.props.lectureRoom.lecture_schedules}
                                onChangeModSelectionHandler={this.props.onChangeModSelectionHandler}
                                allMods={this.props.allMods}

                                />
                            : null
                        }
                        <button className="btn-edit" onClick={()=>this.toggleEditHandler()}>Edit Schedule</button>
                        
                        <button className="btn-del" onClick={(e)=>this.props.onDeleteHandler(this.props.schedule)}>Delete</button>
                    </li>
                :null
                }
             </React.Fragment>
        );
    }
};
