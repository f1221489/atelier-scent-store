import { useState } from 'react'
import { Check, Eye, Plus } from 'lucide-react'
import { formatCurrency } from '../data/products'

export default function ProductCard({ product, onSelectProduct, onQuickAdd }) {
  const [justAdded, setJustAdded] = useState(false)

  const handleQuickAdd = (e) => {
    e.stopPropagation()
    onQuickAdd(product, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <article
      id={`product-card-${product.id}`}
      onClick={() => onSelectProduct(product)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-stone-border/90 bg-alabaster transition-all duration-300 hover:-translate-y-1 hover:border-wood-400/80 hover:shadow-[0_20px_44px_-24px_rgba(44,34,30,0.28)]"
    >
      {/* Product Photo Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-linen">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top-left subtle category/tag chip */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className="rounded-full bg-alabaster/90 px-3 py-1 text-[11px] font-medium tracking-[0.1em] text-wood-800 backdrop-blur-sm">
            {product.category}
          </span>
          {product.tag && (
            <span className="rounded-full bg-wood-900/85 px-2.5 py-1 text-[11px] tracking-[0.08em] text-ivory backdrop-blur-sm">
              {product.tag}
            </span>
          )}
        </div>

        {/* Desktop hover subtle quick-view indicator */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 bg-gradient-to-t from-wood-950/55 via-wood-950/15 to-transparent px-4 pt-12 pb-3.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          <p className="truncate text-xs tracking-[0.06em] text-ivory/95">
            {product.scentFamily} · {product.notes.middle}
          </p>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-xs tracking-[0.14em] text-wood-500">
              {product.englishName}
            </p>
            <h3 className="mt-1 font-serif text-lg font-medium tracking-[0.04em] text-wood-900 transition-colors group-hover:text-cedar-600">
              {product.name}
            </h3>
          </div>
          <p className="shrink-0 pt-0.5 text-base font-medium tracking-[0.02em] text-wood-900 tabular-nums">
            {formatCurrency(product.price)}
          </p>
        </div>

        <p className="mt-1.5 text-xs tracking-[0.04em] text-wood-500">{product.volume}</p>

        {/* Compact Scent Notes Preview */}
        <div className="mt-3.5 rounded-xl bg-linen/70 px-3.5 py-2.5 text-xs leading-relaxed text-wood-600">
          <span className="font-medium text-wood-800">主調氣息：</span>
          <span>
            {product.notes.top} ／ {product.notes.base}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center gap-2.5 pt-1">
          <button
            id={`view-notes-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onSelectProduct(product)
            }}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-stone-border bg-transparent px-3.5 py-2.5 text-xs font-medium tracking-[0.1em] text-wood-800 transition-colors hover:border-wood-700 hover:bg-linen"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>查看香調</span>
          </button>

          <button
            id={`quick-add-${product.id}`}
            type="button"
            onClick={handleQuickAdd}
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3.5 py-2.5 text-xs font-medium tracking-[0.1em] transition-all ${
              justAdded
                ? 'bg-moss-600 text-ivory'
                : 'bg-wood-900 text-ivory hover:bg-cedar-600'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>已加入</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                <span>快速加入</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
