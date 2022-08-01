import { User } from "src/app/shared/models/user";

export interface Admin{
    id: number,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    listUser?: User
}