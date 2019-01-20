import React from 'react';

const BookingForm = (props) => {
    return ( 
        <form onSubmit={(e)=>{props.onBookItHandler(e, props.lectureRoomName);props.toggleBooking();}}>
            <label>Start time</label>
            <select name='start_time' onChange={(e)=>props.onChangeBookForm(e)}>
                <option>start time</option>
                <option>9:00</option>
                <option>11:00</option>
            </select>

            <label>End time</label>
            <select name='end_time' onChange={(e)=>props.onChangeBookForm(e)}>
                <option>end time</option>
                <option>9:00</option>
                <option>11:00</option>
            </select>

            <label>Event Name</label>
            <input type='text' name='event' placeholder='enter event name' value={props.event}
                onChange={(e)=>props.onChangeBookForm(e)}></input>
            <input type='submit' value='Book It!'/>
            <button onClick={props.onCancelBookHandler}>Cancel</button>
        </form>
     );
}
 
export default BookingForm;