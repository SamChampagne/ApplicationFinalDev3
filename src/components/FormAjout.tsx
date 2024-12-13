import React, { useState } from 'react';
import { IIngredient, IEtape } from '../model/recette';
import { ajouterRecettes } from '../services/apiService';
import { useNavigate } from "react-router-dom";

const FormulaireAjout = () => {
    const [titre, setTitre] = useState('');
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [etapes, setEtapes] = useState<IEtape[]>([]);
    const [tempsPreparation, setTempsPreparation] = useState(0);
    const [tempsCuisson, setTempsCuisson] = useState(0);
    const [portions, setPortions] = useState(1);
    const [auteur, setAuteur] = useState('');
    const [dateCreation, setDateCreation] = useState('');
    const navigate = useNavigate();
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { nom: '', quantite: '', _id: `${Date.now()}` }]);
    };

    const handleIngredientChange = (index: number, field: keyof IIngredient, value: string) => {
        const newIngredients = ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        setIngredients(newIngredients);
    };

    const handleAddEtape = () => {
        setEtapes([...etapes, { description: '', ordre: etapes.length + 1, _id: `${Date.now()}` }]);
    };

    const handleEtapeChange = (index: number, value: string) => {
        const newEtapes = etapes.map((etape, i) =>
            i === index ? { ...etape, description: value } : etape
        );
        setEtapes(newEtapes);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRecette = {
            titre,
            ingredients: ingredients.map(({ nom, quantite }) => ({ nom, quantite })),
            etapes: etapes.map(({ description, ordre }) => ({ description, ordre })),
            tempsPreparation,
            tempsCuisson,
            portions,
            auteur,
            dateCreation,
        };
        console.log('Nouvelle recette ajoutée:', newRecette);
        ajouterRecettes(newRecette)
            .then(data => console.log('Recette ajoutée:', data))
            .catch(error => console.error('Erreur:', error));

        // Réinitialisation des champs
        setTitre('');
        setIngredients([]);
        setEtapes([]);
        setTempsPreparation(0);
        setTempsCuisson(0);
        setPortions(1);
        setAuteur('');
        setDateCreation('');

        navigate("/")
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Ajouter une Nouvelle Recette</h3>

            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="titre">Titre</label>
                <input
                    type="text"
                    id="titre"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    className="border rounded w-full py-2 px-3 bg-white text-black"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Ingrédients</label>
                {ingredients.map((ingredient, index) => (
                    <div key={ingredient._id} className="flex mb-2">
                        <input
                            type="text"
                            placeholder="Nom de l'ingrédient"
                            value={ingredient.nom}
                            onChange={(e) => handleIngredientChange(index, 'nom', e.target.value)}
                            className="border rounded w-1/2 py-2 px-3 mr-2 bg-white text-black"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Quantité"
                            value={ingredient.quantite}
                            onChange={(e) => handleIngredientChange(index, 'quantite', e.target.value)}
                            className="border rounded w-1/2 py-2 px-3 bg-white text-black"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddIngredient} className="bg-blue-500 text-white py-1 px-2 rounded">
                    Ajouter Ingrédient
                </button>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Étapes</label>
                {etapes.map((etape, index) => (
                    <div key={etape._id} className="mb-2">
                        <textarea
                            placeholder={`Étape ${index + 1}`}
                            value={etape.description}
                            onChange={(e) => handleEtapeChange(index, e.target.value)}
                            className="border rounded w-full py-2 px-3 bg-white text-black"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddEtape} className="bg-blue-500 text-white py-1 px-2 rounded">
                    Ajouter Étape
                </button>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="tempsPreparation">Temps de Préparation (min)</label>
                <input
                    type="number"
                    id="tempsPreparation"
                    value={tempsPreparation}
                    onChange={(e) => setTempsPreparation(Number(e.target.value))}
                    className="border rounded w-full py-2 px-3 bg-white text-black"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="tempsCuisson">Temps de Cuisson (min)</label>
                <input
                    type="number"
                    id="tempsCuisson"
                    value={tempsCuisson}
                    onChange={(e) => setTempsCuisson(Number(e.target.value))}
                    className="border rounded w-full py-2 px-3 bg-white text-black"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="portions">Portions</label>
                <input
                    type="number"
                    id="portions"
                    value={portions}
                    onChange={(e) => setPortions(Number(e.target.value))}
                    className="border rounded w-full py-2 px-3 bg-white text-black"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="auteur">Auteur</label>
                <input
                    type="text"
                    id="auteur"
                    value={auteur}
                    onChange={(e) => setAuteur(e.target.value)}
                    className="border rounded w-full py-2 px-3 bg-white text-black"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="dateCreation">Date de Création</label>
                <input
                    type="date"
                    id="dateCreation"
                    value={dateCreation}
                    onChange={(e) => setDateCreation(e.target.value)}
                    className="border rounded w-full py-2 px-3 bg-white text-black"
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Ajouter Recette</button>
        </form>
    );
};

export default FormulaireAjout;
