import {IPopup} from "../model/popup"

const Popup = (props: IPopup) => {
    // Détermine le style et le titre en fonction du type de popup
    let bgColor = '';
    let title = '';

    switch (props.type) {
        case 1:
            bgColor = 'bg-yellow-500';
            title = 'Avertissement';
            break;
        case 2:
            bgColor = 'bg-blue-500';
            title = 'Confirmation';
            break;
        case 3:
            bgColor = 'bg-red-500';
            title = 'Danger';
            break;
        default:
            bgColor = 'bg-gray-500';
            title = 'Info';
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`p-6 rounded-lg shadow-lg text-white w-96 ${bgColor}`}>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="mb-6">{props.message}</p>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={props.onClose}
                        className="bg-gray-200 text-black px-4 py-2 rounded"
                    >
                        Fermer
                    </button>
                    {props.type === 2 && (
                        <button
                            onClick={props.onConfirm}
                            className="bg-green-600 px-4 py-2 rounded"
                        >
                            Confirmer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;