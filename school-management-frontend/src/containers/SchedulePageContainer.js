import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import Schedule from '../components/Schedule';

export default class SchedulePageContainer extends Component {
    render() {
        return (
            <main>
                <Calendar 
                    currentMonth={this.props.currentMonth}
                    selectedDate={this.props.selectedDate}
                    nextMonth={this.props.nextMonth}
                    prevMonth={this.props.prevMonth}
                    onDateClick={this.props.onDateClick}
                />
                <Schedule />
            </main>
        );
    }
};
