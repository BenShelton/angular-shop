export class User {

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: string,
    public billingAddress?: {
      address1: string,
      address2: string,
      city: string,
      county: string,
      postcode: string
    },
    public shippingAddress?: {
      address1: string,
      address2: string,
      city: string,
      county: string,
      postcode: string
    }
  ) { }

}
