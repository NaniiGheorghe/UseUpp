import { DateUtil } from "../util/DateUtil";
import { Reminder } from "./Reminder";
import { WarrantyStatus } from "./WarrantyStatus";
import { WarrantyRequest } from "./WarrantyRequest";

export class Product {
    public _rev: string;
    public notes: string;
    public warrantyStatus: WarrantyStatus;

    constructor(public _id: string,
        public name: string,
        public brand: string,
        public barcode: string,
        public categoryId: string,
        public srcImage: string,
        public provider: string,
        public WarrantyPeriod: number,
        public PurchaseDate: string,
        public placeOfPurchase: string,
        public priceAmount: string,
        public priceCurrency: string,
        public reminder: Reminder,
        public warrantyRequest: WarrantyRequest,
        public userId: string,
        public startScore: number
    ) {

    }

    get warrantyPeriod(): number {
        return this.WarrantyPeriod;
    }

    set warrantyPeriod(months: number) {
        this.WarrantyPeriod = months;
        this.updateRemainingWarranty();
    }

    get purchaseDate(): string {
        return this.PurchaseDate;
    }

    set purchaseDate(purchaseDate: string) {
        this.PurchaseDate = purchaseDate;
        this.updateRemainingWarranty();
    }

    updateRemainingWarranty(): WarrantyStatus {
        if (this.warrantyPeriod == 0) {
            this.warrantyStatus = null;
        }
        else if (this.purchaseDate && this.warrantyPeriod > 0) {
            let startDate = new Date(this.purchaseDate);

            let endDate = new Date(startDate.getTime());
            endDate.setMonth(endDate.getMonth() + this.warrantyPeriod);

            let currentDate = new Date();
            let totalDays = DateUtil.daysBetween(endDate, startDate);
            let remainingDays = DateUtil.daysBetween(endDate, currentDate);
            let remainingPercentage: number = Math.round((remainingDays / totalDays) * 100);

            this.warrantyStatus = new WarrantyStatus(remainingDays,
                String(totalDays),
                remainingPercentage = remainingPercentage,
                endDate);
        }
        else if (this.warrantyPeriod == -1) {
            this.warrantyStatus = new WarrantyStatus(
                -1,
                String(0),
                100,
                null
            );
        }
        else {
            this.warrantyStatus = new WarrantyStatus(
                -1,
                String(0),
                0,
                null
            );
        }

        console.info("warrantyStatuswarrantyStatuswarrantyStatus", this.warrantyStatus);

        return this.warrantyStatus;
    }

    clone(): Product {
        return new Product(this._id, this.name, this.brand, this.barcode,
            this.categoryId, this.srcImage, this.provider, this.WarrantyPeriod,
            this.PurchaseDate, this.placeOfPurchase, this.priceAmount, this.priceCurrency, this.reminder, this.warrantyRequest, this.userId, this.startScore);
    }

    updateFrom(product: Product) {
        this._id = product._id;
        this.name = product.name;
        this.brand = product.brand;
        this.barcode = product.barcode;
        this.categoryId = product.categoryId;
        this.srcImage = product.srcImage;
        this.provider = product.provider;
        this.WarrantyPeriod = product.WarrantyPeriod;
        this.PurchaseDate = product.PurchaseDate;
        this.placeOfPurchase = product.placeOfPurchase;
        this.priceAmount = product.priceAmount;
        this.priceCurrency = product.priceCurrency;
        this.reminder = product.reminder;
        this.warrantyRequest = product.warrantyRequest;
        this.userId = product.userId;
        this.startScore = product.startScore;
    }

    static parse(json: any): Product {
        return new Product(json._id, json.name, json.brand, json.barcode, json.categoryId,
            json.srcImage, json.provider, +json.WarrantyPeriod, json.PurchaseDate,
            json.placeOfPurchase, json.priceAmount, json.priceCurrency, json.reminder,
            WarrantyRequest.parse(json.warrantyRequest), json.userId, json.startScore);
    }
}