import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/HomePage.css';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

const HomePage = () => {
    const [countries, setCountries] = useState([]);
    const [departureCountries, setDepartureCountries] = useState([]);
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [transportTypes, setTransportTypes] = useState([]);
    const [selectedDepartureCountry, setSelectedDepartureCountry] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countriesResponse = await axios.get("http://localhost:3000/country");
                const locationsResponse = await axios.get('http://localhost:3000/locations');
                const transportTypesResponse = await axios.get('http://localhost:3000/accesses');

                setCountries(countriesResponse.data.data);
                setDepartureCountries(countriesResponse.data.data);
                setLocations(locationsResponse.data.data);
                setFilteredLocations(locationsResponse.data.data);
                setTransportTypes(transportTypesResponse.data.data);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDepartureCountryChange = (event) => {
        setSelectedDepartureCountry(event.target.value);
    };

    const handleCountryChange = (event) => {
        const selectedCountryId = event.target.value;
        setSelectedCountry(selectedCountryId);

        const filteredLocations = locations.filter(location => location.countryId.toString() === selectedCountryId);
        setFilteredLocations(filteredLocations);

        setSelectedLocation("");
    };

    const handleLocationChange = (event) => {
        const selectedLocationId = event.target.value;
        setSelectedLocation(selectedLocationId);

        const selectedLoc = locations.find(location => location.id.toString() === selectedLocationId);
        if (selectedLoc) {
            setSelectedCountry(selectedLoc.countryId.toString());
        }
    };

    const handleButtonClick = () => {
        if (selectedDepartureCountry && selectedCountry && selectedLocation) {
            const transportInfo = transportTypes.find(
                t => t.idLocation.toString() === selectedLocation
            );

            if (transportInfo) {
                setMessage(`Types de transport disponibles : ${transportInfo.type}`);
            } else {
                setMessage('Aucune information de transport trouvée pour cette combinaison.');
            }
        } else {
            setMessage('Veuillez sélectionner un pays de départ, un pays de destination et une location.');
        }
    };

    return (
        <>
            <main className="home-main-container">

                <header>
                    <h1 className="home-title">
                        Quelle sera votre prochaine destination ?
                    </h1>
                </header>

                <section className="home-section-container">

                    <div className="home-departure-dropdown-container">
                        <Dropdown
                            label="Choisissez votre pays de départ"
                            id="departureCountrySelection"
                            options={departureCountries.map(country => ({
                                value: country.id.toString(),
                                label: country.name
                            }))}
                            onChange={handleDepartureCountryChange}
                            value={selectedDepartureCountry}
                        />
                    </div>

                    <div className="home-dropdown-container">
                        <Dropdown
                            label="Choisissez votre pays de destination"
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
                            options={filteredLocations.map(location => ({
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
                            onClick={handleButtonClick}
                        />
                    </div>

                    <div>
                        {message && <div className="message">{message}</div>}
                    </div>
                </section>
            </main>
        </>
    )
};

export default HomePage;