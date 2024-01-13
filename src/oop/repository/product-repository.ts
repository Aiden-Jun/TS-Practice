export interface IProductRepository {
    findProductsByBuyerID(buyerID): 
}

export class ProductRepository implements IProductRepository {}
