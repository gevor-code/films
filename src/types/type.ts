export interface User {
    id?: string,
    name: string,
    surname: string,
    age: number,
    email: string,
    password: string,
    gender: string,
    phone: string,
}

export enum EnumFirestore {
    USER = "user",
    FILM = "film",
    FEEDBACK="feedback"
}
export interface Reviews{
    comment:string,
    raiting?:number,
    id?:number
}
export interface Film{
    id?:string,
    name:string,
    year:number,
    genre:string,
    description:string,
    actors:string,
    producer:string,
    country:string,
    photo:any
}
export interface TypeFirestore{
    collectionName:EnumFirestore,
    obj?:any,
    id?:string,
}