import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Code } from '@mui/icons-material';

function App() {
    const [country,setcountry] = useState([]);
    const [state,setstate] = useState([]); 
    const [city,setcity] = useState([]);
    const [selectCountry,setselectCountry] = useState('');
    const [selectState,setselectState] = useState('');
    

    // -----------------------------------------------
    // Country  
    // -----------------------------------------------

    var countryHeaders = new Headers();
    countryHeaders.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");
    
    var requestOptions = {
        method: 'GET',
        headers: countryHeaders,
        redirect: 'follow'
    };
    
    useEffect(() => {
        fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setcountry(result);
        })
        .catch(error => console.log('error', error));
    } , [])
    
    // -----------------------------------------------
    // State  
    // -----------------------------------------------
    
    var stateHeaders = new Headers();
    stateHeaders.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");

    var requestOptions = {
        method: 'GET',
        headers: stateHeaders,
        redirect: 'follow'
    };
    
    useEffect(() => {
        if(selectCountry)
        {
            fetch(`https://api.countrystatecity.in/v1/countries/${selectCountry}/states`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setstate(result);
            })
            .catch(error => console.log('error', error));
        }
    } , [selectCountry])
        
    
    
    // -----------------------------------------------
    // City
    // -----------------------------------------------
    
    var cityHeaders = new Headers();
    cityHeaders.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");
    
    var requestOptions = {
        method: 'GET',
        headers: cityHeaders,
        redirect: 'follow'
    };
    
    useEffect(() => { 
            if(selectState)
            {
                fetch(`https://api.countrystatecity.in/v1/countries/${selectCountry}/states/${selectState}/cities`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    setcity(result);
                })
                .catch(error => console.log('error', error));
            }
    } , [selectState])
           
    
    return (
        <>
        <select onChange={(e) => setselectCountry(e.target.value)}>
            <option selected disabled>Select Country</option>
                {
                    country.map((country,index) => {
                        return (
                                <option key={index} value={country.iso2}>{country.name}</option>
                        )
                    })
                }
        </select>

        <select onChange={(e) => setselectState(e.target.value)}>
            <option selected disabled>Select State</option>
                {
                    state.map((state,index) => {
                        return <option key={index} value={state.iso2}>{state.name}</option>
                    })
                }
        </select>

        <select >
            <option selected disabled>Select city</option>
                {
                    city.map((city,index) => {
                        return <option key={index}>{city.name}</option>
                    })
                }
        </select>
    </>
  )
}

export default App
