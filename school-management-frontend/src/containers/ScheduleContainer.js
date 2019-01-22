import React, { Component } from 'react';
import LectureRoom from '../components/LectureRoom';
import dateFns from 'date-fns';

export default class ScheduleContainer extends Component {

    
    render() {
        // const { schedules } = this.props
        // console.log(this.props.schedules);
        return (
             <div className="schedule">
                <h4 className="schedule-header">{dateFns.format(this.props.selectedDate, 'dddd DD')}</h4>
                    {this.props.schedules.map(lectureRoom=>
                    <LectureRoom key={lectureRoom.id} lectureRoom={lectureRoom}
                        selectedDate={this.props.selectedDate}
                        onBookItHandler={this.props.onBookItHandler}
                        onChangeBookForm={this.props.onChangeBookForm}
                        event={this.props.event} onDeleteHandler={this.props.onDeleteHandler}
                        onEditHandler={this.props.onEditHandler}
                        selectedMod={this.props.selectedMod}
                        onChangeModSelectionHandler={this.props.onChangeModSelectionHandler}
                        allMods={this.props.allMods}
                        schedules={this.props.schedules}
                    />)}

                    
             </div>
        );
    }
};
