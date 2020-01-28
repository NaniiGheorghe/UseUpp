export class Image {
    id: number;
    src: string;

    constructor(_id: number, _src: string ) {
        this.id = _id;
        this.src = _src;
    }

    getId() {
        return this.id;
    }
    getSrc() {
        return this.src;
    }
}