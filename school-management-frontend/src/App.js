import React from "react";
import SchedulePageContainer from './containers/SchedulePageContainer';

import "./App.css";

class App extends React.Component {
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
        
          <SchedulePageContainer />
          
        
      </div>
    );
  }
}

export default App;