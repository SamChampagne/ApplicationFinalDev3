import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPrincipale from './components/MenuPrincipale';
import MenuAjout from './components/MenuAjout';
import AffichageRecette from './components/AffichageRecette';
import RechercheRecette from './components/RechercheAffichage';
import Login from './components/Login';
import Inscription from './components/Inscription';

// Coeur de l'application et des routes
const App = () => {
  return (
    <>
    <Router>
        <div className="flex-1 ">
          <Routes>
            <Route path="/" element={<MenuPrincipale />} />
            <Route path="/Ajouter" element={<MenuAjout />} />
            <Route path="/recette/:id" element={<AffichageRecette />} />
            <Route path="/recherche" element={<RechercheRecette />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/inscription" element={<Inscription />} />
          </Routes>
        </div>
    </Router>
    </>
  );
}

export default App;
