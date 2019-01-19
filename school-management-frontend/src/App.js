import React from "react";
import SchedulePageContainer from './containers/SchedulePageContainer';
import dateFns from "date-fns";

import "./App.css";

class App extends React.Component {
      state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    };

    nextMonth = () => {
      this.setState({
        currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
      });
    };
    prevMonth = () => {
      this.setState({
        currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
      });
    };

    onDateClick = day => {
      this.setState({
        selectedDate: day
      });
    };


  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon swing">date_range</span>
            <span>
              Book <b>Lecture Room</b>
            </span>
          </div>
        </header>
        
          <SchedulePageContainer 
              currentMonth={this.state.currentMonth}
              selectedDate={this.state.selectedDate}
              nextMonth={this.nextMonth}
              prevMonth={this.prevMonth}
              onDateClick={this.onDateClick}
          />
          
        
      </div>
    );
  }
}

export default App;