import React, { useState, useEffect } from 'react';
import { IIngredient, IEtape} from '../model/recette';
import { modifierRecette, getRecetteById } from '../services/apiService';
import { useNavigate } from "react-router-dom";
const FormulaireModification = ({ recetteId }: { recetteId: string }) => {
    const [titre, setTitre] = useState<string>('');
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [etapes, setEtapes] = useState<IEtape[]>([]);
    const [tempsPreparation, setTempsPreparation] = useState<number>(0);
    const [tempsCuisson, setTempsCuisson] = useState<number>(0);
    const [portions, setPortions] = useState<number>(1);
    const [auteur, setAuteur] = useState<string>('Anonyme'); 
    const navigate = useNavigate();

    useEffect(() => {
        getRecetteById(recetteId)
            .then((recette) => {
                
                setTitre(recette.recetteTrouver?.titre || ''); 
                setIngredients(recette.recetteTrouver?.ingredients || []); 
                setEtapes(recette.recetteTrouver?.etapes || []); 
                setTempsPreparation(recette.recetteTrouver?.tempsPreparation || 0); 
                setTempsCuisson(recette.recetteTrouver?.tempsCuisson || 0); 
                setPortions(recette.recetteTrouver?.portions || 1); 
                setAuteur(recette.recetteTrouver?.auteur || 'Anonyme'); 
            })
            .catch((error) => console.error('Erreur lors du chargement de la recette:', error));
    }, [recetteId]);

    const handleIngredientChange = (index: number, field: keyof IIngredient, value: string) => {
        const newIngredients = ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        setIngredients(newIngredients);
    };

    const handleEtapeChange = (index: number, value: string) => {
        const newEtapes = etapes.map((etape, i) =>
            i === index ? { ...etape, description: value } : etape
        );
        setEtapes(newEtapes);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedRecette = {
            _id: recetteId,
            titre,
            ingredients: ingredients.map(({ nom, quantite }) => ({ nom, quantite })),
            etapes: etapes.map(({ description, ordre }) => ({ description, ordre })),
            tempsPreparation,
            tempsCuisson,
            portions,
            auteur,
        };
        // Affichage structuré de la recette modifiée
        console.log('Recette modifiée :', {
            ID: updatedRecette._id,
            Titre: updatedRecette.titre,
            Ingrédients: updatedRecette.ingredients,
            Étapes: updatedRecette.etapes,
            'Temps de préparation': `${updatedRecette.tempsPreparation} minutes`,
            'Temps de cuisson': `${updatedRecette.tempsCuisson} minutes`,
            Portions: updatedRecette.portions,
            Auteur: updatedRecette.auteur || 'Non spécifié',
        });
        navigate(`/`)
        modifierRecette(updatedRecette)
            .then((data) => console.log('Recette modifiée avec succès:', data))
            .catch((error) => {
                console.error('Erreur lors de la modification de la recette :', error);
                // Afficher la réponse brute pour diagnostiquer
                if (error.response) {
                    console.log('Réponse du serveur :', error.response.data);
                }
            });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Modifier la Recette</h3>

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

            {/* Gestion des ingrédients */}
            <div className="mb-4">
                <label className="block text-gray-700">Ingrédients</label>
                {ingredients?.map((ingredient, index) => (
                    <div key={ingredient._id} className="flex mb-2">
                        <input
                            type="text"
                            placeholder="Nom de l'ingrédient"
                            value={ingredient.nom || ''}  
                            onChange={(e) => handleIngredientChange(index, 'nom', e.target.value)}
                            className="border rounded w-1/2 py-2 px-3 mr-2 bg-white text-black"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Quantité"
                            value={ingredient.quantite || ''}  
                            onChange={(e) => handleIngredientChange(index, 'quantite', e.target.value)}
                            className="border rounded w-1/2 py-2 px-3 bg-white text-black"
                            required
                        />
                    </div>
                ))}
            </div>

            {/* Gestion des étapes */}
            <div className="mb-4">
                <label className="block text-gray-700">Étapes</label>
                {etapes?.map((etape, index) => (
                    <div key={etape._id} className="mb-2">
                        <textarea
                            placeholder={`Étape ${index + 1}`}
                            value={etape.description || ''}  
                            onChange={(e) => handleEtapeChange(index, e.target.value)}
                            className="border rounded w-full py-2 px-3 bg-white text-black"
                            required
                        />
                    </div>
                ))}
            </div>

            {/* Autres champs */}
            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="tempsPreparation">Temps de Préparation (min)</label>
                <input
                    type="number"
                    id="tempsPreparation"
                    value={tempsPreparation || 0}  
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
                    value={tempsCuisson || 0}  
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
                    value={portions || 1}  
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

            

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Modifier Recette</button>
        </form>
    );
};

export default FormulaireModification;
