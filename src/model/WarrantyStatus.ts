export class WarrantyStatus {
    constructor(public remainingDays: number,
        public totalDays: string,
        public remainingPercentage: number,
        public endDate: Date) {
    }
}