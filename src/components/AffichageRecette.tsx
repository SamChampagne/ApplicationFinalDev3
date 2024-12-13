import {  useEffect, useState } from 'react';
import { IRecette } from '../model/recette';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecetteById, supprimerRecette } from '../services/apiService';
import FormulaireModification from './FormModification';
import Popup from './Popup';
import NavigationBar from './barNavigation'

const AffichageRecette = () => {
    
    const { id } = useParams<{ id: string }>();
    const [recette, setRecette] = useState<IRecette | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false); 
    const [popupType, setPopupType] = useState(0); 
    const [popupMessage, setPopupMessage] = useState(''); 
    const navigate = useNavigate();
    const [showFormModification, setShowFormModification] = useState(false);
    const handleSuppression = () => {
        setPopupMessage("Êtes-vous sûr de vouloir supprimer cette recette ?");
        setPopupType(2); 
        setShowPopup(true); 
    };

    const confirmSuppression = async () => {
        try {
            await supprimerRecette(id!);
            alert("Recette supprimée avec succès !");
            navigate('/'); // Redirige vers la page d'accueil après suppression
        } catch (err) {
            console.error("Erreur lors de la suppression de la recette :", err);
            setError("Erreur lors de la suppression de la recette");
        } finally {
            setShowPopup(false); // Fermer le popup après l'action
        }
    };

    useEffect(() => {
        const fetchRecette = async () => {
            try {
                setLoading(true);
                const fetchedData = await getRecetteById(id!);
                console.log("JSON de la recette :", fetchedData);
                setRecette(fetchedData.recetteTrouver);
            } catch (err) {
                console.error("Erreur lors de la récupération de la recette :", err);
                setError("Erreur lors de la récupération de la recette");
            } finally {
                setLoading(false);
            }
        };

        fetchRecette();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-start justify-center h-screen pt-10">
                <p className="text-4xl font-bold text-white">Chargement...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-start justify-center h-screen pt-10">
                <p className="text-2xl font-semibold text-white">{error}</p>
            </div>
        );
    }

    if (!recette) return <p>Aucune recette trouvée</p>;

    return (
        <div className="flex min-h-screen w-screen">
            <NavigationBar />
            <div className="w-4/5 p-6 bg-white rounded-lg shadow-md overflow-y-auto">
                {showFormModification ? (
                    <FormulaireModification recetteId={id!} /> 
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-black mb-4">{recette.titre}</h2>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Informations générales</h3>
                            <p className="text-black"><strong>Temps de préparation :</strong> {recette.tempsPreparation} minutes</p>
                            <p className="text-black"><strong>Temps de cuisson :</strong> {recette.tempsCuisson} minutes</p>
                            <p className="text-black"><strong>Portions :</strong> {recette.portions}</p>
                            {recette.auteur && <p><strong>Auteur :</strong> {recette.auteur}</p>}
                            {recette.dateCreation && (
                                <p><strong>Date de création :</strong> {new Date(recette.dateCreation).toLocaleDateString()}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Ingrédients</h3>
                            <ul className="list-disc list-inside text-black">
                                {recette.ingredients?.map((ingredient) => (
                                    <li key={ingredient._id}>
                                        {ingredient.nom} - {ingredient.quantite}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Étapes</h3>
                            <ol className="list-decimal list-inside text-black">
                                {recette.etapes?.sort((a, b) => a.ordre - b.ordre).map((etape) => (
                                    <li key={etape._id} className="mb-2">
                                        {etape.description}
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className="mb-4 p-10 flex space-x-4">
                            <button 
                                className="bg-red-700 px-4 py-2 text-white rounded-sm" 
                                onClick={handleSuppression}
                            >
                                Supprimer
                            </button>
                            <button 
                                className="bg-blue-700 px-4 py-2 text-white rounded-sm" 
                                onClick={() => setShowFormModification(true)}
                            >
                                Modifier
                            </button>
                        </div>
                    </>
                )}
            </div>
    
            {/* Affichage du Popup */}
            {showPopup && (
                <Popup
                    type={popupType}
                    message={popupMessage}
                    onConfirm={confirmSuppression}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
    
    
};

export default AffichageRecette;
