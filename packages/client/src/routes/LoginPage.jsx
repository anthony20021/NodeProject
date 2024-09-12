import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Button from '../components/Button';
import Input from '../components/Input';

import "../css/LoginPage.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/users/login", {
                email: email,
                password: password
            },
            {
                withCredentials: true
            });

            if(response.status === 200) {
                console.log("Connexion réussie", response.data);
                navigate("/home");
            }

        } catch (error) {
            if (error) {
                console.error(error.message);
            }
        }
    };

    const { lastName, firstName, email, password, confirmPassword } = formData;

    const [visibleSection, setVisibleSection] = useState('');

    const handleSignupClick = () => {
        setVisibleSection("signup");
    };

    const handleLoginClick = () => {
        setVisibleSection("login");
    };

    const handleSignupValidation = async (e) => {
        e.preventDefault();
    
        try {
            if (password !== confirmPassword) {
                throw new Error("Les mots de passe ne correspondent pas.");
            }

            else{
                const response = await axios.post("http://localhost:3000/users/register", {
                    name: lastName,
                    firstname: firstName,
                    email: email,
                    password: password,
                }); 
                console.log("Inscription réussie", response.data);
    
                setVisibleSection("login");
            }
    
        } catch (error) {
            if (error) {
                console.error(error);
            }
        }
    };

    const navigate = useNavigate();

    return (
        <>
            <main className="login-main-container">
                <header>
                    <h1 className="login-title">
                        Bienvenue voyageur !
                    </h1>
                </header>

                {/* Section visible au départ pour choisir entre Se connecter et S'inscrire. Cette section est masquée si une autre section est active */}
                {visibleSection === '' && (
                    <section className="login-section-container">
                        <h2 className="form-title">S'inscrire / Se connecter</h2>
                        <Button
                            label="Se connecter"
                            onClick={handleLoginClick}
                        />
                        <Button
                            label="S'inscrire"
                            onClick={handleSignupClick}
                        />
                    </section>
                )}

                {/* Formulaire d'inscription, visible uniquement quand on clique sur "S'inscrire" */}
                {visibleSection === 'signup' && (
                    <section className="signup-form-container">
                        <h2 className="form-title">S'inscrire</h2>
                        <form onSubmit={handleSignupValidation} className="signup-form">
                            <Input
                                label="Nom"
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={handleChange}
                                placeholder="Entrez votre nom"
                            />
                            <Input
                                label="Prénom"
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={handleChange}
                                placeholder="Entrez votre prénom"
                            />
                            <Input
                                label="E-mail"
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Entrez votre e-mail"
                            />
                            <Input
                                label="Mot de passe"
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                placeholder="Entrez votre mot de passe"
                            />
                            <Input
                                label="Confirmer le mot de passe"
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                                placeholder="Entrez à nouveau votre mot de passe"
                            />
                            <div className="signup-validation-button">
                                <Button
                                    label="S'inscrire"
                                    type="submit"
                                />
                            </div>
                        </form>
                    </section>
                )}

                {/* Formulaire de connexion, visible uniquement quand on clique sur "Se connecter" */}
                {visibleSection === 'login' && (
                    <section className="login-form-container">
                        <h2 className="form-title">Se connecter</h2>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <Input
                                label="E-mail"
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Entrez votre e-mail"
                            />
                            <Input
                                label="Mot de passe"
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                placeholder="Entrez votre mot de passe"
                            />
                            <div className="login-validation-button">
                                <Button
                                    label="Se connecter"
                                    type="submit"
                                />
                            </div>
                        </form>
                    </section>
                )}
            </main>
        </>
    );
};

export default LoginPage;