import { useEffect, useState } from "react";
import { jwtDecodage } from "../services/jwtDecode";
import { useNavigate } from "react-router-dom";


// Component de navigation
const Navigation = () => {

    // Initialisation des variables
    const navigate = useNavigate();
    const [nom, setNom] = useState<string>("");
    const [estLogin, setLogin] = useState<boolean>(false);

    // Vérifie si l'utilisateur est connecté
    const isLoggedIn = () => {
    setLogin(localStorage.getItem("token") !== null);
    };

    // Fonction de déconnexion
    const handleDeconnexion = () => {
      localStorage.removeItem("token"); 
      setLogin(false); 
      setNom(""); 
      navigate("/login");
    };

   // Vérifie l'état de la connexion au montage du composant
    useEffect(() => {
    isLoggedIn();
    }, []); 

    // Mise à jour du nom après la connexion
    useEffect(() => {
      if (estLogin) {
        const token = localStorage.getItem("token");
        if (token) {
          const result: string[] = jwtDecodage(token);
          console.log("Console log du token: " + result);
          setNom(result[0]);
        }
      } else {
        setNom(""); 
      }
    }, [estLogin]); 

  return (
    <aside className="w-1/6 min-h-screen bg-gray-800 text-white flex flex-col p-4">
      <div>
        <h2 className="text-2xl font-bold mb-5">Menu</h2>
        <nav>
          <ul>
            {/* Toujours afficher "Accueil" */}
            <li className="mb-2">
              <a href="/" className="text-gray-300 hover:text-white">
                Accueil
              </a>
            </li>

            {/* Afficher d'autres liens si l'utilisateur est connecté */}
            {estLogin && (
              <>
                <li className="mb-2">
                  <a href="/ajouter" className="text-gray-300 hover:text-white">
                    Ajout
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/recherche"
                    className="text-gray-300 hover:text-white"
                  >
                    Recherche
                  </a>
                </li>
              </>
            )}

            {/* Afficher le lien de connexion si l'utilisateur n'est pas connecté */}
            {!estLogin && (
              <li className="mb-2">
                <a href="/login" className="text-gray-300 hover:text-white">
                  Se connecter
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <footer className="mt-auto">
        {estLogin && <h3 className="mb-2">{nom}</h3>}
        {estLogin && (
          <button
            onClick={handleDeconnexion}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
          >
            Déconnexion
          </button>
        )}
      </footer>
    </aside>
  );
};

export default Navigation;
