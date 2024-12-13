
import { IRecette } from '../model/recette';

const RecetteComponent = (props: IRecette) => {
    const { titre, tempsPreparation, portions, _id } = props;
    console.log(titre)
    return (
        <div className="bg-white rounded-lg shadow-lg p-3 max-w-xs"> 
            <p className="text-gray-600 mb-2">Nom: {titre}</p> 
            <p className="text-gray-600 mb-2">Portions : {portions}</p>
            <p className="text-gray-600 mb-2">Temps de préparation : {tempsPreparation} min</p>

            <h4 className="text-md font-semibold mt-2">Ingrédients</h4>
            <h4 className="text-md font-semibold">Étapes</h4>  
            <button className="bg-blue-500 text-white px-2 py-1 rounded"><a href={`/recette/${_id}`} className="bg-blue-500 text-white px-2 py-1 rounded">
                Voir la recette
            </a></button> 
        </div>
    );
}

export default RecetteComponent