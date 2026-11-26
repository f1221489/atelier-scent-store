import { useEffect } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from 'lucide-react'
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
  formatCurrency,
} from '../data/products'

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) {
  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const shippingFee = items.length === 0 || isFreeShipping ? 0 : SHIPPING_FEE
  const totalAmount = subtotal + shippingFee

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="購物車清單"
      className="animate-fade-in fixed inset-0 z-50 flex justify-end bg-wood-950/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <aside
        className="animate-slide-in-right flex h-full w-full max-w-md flex-col bg-alabaster shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-stone-border px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-wood-900" />
            <h2 className="font-serif text-lg font-medium tracking-[0.08em] text-wood-900">
              購物車
            </h2>
            <span className="rounded-full bg-linen px-2.5 py-0.5 text-xs text-wood-600 tabular-nums">
              {items.reduce((acc, item) => acc + item.quantity, 0)} 件
            </span>
          </div>
          <button
            id="cart-close-btn"
            type="button"
            onClick={onClose}
            aria-label="關閉購物車"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-wood-600 transition-colors hover:bg-linen hover:text-wood-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Free Shipping Progress Bar */}
        <div className="border-b border-stone-border/80 bg-ivory px-6 py-4">
          <div className="flex items-center gap-2 text-xs tracking-[0.04em]">
            {isFreeShipping ? (
              <>
                <CheckCircle2 className="h-4 w-4 shrink-0 text-moss-600" />
                <p className="font-medium text-moss-700">
                  已達免運門檻！本筆訂單享台灣本島免運優惠
                </p>
              </>
            ) : (
              <>
                <Truck className="h-4 w-4 shrink-0 text-cedar-600" />
                <p className="text-wood-700">
                  再加購{' '}
                  <span className="font-semibold text-cedar-600 tabular-nums">
                    {formatCurrency(remainingForFreeShipping)}
                  </span>{' '}
                  即享滿 {formatCurrency(FREE_SHIPPING_THRESHOLD)} 免運
                </p>
              </>
            )}
          </div>
          <div
            role="progressbar"
            aria-valuenow={Math.round(progressPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="免運門檻達成進度"
            className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-stone-border/80"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isFreeShipping ? 'bg-moss-600' : 'bg-cedar-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linen text-wood-400">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <p className="mt-4 font-serif text-lg text-wood-900">購物車目前是空的</p>
              <p className="mt-1.5 max-w-xs text-xs leading-6 text-wood-500">
                挑一款屬於你的木質或茶香選品，讓溫柔的氣味陪伴每個歸家時刻。
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full border border-wood-900 px-6 py-2.5 text-xs font-medium tracking-[0.14em] text-wood-900 transition-colors hover:bg-wood-900 hover:text-ivory"
              >
                繼續探索選品
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-stone-border/80">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4 first:pt-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-22 w-18 shrink-0 rounded-xl border border-stone-border/70 object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-serif text-sm font-medium text-wood-900">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-wood-500">{item.volume}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`移除 ${item.name}`}
                        className="rounded-md p-1 text-wood-400 transition-colors hover:bg-linen hover:text-wood-900"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-stone-border bg-ivory">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          aria-label={`減少 ${item.name} 數量`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-wood-700 transition-colors hover:bg-linen"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-7 text-center text-xs font-medium text-wood-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label={`增加 ${item.name} 數量`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-wood-700 transition-colors hover:bg-linen"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <p className="text-sm font-medium text-wood-900 tabular-nums">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Summary & Checkout Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-border bg-ivory px-6 py-5">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-wood-600">
                <span>商品小計</span>
                <span className="tabular-nums">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-wood-600">
                <span>預估運費</span>
                <span
                  className={`tabular-nums ${
                    isFreeShipping ? 'font-medium text-moss-700' : ''
                  }`}
                >
                  {isFreeShipping ? '免運優惠' : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-stone-border pt-3 text-base font-medium text-wood-900">
                <span>應付總計</span>
                <span className="tabular-nums">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <button
              id="cart-checkout-btn"
              type="button"
              onClick={onProceedToCheckout}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wood-900 px-6 py-3.5 text-sm font-medium tracking-[0.14em] text-ivory transition-colors hover:bg-cedar-600"
            >
              <span>前往結帳</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
