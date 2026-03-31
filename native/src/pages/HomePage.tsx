import dayjs from 'dayjs'
import { useMemo } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { useHomeData } from '../features/useHomeData'
import type { GoodsListResponseBase, ProductHome } from '../types/home'
import { cn } from '../util/cn'

const currency = (value: number) => `¥${value.toFixed(2)}`

const palette = {
  orange: 'border-t-orange-500 bg-orange-50',
  teal: 'border-t-teal-500 bg-teal-50',
  red: 'border-t-rose-500 bg-rose-50',
} as const

const chunkList = <T,>(items: T[], size: number): T[][] => {
  const result: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size))
  }
  return result
}

const GoodsStrip = ({
  title,
  subtitle,
  goods,
  tone,
}: {
  title: string
  subtitle: string
  goods: GoodsListResponseBase[]
  tone: keyof typeof palette
}) => {
  if (goods.length === 0) {
    return null
  }

  return (
    <View className={cn('rounded-2xl border-t-4 p-3', palette[tone])}>
      <View className="mb-2.5 flex-row items-end justify-between">
        <Text className="text-base font-bold text-slate-900">{title}</Text>
        <Text className="text-[11px] text-slate-500">{subtitle}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {goods.map((item) => (
          <View key={item.id} className="mr-3 w-40">
            <Image source={{ uri: item.displayImg }} className="h-28 w-full rounded-xl bg-white" />
            <Text numberOfLines={2} className="mt-2 min-h-[34px] text-[13px] text-slate-900">
              {item.displayTitle}
            </Text>
            <View className="mt-1 flex-row items-center justify-between">
              <Text className="text-sm font-bold text-rose-600">{currency(item.activityPrice)}</Text>
              <Text className="text-[11px] text-slate-400 line-through">
                {currency(item.originalPrice)}
              </Text>
            </View>
            <View className="mt-1 flex-row items-center justify-between">
              <Text className="text-[11px] text-slate-500">Sold {item.soldCount}</Text>
              <Text className="text-[11px] text-slate-500">
                {dayjs(item.endTime).format('MM-DD HH:mm')} end
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const ProductCard = ({ product }: { product: ProductHome }) => {
  return (
    <View className="w-[48.5%] rounded-2xl bg-white p-2">
      <Image source={{ uri: product.productMainImg }} className="h-32 w-full rounded-xl bg-slate-200" />
      <Text numberOfLines={2} className="mt-2 min-h-9 text-[13px] text-slate-900">
        {product.productName}
      </Text>
      <Text numberOfLines={1} className="mt-1 text-[11px] text-slate-500">
        {product.productBrand || product.shortName}
      </Text>
      <View className="mt-1 flex-row items-center justify-between">
        <Text className="text-base font-bold text-rose-600">{currency(product.salePrice)}</Text>
        <Text className="text-[11px] text-slate-500">Stock {product.inventory}</Text>
      </View>
    </View>
  )
}

const HomePage = () => {
  const {
    categories,
    products,
    newcomerGoods,
    groupBuyGoods,
    seckillGoods,
    isLoading,
    error,
    refetchAll,
  } = useHomeData()

  const categoryRows = useMemo(() => chunkList(categories.slice(0, 10), 5), [categories])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-sm text-slate-700">Loading home...</Text>
      </View>
    )
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Load failed'

    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-sm text-slate-700">{errorMessage}</Text>
        <Pressable onPress={refetchAll} className="mt-2.5 rounded-[10px] bg-green-600 px-4 py-2">
          <Text className="text-sm text-white">Retry</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="gap-3 p-3 pb-7">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[11px] text-slate-500">Shanghai Road Sunny 18C</Text>
            <Text className="mt-0.5 text-[28px] font-bold text-slate-900">Health Mall</Text>
          </View>
          <Pressable className="rounded-full border border-green-200 bg-white px-3 py-1.5">
            <Text className="text-[13px] text-green-700">Inbox</Text>
          </Pressable>
        </View>

        <View className="flex-row gap-2">
          <TextInput
            editable={false}
            value="Search medicine, wellness, devices"
            className="flex-1 rounded-[14px] border border-slate-200 bg-white px-3 py-2.5 text-[13px] text-slate-400"
          />
          <Pressable className="justify-center rounded-[14px] bg-green-600 px-3.5">
            <Text className="text-[13px] font-semibold text-white">Search</Text>
          </Pressable>
        </View>

        <View className="flex-row items-center justify-between rounded-2xl bg-green-600 p-3">
          <Text className="max-w-[72%] text-[13px] text-white">
            New user package: up to ¥80 off on your first order
          </Text>
          <Text className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] text-white">Claim</Text>
        </View>

        <View className="flex-row flex-wrap gap-2">
          {categoryRows.flat().map((item) => (
            <Pressable key={item.value} className="min-h-[58px] w-[18.5%] items-center rounded-xl bg-white px-1.5 py-2">
              <Text className="text-[11px] text-slate-700">{item.label.slice(0, 4)}</Text>
            </Pressable>
          ))}
        </View>

        <GoodsStrip title="Newcomer Deal" subtitle="Low-barrier trial price" goods={newcomerGoods} tone="orange" />

        <GoodsStrip title="Group Buy" subtitle="More people, better price" goods={groupBuyGoods} tone="teal" />

        <GoodsStrip title="Flash Sale" subtitle="Daily 10:00 / 20:00" goods={seckillGoods} tone="red" />

        <View className="rounded-2xl bg-white p-3">
          <View className="mb-2.5 flex-row items-end justify-between">
            <Text className="text-base font-bold text-slate-900">Recommended</Text>
            <Text className="text-[11px] text-slate-500">Curated picks, quality assured</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default HomePage
