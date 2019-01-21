import React, {Component} from 'react';
import dateFns from "date-fns";


class BookingForm extends Component{

    state={
        fromTime:360,
        toTime:360
    }

    ifBooked=(min) => {
        let timeBook=[];
        const bookedHours=this.props.roomSchedules.filter(sch=>{
            return dateFns.format(sch.date, 'YYYY-MM-DD')===dateFns.format(this.props.selectedDate, 'YYYY-MM-DD')

        })
        bookedHours.forEach(sch=>{
            let bookedStartTime = ((dateFns.getHours(sch.start_time)+5)*60)+(dateFns.getMinutes(sch.start_time));
            let bookedEndTime=((dateFns.getHours(sch.end_time)+5)*60)+(dateFns.getMinutes(sch.end_time));
            timeBook.push([bookedStartTime, bookedEndTime])
        })

        for(let hours of timeBook){
            if (min>=hours[0] && min <hours[1]){
                return 'disabled';
            }
       }

    }

    //check if same mod is scheduled  for same time in different rooms

    checkModSchedule=(modId) => {
        console.log(modId);
        const bookedHours=this.props.schedules.forEach(sch=>{
            if(sch.id!==this.props.roomSchedules[0].lecture_room_id){
                return sch.lecture_schedules.forEach(bookings=>{
                    if (dateFns.format(bookings.date, 'YYYY-MM-DD')===dateFns.format(this.props.selectedDate, 'YYYY-MM-DD')){
                        return bookings;
                    }
                })
            }
        })
        console.log('room id',this.props.roomSchedules[0].lecture_room_id);
        console.log('bookedHours',bookedHours);
    }

    populateSelectBox=(min) => {
        let hours, minutes, ampm;
            hours = Math.floor(min / 60);
            minutes = min % 60;
            if (minutes < 10){
                minutes = '0' + minutes; // adding leading zero
            }
            ampm = hours % 24 < 12 ? 'AM' : 'PM';
            hours = hours % 12;
            if (hours === 0){
                hours = 12;
            }
            
            return hours+':'+minutes+' '+ampm;
    }
    
    range=(mins) => {
        const array=[];
        // const startingMin=this.state.startTime+15
        for(let i = mins; i <= 1320; i += 15){
            array.push(i);
        }
        return array;
    }

    render(){
        console.log('toTime',this.state.fromTime);
        return ( 
            <form onSubmit={(e)=>{this.props.onBookItHandler(e, this.props.lectureRoomName);
                            this.props.toggleBooking();}}>
                <label>Start time</label>
                <select name='start_time' onChange={(e)=>{
                    this.props.onChangeBookForm(e);
                    this.setState({toTime:Number(e.target.value)+15});}}>
                    {/* onClick={this.blockBookedTime}> */}
                    
                    <option>From</option>
                    {this.range(this.state.fromTime).map(minute=><option key={minute} value={minute} disabled={this.ifBooked(minute)}>
                        {this.populateSelectBox(minute)}
                    </option>)}
                </select>

                <label>End time</label>
                <select name='end_time' onChange={(e)=>this.props.onChangeBookForm(e)}>
                    <option>To</option>
                    {this.range(this.state.toTime).map(minute=><option key={minute} value={minute} disabled={this.ifBooked(minute)}>
                        {this.populateSelectBox(minute)} 
                    </option>)}
                </select>

                <label>Event Name</label>
                <input type='text' name='event' placeholder='enter event name' value={this.props.event}
                    onChange={(e)=>this.props.onChangeBookForm(e)}></input>
                
                <label>Mod Group</label>
                <select onChange={(e)=>this.props.onChangeModSelectionHandler(e)}>
                    <option>Choose Mod</option>
                    {this.props.allMods.map(mod=>
                        <option key={mod.id} value={mod.id}>{mod.name} disabled={this.checkModSchedule(mod.id)}</option>)}
                </select>

                <input type='submit' value='Book It!'/>
                <button onClick={this.props.onCancelBookHandler}>Cancel</button>
            </form>
        );
    }
}
 
export default BookingForm;