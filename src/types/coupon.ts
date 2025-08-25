export interface CouponList {
  couponID: number;
  venueName: string;
  couponName: string;
  validityPeriod: string;
  issuedCount: number;
  usedCount: number;
}

export interface Coupon {
  venueName: string;
  couponName: string;
  validityPeriod: string;
  imageURL: string;
  createdAT: string;
}
