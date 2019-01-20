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
                {this.props.lectureRoom.name}
                
                <ul>
                    {this.props.lectureRoom.lecture_schedules.map(schedule=>
                        <Schedule key={schedule.id} schedule={schedule}
                            selectedDate={this.props.selectedDate}
                        />
                        )}
                </ul>
                <button onClick={()=>this.onScheduleClickHandler()}>Reserve {this.props.lectureRoom.name}</button>
                {this.state.toggleBooking
                ? <BookingForm onBookItHandler={this.props.onBookItHandler}
                               lectureRoomName={this.props.lectureRoom.name}
                               onChangeBookForm={this.props.onChangeBookForm}
                               toggleBooking={this.onScheduleClickHandler}
                               event={this.props.event}
                               />
                :null
                }
            </div>
        );
    }
};
 