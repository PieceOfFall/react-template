export type CategoryItem = {
  value: number
  label: string
  children?: CategoryItem[]
}

export type MarketingGoodsListParam = {
  pageNo: number
  pageSize: number
}

export type ProductListParam = {
  pageNo?: number
  pageSize?: number
  firstCategoryId?: number
  secondCategoryId?: number | null
  thirdCategoryId?: number
  productNo?: string
  productName?: string
  productStatus?: number
  createTimeStart?: string
  createTimeEnd?: string
}

export type GoodsListResponseBase = {
  id: number
  activityId: number
  spuId: number
  skuId: number
  displayTitle: string
  displayImg: string
  originalPrice: number
  activityPrice: number
  activityStock: number
  soldCount: number
  startTime: string
  endTime: string
  userPerLimit: number
  userTotalLimit: number
  priceType: number
}

export type NewcomerGoods = GoodsListResponseBase & {
  canBuy: boolean
}

export type GroupBuyGoods = GoodsListResponseBase & {
  groupSize: number
  groupTimeLimit: number
}

export type SeckillGoods = GoodsListResponseBase

export type ProductImage = {
  productImg1?: string
  productImg2?: string
  productImg3?: string
  productImg4?: string
  productImg5?: string
}

export type ProductHome = {
  id: number
  vendorId: number
  productNo: string
  productName: string
  productBrand: string
  shortName: string
  productSpec: string
  firstCategoryName: string
  secondCategoryName: string
  thirdCategoryName: string
  productMainImg: string
  inventory: number
  salePrice: number
  productImage: ProductImage
}

export type ProductListResponse = {
  total: number
  list: ProductHome[]
}

export type PageHelper<T> = {
  pageNum: number
  pageSize: number
  total: number
  pages: number
  list: T[]
}

