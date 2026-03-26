import dayjs from 'dayjs'
import { useMemo } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useHomeData } from '../hooks/useHomeData'
import type { GoodsListResponseBase, ProductHome } from '../types/home'

const currency = (value: number) => `¥${value.toFixed(2)}`

const palette = {
  orange: { border: '#f97316', background: '#fff7ed' },
  teal: { border: '#14b8a6', background: '#f0fdfa' },
  red: { border: '#f43f5e', background: '#fff1f2' },
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

  const selectedTone = palette[tone]

  return (
    <View
      style={[
        styles.goodsStrip,
        {
          backgroundColor: selectedTone.background,
          borderTopColor: selectedTone.border,
        },
      ]}
    >
      <View style={styles.goodsStripHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {goods.map((item) => (
          <View key={item.id} style={styles.goodsCard}>
            <Image source={{ uri: item.displayImg }} style={styles.goodsImage} />
            <Text numberOfLines={2} style={styles.goodsTitle}>
              {item.displayTitle}
            </Text>
            <View style={styles.rowBetween}>
              <Text style={styles.priceText}>{currency(item.activityPrice)}</Text>
              <Text style={styles.strikeText}>{currency(item.originalPrice)}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.metaText}>Sold {item.soldCount}</Text>
              <Text style={styles.metaText}>{dayjs(item.endTime).format('MM-DD HH:mm')} end</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const ProductCard = ({ product }: { product: ProductHome }) => {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: product.productMainImg }} style={styles.productImage} />
      <Text numberOfLines={2} style={styles.productName}>
        {product.productName}
      </Text>
      <Text numberOfLines={1} style={styles.productBrand}>
        {product.productBrand || product.shortName}
      </Text>
      <View style={styles.rowBetween}>
        <Text style={styles.productPrice}>{currency(product.salePrice)}</Text>
        <Text style={styles.metaText}>Stock {product.inventory}</Text>
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
      <View style={styles.centerState}>
        <Text style={styles.centerText}>Loading home...</Text>
      </View>
    )
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Load failed'

    return (
      <View style={styles.centerState}>
        <Text style={styles.centerText}>{errorMessage}</Text>
        <Pressable onPress={refetchAll} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerAddress}>Shanghai Road Sunny 18C</Text>
          <Text style={styles.headerTitle}>Health Mall</Text>
        </View>
        <Pressable style={styles.inboxButton}>
          <Text style={styles.inboxText}>Inbox</Text>
        </Pressable>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          editable={false}
          value="Search medicine, wellness, devices"
          style={styles.searchInput}
        />
        <Pressable style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      <View style={styles.promoBanner}>
        <Text style={styles.promoText}>New user package: up to ¥80 off on your first order</Text>
        <Text style={styles.promoTag}>Claim</Text>
      </View>

      <View style={styles.categoryGrid}>
        {categoryRows.flat().map((item) => (
          <Pressable key={item.value} style={styles.categoryItem}>
            <Text style={styles.categoryLabel}>{item.label.slice(0, 4)}</Text>
          </Pressable>
        ))}
      </View>

      <GoodsStrip title="Newcomer Deal" subtitle="Low-barrier trial price" goods={newcomerGoods} tone="orange" />

      <GoodsStrip title="Group Buy" subtitle="More people, better price" goods={groupBuyGoods} tone="teal" />

      <GoodsStrip title="Flash Sale" subtitle="Daily 10:00 / 20:00" goods={seckillGoods} tone="red" />

      <View style={styles.recommendPanel}>
        <View style={styles.goodsStripHeader}>
          <Text style={styles.sectionTitle}>Recommended</Text>
          <Text style={styles.sectionSubtitle}>Curated picks, quality assured</Text>
        </View>
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    minHeight: 58,
    paddingHorizontal: 6,
    paddingVertical: 8,
    width: '18.5%',
  },
  categoryLabel: {
    color: '#334155',
    fontSize: 11,
  },
  centerState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  centerText: {
    color: '#334155',
    fontSize: 14,
  },
  goodsCard: {
    marginRight: 12,
    width: 162,
  },
  goodsImage: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 112,
    width: '100%',
  },
  goodsStrip: {
    borderRadius: 16,
    borderTopWidth: 4,
    padding: 12,
  },
  goodsStripHeader: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  goodsTitle: {
    color: '#0f172a',
    fontSize: 13,
    marginTop: 8,
    minHeight: 34,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerAddress: {
    color: '#64748b',
    fontSize: 11,
  },
  headerTitle: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 2,
  },
  inboxButton: {
    backgroundColor: '#fff',
    borderColor: '#bbf7d0',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  inboxText: {
    color: '#15803d',
    fontSize: 13,
  },
  metaText: {
    color: '#64748b',
    fontSize: 11,
  },
  page: {
    backgroundColor: '#f8fafc',
    flex: 1,
  },
  pageContent: {
    gap: 12,
    padding: 12,
    paddingBottom: 28,
  },
  priceText: {
    color: '#e11d48',
    fontSize: 14,
    fontWeight: '700',
  },
  productBrand: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 4,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    width: '48.5%',
  },
  productImage: {
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    height: 128,
    width: '100%',
  },
  productName: {
    color: '#0f172a',
    fontSize: 13,
    marginTop: 8,
    minHeight: 36,
  },
  productPrice: {
    color: '#e11d48',
    fontSize: 16,
    fontWeight: '700',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  promoBanner: {
    alignItems: 'center',
    backgroundColor: '#16a34a',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  promoTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 999,
    color: '#fff',
    fontSize: 11,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  promoText: {
    color: '#fff',
    fontSize: 13,
    maxWidth: '72%',
  },
  recommendPanel: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
  },
  retryButton: {
    backgroundColor: '#16a34a',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
  },
  rowBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  searchButton: {
    backgroundColor: '#16a34a',
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderColor: '#e2e8f0',
    borderRadius: 14,
    borderWidth: 1,
    color: '#94a3b8',
    flex: 1,
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sectionSubtitle: {
    color: '#64748b',
    fontSize: 11,
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },
  strikeText: {
    color: '#94a3b8',
    fontSize: 11,
    textDecorationLine: 'line-through',
  },
})

export default HomePage
