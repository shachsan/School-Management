import React from "react";
import SchedulePageContainer from '../containers/SchedulePageContainer';
import dateFns from "date-fns";

import "../App.css";

class Home extends React.Component {
      state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        selectedMod:'',
        allMods:[],
        sort:'',
        schedules:[],
        newScheduleId:'',
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

    convertToTime=(min) => {
        if(!min.includes(':')){
            let hours, minutes;
            hours = Math.floor(min / 60);
            minutes = min % 60;
            if (minutes < 10){
                minutes = '0' + minutes; // adding leading zero
            }
           
            if (hours < 10)
                hours='0'+ hours

            return hours+':'+minutes
        }else{
            return min
        }
    }

    getModName=(modId) => {
        const mod=this.state.allMods.filter(mod=>mod.id===modId)
        return mod[0].name;
    }

    
    onChangeSortHandler=async(e) => {
        await this.setState({
            sort:e.target.value
        })

        this.sortSchedules(this.state.sort);
    }

    //sort function
    sortSchedules=(type) => {
        if (type==='time'){
            const newSchedule = [...this.state.schedules]
            newSchedule.forEach(lectureRoom=>{
                  lectureRoom.lecture_schedules.sort((s1, s2)=>{
                            if (s1.start_time > s2.start_time)
                                return 1
                            else if (s1.start_time < s2.start_time)
                                return -1
                    })
            })

            this.setState({
                schedules:newSchedule
            })
        }else if(type==='mod'){
            const newSchedule = [...this.state.schedules]
            newSchedule.forEach(lectureRoom=>{
                  lectureRoom.lecture_schedules.sort((s1, s2)=>{
                        s1.modName=this.getModName(s1.mod_id)
                        s2.modName=this.getModName(s2.mod_id)
                        console.log(s1.modName);
                            if (s1.modName > s2.modName)
                                return 1
                            else if (s1.modName < s2.modName)
                                return -1
                    })
            })

            this.setState({
                schedules:newSchedule
            })
        }

    }

    //Handle when mod selected during lecture room suggestion
    onChangeModSelectionHandler=(e) => {
         this.setState({
            selectedMod:e.target.value,
        })
    }

    onChangeBookForm=(e) => {
      const newBookForm={...this.state.bookForm}

      newBookForm[e.target.name]=e.target.value
      newBookForm.start_time=this.convertToTime(newBookForm.start_time)
      newBookForm.end_time=this.convertToTime(newBookForm.end_time)
      this.setState({
        bookForm:newBookForm
      })
    }

    //Edit schedule
    onEditHandler=(e,schedule) => {
        e.preventDefault();
        console.log('schedule to be edited:', schedule);
        console.log('new schedule', this.state.bookForm);
        let updateSch;
        const id=schedule.id;

        const newBookForm={...this.state.bookForm}
        newBookForm.start_time=dateFns.format(this.state.selectedDate, 'YYYY-MM-DD')+'T'+newBookForm.start_time+'Z'
        newBookForm.end_time=dateFns.format(this.state.selectedDate, 'YYYY-MM-DD')+'T'+newBookForm.end_time+'Z'
        
        
        let newSchedule=[...this.state.schedules]
        newSchedule.forEach(lectureRoom=>{
          if(lectureRoom.id===schedule.lecture_room_id){
            lectureRoom.lecture_schedules.forEach(sch=>{
                if(sch.id===schedule.id){
                    sch.start_time=newBookForm.start_time
                    sch.end_time=newBookForm.end_time
                    sch.event=newBookForm.event
                    // sch.event=newBookForm.
                    updateSch={
                        start_time:newBookForm.start_time,
                        end_time:newBookForm.end_time,
                        event:newBookForm.event,
                        // mod_id:this.state.selectedMod
                    }
                    console.log('change event',sch.event);
                }
            })
          }

        })

        fetch(`http://localhost:3000/api/v1/lecture_schedules/${id}`,{
            method: 'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(updateSch)
        })
    }

    //Delete schedule Handler
    onDeleteHandler=(schedule) => {
        const id=schedule.id
        let newSchedule=[...this.state.schedules];
            newSchedule.forEach(room=>{
                if(room.id===schedule.lecture_room_id){
                    room.lecture_schedules.forEach(sch=>{
                        if(sch.id===schedule.id){
                            let i=room.lecture_schedules.indexOf(sch);
                            room.lecture_schedules.splice(i,1)
                        }
                    })
                }
            })

        this.setState({
            schedules:newSchedule
        })

        fetch(`http://localhost:3000/api/v1/lecture_schedules/${id}`,{
          method:'DELETE'
        })
    }
    
    onSubmitFormHandler=(e, room) => {
      e.preventDefault();
      
        const newBookForm={...this.state.bookForm}
        let roomId;
        newBookForm.start_time=dateFns.format(this.state.selectedDate, 'YYYY-MM-DD')+'T'+newBookForm.start_time+'Z'
        newBookForm.end_time=dateFns.format(this.state.selectedDate, 'YYYY-MM-DD')+'T'+newBookForm.end_time+'Z'
        
        const newBooking= {...newBookForm, date:this.state.selectedDate, id:this.state.newScheduleId, mod_id:this.state.selectedMod}
        console.log(newBooking);
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

        //setting new schedule for fetch post
        const reservation={
          event:this.state.bookForm.event,
          date:this.state.selectedDate,
          start_time:this.state.bookForm.start_time,
          end_time:this.state.bookForm.end_time,
          mod_id:this.state.selectedMod,
          lecture_room_id:roomId,
        }
        //fetch post to lecture_schedules
        fetch('http://localhost:3000/api/v1/lecture_schedules',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(reservation)
        }).then(res=>res.json())
            .then(justAddedSch=>this.setState({newScheduleId:justAddedSch.id}))
      
    }

    componentDidMount(){
      fetch('http://localhost:3000/api/v1/lecture_rooms')
        .then(res=>res.json())
        .then(schedules=>this.setState({schedules}))

      fetch('http://localhost:3000/api/v1/mods')
        .then(res=>res.json())
        .then(mods=>this.setState({allMods:mods}))
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
              onDeleteHandler={this.onDeleteHandler}
              onEditHandler={this.onEditHandler}
              selectedMod={this.state.selectedMod}
              onChangeModSelectionHandler={this.onChangeModSelectionHandler}
              allMods={this.state.allMods}
              onChangeSortHandler={this.onChangeSortHandler}
          />
          
        
      </div>
    );
  }
}

export default Home;