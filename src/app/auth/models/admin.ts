import { User } from "src/app/shared/models/user";

export interface Admin{
    id?: number,
    nom: string,
    prenom: string,
    groupe: string,
    email?: string,
    motDePasse?: string,
    listUser?: User
}