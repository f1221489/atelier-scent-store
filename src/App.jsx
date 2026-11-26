import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import BrandStory from './components/BrandStory'
import CartDrawer from './components/CartDrawer'
import CheckoutView from './components/CheckoutView'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import ProductGrid from './components/ProductGrid'
import ProductModal from './components/ProductModal'
import { products } from './data/products'

const CART_STORAGE_KEY = 'mokka_atelier_cart_v1'

function loadInitialCart() {
  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!saved) return []
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState(loadInitialCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [isCheckoutView, setIsCheckoutView] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch {
      // Ignore storage quota errors in private browsing modes
    }
  }, [cartItems])

  useEffect(() => {
    if (!toastMessage) return undefined
    const timer = setTimeout(() => setToastMessage(''), 2400)
    return () => clearTimeout(timer)
  }, [toastMessage])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      }
      return [...prev, { ...product, quantity: qty }]
    })
    setToastMessage(`已將「${product.name}」加入購物車`)
  }

  const handleUpdateQuantity = (productId, nextQty) => {
    if (nextQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId))
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: nextQty } : item
      )
    )
  }

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const handleSelectCategory = (category) => {
    setIsCheckoutView(false)
    setActiveCategory(category)
  }

  const handleExploreCatalog = () => {
    setIsCheckoutView(false)
    const el = document.getElementById('catalog')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleProceedToCheckout = () => {
    setCartOpen(false)
    setIsCheckoutView(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOrderComplete = () => {
    setCartItems([])
  }

  return (
    <div className="flex min-h-screen flex-col bg-ivory text-wood-900">
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onNavigateHome={() => setIsCheckoutView(false)}
        onOpenCart={() => setCartOpen(true)}
        totalItems={totalItems}
        isCheckoutView={isCheckoutView}
      />

      <main className="flex-1">
        {isCheckoutView ? (
          <CheckoutView
            items={cartItems}
            onBackToShop={() => {
              setIsCheckoutView(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onOrderComplete={handleOrderComplete}
          />
        ) : (
          <>
            <HeroSection onExploreCatalog={handleExploreCatalog} />
            <ProductGrid
              products={products}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              onSelectProduct={setSelectedProduct}
              onQuickAdd={handleAddToCart}
            />
            <BrandStory />
          </>
        )}
      </main>

      <Footer onSelectCategory={handleSelectCategory} />

      <ProductModal
        key={selectedProduct?.id ?? 'closed'}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Subtle Add-to-Cart Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="animate-slide-up fixed right-4 bottom-5 z-50 flex items-center gap-2.5 rounded-full border border-wood-700 bg-wood-900 px-5 py-3 text-xs font-medium tracking-[0.08em] text-ivory shadow-xl sm:right-6 sm:bottom-6"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-moss-600 text-ivory">
            <Check className="h-3 w-3" />
          </span>
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage('')
              setCartOpen(true)
            }}
            className="ml-1 border-l border-wood-700 pl-2.5 text-cedar-200 underline underline-offset-4 hover:text-ivory"
          >
            檢視購物車
          </button>
        </div>
      )}
    </div>
  )
}
