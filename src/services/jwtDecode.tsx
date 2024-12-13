import { jwtDecode } from "jwt-decode";

// Méthode qui décode le jeton et récupère les informations
export function jwtDecodage(token: string): string[] {

    const result = jwtDecode(token)
    let object: string[] = []

    if(result){
        object = Object.values(result)
        console.log(object)
        return object
    }
    else{
        console.log("Problème avec le décodage du jeton")
    }
    
    return object 
}