import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const data = [
    { id: 1, name: "Thailand", region: "Asia" },
    { id: 2, name: "Japan", region: "Asia" },
  ];

  const [word, setWord] = useState("");
  const [dataFilter, setDataFilter] = useState([
    "name",
    "capital",
    "population",
  ]);
  const [countries, setContries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((res) => res.json())
      .then((data) => {
        setContries(data);
      });
  }, []);

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const searchCountries = (countries) => {
    return countries.filter((item) => {
      return dataFilter.some((filter) => {
        if (item[filter]) {
          return (
            item[filter].toString().toLowerCase().indexOf(word.toLowerCase()) >
            -1
          );
        }
      });
    });
  };

  return (
    <div className="container">
      <div className="search-container">
        <label htmlFor="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Find countries information"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </label>
      </div>
      <ul className="row">
        {searchCountries(countries).map((item, index) => {
          return (
            <li key={index}>
              <div className="card">
                <div className="card-title">
                  <img src={item.flag} alt={item.name} />
                </div>
                <div className="card-body">
                  <div className="card-description">
                    <h2>{item.name}</h2>
                    <ol className="card-list">
                      <li>
                        Population :{" "}
                        <span>{formatNumber(item.population)}</span>
                      </li>
                      <li>
                        Region : <span>{item.region}</span>
                      </li>
                      <li>
                        Capital city : <span>{item.capital}</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
