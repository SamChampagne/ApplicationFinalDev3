export interface IPopup {
    type: number; // 1: warning, 2: confirmation, 3: danger
    message: string;
    onConfirm?: () => void; 
    onClose: () => void; 
}