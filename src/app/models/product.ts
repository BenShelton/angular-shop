export class Product {

  constructor(
    public id: string,
    public name: string,
    public price: number,
    public stock: number,
    public imageUrl: string,
    public quantity?: number
  ) { }

}
