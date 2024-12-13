import React, { useState } from 'react';
import { Iutilisateur } from '../model/utilisateur';
import { trouverParEmail } from '../services/apiService';
import { useNavigate } from "react-router-dom";

const Login = () => {

    //Initiation des variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // État pour gérer l'erreur
    const navigate = useNavigate();
    // Gestion de la connexion
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Réinitialiser les messages d'erreur
        setErrorMessage('');

        // Validation des champs
        if (!name || !email) {
            setErrorMessage('Le nom et l\'email sont obligatoires.');
            return;
        }

        // Expression régulière pour valider l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Veuillez entrer un email valide.');
            return;
        }

        try {
            // Vérifier si l'utilisateur existe
            const userExists = await trouverParEmail(email);
        
            if (!userExists) {
            setErrorMessage('Aucun utilisateur trouvé avec cet email.');
            return;
        }

        const utilisateur: Iutilisateur = { nom: name, email: email };
    

        // Demander un jeton si l'utilisateur existe
        const response = await fetch('https://apifinaldev3.onrender.com/api/generatetoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(utilisateur),
        });

        if (!response.ok) {
            throw new Error('Problème lors de la génération du jeton.');
        }

        const data = await response.json();
    
        const token = data.token;
        localStorage.setItem('token', token);
    
        // sa recharge la page aussi
        navigate("/");
        } catch (error) {
            console.log(error)
            setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    };

return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-gray-100">
    <h1 className="text-4xl font-bold text-black mb-8">Cookbook Pro</h1>

    <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-black mb-6">Se connecter</h2>

        {/* Affichage du message d'erreur s'il y en a */}
        {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

        <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
        <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Entrez votre nom"
            required
        />
        </div>

        {/* Champ Email */}
        <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Entrez votre email"
            required
        />
        </div>

        <div className="mb-4">
            <a href='/inscription'>S'inscrire</a><br />
            <a href='/'>Accueil</a>
        </div>

        {/* Bouton de soumission */}
        <div className="mb-4">
            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
            Se connecter
        </button>
        </div>
    </form>
    </div>
);
};

export default Login;
