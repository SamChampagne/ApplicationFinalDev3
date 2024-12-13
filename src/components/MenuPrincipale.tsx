import { useEffect, useState } from 'react';
import { getRecettes } from '../services/apiService';
import RecetteComponent from './recetteComponents';
import { IRecette } from '../model/recette';
import Navigation from './barNavigation';

const MenuPrincipale = () => {
  const [recettes, setRecettes] = useState<IRecette[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRecettes()
      .then((data) => {
        setRecettes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des recettes:', error);
        setError('Erreur de chargement des recettes.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen w-screen flex bg-gray-100">
      <Navigation></Navigation>
      <main className="flex-1 p-10 flex flex-col items-center">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">CookBookPro</h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {loading ? (
            <p>Chargement des recettes...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            recettes.map((recette) => (
              <RecetteComponent key={recette._id} {...recette} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default MenuPrincipale;
