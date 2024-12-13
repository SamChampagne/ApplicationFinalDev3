import { IRecette, IRecetteApiResponse } from '../model/recette';
import { Iutilisateur } from '../model/utilisateur';
const URL = 'https://apifinaldev3.onrender.com/api';

// Récupère toutes les recettes
export const getRecettes = async (): Promise<IRecette[]> => {
    const response = await fetch(`${URL}/recette`);

    // Vérifie la connexion à l'API
    if (!response.ok) {
        throw new Error('Connection à l\'API non fonctionnelle');
    }

    // Retourne les données des recettes
    const data = await response.json();
    return data.recettes; 
};

// Recherche un utilisateur par email
export const trouverParEmail = async (email: string): Promise<boolean | undefined> => {
    try {
        const response = await fetch(`${URL}/utilisateur/email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Vérifie si la réponse est correcte
        if (!response.ok) {
            throw new Error('Erreur de connexion à l\'API');
        }

        const data = await response.json();
        
        // Si l'email n'existe pas, retourne undefined
        if (data.messageErreur) {
            return undefined;
        } 
        
        // Si l'utilisateur est trouvé, retourne true
        if (data.utilisateur) {
            return true;
        }

    } catch (erreur) {
        console.error(erreur);
        throw new Error('Réponse API inattendue');
    }
};

// Récupère une recette par son ID
export const getRecetteById = async (id: string): Promise<IRecetteApiResponse> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/recette/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
        },
    });

    // Vérifie si la réponse est correcte
    if (!response.ok) {
        throw new Error('Erreur de connexion à l\'API');
    }
    
    // Retourne la recette avec toutes ses informations
    const data = await response.json();
    return data as IRecetteApiResponse;
};

// Recherche une recette par son titre
export const getRecetteByTitle = async (title: string): Promise<IRecette> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/recette/title/${title}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    // Vérifie si la recherche a échoué
    if (!response.ok) {
        throw new Error("Erreur lors de la recherche de la recette.");
    }

    // Retourne la recette trouvée par titre
    const data = await response.json();
    return data.recetteTrouver; 
};

// Ajoute une nouvelle recette
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

    // Vérifie si la réponse est correcte
    if (!response.ok) {
        throw new Error('Erreur lors de l’ajout de la recette');
    }

    // Retourne la recette ajoutée
    const data = await response.json();
    return data as IRecette;
};

// Recherche une recette par son titre (autre méthode)
export const getRecetteTitre = async (titre: string): Promise<IRecette> => {
    const response = await fetch(`${URL}/recette/title/${titre}`)

    // Vérifie si la recherche échoue
    if(!response.ok){
        throw new Error('Erreur lors de la recherche par titre')
    }
    
    // Retourne la recette trouvée
    const data = await response.json();
    return data as IRecette
}

// Supprime une recette par son ID
export const supprimerRecette = async (id: string | undefined): Promise<void> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${URL}/recette/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
    });

    // Vérifie si la suppression a échoué
    if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
    }

    return;
}

// Ajoute un nouvel utilisateur
export const ajouterUser = async (utilisateur: Iutilisateur): Promise<void> => {
    const response = await fetch(`${URL}/utilisateur/ajouter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(utilisateur)
    });

    // Vérifie si l'ajout d'utilisateur échoue
    if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'utilisateur');
    }

    return;
}

// Modifie une recette existante
export const modifierRecette = async (recetteModifiee: IRecette): Promise<IRecette> => {
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

    // Vérifie si la modification échoue
    if (!response.ok) {
        throw new Error("Erreur lors de la modification de la recette");
    }

    // Retourne la recette modifiée
    const data = await response.json();
    return data as IRecette;
};
