import React from 'react'
import {Inject,ScheduleComponent,Day,Week,WorkWeek,Month,Agenda,
        EventSettingsModel} from '@syncfusion/ej2-react-schedule';
import {DateTimePickerComponent, DatePickerComponent} from '@syncfusion/ej2-react-calendars';
//potrebno instalirati : npm install @syncfusion/ej2-react-calendars
import {L10n} from '@syncfusion/ej2-base';

 // @ts-check

 L10n.load({
    'en-US': {
       'schedule' : {
          'saveButton' : '',
          'cancelButton' : '',
          'deleteButton' : ''
       }
    }
 })

class NurseSchedule extends React.Component{

     constructor(props) {
         super(props);
     }
    
    

   editorWindowTemplate (props:any) : JSX.Element{
        return(
        <table className="custom-event-editor" style={{width: '100%'}}>
          <tbody>
             <tr>
               <td className="e-textlabel">Summary</td>
               <td><input id="Summary" name="Subject" className="e-field e-input" type="text" 
                    style={{width: '100%'}}/></td>
             </tr>
             <tr>
               <td className="e-textlabel">From</td>
               <td>
                 <DatePickerComponent id="StartTime" data-name="StartTime" className="e-field"
                 value={new Date(props.StartTime || props.startTime)}
                 format='dd/MM/yy hh:mm a' >                
                 </DatePickerComponent>
               </td>
             </tr>
             <tr>
               <td className="e-textlabel">To</td>
               <td>
                 <DatePickerComponent id="EndTime" data-name="EndTime" className="e-field"
                 value={new Date(props.EndTime || props.endTime)}
                 format='dd/MM/yy hh:mm a'>
                 </DatePickerComponent>
               </td>
             </tr>
          </tbody>
        </table>
        );
   }

    render() {

        var localData = [];
        var forChangeList = this.props.listKalendar;
        for (var i = 0; i < forChangeList.length; i++){
          var s1 = forChangeList[i].startTime;
          var s2 = s1.split(",");
          var s3 = forChangeList[i].endTime;
          var s4 = s3.split(",");
          console.log(s4[0],s4[1]-1,s4[2],s4[3],s4[4]);
          var temp={
            Id : forChangeList[i].id,
            Subject : forChangeList[i].subject,
            StartTime : new Date(s2[0],s2[2]-1,s2[1],s2[3],s2[4]),
            EndTime : new Date(s4[0],s4[2]-1,s4[1],s4[3],s4[4]),
          }
          localData.push(temp);
        }   
        console.log("ovdee sam");
        console.log(localData);

      
        return (
          <ScheduleComponent currentView="Month" selectedDate={new Date(2020,2,8)}
          eventSettings={{dataSource: localData}}
          editorTemplate={this.editorWindowTemplate.bind(this)}
          >
           <Inject services={[Day,Week,WorkWeek,Month,Agenda]} />
          </ScheduleComponent>    
    
        );
      }

}

export default NurseSchedule;