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

class Schedule extends React.Component{
    
    //type je podrzan samo u typescriptu a mi koristimo javascript
    //na stacku sam nasla resenje sa ovom check anotacijom
    //kod se kompajlira, ali i dalje visual prikazuje gresku...resenje???
    
    //u localData se nalaze podaci koji ce biti prikazani na kalendaru
    //povlacati ovo sa beka!!!!!!!!!
   localData=[{
       Id:1,
       Subject: 'Pregled',
       StartTime: new Date(2019,4,7,6,15),
       EndTime: new Date(2019,4,7,7,0),
       PatientMail: 'lela.jelena321@gmail.com',
       Description: 'Ime pacijenta: Pera, LBO:11234567999'
   },{
       Id:2,
       Subject: 'Operacija',
       StartTime: new Date(2019,4,17,6,0),
       EndTime: new Date(2019,4,17,7,0)
   }];

   //funkciju koja ce na klik dugmeta da omoguci zapocinjanje pregleda
   //ovde jos treba prosledjivati info o lekaru i terminu(u statu)
   clickStart = () => {
      console.log("ZAPOCET PREGLED");
      let patient_mail = document.getElementById("PatientMail").value;
      console.log(patient_mail);
      this.props.history.push({
        pathname: '/medicalPage',
        state: { detail: patient_mail }
      })

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
             <tr>
               <td className="e-textlanel">Email</td>
               <td><input id="PatientMail" name="PatientMail" className="e-field e-input" type="text" 
                    style={{width: '100%'}}/></td>
             </tr>
             <tr>
               <td className="e-textlabel">Others</td>
               <td>
                 <textarea id="Description" name="Description" className="e-field e-input" 
                  rows={3} cols={50}
                  style={{width: '100%', height: '60px', resize:'vertical'}}>
                 </textarea>
               </td>
             </tr>
             <tr>
               <button id= "buttonScheduleJ" onClick= {this.clickStart}
                style={{width: '150%',rowsSpan: '2',borderRadius: '8px',fontSize: '17px'}} >
                 Zapocni 
               </button>
             </tr>
          </tbody>
        </table>
        );
   }

    render() {
        
        return (
          <ScheduleComponent currentView="Month" selectedDate={new Date(2019,4,8)}
          eventSettings={{dataSource: this.localData}}
          editorTemplate={this.editorWindowTemplate.bind(this)}
          >
           <Inject services={[Day,Week,WorkWeek,Month,Agenda]} />
          </ScheduleComponent>    
    
        );
      }

}

export default Schedule;