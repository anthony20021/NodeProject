import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/HomePage.css';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

const HomePage = () => {
    const [countries, setCountries] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countriesResponse = await axios.get("http://localhost:3000/country");
                const locationsResponse = await axios.get('http://localhost:3000/locations');
                setCountries(countriesResponse.data);
                setLocations(locationsResponse.data);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <main className="home-main-container">
                <header>
                    <h1 className="home-title">
                        Quelle sera votre prochaine destination ?
                    </h1>
                </header>

                <section className="home-section-container">

                    <div className="home-dropdown-container">
                        <Dropdown
                            label="Choisissez votre pays"
                            id="countrySelection"
                            options={countries.map(country => ({
                                value: country.id.toString(),
                                label: country.name
                            }))}
                            onChange={handleCountryChange}
                            value={selectedCountry}
                        />

                        <Dropdown
                            label="Choisissez votre visite"
                            id="locationSelection"
                            options={locations.map(location => ({
                                value: location.id.toString(),
                                label: location.name
                            }))}
                            onChange={handleLocationChange}
                            value={selectedLocation}
                        />
                    </div>

                    <div className="home-bouton-container">
                        <Button
                            label="Valider"
                            onClick={() => console.log('Je valide ma sélection')}
                        />
                    </div>

                </section>
            </main>
        </>
    )
};

export default HomePage;