import React, { useState } from 'react';
import '../css/HomePage.css';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

const HomePage = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const countries = [

    ];

    const locations = [

    ];

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
                            options={countries}
                            onChange={handleCountryChange}
                            value={selectedCountry}
                        />

                        <Dropdown
                            label="Choisissez votre visite"
                            id="locationSelection"
                            options={locations}
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