import React, { useState } from 'react';
import { ajouterUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
const Inscription = () => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const navigate = useNavigate();

const handleInscription = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const newUtilisateur = {
        nom: name,
        email: email
    }
    console.log(newUtilisateur)
    ajouterUser(newUtilisateur)
    
    navigate('/login')
}

return (
<div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
    <h1 className="text-4xl font-bold text-black mb-8">Cookbook Pro</h1>
    
    <form onSubmit={handleInscription} className="bg-white p-8 rounded-lg shadow-lg w-96">
    <h2 className="text-2xl font-bold text-black mb-6">S'inscrire</h2>     
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
        Se connecter
        </button>
    </div>
    </form>
</div>
);
};

export default Inscription;