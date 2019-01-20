import React from "react";
import SchedulePageContainer from '../containers/SchedulePageContainer';
import dateFns from "date-fns";

import "../App.css";

class Home extends React.Component {
      state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        selectedMod:'',
        schedules:[],
        scheduleId:'',
        bookForm:{
          start_time:'',
          end_time:'',
          event:''
        }

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

    onChangeBookForm=(e) => {
      // console.log(e.target.name);
      const newBookForm={...this.state.bookForm}
      newBookForm[e.target.name]=e.target.value
      this.setState({
        bookForm:newBookForm
      })
    }
    
    onSubmitFormHandler=(e, room) => {
      e.preventDefault();
      
        const newBookForm={...this.state.bookForm}
        let roomId;
        newBookForm.start_time=dateFns.format(this.state.selectedDate, 'YYYY-MM-DD')+'T'+newBookForm.start_time+'Z'
        newBookForm.end_time=dateFns.format(this.state.selectedDate, 'YYYY-MM-DD')+'T'+newBookForm.end_time+'Z'
        
        const newBooking= {...newBookForm, date:this.state.selectedDate, id:this.state.scheduleId}
        
        let newSchedule=[...this.state.schedules]
        newSchedule.forEach(lectureRoom=>{
          if(lectureRoom.name===room){
            roomId=lectureRoom.id
            lectureRoom.lecture_schedules=[...lectureRoom.lecture_schedules, newBooking]
          }

        })
        
        //for optimistic update
        this.setState({
          schedules:newSchedule,
          bookForm:{
            start_time:'',
            end_time:'',
            event:''
          }
        })

        //obtain mod_id  dynamically
        const reservation={
          event:this.state.bookForm.event,
          date:this.state.selectedDate,
          start_time:this.state.bookForm.start_time,
          end_time:this.state.bookForm.end_time,
          mod_id:3,
          lecture_room_id:roomId,
        }
        //fetch post to lecture_schedules
        fetch('http://localhost:3000/api/v1/lecture_schedules',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(reservation)
        })
      
    }

    componentDidMount(){
      fetch('http://localhost:3000/api/v1/lecture_rooms')
        .then(res=>res.json())
        .then(schedules=>this.setState({schedules}))

      fetch('http://localhost:3000/api/v1/lecture_schedules')
        .then(res=>res.json())
        .then(schedules=>this.setState({scheduleId:schedules.length+1}))
    }


  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span>
              Book <b>Lecture Room</b>
            </span><br/>
            <span className="icon swing">date_range</span>
          </div>
        </header>
        
          <SchedulePageContainer 
              currentMonth={this.state.currentMonth}
              selectedDate={this.state.selectedDate}
              nextMonth={this.nextMonth}
              prevMonth={this.prevMonth}
              onDateClick={this.onDateClick}
              schedules={this.state.schedules}
              onBookItHandler={this.onSubmitFormHandler}
              onChangeBookForm={this.onChangeBookForm}
              event={this.state.bookForm.event}
          />
          
        
      </div>
    );
  }
}

export default Home;