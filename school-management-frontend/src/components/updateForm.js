import React, {Component} from 'react';


class UpdateForm extends Component{

    state={
        fromTime:360,
        toTime:360
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
        return ( 
            <form onSubmit={(e)=>{this.props.onEditHandler(e, this.props.schedule);this.props.toggleEditHandler();}}>
                <label>Start time</label>
                <select name='start_time' onChange={(e)=>{
                    this.props.onChangeBookForm(e);
                    this.setState({toTime:Number(e.target.value)+15});}}>
                    
                    <option>From</option>
                    {this.range(this.state.fromTime).map(minute=><option key={minute} value={minute}>
                        {this.populateSelectBox(minute)}
                    </option>)}
                </select>

                <label>End time</label>
                <select name='end_time' onChange={(e)=>this.props.onChangeBookForm(e)}>
                    <option>To</option>
                    {this.range(this.state.toTime).map(minute=><option key={minute} value={minute}>
                        {this.populateSelectBox(minute)}
                    </option>)}
                </select>

                <label>Event Name</label>
                <input type='text' name='event' placeholder='enter event name' value={this.props.event}
                    onChange={(e)=>this.props.onChangeBookForm(e)}></input>
                <input type='submit' value='Update'/>
                <button onClick={this.props.onCancelBookHandler}>Cancel</button>
            </form>
        );
    }
}
 
export default UpdateForm;