import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import ScheduleContainer from './ScheduleContainer';
import NavBar from '../components/NavBar';

export default class SchedulePageContainer extends Component {
    render() {
        return (
            <main>
                <NavBar selectedDate={this.props.selectedDate}
                        schedules={this.props.schedules}
                        onChangeSortHandler={this.props.onChangeSortHandler}

                />
                
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
