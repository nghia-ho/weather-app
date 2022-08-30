import React, { useEffect, useState } from "react";
import "./App.css";
const api = {
  key: "010a0cf41502c1816760a777c1d28847",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [renderPage, setRenderPage] = useState(false);

  useEffect(() => {
    const fetWeatherData = async () => {
      if (searchCity === "") return;
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(data);
          setErrorMessage("");
          setRenderPage(true);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetWeatherData();
  }, [searchCity]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <div>
      {!renderPage ? (
        <div className="contain">
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              placeholder="City"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
            />
            <button className="button">Search</button>
          </form>
        </div>
      ) : (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              placeholder="City"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
            />
            <button className="button">🔎 </button>
          </form>
          {loading ? (
            <div>loading.....</div>
          ) : (
            <>
              {errorMessage ? (
                <div style={{ color: "red", paddingBottom: 200 }}>
                  {errorMessage}
                </div>
              ) : (
                <div className="main">
                  {" "}
                  <div className="info ">
                    {weatherInfo.name} 🌈 {weatherInfo.sys.country}
                  </div>
                  <div className="info ">{weatherInfo.main.temp} ℃</div>
                  <div className="info ">
                    {weatherInfo.weather[0].description}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
