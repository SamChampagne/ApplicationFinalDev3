import React, { useState } from 'react';
import { ajouterUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { trouverParEmail } from '../services/apiService'; // Assurez-vous que la fonction existe

const Inscription = () => {

    // Initiation des variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Pour afficher les erreurs
    const navigate = useNavigate();

    // Gestion de l'inscription
    const handleInscription = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation des champs
        if (!name || !email) {
            setErrorMessage('Le nom et l\'email sont obligatoires.');
            return;
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Veuillez entrer un email valide.');
            return;
        }

        // Vérification si l'email existe déjà
        const utilisateurExiste = await trouverParEmail(email);
        if (utilisateurExiste) {
            setErrorMessage('Cet email est déjà utilisé.');
            return;
        }

        setErrorMessage(''); 

        // Si tout est valide, on continue l'inscription
        const newUtilisateur = {
            nom: name,
            email: email
        };
        console.log(newUtilisateur);
        await ajouterUser(newUtilisateur);

        // Redirection après l'inscription réussie
        navigate('/login');
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-black mb-8">Cookbook Pro</h1>

            <form onSubmit={handleInscription} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-black mb-6">S'inscrire</h2>

                {/* Affichage du message d'erreur */}
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

                {/* Bouton de soumission */}
                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        S'inscrire
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Inscription;
