import { CATEGORIES } from '../data/products'
import ProductCard from './ProductCard'

export default function ProductGrid({
  products,
  activeCategory,
  onSelectCategory,
  onSelectProduct,
  onQuickAdd,
}) {
  const filteredProducts =
    activeCategory === '全部'
      ? products
      : products.filter((item) => item.category === activeCategory)

  const getCategoryCount = (cat) =>
    cat === '全部'
      ? products.length
      : products.filter((item) => item.category === cat).length

  return (
    <section id="catalog" className="scroll-mt-20 py-16 sm:py-22">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col justify-between gap-6 border-b border-stone-border pb-8 md:flex-row md:items-end">
          <div>
            <p className="font-display text-xs tracking-[0.28em] text-cedar-600 uppercase">
              CURATED COLLECTION
            </p>
            <h2 className="mt-2 font-serif text-2xl font-medium tracking-[0.06em] text-wood-900 sm:text-3xl">
              質感香氛選品
            </h2>
            <p className="mt-2 text-sm tracking-[0.04em] text-wood-600">
              依居家場景挑選專屬木質與植萃氣息，點擊卡片即可展開完整前、中、後調介紹。
            </p>
          </div>

          {/* Category Filter Pills */}
          <div
            role="tablist"
            aria-label="商品分類篩選"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category
              return (
                <button
                  key={category}
                  id={`filter-tab-${category}`}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => onSelectCategory(category)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium tracking-[0.12em] transition-all sm:text-sm ${
                    isSelected
                      ? 'bg-wood-900 text-ivory shadow-sm'
                      : 'border border-stone-border bg-alabaster text-wood-700 hover:border-wood-600 hover:bg-linen'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[11px] tabular-nums ${
                      isSelected ? 'text-ivory/75' : 'text-wood-400'
                    }`}
                  >
                    {getCategoryCount(category)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Responsive Product Grid */}
        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
