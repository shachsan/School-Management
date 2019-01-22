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
        console.log(this.props.allMods);
        let mod=this.props.allMods.filter(mod=>mod.id===modId)
        console.log(mod);
        return mod[0].name;
    }

    getClassName=(modId) => {
        if(modId===1)
            return 'mod mod-one'
        else if(modId===2)
            return 'mod mod-two'
        else if(modId===3)
            return 'mod mod-three'
        else if(modId===4)
            return 'mod mod-four'
        else if(modId===5)
            return 'mod mod-five'
        else if(modId===6)
            return 'mod mod-six'
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
                 
                 ? <li className="reservation"> {this.formatTime(this.props.schedule.start_time)} - 
                        {this.formatTime(this.props.schedule.end_time)} ---  
                        {this.props.schedule.event} 
                        <span className={this.getClassName(this.props.schedule.mod_id)}>
                        {this.getModName(this.props.schedule.mod_id)}</span><br/>
                        
                        {this.state.toggleEdit
                            ? <UpdateForm
                                toggleEdit={this.state.toggleEdit}
                                onEditHandler={this.props.onEditHandler}
                                onChangeBookForm={this.props.onChangeBookForm}
                                schedule={this.props.schedule}
                                toggleEditHandler={this.toggleEditHandler}
                                selectedMod={this.props.selectedMod}
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
