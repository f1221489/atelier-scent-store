import { useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { CATEGORIES } from '../data/products'

export default function Navbar({
  activeCategory,
  onSelectCategory,
  onNavigateHome,
  onOpenCart,
  totalItems,
  isCheckoutView,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleCategoryClick = (category) => {
    onSelectCategory(category)
    setMobileMenuOpen(false)
    const el = document.getElementById('catalog')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleStoryClick = () => {
    onNavigateHome()
    setMobileMenuOpen(false)
    setTimeout(() => {
      const el = document.getElementById('brand-story')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-stone-border/80 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark */}
        <button
          id="nav-brand-logo"
          type="button"
          onClick={() => {
            onNavigateHome()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="group flex items-baseline gap-2.5 text-left focus:outline-none"
        >
          <span className="font-display text-2xl font-medium tracking-[0.22em] text-wood-900 transition-colors group-hover:text-cedar-600">
            MOKKA
          </span>
          <span className="hidden border-l border-stone-border pl-2.5 text-xs tracking-[0.24em] text-wood-600 sm:inline">
            沐木選品
          </span>
        </button>

        {/* Desktop Category & Story Links */}
        <nav aria-label="主要導覽" className="hidden items-center gap-7 md:flex">
          {CATEGORIES.map((category) => {
            const isActive = !isCheckoutView && activeCategory === category
            return (
              <button
                key={category}
                id={`nav-cat-${category}`}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={`relative py-1 text-sm tracking-[0.12em] transition-colors ${
                  isActive
                    ? 'font-medium text-wood-900'
                    : 'text-wood-600 hover:text-wood-900'
                }`}
              >
                {category === '全部' ? '全部選品' : category}
                <span
                  className={`absolute right-0 bottom-0 left-0 h-[1.5px] bg-wood-900 transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            )
          })}
          <button
            id="nav-brand-story"
            type="button"
            onClick={handleStoryClick}
            className="py-1 text-sm tracking-[0.12em] text-wood-600 transition-colors hover:text-wood-900"
          >
            品牌故事
          </button>
        </nav>

        {/* Actions: Cart + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="nav-cart-button"
            type="button"
            onClick={onOpenCart}
            aria-label={`開啟購物車，目前有 ${totalItems} 件商品`}
            className="group relative inline-flex items-center gap-2 rounded-full border border-stone-border bg-alabaster px-3.5 py-2 text-sm text-wood-900 transition-all hover:border-wood-700 hover:bg-wood-900 hover:text-ivory"
          >
            <ShoppingBag className="h-4 w-4 transition-transform group-hover:scale-105" />
            <span className="hidden text-xs tracking-[0.12em] sm:inline">購物車</span>
            <span
              className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-medium tabular-nums transition-colors ${
                totalItems > 0
                  ? 'bg-cedar-600 text-ivory group-hover:bg-ivory group-hover:text-wood-900'
                  : 'bg-linen text-wood-600 group-hover:bg-wood-700 group-hover:text-ivory'
              }`}
            >
              {totalItems}
            </span>
          </button>

          <button
            id="nav-mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? '關閉選單' : '開啟選單'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-border bg-alabaster text-wood-900 transition-colors hover:bg-linen md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="animate-fade-in border-t border-stone-border bg-alabaster px-4 py-4 md:hidden">
          <nav aria-label="行動版分類導覽" className="flex flex-col gap-1">
            {CATEGORIES.map((category) => {
              const isActive = !isCheckoutView && activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm tracking-[0.12em] transition-colors ${
                    isActive
                      ? 'bg-linen font-medium text-wood-900'
                      : 'text-wood-700 hover:bg-linen/60'
                  }`}
                >
                  <span>{category === '全部' ? '全部選品' : category}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-cedar-600" />}
                </button>
              )
            })}
            <button
              type="button"
              onClick={handleStoryClick}
              className="mt-1 border-t border-stone-border/70 px-3 pt-3.5 pb-2 text-left text-sm tracking-[0.12em] text-wood-700 transition-colors hover:text-wood-900"
            >
              品牌故事
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
