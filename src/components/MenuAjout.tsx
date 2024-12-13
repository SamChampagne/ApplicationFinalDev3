
import Navigation from './barNavigation';
import FormulaireAjout from './FormAjout'; // Assurez-vous que le chemin est correct

const MenuAjout = () => {
    return (
    <div className="min-h-screen w-screen flex bg-gray-100">
        
        <Navigation></Navigation>
        <main className="flex-1 p-10 bg-gray-100"> 
        <FormulaireAjout />
        </main>
    </div>
    );
};

export default MenuAjout;
