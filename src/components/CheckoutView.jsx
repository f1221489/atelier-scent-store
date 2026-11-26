import { useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  MapPin,
  Package,
  ShieldCheck,
  Store,
} from 'lucide-react'
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
  formatCurrency,
} from '../data/products'

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  paymentMethod: 'cvs_cod',
  cvsBrand: '7-ELEVEN',
  cvsStore: '',
  address: '',
  note: '',
}

function generateOrderNumber() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const rand = String(Math.floor(1000 + Math.random() * 9000))
  return `MK-${y}${m}${d}-${rand}`
}

function generateEcpayTradeNo() {
  return `ECP${Date.now().toString().slice(-10)}`
}

export default function CheckoutView({ items, onBackToShop, onOrderComplete }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [completedOrder, setCompletedOrder] = useState(null)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const shippingFee = items.length === 0 || isFreeShipping ? 0 : SHIPPING_FEE
  const totalAmount = subtotal + shippingFee

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.fullName.trim()) {
      nextErrors.fullName = '請填寫收件人姓名'
    }
    if (!/^09\d{8}$/.test(form.phone.replace(/[-\s]/g, ''))) {
      nextErrors.phone = '請填寫正確的台灣手機號碼（例：0912345678）'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = '請填寫有效的電子郵件信箱'
    }
    if (form.paymentMethod === 'cvs_cod' && !form.cvsStore.trim()) {
      nextErrors.cvsStore = '請填寫取貨超商門市名稱或店號'
    }
    if (form.paymentMethod === 'ecpay_credit' && !form.address.trim()) {
      nextErrors.address = '請填寫完整收件宅配地址'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    const snapshotItems = items.map((item) => ({ ...item }))
    const orderNumber = generateOrderNumber()
    const ecpayTradeNo =
      form.paymentMethod === 'ecpay_credit' ? generateEcpayTradeNo() : null

    setTimeout(() => {
      setSubmitting(false)
      setCompletedOrder({
        orderNumber,
        ecpayTradeNo,
        createdAt: new Date().toLocaleString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        customer: { ...form },
        items: snapshotItems,
        subtotal,
        shippingFee,
        totalAmount,
      })
      onOrderComplete()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 650)
  }

  if (completedOrder) {
    const isCredit = completedOrder.customer.paymentMethod === 'ecpay_credit'
    return (
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="animate-slide-up overflow-hidden rounded-2xl border border-stone-border bg-alabaster shadow-sm">
          <div className="border-b border-stone-border bg-ivory px-6 py-10 text-center sm:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-moss-100 text-moss-700">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="mt-4 font-display text-xs tracking-[0.26em] text-cedar-600 uppercase">
              ORDER CONFIRMED
            </p>
            <h1 className="mt-2 font-serif text-2xl font-medium tracking-[0.06em] text-wood-900 sm:text-3xl">
              感謝您的訂購，我們已收到您的訂單
            </h1>
            <p className="mt-2 text-sm text-wood-600">
              訂單確認信（模擬）將寄送至 {completedOrder.customer.email}
            </p>

            <div className="mt-6 inline-flex flex-col items-center gap-1 rounded-xl border border-stone-border bg-alabaster px-6 py-3.5 sm:flex-row sm:gap-4">
              <span className="text-xs tracking-[0.12em] text-wood-500">模擬訂單編號</span>
              <span
                id="order-confirmation-number"
                className="font-mono text-base font-semibold tracking-wider text-wood-900"
              >
                {completedOrder.orderNumber}
              </span>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-10">
            {/* Order Metadata */}
            <div className="grid gap-4 rounded-xl bg-ivory/70 p-5 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs tracking-[0.1em] text-wood-500">收件人資訊</p>
                <p className="mt-1.5 font-medium text-wood-900">
                  {completedOrder.customer.fullName}
                </p>
                <p className="mt-0.5 text-wood-600">{completedOrder.customer.phone}</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.1em] text-wood-500">付款與配送方式</p>
                <p className="mt-1.5 font-medium text-wood-900">
                  {isCredit
                    ? '信用卡一次付清（綠界 ECPay 預留介面）'
                    : `超商取貨付款（${completedOrder.customer.cvsBrand}）`}
                </p>
                <p className="mt-0.5 text-wood-600">
                  {isCredit
                    ? completedOrder.customer.address
                    : `取貨門市：${completedOrder.customer.cvsStore}`}
                </p>
                {completedOrder.ecpayTradeNo && (
                  <p className="mt-1 font-mono text-xs text-moss-700">
                    ECPay 預留交易編號：{completedOrder.ecpayTradeNo}
                  </p>
                )}
              </div>
            </div>

            {/* Purchased Items */}
            <div>
              <h2 className="text-xs font-medium tracking-[0.14em] text-wood-500 uppercase">
                訂購商品明細
              </h2>
              <ul className="mt-3 divide-y divide-stone-border/80 border-y border-stone-border/80">
                {completedOrder.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 py-3.5 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-serif font-medium text-wood-900">{item.name}</p>
                        <p className="text-xs text-wood-500">
                          {item.volume} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-wood-900 tabular-nums">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-wood-600">
                  <span>商品小計</span>
                  <span className="tabular-nums">
                    {formatCurrency(completedOrder.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-wood-600">
                  <span>運費</span>
                  <span className="tabular-nums">
                    {completedOrder.shippingFee === 0
                      ? '免運優惠'
                      : formatCurrency(completedOrder.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-base font-medium text-wood-900">
                  <span>實付金額</span>
                  <span className="tabular-nums">
                    {formatCurrency(completedOrder.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
              <p className="text-xs text-wood-500">
                建立時間：{completedOrder.createdAt}（此為前端結帳模擬畫面）
              </p>
              <button
                id="order-back-home-btn"
                type="button"
                onClick={onBackToShop}
                className="inline-flex items-center justify-center rounded-full bg-wood-900 px-7 py-3 text-sm font-medium tracking-[0.14em] text-ivory transition-colors hover:bg-cedar-600"
              >
                返回首頁繼續選購
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <button
        id="checkout-back-btn"
        type="button"
        onClick={onBackToShop}
        className="inline-flex items-center gap-2 text-sm tracking-[0.1em] text-wood-600 transition-colors hover:text-wood-900"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>返回選品商店</span>
      </button>

      <div className="mt-5 border-b border-stone-border pb-6">
        <p className="font-display text-xs tracking-[0.26em] text-cedar-600 uppercase">
          CHECKOUT
        </p>
        <h1 className="mt-2 font-serif text-2xl font-medium tracking-[0.06em] text-wood-900 sm:text-3xl">
          填寫收件與付款資訊
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-stone-border bg-alabaster p-10 text-center">
          <p className="font-serif text-lg text-wood-900">目前購物車內尚無商品</p>
          <button
            type="button"
            onClick={onBackToShop}
            className="mt-5 rounded-full bg-wood-900 px-6 py-3 text-sm tracking-[0.12em] text-ivory transition-colors hover:bg-cedar-600"
          >
            前往挑選香氛選品
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start"
        >
          {/* Left Form Column */}
          <div className="space-y-6 lg:col-span-7">
            {/* Step 1: Recipient Info */}
            <div className="rounded-2xl border border-stone-border bg-alabaster p-6 sm:p-7">
              <h2 className="flex items-center gap-2.5 font-serif text-lg font-medium text-wood-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-wood-900 font-sans text-xs text-ivory">
                  1
                </span>
                收件人資料
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs font-medium tracking-[0.08em] text-wood-700"
                  >
                    收件人姓名 <span className="text-cedar-600">*</span>
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="例：林語柔"
                    className="mt-1.5 w-full rounded-xl border border-stone-border bg-ivory/60 px-4 py-2.5 text-sm text-wood-900 placeholder:text-wood-400 focus:border-wood-800 focus:bg-alabaster focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-700">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-xs font-medium tracking-[0.08em] text-wood-700"
                  >
                    手機號碼 <span className="text-cedar-600">*</span>
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="0912345678"
                    className="mt-1.5 w-full rounded-xl border border-stone-border bg-ivory/60 px-4 py-2.5 text-sm text-wood-900 placeholder:text-wood-400 focus:border-wood-800 focus:bg-alabaster focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-700">{errors.phone}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-email"
                    className="block text-xs font-medium tracking-[0.08em] text-wood-700"
                  >
                    電子郵件（接收訂單通知） <span className="text-cedar-600">*</span>
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-xl border border-stone-border bg-ivory/60 px-4 py-2.5 text-sm text-wood-900 placeholder:text-wood-400 focus:border-wood-800 focus:bg-alabaster focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-700">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Payment & Delivery Method */}
            <div className="rounded-2xl border border-stone-border bg-alabaster p-6 sm:p-7">
              <h2 className="flex items-center gap-2.5 font-serif text-lg font-medium text-wood-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-wood-900 font-sans text-xs text-ivory">
                  2
                </span>
                付款與配送方式
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {/* Option 1: CVS COD */}
                <label
                  htmlFor="payment-cvs"
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                    form.paymentMethod === 'cvs_cod'
                      ? 'border-wood-900 bg-ivory shadow-xs'
                      : 'border-stone-border bg-alabaster hover:border-wood-400'
                  }`}
                >
                  <input
                    id="payment-cvs"
                    type="radio"
                    name="paymentMethod"
                    value="cvs_cod"
                    checked={form.paymentMethod === 'cvs_cod'}
                    onChange={() => updateField('paymentMethod', 'cvs_cod')}
                    className="mt-1 accent-wood-900"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-wood-900">
                      <Store className="h-4 w-4 text-cedar-600" />
                      <span>超商取貨付款</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-wood-500">
                      支援 7-ELEVEN、全家門市取貨時現金付款
                    </p>
                  </div>
                </label>

                {/* Option 2: Credit Card ECPay */}
                <label
                  htmlFor="payment-ecpay"
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                    form.paymentMethod === 'ecpay_credit'
                      ? 'border-wood-900 bg-ivory shadow-xs'
                      : 'border-stone-border bg-alabaster hover:border-wood-400'
                  }`}
                >
                  <input
                    id="payment-ecpay"
                    type="radio"
                    name="paymentMethod"
                    value="ecpay_credit"
                    checked={form.paymentMethod === 'ecpay_credit'}
                    onChange={() => updateField('paymentMethod', 'ecpay_credit')}
                    className="mt-1 accent-wood-900"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-wood-900">
                      <CreditCard className="h-4 w-4 text-cedar-600" />
                      <span>信用卡一次付清</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-wood-500">
                      綠界科技 ECPay 安全金流預留介面（宅配到府）
                    </p>
                  </div>
                </label>
              </div>

              {/* Dynamic Sub-fields based on Payment Selection */}
              {form.paymentMethod === 'cvs_cod' ? (
                <div className="mt-5 space-y-4 rounded-xl border border-stone-border/80 bg-ivory/70 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium tracking-[0.08em] text-wood-700">
                      選擇超商通路
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          'cvsStore',
                          form.cvsBrand === '7-ELEVEN'
                            ? '大安仁愛門市（店號 192847）'
                            : '台北忠孝敦化店（店號 014829）'
                        )
                      }
                      className="text-xs text-cedar-600 underline underline-offset-4 hover:text-wood-900"
                    >
                      帶入示範門市
                    </button>
                  </div>

                  <div className="flex gap-2.5">
                    {['7-ELEVEN', '全家 FamilyMart'].map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => updateField('cvsBrand', brand)}
                        className={`rounded-lg border px-4 py-2 text-xs font-medium transition-colors ${
                          form.cvsBrand === brand
                            ? 'border-wood-900 bg-wood-900 text-ivory'
                            : 'border-stone-border bg-alabaster text-wood-700 hover:bg-linen'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-cvs-store"
                      className="block text-xs font-medium tracking-[0.08em] text-wood-700"
                    >
                      取貨門市名稱／店號 <span className="text-cedar-600">*</span>
                    </label>
                    <input
                      id="checkout-cvs-store"
                      type="text"
                      value={form.cvsStore}
                      onChange={(e) => updateField('cvsStore', e.target.value)}
                      placeholder="例：大安仁愛門市（店號 192847）"
                      className="mt-1.5 w-full rounded-xl border border-stone-border bg-alabaster px-4 py-2.5 text-sm text-wood-900 placeholder:text-wood-400 focus:border-wood-800 focus:outline-none"
                    />
                    {errors.cvsStore && (
                      <p className="mt-1 text-xs text-red-700">{errors.cvsStore}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-5 space-y-4 rounded-xl border border-stone-border/80 bg-ivory/70 p-4 sm:p-5">
                  {/* ECPay Reserved Payment Interface Card */}
                  <div className="rounded-xl border border-moss-600/25 bg-alabaster p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-moss-700" />
                        <span className="text-xs font-semibold tracking-[0.08em] text-wood-900">
                          綠界科技 ECPay 信用卡一次付清（金流預留介面）
                        </span>
                      </div>
                      <span className="rounded-full bg-moss-100 px-2.5 py-0.5 text-[11px] font-medium text-moss-700">
                        TLS 1.3 · 3D 驗證預留
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-wood-600">
                      正式上線後將串接綠界 AIO 全方位金流（CheckMacValue 簽章驗證與安全刷卡頁跳轉）。此原型階段可直接送出訂單以體驗模擬交易回傳與訂單編號產生流程。
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-medium tracking-wider text-wood-600">
                      <span className="rounded border border-stone-border bg-ivory px-2.5 py-1">
                        VISA
                      </span>
                      <span className="rounded border border-stone-border bg-ivory px-2.5 py-1">
                        Mastercard
                      </span>
                      <span className="rounded border border-stone-border bg-ivory px-2.5 py-1">
                        JCB
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1 text-wood-500">
                        <Lock className="h-3 w-3" />
                        ECPay Gateway Ready
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-address"
                      className="flex items-center gap-1.5 text-xs font-medium tracking-[0.08em] text-wood-700"
                    >
                      <MapPin className="h-3.5 w-3.5 text-cedar-600" />
                      <span>宅配收件地址</span>
                      <span className="text-cedar-600">*</span>
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      value={form.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      placeholder="例：台北市大安區仁愛路四段 100 號 5 樓"
                      className="mt-1.5 w-full rounded-xl border border-stone-border bg-alabaster px-4 py-2.5 text-sm text-wood-900 placeholder:text-wood-400 focus:border-wood-800 focus:outline-none"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-700">{errors.address}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Optional Order Note */}
              <div className="mt-5">
                <label
                  htmlFor="checkout-note"
                  className="block text-xs font-medium tracking-[0.08em] text-wood-700"
                >
                  訂單備註／禮盒手寫小卡留言（選填）
                </label>
                <textarea
                  id="checkout-note"
                  rows={2}
                  value={form.note}
                  onChange={(e) => updateField('note', e.target.value)}
                  placeholder="若有送禮手寫卡片內容或配送時段需求，可填寫於此"
                  className="mt-1.5 w-full rounded-xl border border-stone-border bg-ivory/60 px-4 py-2.5 text-sm text-wood-900 placeholder:text-wood-400 focus:border-wood-800 focus:bg-alabaster focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Order Summary Sidebar */}
          <aside className="rounded-2xl border border-stone-border bg-alabaster p-6 sm:p-7 lg:sticky lg:top-24 lg:col-span-5">
            <h2 className="flex items-center gap-2 font-serif text-lg font-medium text-wood-900">
              <Package className="h-4.5 w-4.5 text-cedar-600" />
              <span>訂單明細</span>
            </h2>

            <ul className="mt-5 divide-y divide-stone-border/80">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3.5 py-3.5 first:pt-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-13 shrink-0 rounded-lg border border-stone-border/70 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-sm font-medium text-wood-900">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-wood-500">
                      {item.volume} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-wood-900 tabular-nums">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2.5 border-t border-stone-border pt-5 text-sm">
              <div className="flex justify-between text-wood-600">
                <span>商品小計</span>
                <span className="tabular-nums">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-wood-600">
                <span>運費（滿 {formatCurrency(FREE_SHIPPING_THRESHOLD)} 免運）</span>
                <span
                  className={`tabular-nums ${
                    isFreeShipping ? 'font-medium text-moss-700' : ''
                  }`}
                >
                  {isFreeShipping ? '免運優惠' : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-stone-border pt-3 text-base font-semibold text-wood-900">
                <span>應付總計</span>
                <span className="tabular-nums">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <button
              id="checkout-submit-btn"
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wood-900 px-6 py-3.5 text-sm font-medium tracking-[0.14em] text-ivory transition-colors hover:bg-cedar-600 disabled:cursor-not-allowed disabled:opacity-65"
            >
              {submitting
                ? '正在建立模擬訂單…'
                : form.paymentMethod === 'ecpay_credit'
                  ? `確認送出（模擬綠界結帳 · ${formatCurrency(totalAmount)}）`
                  : `送出訂單（${formatCurrency(totalAmount)}）`}
            </button>

            <p className="mt-3 text-center text-[11px] leading-5 text-wood-500">
              本頁面為品牌電商前台原型，送出後僅產生模擬訂單編號，不會進行實際扣款。
            </p>
          </aside>
        </form>
      )}
    </section>
  )
}
