export interface User {
   id : string,
   email : string,
   displayName : string
}

export interface RegisterData {
    email : string,
    displayName : string,
    password : string    
}

export interface LoginData {
    email : string,
    password : string    
}
