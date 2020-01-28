export class User {

    constructor(
        public _id: string,
        public user: string,
        public userEmail: string,
        public password: string,
        public userPhoneNumber: string,
        public userCountry: string,
        public userCity: string,
        public userImage: string,
        public providerId: string,
        public gender: string , 
        public job : string) {
    }
}