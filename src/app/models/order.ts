import { Product } from './product';

export class Order {

  constructor(
    public id: string,
    public userId: string,
    public items: Product[],
    public status: string
  ) { }

}
