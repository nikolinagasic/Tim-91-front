import React, { Component } from 'react';
import "./PageDoctor.css" 

class PageDoctor extends Component {
  myClickHandler = (event) => {
    event.preventDefault();
    
    let doctor = this.props.location.state.detail;
    let nam = event.target.id;
    
    if(nam === "profil"){
        this.props.history.push({
        pathname: '/profiledoctor',
        state: { detail: doctor }
        })
    }
    else if(nam === "zapocni_pregled"){
        console.log('click zapocni pregled');
    }
    else if(nam === "zakazivanje"){
        console.log('click zakazivanje'); 
    }
    else if(nam === "pacijenti"){
        console.log('click pacijenti');
    }
    else if(nam === "radni_kalendar"){
        console.log('click radni kalendar');
    }
    else if(nam === "godisnji_odmor"){
        console.log('click godisnji odmor');
    }
    else{
        console.log('greska');
    }
  }

  render() {
      return (
        <div>
            <ul id="unordered_list">
              <li><p id="profil"
              onClick={this.myClickHandler}> Профил </p></li>
              <li><p id="zapocni_pregled" 
              onClick={this.myClickHandler}> Започни преглед </p></li>
              <li><p id="zakazivanje" 
              onClick={this.myClickHandler}> Заказивање прегледа </p></li>
              <li><p id="pacijenti"
              onClick={this.myClickHandler}> Lista pacijenata </p></li>
              <li><p id="radni_kalendar"
              onClick={this.myClickHandler}> Радни календар </p></li>
              <li><p id="godisnji_odmor"
              onClick={this.myClickHandler}> Годишњи одмор </p></li>
            </ul>
        </div>
      );
    }
}

export default PageDoctor;