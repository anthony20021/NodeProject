import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/HomePage.css';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

const HomePage = () => {
    //Initialisation de nos useState
    const [countries, setCountries] = useState([]);
    const [departureCountries, setDepartureCountries] = useState([]);
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [transportTypes, setTransportTypes] = useState([]);
    const [selectedDepartureCountry, setSelectedDepartureCountry] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [message, setMessage] = useState("");

    //Chargement initial des données
    useEffect(() => {
        const fetchData = async () => {
            try {
                //On fait appel à l'API pour récupérer les data de nos json country, locatios et accesses
                const countriesResponse = await axios.get("http://localhost:3000/country");
                const locationsResponse = await axios.get('http://localhost:3000/locations');
                const transportTypesResponse = await axios.get('http://localhost:3000/accesses');

                //On met à jour les useEffect avec les data récupérées
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

    //Les 3 méthodes suivantes vont nous permettre de gérer les différents évènements des menus déroulant et réinitialisent le message en cas de modification
    const handleDepartureCountryChange = (event) => {
        setSelectedDepartureCountry(event.target.value);
        setMessage('');
    };

    const handleCountryChange = (event) => {
        const selectedCountryId = event.target.value;
        setSelectedCountry(selectedCountryId);

        //On filtre les locations proposées en fonctione du pays de destination choisi.
        const filteredLocations = locations.filter(location => location.countryId.toString() === selectedCountryId);
        setFilteredLocations(filteredLocations);

        setSelectedLocation("");
        setMessage('');
    };

    const handleLocationChange = (event) => {
        const selectedLocationId = event.target.value;
        setSelectedLocation(selectedLocationId);

        //Le pays de destination se sémectionne automatiquement quand on choisi une location.
        const selectedLoc = locations.find(location => location._id.toString() === selectedLocationId);
        if (selectedLoc) {
            setSelectedCountry(selectedLoc.countryId.toString());
        }
        setMessage('');
    };

    //Méthode appelée au moment du clic sur le bouton "Valider". On requête l'API pour obtenir les type de transports et on met à jour le message selon les résultats.
    const handleButtonClick = async () => {
        if (selectedDepartureCountry && selectedCountry && selectedLocation) {
            try {
                const response = await axios.get(`http://localhost:3000/accesses`, {
                    params: {
                        idCountry: selectedDepartureCountry,
                        idLocation: selectedLocation
                    }
                });
    
                if (response.data && response.data.data && response.data.data.length > 0) {
                    const matchingTransports = response.data.data.filter(
                        item => item.idCountry.toString() === selectedDepartureCountry &&
                                item.idLocation.toString() === selectedLocation
                    );
    
                    if (matchingTransports.length > 0) {
                        const transportTypes = matchingTransports.map(item => item.type).flat();
                        const uniqueTransportTypes = [...new Set(transportTypes)];
                        setMessage(`Types de transport disponibles : ${uniqueTransportTypes.join(', ')}`);
                    } else {
                        setMessage('Aucune information de transport trouvée pour cette combinaison.');
                    }
                } else {
                    setMessage('Aucune information de transport trouvée.');
                }
            } catch (error) {
                setMessage('Erreur lors de la récupération des informations de transport.');
                console.error('Error fetching transport info:', error);
            }
        } else {
            setMessage('Veuillez sélectionner un pays de départ, un pays de destination et une location.');
        }
    };

    const navigate = useNavigate();
    const handleDeconnection = async () => {
        try{
            const response = await axios.post("http://localhost:3000/users/logout", {
                withCredentials: true
            });

            if(response.status === 200) {
                console.log("Déconnexion réussie", response.data);
                navigate("/");
            }

        } catch (error) {
            console.error(error);
        }
    }

    //On affiche nos composants, l'user peut faire ses sélections, valider puis on lui affiche les informations retournées.
    return (
        <>
            <main className="home-main-container">

                <header>
                    <h1 className="home-title">
                        Quelle sera votre prochaine destination ?
                    </h1>

                    <div className="logout-bouton-container">
                        <Button
                            label="Se déconnecter"
                            onClick={handleDeconnection}
                        />
                    </div>
                </header>

                <section className="home-section-container">

                    <div className="home-departure-dropdown-container">
                        <Dropdown
                            label="Choisissez votre pays de départ"
                            id="departureCountrySelection"
                            options={departureCountries.map(country => ({
                                value: country._id.toString(),
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
                                value: country._id.toString(),
                                label: country.name
                            }))}
                            onChange={handleCountryChange}
                            value={selectedCountry}
                        />
                        <Dropdown
                            label="Choisissez votre visite"
                            id="locationSelection"
                            options={filteredLocations.map(location => ({
                                value: location._id.toString(),
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