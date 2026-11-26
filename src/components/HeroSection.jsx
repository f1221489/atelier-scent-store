import { ArrowDownRight, Sparkles } from 'lucide-react'

export default function HeroSection({ onExploreCatalog }) {
  return (
    <section className="relative overflow-hidden border-b border-stone-border/70 bg-ivory">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-22">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Copy */}
          <div className="order-2 flex flex-col items-start lg:order-1 lg:col-span-5">
            <p className="font-display text-sm tracking-[0.28em] text-cedar-600 uppercase">
              MOKKA ATELIER · TAIPEI
            </p>
            <h1 className="mt-4 font-serif text-3xl leading-[1.35] font-medium tracking-[0.06em] text-wood-900 sm:text-4xl lg:text-[2.65rem]">
              以木質微光，
              <br />
              溫柔安放日常呼吸
            </h1>
            <p className="mt-5 max-w-md text-sm leading-8 tracking-[0.04em] text-wood-600 sm:text-[15px]">
              從清晨亞麻床單上的一縷雪松霧氣，到傍晚書房裡緩緩沉澱的紅檜與炭焙烏龍。沐木以小批次天然植萃調香，讓氣味成為回家後最柔軟的片刻留白。
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                id="hero-explore-btn"
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 rounded-full bg-wood-900 px-7 py-3.5 text-sm tracking-[0.14em] text-ivory transition-all hover:bg-wood-800 hover:shadow-md"
              >
                <span>探索香氛選品</span>
                <ArrowDownRight className="h-4 w-4" />
              </button>
              <a
                href="#brand-story"
                className="inline-flex items-center gap-2 rounded-full border border-stone-border bg-alabaster px-6 py-3.5 text-sm tracking-[0.14em] text-wood-800 transition-colors hover:border-wood-700 hover:bg-linen"
              >
                品牌故事
              </a>
            </div>

            {/* Subtle Key Benefits */}
            <div className="mt-10 grid w-full max-w-md grid-cols-3 gap-4 border-t border-stone-border pt-6 text-left">
              <div>
                <p className="font-display text-lg font-medium text-wood-900">100%</p>
                <p className="mt-0.5 text-xs tracking-[0.06em] text-wood-500">植物萃取基底</p>
              </div>
              <div>
                <p className="font-display text-lg font-medium text-wood-900">NT$1,500</p>
                <p className="mt-0.5 text-xs tracking-[0.06em] text-wood-500">全館滿額免運</p>
              </div>
              <div>
                <p className="font-display text-lg font-medium text-wood-900">Handmade</p>
                <p className="mt-0.5 text-xs tracking-[0.06em] text-wood-500">台北小批次灌裝</p>
              </div>
            </div>
          </div>

          {/* Hero Photography */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-stone-border bg-linen shadow-[0_24px_60px_-28px_rgba(44,34,30,0.28)]">
              <img
                src="/images/hero-banner.jpg"
                alt="MOKKA 沐木琥珀玻璃室內擴香與織品噴霧陳列於胡桃木桌與米白牆光影間"
                className="aspect-[16/11] w-full object-cover sm:aspect-[16/10]"
              />
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-border/80 bg-alabaster/95 px-5 py-3.5 text-xs text-wood-600 backdrop-blur-sm">
                <span className="inline-flex items-center gap-1.5 tracking-[0.12em] text-wood-800">
                  <Sparkles className="h-3.5 w-3.5 text-cedar-600" />
                  季節主打｜晨霧雪松 × 靜謐檜木
                </span>
                <span className="font-display tracking-[0.16em] text-wood-500">
                  AUTUMN / WINTER COLLECTION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
