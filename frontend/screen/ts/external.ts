import {IProduct} from '../../specification/interfaces.js';

export const getSellingProducts = async (): Promise<IProduct[]> => {
  const res = await fetch(`http://localhost:3000/products?type=selling`, {
    method: 'GET',
  });
  const {products}: {products: IProduct[]} = await res.json();

  return products;
};
