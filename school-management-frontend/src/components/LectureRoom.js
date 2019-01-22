import React, {Component} from 'react';
import Schedule from './Schedule';
import BookingForm from '../components/BookingForm';

export default class LectureRoom extends Component {

    state={
        toggleBooking:false,

    }


    onScheduleClickHandler=() => {
        this.setState({
            toggleBooking:!this.state.toggleBooking
        })
    }
    
    render(){
        return (
            <div className='lecture-room'> 
                <span className="room-title">{this.props.lectureRoom.name}</span>
                
                <ul>
                    {this.props.lectureRoom.lecture_schedules.map(schedule=>
                        <Schedule key={schedule.id} schedule={schedule}
                            selectedDate={this.props.selectedDate}
                            onDeleteHandler={this.props.onDeleteHandler}
                            onEditHandler={this.props.onEditHandler}
                            onChangeBookForm={this.props.onChangeBookForm}
                            selectedMod={this.props.selectedMod}
                            onChangeModSelectionHandler={this.props.onChangeModSelectionHandler}
                            allMods={this.props.allMods}
                        />
                        )}
                </ul>
                <button className="reserve-button" onClick={()=>this.onScheduleClickHandler()}>Reserve {this.props.lectureRoom.name}</button>
                {this.state.toggleBooking
                ? <BookingForm onBookItHandler={this.props.onBookItHandler}
                               lectureRoomName={this.props.lectureRoom.name}
                               roomSchedules={this.props.lectureRoom.lecture_schedules}
                               onChangeBookForm={this.props.onChangeBookForm}
                               toggleBooking={this.onScheduleClickHandler}
                               event={this.props.event}
                               selectedDate={this.props.selectedDate}
                               selectedMod={this.props.selectedMod}
                               onChangeModSelectionHandler={this.props.onChangeModSelectionHandler}
                               allMods={this.props.allMods}
                               schedules={this.props.schedules}
                               />
                :null
                }
            </div>
        );
    }
};
 