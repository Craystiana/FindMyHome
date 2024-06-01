export class RegisterModel {
    public firstName: string;
    public email: string;
    public lastName: string;
    public password: string;

    public constructor(firstName: string, lastName: string, email: string, password: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}