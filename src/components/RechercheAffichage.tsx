import React, { useState } from 'react';
import Navigation from './barNavigation';
import { IRecette } from '../model/recette';
import { getRecetteByTitle } from '../services/apiService';

const RechercheRecette = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [result, setResult] = useState<IRecette | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = async () => {
        if (!searchTerm.trim()) {
            setError("Veuillez entrer un titre pour effectuer la recherche.");
            return;
        }
    
        setError(null);
        setIsLoading(true);
    
        try {
            const recette: IRecette = await getRecetteByTitle(searchTerm); // Appel de la fonction
            setResult(recette); // Mise à jour de l'état avec la recette trouvée
        } catch (err: any) {
            setError(err.message || "Une erreur s'est produite.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex w-screen min-h-screen bg-gray-100">
            <Navigation />
            <main className="w-4/5 p-6">
                <section>
                    <h2 className="text-3xl font-bold mb-4 text-black">Rechercher une recette</h2>
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            placeholder="Rechercher par titre..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border border-gray-300 p-2 rounded-lg w-full mr-4 text-black bg-white"
                        />
                        <button
                            onClick={handleSearchClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? "Recherche..." : "Rechercher"}
                        </button>
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {result && (
                        <div className="border border-gray-300 rounded-lg p-4 bg-white text-black">
                            <h3 className="text-2xl font-bold mb-2">{result.titre}</h3>
                            <p className="mb-2">Auteur : {result.auteur || "Anonyme"}</p>
                            <p className="mb-2">
                                Créée le :{" "}
                                {result.dateCreation ? new Date(result.dateCreation).toLocaleDateString() : "Inconnu"}
                            </p>
                            <p className="mb-2">
                                Temps de préparation : {result.tempsPreparation} min | Temps de cuisson : {result.tempsCuisson} min
                            </p>
                            <p className="mb-2">Portions : {result.portions}</p>
                            <h4 className="text-lg font-semibold">Ingrédients :</h4>
                            <ul className="list-disc list-inside mb-2">
                                {result.ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient.nom} - {ingredient.quantite}
                                    </li>
                                ))}
                            </ul>
                            <h4 className="text-lg font-semibold">Étapes :</h4>
                            <ol className="list-decimal list-inside">
                                {result.etapes
                                    .sort((a, b) => a.ordre - b.ordre)
                                    .map((etape) => (
                                        <li key={etape.ordre}>{etape.description}</li>
                                    ))}
                            </ol>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default RechercheRecette;
