import React,{ Component } from 'react'
import {Inject,ScheduleComponent,Day,Week,WorkWeek,Month,Agenda,
        EventSettingsModel} from '@syncfusion/ej2-react-schedule';

class Schedule extends React.Component{
    
    state={
        localData : ""
    }

    render() {
        
       /* localData:EventSettingsModel={
            dataSource: [{
                EndTime: new Date(2019,0,1,6,30),
                StartTime: new Date(2019,0,1,4,0)
            }]
         };
        */
        
        return (
          <ScheduleComponent currentView="Month" selectedDate={new Date(2019,0,11)}
          >
            <Inject services={[Day,Week,WorkWeek,Month,Agenda]} />
          </ScheduleComponent>    
    
        );
      }


}

export default Schedule;