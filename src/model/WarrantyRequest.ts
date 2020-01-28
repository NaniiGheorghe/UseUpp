import * as Uuid from "uuid";

export class WarrantyRequest {
    constructor(public id: string = Uuid.v4(), public fullName: string = "", public email: string = "", public phoneNumber: string = "",
        public country: string = "", public city: string = "", public address: string = "", public message: string = "") {
    }

    static parse(json: any): WarrantyRequest {
        if (json)
            return new WarrantyRequest(json.id, json.fullName, json.email, json.phoneNumber, json.country, json.city, json.address, json.message);
        else
            return null;
    }

    public clone(): WarrantyRequest {
        return new WarrantyRequest(this.id, this.fullName, this.email, this.phoneNumber, this.country, this.city, this.address, this.message);
    }
}