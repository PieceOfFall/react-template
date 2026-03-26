import { clsx } from 'clsx'
import dayjs from 'dayjs'
import { chunk } from 'lodash-es'
import { useMemo } from 'react'
import { useHomeData } from '../hooks/useHomeData'
import type { GoodsListResponseBase, ProductHome } from '../types/home'

const currency = (value: number) => `¥${value.toFixed(2)}`

const toneStyles = {
  orange: 'border-orange-500 bg-orange-50/50',
  teal: 'border-brand-500 bg-brand-50/60',
  red: 'border-rose-500 bg-rose-50/50',
} as const

const GoodsStrip = ({
  title,
  subtitle,
  goods,
  tone,
}: {
  title: string
  subtitle: string
  goods: GoodsListResponseBase[]
  tone: keyof typeof toneStyles
}) => {
  if (goods.length === 0) {
    return null
  }

  return (
    <section className={clsx('rounded-2xl border-t-4 p-3 shadow-card', toneStyles[tone])}>
      <header className="mb-2 flex items-end justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </header>

      <div className="grid auto-cols-[minmax(160px,1fr)] grid-flow-col gap-3 overflow-x-auto pb-1">
        {goods.map((item) => (
          <article key={item.id} className="snap-start">
            <img
              src={item.displayImg}
              alt={item.displayTitle}
              loading="lazy"
              className="h-28 w-full rounded-xl bg-white object-cover"
            />
            <h3 className="mt-2 line-clamp-2 min-h-9 text-sm text-slate-900">{item.displayTitle}</h3>
            <p className="mt-1 flex items-center justify-between gap-2 text-xs">
              <strong className="text-sm text-rose-600">{currency(item.activityPrice)}</strong>
              <span className="text-slate-400 line-through">{currency(item.originalPrice)}</span>
            </p>
            <p className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-500">
              <span>Sold {item.soldCount}</span>
              <span>{dayjs(item.endTime).format('MM-DD HH:mm')} end</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

const ProductCard = ({ product }: { product: ProductHome }) => (
  <article className="rounded-2xl bg-white p-2 shadow-card">
    <img
      src={product.productMainImg}
      alt={product.productName}
      loading="lazy"
      className="h-32 w-full rounded-xl bg-slate-100 object-cover"
    />
    <h3 className="mt-2 line-clamp-2 min-h-10 text-sm text-slate-900">{product.productName}</h3>
    <p className="mt-1 truncate text-xs text-slate-500">{product.productBrand || product.shortName}</p>
    <p className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-500">
      <strong className="text-base text-rose-600">{currency(product.salePrice)}</strong>
      <span>Stock {product.inventory}</span>
    </p>
  </article>
)

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

  const categoryRows = useMemo(() => chunk(categories.slice(0, 10), 5), [categories])

  if (isLoading) {
    return <main className="grid min-h-screen place-content-center text-slate-600">Loading home...</main>
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Load failed'

    return (
      <main className="grid min-h-screen place-content-center gap-3 text-slate-700">
        <p>{errorMessage}</p>
        <button
          type="button"
          onClick={refetchAll}
          className="rounded-xl bg-brand-600 px-4 py-2 text-white"
        >
          Retry
        </button>
      </main>
    )
  }

  return (
    <main className="space-y-3 px-3 pb-24 pt-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Shanghai · Sunny 18°C</p>
          <h1 className="mt-0.5 text-2xl font-semibold tracking-wide text-slate-900">Health Mall</h1>
        </div>
        <button
          type="button"
          className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-sm text-brand-700"
        >
          Inbox
        </button>
      </header>

      <section className="grid grid-cols-[1fr_auto] gap-2">
        <input
          readOnly
          value="Search medicine, wellness, devices"
          aria-label="search"
          className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-400"
        />
        <button type="button" className="rounded-2xl bg-brand-600 px-4 text-white">
          Search
        </button>
      </section>

      <section className="flex items-center justify-between rounded-2xl bg-brand-gradient p-3 text-white shadow-card">
        <p className="max-w-[72%] text-sm">New user package: up to ¥80 off on your first order</p>
        <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs">Claim</span>
      </section>

      <section className="grid grid-cols-5 gap-2">
        {categoryRows.flat().map((item) => (
          <button
            type="button"
            key={item.value}
            className="min-h-16 rounded-xl bg-white px-1 py-2 text-xs text-slate-700 shadow-card"
          >
            {item.label.slice(0, 4)}
          </button>
        ))}
      </section>

      <GoodsStrip title="Newcomer Deal" subtitle="Low-barrier trial price" goods={newcomerGoods} tone="orange" />

      <GoodsStrip title="Group Buy" subtitle="More people, better price" goods={groupBuyGoods} tone="teal" />

      <GoodsStrip title="Flash Sale" subtitle="Daily 10:00 / 20:00" goods={seckillGoods} tone="red" />

      <section className="rounded-2xl bg-white p-3 shadow-card">
        <header className="mb-3 flex items-end justify-between gap-2">
          <h2 className="text-base font-semibold text-slate-900">Recommended</h2>
          <p className="text-xs text-slate-500">Curated picks, quality assured</p>
        </header>
        <div className="grid grid-cols-2 gap-2.5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
