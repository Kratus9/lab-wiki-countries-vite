import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries`)
      .then((response) => {
        // console.log(response);
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (countries === null) {
    return <h3>... Loading</h3>;
  }

  return (
    <div>
      <h3>"WikiCountries: Your Guide to the World"</h3>

      {countries.map((eachCountry) => (
        <li key={eachCountry.alpha3Code}>
          <Link to={`/${eachCountry.alpha3Code}`}>
            <img
              src={`https://flagpedia.net/data/flags/icon/72x54/${eachCountry.alpha2Code.toLowerCase()}.png`}
              alt={eachCountry.name.common}
            />
            {eachCountry.name.common}
          </Link>
        </li>
      ))}
    </div>
  );
}

export default HomePage;
