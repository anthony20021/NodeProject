import React, { useState } from 'react';

import Button from '../components/Button';
import Input from '../components/Input';

import '../css/LoginPage.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //TODO
        //ajouter la logique pour envoyer les données du formulaire
    };

    const { lastName, firstName, email, password, confirmPassword } = formData;

    return (
        <>
            <main className="login-main-container">
                <header>
                    <h1 className="login-title">
                        Bienvenue voyageur !
                    </h1>
                </header>

                <section className="login-section-container">
                    <h2 className="form-title">S'inscrire / Se connecter</h2>

                    <Button
                        label="Se connecter"
                    />
                    <Button
                        label="S'inscrire"
                    />
                </section>

                <section className="signup-form-container">
                    <h2 className="form-title">S'inscrire</h2>

                    <form onSubmit={handleSubmit} className="signup-form">
                        <Input
                            label="Nom"
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleLastNameChange}
                            placeholder="Entrez votre nom"
                        />
                        <Input
                            label="Prénom"
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            placeholder="Entrez votre prénom"
                        />
                        <Input
                            label="E-mail"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Entrez votre e-mail"
                        />
                        <Input
                            label="Mot de passe"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Entrez votre mot de passe"
                        />
                        <Input
                            label="Confirmer le mot de passe"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
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

                <section className="login-form-container">
                    <h2 className="form-title">Se connecter</h2>

                    <form className="login-form">
                        <Input
                            label="E-mail"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Entrez votre e-mail"
                        />
                        <Input
                            label="Mot de passe"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
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
            </main>
        </>
    )
};

export default LoginPage;