import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import ScheduleContainer from './ScheduleContainer';

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
                <ScheduleContainer schedules={this.props.schedules} 
                    selectedDate={this.props.selectedDate}
                    onBookItHandler={this.props.onBookItHandler}
                    onChangeBookForm={this.props.onChangeBookForm}
                    event={this.props.event} onDeleteHandler={this.props.onDeleteHandler}
                    onEditHandler={this.props.onEditHandler}
                    selectedMod={this.props.selectedMod}
                    onChangeModSelectionHandler={this.props.onChangeModSelectionHandler}
                    allMods={this.props.allMods}
                />
            </main>
        );
    }
};
