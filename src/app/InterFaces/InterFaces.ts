
export interface ServerSession {
    user :User ,
    message : string,
    token : string
}

export interface User {
    _id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    role: string,
    isVerified: boolean,
    createdAt: string,
    passwordResetCode: string,
    passwordResetExpires: string,
    resetCodeVerified: boolean
}
export interface ResponseINterface {
    message : string,
    metadata : Metadata,
    subjects : Subjects,
    
}

interface Metadata {
    currentPage :number,
    numberOfPages: number,
    limit : number,
}
export interface Subjects {
    _id: string,
    name:string,
    icon:string,
    createdAt:string,
    map : Function
}
