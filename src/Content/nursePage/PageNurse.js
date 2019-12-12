import React, { Component } from 'react';
import "./PageNurse.css" 

class PageNurse extends Component {
  myClickHandler = (event) => {
    event.preventDefault();
    
    let nurse = this.props.location.state.detail;
    let nam = event.target.id;
    
    if(nam === "profil"){
        this.props.history.push({
        pathname: '/profilenurse',
        state: { detail: nurse }
        })
    }
    else if(nam === "overavanje_recepata"){
        console.log('click overavanje recepata');
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
              <li><p id="overavanje_recepata" 
              onClick={this.myClickHandler}> Оверавање рецепата </p></li>
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

export default PageNurse;