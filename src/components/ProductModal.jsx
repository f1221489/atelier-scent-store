import { useEffect, useState } from 'react'
import { Droplets, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react'
import { formatCurrency } from '../data/products'

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!product) return undefined

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [product, onClose])

  if (!product) return null

  const noteLayers = [
    { label: '前調 TOP', value: product.notes.top, dotClass: 'bg-cedar-200' },
    { label: '中調 HEART', value: product.notes.middle, dotClass: 'bg-cedar-500' },
    { label: '後調 BASE', value: product.notes.base, dotClass: 'bg-wood-900' },
  ]

  const handleAdd = () => {
    onAddToCart(product, quantity)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-wood-950/55 p-3 backdrop-blur-[2px] sm:p-6"
      onClick={onClose}
    >
      <div
        className="animate-slide-up relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-stone-border bg-alabaster shadow-2xl md:grid md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="modal-close-btn"
          type="button"
          onClick={onClose}
          aria-label="關閉商品詳情"
          className="absolute top-3.5 right-3.5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-border bg-alabaster/90 text-wood-800 backdrop-blur-sm transition-colors hover:bg-wood-900 hover:text-ivory"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Product Image */}
        <div className="relative bg-linen md:col-span-5">
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover sm:h-80 md:h-full"
          />
          <span className="absolute bottom-3.5 left-3.5 rounded-full bg-alabaster/90 px-3 py-1 text-xs font-medium tracking-[0.1em] text-wood-800 backdrop-blur-sm">
            {product.scentFamily}
          </span>
        </div>

        {/* Product Details Scrollable Area */}
        <div className="flex flex-col overflow-y-auto p-6 sm:p-8 md:col-span-7">
          <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-cedar-600">
            <span>{product.category}</span>
            <span className="text-wood-400">·</span>
            <span className="font-display tracking-[0.14em] text-wood-500">
              {product.englishName}
            </span>
          </div>

          <h2
            id="modal-product-title"
            className="mt-2 font-serif text-2xl font-medium tracking-[0.04em] text-wood-900 sm:text-[1.7rem]"
          >
            {product.name}
          </h2>

          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-border pb-4">
            <p className="text-xl font-medium text-wood-900 tabular-nums">
              {formatCurrency(product.price)}
            </p>
            <p className="inline-flex items-center gap-1.5 text-xs tracking-[0.06em] text-wood-600">
              <Droplets className="h-3.5 w-3.5 text-cedar-600" />
              規格容量：{product.volume}
            </p>
          </div>

          <p className="mt-4 text-sm leading-7 tracking-[0.03em] text-wood-700">
            {product.description}
          </p>

          {/* Fragrance Pyramid */}
          <div className="mt-5 rounded-xl border border-stone-border/80 bg-ivory/80 p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-medium tracking-[0.14em] text-wood-800">
              <Sparkles className="h-3.5 w-3.5 text-cedar-600" />
              <span>香調層次 SCENT PYRAMID</span>
            </div>
            <div className="space-y-3">
              {noteLayers.map((layer) => (
                <div
                  key={layer.label}
                  className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-4"
                >
                  <div className="flex w-28 shrink-0 items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${layer.dotClass}`} />
                    <span className="text-[11px] font-medium tracking-[0.12em] text-wood-500">
                      {layer.label}
                    </span>
                  </div>
                  <p className="text-sm tracking-[0.04em] text-wood-900">{layer.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Note */}
          {product.usage && (
            <div className="mt-4 text-xs leading-6 text-wood-600">
              <span className="font-medium text-wood-800">使用建議：</span>
              {product.usage}
            </div>
          )}

          {/* Quantity & Add to Cart Footer */}
          <div className="mt-6 flex flex-col gap-3 border-t border-stone-border pt-5 sm:flex-row sm:items-center">
            <div className="inline-flex items-center justify-between rounded-full border border-stone-border bg-ivory px-2 py-1 sm:w-32">
              <button
                id="modal-qty-minus"
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="減少數量"
                className="flex h-8 w-8 items-center justify-center rounded-full text-wood-700 transition-colors hover:bg-linen"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-8 text-center text-sm font-medium text-wood-900 tabular-nums">
                {quantity}
              </span>
              <button
                id="modal-qty-plus"
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="增加數量"
                className="flex h-8 w-8 items-center justify-center rounded-full text-wood-700 transition-colors hover:bg-linen"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              id="modal-add-to-cart"
              type="button"
              onClick={handleAdd}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-wood-900 px-6 py-3.5 text-sm font-medium tracking-[0.12em] text-ivory transition-colors hover:bg-cedar-600"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>
                加入購物車 · {formatCurrency(product.price * quantity)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
