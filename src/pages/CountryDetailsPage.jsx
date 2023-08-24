import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function CountryDetails() {
    const { countryId } = useParams()

    const { countryDetails, setCountryDetails } = useState(null)

    useEffect(() => {
        axios.get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
        .then((response) => {
            console.log(response)
            setCountryDetails(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [countryId])

    if (countryDetails === null) {
        return <h3>... Loading</h3>
    }

    return(
        <div>
            <h1>Country Details</h1>
            <h2>{countryDetails.name.common}</h2>
            <p>Capital: {countryDetails.capital[0]}</p>
            <p>Area: {countryDetails.area} km</p>
            <h4>Borders:</h4>
            {countryDetails.borders.map((borderCountry) => (
                <li key={borderCountry}>
                    <Link to={`/${borderCountry}`}>{borderCountry}</Link>
                </li>
            ))}
        </div>
    )
}

export default CountryDetails;
