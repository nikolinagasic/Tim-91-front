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


        const url = 'http://localhost:8081/clinic/searchClinic/'+datum+"/"+tip+"/"+ocena;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": props.token
            },
        };

        fetch(url, options)
        .then(response => {
            console.log(response);
            if(response.ok === true){
                console.log("dobro si vratio sa back-a");
            }
            else {
                if(response.status === 401){
                    alert("Немате права за приступ датој опцији. (401 Unauthorized)");
                }else{
                    alert("Дошло је до грешке приликом излиставања клиника.");
                }
            }
        });
    }
    
    let klinike = (
        <SearchComponent
            search={searchClinic} />
    );

    return(
        <div>
            {klinike}
        </div>
    );
}

export default Radium(ClinicSearch);