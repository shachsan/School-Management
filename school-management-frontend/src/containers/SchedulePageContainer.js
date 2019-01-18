import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import Schedule from '../components/Schedule';

export default class SchedulePageContainer extends Component {
    render() {
        return (
            <main>
                <Calendar />
                <Schedule />
            </main>
        );
    }
};
