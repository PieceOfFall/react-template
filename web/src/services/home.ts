import { http, unwrapResponse, type MaybeWrapped } from '../lib/http'
import type {
  CategoryItem,
  GroupBuyGoods,
  MarketingGoodsListParam,
  NewcomerGoods,
  PageHelper,
  ProductListParam,
  ProductListResponse,
  SeckillGoods,
} from '../types/home'


export const getCategoryList = async () => {
  const response = await http.post<MaybeWrapped<CategoryItem[]>>(
    '/audience/product/category/cascaderSelect',
    {},
  )
  return unwrapResponse(response.data)
}

export const newcomerGoodsList = async (
  params: MarketingGoodsListParam,
): Promise<PageHelper<NewcomerGoods>> => {
  const response = await http.post<MaybeWrapped<PageHelper<NewcomerGoods>>>(
    '/audience/marketing/goodsList/newcomer',
    params,
  )

  return unwrapResponse(response.data)
}

export const groupBuyGoodsList = async (
  params: MarketingGoodsListParam,
): Promise<PageHelper<GroupBuyGoods>> => {
  const response = await http.post<MaybeWrapped<PageHelper<GroupBuyGoods>>>(
    '/audience/marketing/goodsList/groupBuy',
    params,
  )

  return unwrapResponse(response.data)
}

export const seckillGoodsList = async (
  params: MarketingGoodsListParam,
): Promise<PageHelper<SeckillGoods>> => {
  const response = await http.post<MaybeWrapped<PageHelper<SeckillGoods>>>(
    '/audience/marketing/goodsList/seckill',
    params,
  )

  return unwrapResponse(response.data)
}

export const getProductList = async (
  params: ProductListParam,
): Promise<ProductListResponse> => {
  const response = await http.post<MaybeWrapped<ProductListResponse>>(
    '/audience/product/spuInfo/list',
    params,
  )

  return unwrapResponse(response.data)
}

