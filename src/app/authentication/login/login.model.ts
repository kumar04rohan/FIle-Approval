export class LoginModel {
    "email":string|null|undefined;
    "username":string|null|undefined;
    "role_id": number;

    constructor(email:string|null|undefined, username:string|null|undefined) {
        this.email = email;
        this.username = username;
        this.role_id = 1;
    }
}

export class LoginResponseModel {
    "status":boolean;
    "message":string;
    "User": UserModel;
}

class UserModel {
    "id":number;
    "role_id":number;
    "joined_date":Date;
    "email":string;
}