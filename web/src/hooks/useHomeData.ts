import { useMemo } from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'
import {
  getCategoryList,
  getProductList,
  groupBuyGoodsList,
  newcomerGoodsList,
  seckillGoodsList,
} from '../services/home'

const marketingParams = { pageNo: 1, pageSize: 6 }

export const useHomeData = () => {
  const categoryQuery = useQuery({
    queryKey: ['home', 'categories'],
    queryFn: getCategoryList,
  })

  const productQuery = useQuery({
    queryKey: ['home', 'products'],
    queryFn: () => getProductList({ pageNo: 1, pageSize: 10 }),
  })

  const marketingQueries = useQueries({
    queries: [
      {
        queryKey: ['home', 'newcomer'],
        queryFn: () => newcomerGoodsList(marketingParams),
      },
      {
        queryKey: ['home', 'groupBuy'],
        queryFn: () => groupBuyGoodsList(marketingParams),
      },
      {
        queryKey: ['home', 'seckill'],
        queryFn: () => seckillGoodsList(marketingParams),
      },
    ],
  })

  const isLoading =
    categoryQuery.isLoading ||
    productQuery.isLoading ||
    marketingQueries.some((query) => query.isLoading)

  const error =
    categoryQuery.error ??
    productQuery.error ??
    marketingQueries.find((query) => query.error)?.error ??
    null

  return useMemo(
    () => ({
      categories: categoryQuery.data ?? [],
      products: productQuery.data?.list ?? [],
      newcomerGoods: marketingQueries[0].data?.list ?? [],
      groupBuyGoods: marketingQueries[1].data?.list ?? [],
      seckillGoods: marketingQueries[2].data?.list ?? [],
      isLoading,
      error,
      refetchAll: () => {
        void categoryQuery.refetch()
        void productQuery.refetch()
        marketingQueries.forEach((query) => {
          void query.refetch()
        })
      },
    }),
    [
      categoryQuery,
      error,
      isLoading,
      marketingQueries,
      productQuery,
    ],
  )
}

