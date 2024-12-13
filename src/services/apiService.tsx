import { IRecette, IRecetteApiResponse } from '../model/recette';
import { Iutilisateur } from '../model/utilisateur';
const URL = 'https://apifinaldev3.onrender.com/api';

export const getRecettes = async (): Promise<IRecette[]> => {
    const response = await fetch(`${URL}/recette`);

    if (!response.ok) {
        throw new Error('Connection à l\'API non fonctionnelle');
    }

    const data = await response.json();
    
    return data.recettes; 
};
export const getRecetteById = async (id: string): Promise<IRecetteApiResponse> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/recette/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // si nécessaire
        },
    });

    if (!response.ok) {
        throw new Error('Erreur de connexion à l\'API');
    }
    
    const data = await response.json();
    return data as IRecetteApiResponse;
};
export const getRecetteByTitle = async (title: string): Promise<IRecette> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://apifinaldev3.onrender.com/api/recette/title/${title}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la recherche de la recette.");
    }

    const data = await response.json();
    return data.recetteTrouver; 
};
export const ajouterRecettes = async (nouvelleRecette: IRecette): Promise<IRecette> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/recette`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(nouvelleRecette)
    });

    if (!response.ok) {
        throw new Error('Erreur lors de l’ajout de la recette');
    }

    const data = await response.json();
    return data as IRecette;
};

export const getRecetteTitre = async (titre: string): Promise<IRecette> => {
    const response = await fetch(`${URL}/recette/title/${titre}`)

    if(!response.ok){
        throw new Error('Erreur lors de la recherche par titre')
    }
    
    const data = await response.json();
    return data as IRecette
}

export const supprimerRecette = async (id: string | undefined): Promise<void> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${URL}/recette/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
    }

    return 
}

export const ajouterUser = async (utilisateur: Iutilisateur): Promise<void> => {
    const response = await fetch (`${URL}/utilisateur/ajouter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(utilisateur)
    })

    if(!response.ok){
        throw new Error('Erreur lors de la création de usager')
    }
    return
}
export const modifierRecette = async ( recetteModifiee: IRecette): Promise<IRecette> => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(JSON.stringify(recetteModifiee))
    const response = await fetch(`${URL}/recette/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(recetteModifiee),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la modification de la recette");
    }

    const data = await response.json();
    return data as IRecette;
};
