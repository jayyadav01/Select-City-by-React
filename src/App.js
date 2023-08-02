import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Code } from '@mui/icons-material';

function App() {
    const [country,setcountry] = useState([]);
    const [state,setstate] = useState([]); 
    const [city,setcity] = useState([]);
    
    // TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==

    // -----------------------------------------------
    // Country  
    // -----------------------------------------------

    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");
    
    var requestOptions = {
        method: 'GET',
        headers: headers,
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
    
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    
    function handleState(e)
    {
        let states = e.target.value;
        fetch(`https://api.countrystatecity.in/v1/countries/${states}/states`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setstate(result);
        })
        .catch(error => console.log('error', error));
    }
    
    
    // -----------------------------------------------
    // City
    // -----------------------------------------------
    
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");
    
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    
    function handleCity(e)
    {
        var cities = e.target.value;
        fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${cities}/cities`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setcity(result);
        })
        .catch(error => console.log('error', error));
    }    
    
    return (
        <>
        <select onChange={handleState}>
            <option selected disabled>Select Country</option>
                {
                    country.map((country,index) => {
                        return (
                                <option key={index} value={country.iso2}>{country.name}</option>
                        )
                    })
                }
        </select>

        <select onChange={handleCity}>
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
