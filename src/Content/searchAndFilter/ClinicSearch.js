import React from 'react'
import Radium from 'radium'
import SearchComponent from './SearchComponent'

const ClinicSearch = (props) => {
    let searchClinic = () => {
        // sakrij logo
        document.getElementById("logo_img").style.visibility = "hidden";

        let datum1 = document.getElementById("headerSearchClinicDate").value;
        let dat = new Date(datum1);
        let datum = dat.getTime();
        let tip = document.getElementById("headerSearchClinicTip").value;
        let ocena = document.getElementById("headerSearchClinicOcena").value;
        console.log(datum + " " + tip + " " + ocena);

        if(!datum){
            alert('Обавезан је унос датума прегледа.');
        }
        
    }
    
    let klinike = (
        <SearchComponent
            search={searchClinic} 
        >
        </SearchComponent>
    );

    return(
        <div>
            {klinike}
        </div>
    );
}

export default Radium(ClinicSearch);