// src/model/recette.ts
export interface IIngredient {
    nom: string;
    quantite: string;
    _id?: string;
}

export interface IEtape {
    description: string;
    ordre: number;
    _id?: string;
}

export interface IRecette {
    _id?: string;
    titre: string;
    ingredients: IIngredient[];
    etapes: IEtape[];
    tempsPreparation: number;
    tempsCuisson: number;
    portions: number;
    auteur?: string;
    dateCreation?: string;
}
