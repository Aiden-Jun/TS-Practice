// 리포지토리
export interface IProductEntity {
  id: number;
  title: string;
  description: string;
  sellerId: number;
  buyerId: number | null;
  isSelling: boolean;
}

// 서비스
export interface IProductDomain {
  Convert(): IProduct;
}
export default class ProductDomain implements IProductDomain {
  private id: number;
  private title: string;
  private description: string;
  private sellerId: number;
  private buyerId: number | null;
  private isSelling: boolean;

  constructor(
    id: number,
    title: string,
    description: string,
    sellerId: number,
    buyerId: number | null,
    isSelling: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.sellerId = sellerId;
    this.buyerId = buyerId;
    this.isSelling = isSelling;
  }

  // 메소드
  public Convert() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      sellerId: this.sellerId,
      buyerId: this.buyerId,
      isSelling: this.isSelling,
    };
  }
}

// 클라이언트
export interface IProduct {
  id: number;
  title: string;
  description: string;
  sellerId: number;
  buyerId: number | null;
  isSelling: boolean;
}
