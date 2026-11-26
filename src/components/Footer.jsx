import { CATEGORIES } from '../data/products'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer({ onSelectCategory }) {
  const handleQuickJump = (category) => {
    onSelectCategory(category)
    const el = document.getElementById('catalog')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="border-t border-wood-800 bg-wood-900 text-ivory/85">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl tracking-[0.24em] text-ivory">MOKKA</p>
            <p className="mt-1 text-xs tracking-[0.2em] text-cedar-200/80">
              沐木質感生活與香氛選品
            </p>
            <p className="mt-4 max-w-sm text-xs leading-7 tracking-[0.04em] text-ivory/65">
              以溫潤木質調與植物萃取精油，為日常居家織就安靜而長久的氣味風景。全館消費滿 NT$1,500 即享台灣本島免運優惠。
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-medium tracking-[0.18em] text-cedar-200">
              香氛選品分類
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory/75">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => handleQuickJump(category)}
                    className="transition-colors hover:text-ivory"
                  >
                    {category === '全部' ? '全部選品' : category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-medium tracking-[0.18em] text-cedar-200">
              工坊與客服資訊
            </h3>
            <ul className="mt-4 space-y-2 text-xs leading-6 tracking-[0.04em] text-ivory/70">
              <li>台北選物空間｜台北市大安區青田街 12 巷 8 號</li>
              <li>營業時間｜週三至週日 13:00 – 20:00</li>
              <li>客服信箱｜atelier@mokka-scent.example</li>
              <li>金流支援｜超商取貨付款／綠界 ECPay 信用卡（預留介面）</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-wood-800 pt-6 text-[11px] tracking-[0.08em] text-ivory/50 sm:flex-row">
          <p>© {CURRENT_YEAR} MOKKA ATELIER 沐木選品. All rights reserved.</p>
          <p>Cloudflare Pages SPA Ready · Storefront Prototype</p>
        </div>
      </div>
    </footer>
  )
}
