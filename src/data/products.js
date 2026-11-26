export const FREE_SHIPPING_THRESHOLD = 1500
export const SHIPPING_FEE = 80

export const CATEGORIES = ['全部', '織品噴霧', '室內擴香', '禮盒組']

export const formatCurrency = (amount) =>
  `NT$${Number(amount).toLocaleString('zh-TW')}`

export const products = [
  {
    id: 'fabric-01',
    name: '晨霧雪松織品噴霧',
    englishName: 'Morning Cedar Fabric Mist',
    category: '織品噴霧',
    price: 780,
    volume: '100 ml',
    scentFamily: '清透木質調',
    tag: '人氣推薦',
    notes: {
      top: '佛手柑、冷杉針葉',
      middle: '白茶、日本扁柏',
      base: '大西洋雪松、白麝香',
    },
    description:
      '宛如推開山間木屋窗櫺時拂面而來的微涼晨霧。以柔和穀物發酵酒精搭配天然植萃除味因子，輕噴於寢具、亞麻窗簾或大衣織品，瞬間撫平外出的雜味，留下乾淨沉穩的雪松氣息。',
    usage: '距離織品約 20–30 公分均勻噴灑 2–3 下，靜待自然風乾即可；亦適合睡前輕噴於枕套角落。',
    image: '/images/product-cedar-mist.jpg',
  },
  {
    id: 'fabric-02',
    name: '無花果與暖棉織品噴霧',
    englishName: 'Fig & Warm Linen Mist',
    category: '織品噴霧',
    price: 820,
    volume: '100 ml',
    scentFamily: '柔潤奶木調',
    tag: '新品上架',
    notes: {
      top: '青無花果葉、白梨',
      middle: '棉麻花、鳶尾根',
      base: '溫潤檀木、淡琥珀',
    },
    description:
      '捕捉午後陽光曬過白棉床單的鬆軟溫度。微青的無花果葉帶出清甜草本序曲，中後調緩緩轉為細膩奶香與溫潤檀木，為沙發抱枕與針織毛衣披上一層低調而療癒的柔軟濾鏡。',
    usage: '建議於衣櫥換季收納或午後整理臥室時使用，每次按壓 2–4 下，淡雅留香可持續 4–6 小時。',
    image: '/images/product-fig-mist.jpg',
  },
  {
    id: 'diffuser-01',
    name: '靜謐檜木室內擴香',
    englishName: 'Hinoki Sanctuary Reed Diffuser',
    category: '室內擴香',
    price: 1480,
    volume: '200 ml（附天然藤枝 6 支）',
    scentFamily: '沉靜森林調',
    tag: '經典常銷',
    notes: {
      top: '澳洲尤加利、日本柚子',
      middle: '台灣紅檜、阿曼乳香',
      base: '岩蘭草、林間苔蘚、古木',
    },
    description:
      '將霧氣繚繞的台灣高山林地收進琥珀藥瓶之中。採用低揮發植物性擴香基底與手選天然藤枝，緩慢釋放紅檜與乳香交織的安定木韻，特別適合置於客廳邊几、玄關或專注閱讀的書房。',
    usage: '初次使用建議放入 4–5 支藤枝，約 24 小時後翻轉一次；每 2 週翻轉藤枝可維持穩定擴香，單瓶約可使用 10–12 週。',
    image: '/images/product-hinoki-diffuser.jpg',
  },
  {
    id: 'diffuser-02',
    name: '焙茶烏龍室內擴香',
    englishName: 'Roasted Oolong Reed Diffuser',
    category: '室內擴香',
    price: 1520,
    volume: '200 ml（附天然藤枝 6 支）',
    scentFamily: '溫潤茶木調',
    tag: '職人調製',
    notes: {
      top: '炭焙凍頂烏龍、秋桂',
      middle: '發酵紅茶、乾燥無花果',
      base: '癒創木、零陵香豆',
    },
    description:
      '以台灣傳統炭焙茶香為靈感，揉合一縷清雅桂花與深沉癒創木。不甜不膩的烘焙茶韻如同陰雨午後的溫熱陶杯，為居家空間注入緩慢而溫厚的東方留白美學。',
    usage: '適合 5–8 坪居家空間；可依個人對香氣濃淡的偏好增減藤枝支數，避免置於陽光直射或出風口處。',
    image: '/images/product-oolong-diffuser.jpg',
  },
  {
    id: 'gift-01',
    name: '暮色森語香氛禮盒組',
    englishName: 'Dusk Forest Ritual Gift Set',
    category: '禮盒組',
    price: 2180,
    volume: '室內擴香 150 ml + 織品噴霧 100 ml',
    scentFamily: '森木草本調',
    tag: '免運精選',
    notes: {
      top: '苦橙葉、松針',
      middle: '台灣檜木、高地薰衣草',
      base: '雪松、檀香、廣藿香',
    },
    description:
      '結合空間擴香與隨手可噴的織品噴霧，一次建立完整的居家氣味儀式。外盒採用未漂白棉麻紋硬盒，繫以原色亞麻緞帶並附贈手寫祝福小卡，無論喬遷賀禮或節慶致意皆體面大方。',
    usage: '客廳與玄關擺放擴香定調空間氣息，臥室寢具則以織品噴霧疊香，讓木質香氣自然延續至夜晚。',
    image: '/images/product-forest-gift.jpg',
  },
  {
    id: 'gift-02',
    name: '日常留白雙重香氛禮盒',
    englishName: 'Stillness Daily Duo Gift Box',
    category: '禮盒組',
    price: 1680,
    volume: '織品噴霧 50 ml × 2 + 雕刻擴香石 1 入',
    scentFamily: '白茶花木調',
    tag: '送禮首選',
    notes: {
      top: '白茶、義大利佛手柑',
      middle: '青無花果、鳶尾花',
      base: '白麝香、絲柏木',
    },
    description:
      '一次收藏「晨霧雪松」與「無花果與暖棉」兩款隨行織品噴霧，搭配手工素燒白瓷枝葉雕刻擴香石與黃銅吊環。可懸掛於衣櫃、車內或床頭，隨時為日常留下一處安靜的呼吸角落。',
    usage: '將噴霧均勻噴灑於擴香石表面 2–3 下待其吸收即可緩緩散香，香味變淡時隨時補噴即可重複使用。',
    image: '/images/product-duo-gift.jpg',
  },
]
