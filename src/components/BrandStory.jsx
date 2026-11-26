import { Leaf, PackageCheck, Wind } from 'lucide-react'

const PILLARS = [
  {
    icon: Leaf,
    title: '植物性溫和配方',
    desc: '嚴選穀物發酵酒精與 IFRA 國際認證天然精油，無添加人工定香劑與鄰苯二甲酸酯。',
  },
  {
    icon: Wind,
    title: '三段式層次調香',
    desc: '如香水般細緻講究前、中、後調的節奏轉折，不刺鼻、不張揚，只留下貼近呼吸的木質溫潤。',
  },
  {
    icon: PackageCheck,
    title: '永續琥珀藥瓶',
    desc: '厚實抗 UV 琥珀玻璃可妥善保存精油活性，使用完畢後亦能成為插枝花器延續器物生命。',
  },
]

export default function BrandStory() {
  return (
    <section
      id="brand-story"
      className="scroll-mt-20 border-b border-stone-border/70 bg-linen/60 py-16 sm:py-22"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Atelier Photo */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-stone-border bg-alabaster shadow-sm">
              <img
                src="/images/brand-story.jpg"
                alt="MOKKA 沐木香氛工坊木桌上的天然檜木塊與琥珀色精油瓶"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-6">
            <p className="font-display text-xs tracking-[0.28em] text-cedar-600 uppercase">
              OUR PHILOSOPHY
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-snug font-medium tracking-[0.06em] text-wood-900 sm:text-3xl">
              把森林與器物的靜謐，
              <br />
              織進每日歸家的片刻
            </h2>
            <p className="mt-5 text-sm leading-8 tracking-[0.03em] text-wood-600 sm:text-[15px]">
              「沐木 MOKKA」誕生於台北一條安靜的舊木巷弄。我們相信好的空間氣味不該喧賓奪主，而是像午後落在米白牆面的斜陽、掌心溫熱的陶杯與剛曬乾的棉麻布料，靜靜承接一整天的疲憊。
            </p>

            <div className="mt-8 space-y-5 border-t border-stone-border pt-7">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <div key={pillar.title} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-border bg-alabaster text-cedar-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium tracking-[0.08em] text-wood-900">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-xs leading-6 tracking-[0.03em] text-wood-600 sm:text-sm">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
