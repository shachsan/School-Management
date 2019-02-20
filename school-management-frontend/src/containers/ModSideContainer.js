import React from 'react';
import ModSchedule from '../components/ModSchedule';
import Student from '../components/Student';

const ModSideContainer = (props) => {
    return ( 
        <div className="mod-side-container">
            {/* {props.studentClicked  */}
               {/* ? <Student/> */}
                <ModSchedule modSelected={props.modSelected}
                lecSchedules={props.lecSchedules}/>
            

        </div>
    );
}
 
export default ModSideContainer;
