import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/09fe8f31-1ba9-4477-9be4-8d415a6253c0/files/1985da40-8fdc-476d-8512-37fa9571a532.jpg";
const CARD_IMAGE = "https://cdn.poehali.dev/projects/09fe8f31-1ba9-4477-9be4-8d415a6253c0/files/5bee2289-15df-49ef-aedc-81abe53d5e5a.jpg";

const accounts = [
  {
    id: 1,
    name: "PRO GAMER X",
    level: 87,
    price: 4200,
    oldPrice: 6500,
    games: 312,
    hours: 8420,
    rarity: "Легендарный",
    games_list: ["CS2", "Dota 2", "PUBG", "+309"],
    verified: true,
    badge: "ТОП",
    discount: 35,
    image: CARD_IMAGE,
    login: "fgghnnd",
    password: "hfbbj",
  },
  {
    id: 2,
    name: "SHADOW MASTER",
    level: 54,
    price: 1890,
    oldPrice: 2800,
    games: 124,
    hours: 3210,
    rarity: "Редкий",
    games_list: ["Rust", "GTA V", "Witcher 3", "+121"],
    verified: true,
    badge: "ХИТ",
    discount: 32,
    image: CARD_IMAGE,
    login: "shadow_master54",
    password: "Sh4d0w#Master",
  },
  {
    id: 3,
    name: "NIGHT CRAWLER",
    level: 33,
    price: 890,
    oldPrice: null,
    games: 67,
    hours: 1540,
    rarity: "Обычный",
    games_list: ["Minecraft", "Terraria", "Valheim", "+64"],
    verified: true,
    badge: null,
    discount: null,
    image: CARD_IMAGE,
    login: "night_crawler33",
    password: "N1ght$Cr4wl",
  },
  {
    id: 4,
    name: "ELITE FORCE",
    level: 142,
    price: 9800,
    oldPrice: 14500,
    games: 567,
    hours: 22000,
    rarity: "Мифический",
    games_list: ["CS2", "Dota 2", "TF2", "+564"],
    verified: true,
    badge: "RARE",
    discount: 32,
    image: CARD_IMAGE,
    login: "elite_force_142",
    password: "3l1te!F0rce#",
  },
  {
    id: 5,
    name: "STEEL WALKER",
    level: 21,
    price: 450,
    oldPrice: null,
    games: 34,
    hours: 780,
    rarity: "Обычный",
    games_list: ["Among Us", "Stardew Valley", "+32"],
    verified: false,
    badge: "НОВЫЙ",
    discount: null,
    image: CARD_IMAGE,
    login: "steel_walker21",
    password: "St33l@Walk3r",
  },
  {
    id: 6,
    name: "CYBER PHANTOM",
    level: 68,
    price: 3100,
    oldPrice: 4200,
    games: 198,
    hours: 5600,
    rarity: "Эпический",
    games_list: ["Cyberpunk 2077", "Elden Ring", "Sekiro", "+195"],
    verified: true,
    badge: "🔥",
    discount: 26,
    image: CARD_IMAGE,
    login: "cyber_phantom68",
    password: "Cyb3r#Ph4ntom",
  },
];

const navItems = ["Каталог", "Промокоды", "О нас", "Контакты"];

export default function Index() {
  const [activeNav, setActiveNav] = useState("Каталог");
  const [activePage, setActivePage] = useState("home");
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [priceFilter, setPriceFilter] = useState([0, 15000]);
  const [levelFilter, setLevelFilter] = useState("all");
  const [rarityFilter, setRarityFilter] = useState("all");
  const [accountModal, setAccountModal] = useState<null | (typeof accounts)[0]>(null);
  const [twoFAOpen, setTwoFAOpen] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  const [twoFAVerified, setTwoFAVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("gamer@example.com");
  const [checkingAccount, setCheckingAccount] = useState<null | number>(null);
  const [checkedAccounts, setCheckedAccounts] = useState<number[]>([]);
  const [purchasedIds, setPurchasedIds] = useState<number[]>([]);
  const [showCredentials, setShowCredentials] = useState<null | (typeof accounts)[0]>(null);
  const [revealedPasswords, setRevealedPasswords] = useState<number[]>([]);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const filteredAccounts = accounts.filter((a) => {
    const inPrice = a.price >= priceFilter[0] && a.price <= priceFilter[1];
    const inLevel =
      levelFilter === "all" ||
      (levelFilter === "low" && a.level < 30) ||
      (levelFilter === "mid" && a.level >= 30 && a.level < 70) ||
      (levelFilter === "high" && a.level >= 70);
    const inRarity =
      rarityFilter === "all" || a.rarity === rarityFilter;
    return inPrice && inLevel && inRarity;
  });

  const cartAccounts = accounts.filter((a) => cartItems.includes(a.id));
  const cartTotal = cartAccounts.reduce((s, a) => s + a.price, 0);
  const cartFinal = promoDiscount === 100 ? 0 : Math.round(cartTotal * (1 - promoDiscount / 100));

  function addToCart(id: number) {
    if (!cartItems.includes(id)) setCartItems([...cartItems, id]);
  }

  function removeFromCart(id: number) {
    setCartItems(cartItems.filter((i) => i !== id));
  }

  function applyPromo() {
    const code = promoCode.trim().toUpperCase();
    if (code === "DEVELOPER") {
      setPromoApplied(true);
      setPromoDiscount(100);
      setPromoError(false);
    } else if (code === "SALE20") {
      setPromoApplied(true);
      setPromoDiscount(20);
      setPromoError(false);
    } else if (code === "GAME10") {
      setPromoApplied(true);
      setPromoDiscount(10);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  }

  function checkAccount(id: number) {
    setCheckingAccount(id);
    setTimeout(() => {
      setCheckingAccount(null);
      setCheckedAccounts((prev) => [...prev, id]);
    }, 2000);
  }

  function verify2FA() {
    if (twoFACode === "123456") {
      setTwoFAVerified(true);
      setTwoFAOpen(false);
    }
  }

  const rarityColor: Record<string, string> = {
    Легендарный: "text-yellow-400 border-yellow-500/40 bg-yellow-500/10",
    Мифический: "text-red-400 border-red-500/40 bg-red-500/10",
    Эпический: "text-purple-400 border-purple-500/40 bg-purple-500/10",
    Редкий: "text-blue-400 border-blue-500/40 bg-blue-500/10",
    Обычный: "text-gray-400 border-gray-500/40 bg-gray-500/10",
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg neon-border flex items-center justify-center animate-glow" style={{ background: "linear-gradient(135deg, #00d4ff22, #00d4ff08)" }}>
              <Icon name="Gamepad2" size={18} className="text-cyan-400" />
            </div>
            <span className="font-rajdhani font-bold text-xl tracking-widest neon-text uppercase">SteamMarket</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveNav(item);
                  setActivePage(item === "Промокоды" ? "promos" : item === "О нас" ? "about" : "home");
                  setCartOpen(false);
                }}
                className={`nav-link ${activeNav === item ? "active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-lg transition-all hover:bg-cyan-500/10"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <Icon name="ShoppingCart" size={20} className="text-cyan-400" />
              {cartItems.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-black font-rajdhani"
                  style={{ background: "var(--neon-cyan)" }}
                >
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              className="p-2 rounded-lg transition-all hover:bg-purple-500/10"
              onClick={() => {
                setActivePage(activePage === "profile" ? "home" : "profile");
                setCartOpen(false);
              }}
            >
              <Icon name="User" size={20} className="text-purple-400" />
            </button>
          </div>
        </div>
      </nav>

      {/* CART DROPDOWN */}
      {cartOpen && (
        <div
          className="fixed top-16 right-4 z-50 w-96 rounded-2xl p-5 shadow-2xl"
          style={{ background: "var(--dark-card2)", border: "1px solid rgba(0,212,255,0.2)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-rajdhani font-bold text-lg tracking-wide text-white">Корзина</span>
            <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-white transition-colors">
              <Icon name="X" size={18} />
            </button>
          </div>
          {cartAccounts.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-6">Корзина пуста</p>
          ) : (
            <>
              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
                {cartAccounts.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)" }}
                  >
                    <div className="flex-1">
                      <p className="font-rajdhani font-bold text-sm text-white">{a.name}</p>
                      <p className="text-xs text-gray-500">Ур. {a.level} · {a.games} игр</p>
                    </div>
                    <span className="price-tag text-sm">{a.price.toLocaleString()} ₽</span>
                    <button onClick={() => removeFromCart(a.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex gap-2 mb-3">
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Промокод"
                    className="flex-1 px-3 py-2 rounded-lg text-sm text-white placeholder-gray-600 outline-none"
                    style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}
                  />
                  <button onClick={applyPromo} className="px-4 py-2 rounded-lg text-sm font-rajdhani font-bold neon-btn">
                    OK
                  </button>
                </div>
                {promoApplied && (
                  <div
                    className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg"
                    style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)" }}
                  >
                    <Icon name="CheckCircle" size={14} className="text-green-400" />
                    <span className="text-green-400 text-xs font-rajdhani font-semibold">
                      {promoDiscount === 100 ? "DEVELOPER: Скидка 100%! 🎉" : `Скидка ${promoDiscount}% применена`}
                    </span>
                  </div>
                )}
                {promoError && (
                  <p className="text-red-400 text-xs mb-3 font-rajdhani">Неверный промокод</p>
                )}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Скидка</span>
                    <span className="text-red-400">-{(cartTotal - cartFinal).toLocaleString()} ₽</span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm">Итого</span>
                  <span className="price-tag text-xl">{cartFinal.toLocaleString()} ₽</span>
                </div>
                <button
                  className="w-full py-3 rounded-xl neon-btn text-sm"
                  onClick={() => {
                    setPurchasedIds((prev) => [...new Set([...prev, ...cartItems])]);
                    setCartItems([]);
                    setCartOpen(false);
                    setOrderSuccess(true);
                    setPromoCode("");
                    setPromoApplied(false);
                    setPromoDiscount(0);
                    setActiveNav("Личный кабинет");
                    setActivePage("profile");
                  }}
                >
                  Оформить заказ
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* HOME PAGE */}
      {activePage === "home" && (
        <>
          {/* HERO */}
          <section className="pt-16 relative overflow-hidden" style={{ minHeight: "520px" }}>
            <div className="absolute inset-0">
              <img src={HERO_IMAGE} alt="hero" className="w-full h-full object-cover opacity-25" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(10,14,26,0.3) 0%, rgba(10,14,26,1) 100%)" }}
              />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-16">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="verified-badge px-3 py-1 rounded-full text-xs uppercase tracking-widest">Проверено</span>
                  <span className="text-gray-500 text-xs">Более 2000 аккаунтов</span>
                </div>
                <h1 className="font-rajdhani font-bold mb-4 leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                  <span className="text-white">Купи свой</span>
                  <br />
                  <span className="neon-text">Steam аккаунт</span>
                </h1>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
                  Проверенные аккаунты с сотнями игр. Мгновенная передача. Двухфакторная защита.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-8 py-3.5 rounded-xl neon-btn text-base">
                    Смотреть каталог
                  </button>
                  <button
                    onClick={() => { setActivePage("promos"); setActiveNav("Промокоды"); }}
                    className="px-8 py-3.5 rounded-xl font-rajdhani font-bold text-sm uppercase tracking-widest transition-all hover:bg-purple-500/20"
                    style={{ border: "1px solid rgba(139,92,246,0.4)", color: "#a78bfa" }}
                  >
                    Промокоды
                  </button>
                </div>
              </div>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                {[
                  { icon: "Shield", label: "Защита", val: "100%" },
                  { icon: "Zap", label: "Передача", val: "Мгновенно" },
                  { icon: "Star", label: "Аккаунтов", val: "2000+" },
                  { icon: "Users", label: "Покупателей", val: "18K+" },
                ].map((s) => (
                  <div key={s.label} className="p-4 rounded-xl text-center" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}>
                    <Icon name={s.icon} fallback="Star" size={20} className="text-cyan-400 mx-auto mb-2" />
                    <p className="price-tag text-lg">{s.val}</p>
                    <p className="text-gray-500 text-xs font-rajdhani uppercase tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FILTERS + CATALOG */}
          <section className="max-w-7xl mx-auto px-4 pb-20">
            <div className="flex flex-col md:flex-row gap-6">
              {/* SIDEBAR */}
              <aside className="md:w-64 flex-shrink-0">
                <div className="sticky top-20 rounded-2xl p-5 space-y-6" style={{ background: "var(--dark-card)", border: "1px solid rgba(0,212,255,0.1)" }}>
                  <div>
                    <h3 className="font-rajdhani font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">Цена (₽)</h3>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={priceFilter[0]}
                        onChange={(e) => setPriceFilter([+e.target.value, priceFilter[1]])}
                        className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                        style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}
                        min={0}
                      />
                      <span className="text-gray-600">—</span>
                      <input
                        type="number"
                        value={priceFilter[1]}
                        onChange={(e) => setPriceFilter([priceFilter[0], +e.target.value])}
                        className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                        style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}
                        min={0}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-rajdhani font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">Уровень</h3>
                    <div className="space-y-2">
                      {[["all", "Все уровни"], ["low", "До 30"], ["mid", "30 — 70"], ["high", "70+"]].map(([val, label]) => (
                        <button
                          key={val}
                          onClick={() => setLevelFilter(val)}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm font-rajdhani font-semibold transition-all"
                          style={{
                            background: levelFilter === val ? "rgba(0,212,255,0.12)" : "rgba(0,212,255,0.03)",
                            border: `1px solid ${levelFilter === val ? "rgba(0,212,255,0.35)" : "rgba(0,212,255,0.08)"}`,
                            color: levelFilter === val ? "var(--neon-cyan)" : "rgba(210,230,255,0.6)",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-rajdhani font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">Редкость</h3>
                    <div className="space-y-2">
                      {["all", "Обычный", "Редкий", "Эпический", "Легендарный", "Мифический"].map((r) => (
                        <button
                          key={r}
                          onClick={() => setRarityFilter(r)}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm font-rajdhani font-semibold transition-all"
                          style={{
                            background: rarityFilter === r ? "rgba(139,92,246,0.12)" : "rgba(139,92,246,0.03)",
                            border: `1px solid ${rarityFilter === r ? "rgba(139,92,246,0.35)" : "rgba(139,92,246,0.08)"}`,
                            color: rarityFilter === r ? "#a78bfa" : "rgba(210,230,255,0.6)",
                          }}
                        >
                          {r === "all" ? "Все" : r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => { setPriceFilter([0, 15000]); setLevelFilter("all"); setRarityFilter("all"); }}
                    className="w-full py-2 rounded-lg text-xs font-rajdhani font-semibold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    Сбросить фильтры
                  </button>
                </div>
              </aside>

              {/* GRID */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-rajdhani font-bold text-2xl tracking-wide text-white">
                    Каталог <span className="text-gray-500 text-lg">({filteredAccounts.length})</span>
                  </h2>
                </div>
                {filteredAccounts.length === 0 ? (
                  <div className="text-center py-20">
                    <Icon name="SearchX" size={48} className="text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500 font-rajdhani text-lg uppercase tracking-wide">Ничего не найдено</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAccounts.map((acc) => (
                      <div
                        key={acc.id}
                        className="card-game rounded-2xl overflow-hidden cursor-pointer group"
                        onClick={() => setAccountModal(acc)}
                      >
                        <div className="relative h-36 overflow-hidden">
                          <img
                            src={acc.image}
                            alt={acc.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                          />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, var(--dark-card) 100%)" }} />
                          {acc.badge && (
                            <span
                              className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-rajdhani font-bold uppercase tracking-widest"
                              style={{ background: "linear-gradient(135deg, #00d4ff, #0099cc)", color: "#0a0e1a" }}
                            >
                              {acc.badge}
                            </span>
                          )}
                          {acc.discount && (
                            <span
                              className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-rajdhani font-bold"
                              style={{ background: "rgba(239,68,68,0.9)", color: "white" }}
                            >
                              -{acc.discount}%
                            </span>
                          )}
                          {acc.verified && (
                            <span className="absolute bottom-3 right-3 verified-badge px-2 py-0.5 rounded-full uppercase tracking-widest">
                              ✓ Проверен
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-rajdhani font-bold text-base text-white tracking-wide">{acc.name}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-rajdhani font-semibold ${rarityColor[acc.rarity] || "text-gray-400"}`}>
                              {acc.rarity}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1.5 badge-level px-2 py-1 rounded-lg">
                              <Icon name="TrendingUp" size={12} />
                              <span className="text-xs">Ур. {acc.level}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                              <Icon name="Gamepad2" size={12} />
                              <span>{acc.games} игр</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                              <Icon name="Clock" size={12} />
                              <span>{(acc.hours / 1000).toFixed(1)}k ч</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {acc.games_list.slice(0, 3).map((g) => (
                              <span key={g} className="tag-chip px-2 py-0.5 rounded">{g}</span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              {acc.oldPrice && (
                                <p className="text-gray-600 text-xs line-through font-rajdhani">{acc.oldPrice.toLocaleString()} ₽</p>
                              )}
                              <p className="price-tag text-xl">{acc.price.toLocaleString()} ₽</p>
                            </div>
                            <button
                              className="px-4 py-2 rounded-xl text-xs neon-btn"
                              onClick={(e) => { e.stopPropagation(); addToCart(acc.id); }}
                            >
                              {cartItems.includes(acc.id) ? "В корзине" : "Купить"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* PROMOS PAGE */}
      {activePage === "promos" && (
        <section className="pt-28 pb-20 max-w-4xl mx-auto px-4">
          <h2 className="font-rajdhani font-bold text-4xl neon-text uppercase tracking-widest mb-2">Промокоды</h2>
          <p className="text-gray-500 mb-10">Используй промокоды при оформлении заказа в корзине</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { code: "DEVELOPER", discount: "100%", desc: "Специальный промокод для разработчика. Полная скидка на любой заказ.", color: "cyan", icon: "Code2" },
              { code: "SALE20", discount: "20%", desc: "Скидка 20% на любой аккаунт в каталоге.", color: "purple", icon: "Percent" },
              { code: "GAME10", discount: "10%", desc: "Скидка 10% для новых пользователей.", color: "green", icon: "Gift" },
            ].map((p) => (
              <div
                key={p.code}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: p.color === "cyan"
                    ? "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,212,255,0.03))"
                    : p.color === "purple"
                    ? "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(139,92,246,0.03))"
                    : "linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,255,136,0.03))",
                  border: `1px solid ${p.color === "cyan" ? "rgba(0,212,255,0.25)" : p.color === "purple" ? "rgba(139,92,246,0.25)" : "rgba(0,255,136,0.25)"}`,
                }}
              >
                <Icon
                  name={p.icon}
                  fallback="Gift"
                  size={28}
                  className={`mb-4 ${p.color === "cyan" ? "text-cyan-400" : p.color === "purple" ? "text-purple-400" : "text-green-400"}`}
                />
                <div
                  className="font-rajdhani font-bold text-3xl mb-1"
                  style={{ color: p.color === "cyan" ? "var(--neon-cyan)" : p.color === "purple" ? "#a78bfa" : "var(--neon-green)" }}
                >
                  -{p.discount}
                </div>
                <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
                <div
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span
                    className="font-rajdhani font-bold tracking-[0.2em] flex-1 text-sm"
                    style={{ color: p.color === "cyan" ? "var(--neon-cyan)" : p.color === "purple" ? "#a78bfa" : "var(--neon-green)" }}
                  >
                    {p.code}
                  </span>
                  <button
                    onClick={() => navigator.clipboard?.writeText(p.code)}
                    className="text-gray-500 hover:text-white transition-colors"
                    title="Скопировать"
                  >
                    <Icon name="Copy" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-2xl" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}>
            <h3 className="font-rajdhani font-bold text-lg text-white mb-3">Как применить промокод?</h3>
            <ol className="space-y-2 text-gray-400 text-sm">
              {["Добавь аккаунт в корзину", "Открой корзину (иконка в шапке)", "Введи промокод в поле и нажми OK", "Скидка применится автоматически"].map((s, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-rajdhani font-bold flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.15)", color: "var(--neon-cyan)", border: "1px solid rgba(0,212,255,0.3)" }}
                  >
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ABOUT PAGE */}
      {activePage === "about" && (
        <section className="pt-28 pb-20 max-w-5xl mx-auto px-4">
          <h2 className="font-rajdhani font-bold text-4xl neon-text uppercase tracking-widest mb-2">О компании</h2>
          <p className="text-gray-500 mb-12 text-lg">Надёжный маркетплейс Steam аккаунтов с 2019 года</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-rajdhani font-bold text-2xl text-white mb-4">Почему выбирают нас</h3>
              <div className="space-y-4">
                {[
                  { icon: "ShieldCheck", title: "Проверка каждого аккаунта", desc: "Каждый аккаунт проходит многоуровневую проверку подлинности перед публикацией" },
                  { icon: "Zap", title: "Мгновенная передача", desc: "Данные аккаунта приходят сразу после оплаты в личном кабинете" },
                  { icon: "Lock", title: "Двухфакторная защита", desc: "2FA защита аккаунта при входе в личный кабинет" },
                  { icon: "Headphones", title: "Поддержка 24/7", desc: "Служба поддержки готова помочь в любое время" },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="flex gap-4 p-4 rounded-xl"
                    style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.08)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
                    >
                      <Icon name={f.icon} fallback="Shield" size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-rajdhani font-bold text-white text-sm mb-0.5">{f.title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl p-6" style={{ background: "var(--dark-card)", border: "1px solid rgba(139,92,246,0.15)" }}>
                <h3 className="font-rajdhani font-bold text-xl text-white mb-4">Наша статистика</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "2000+", label: "Аккаунтов" },
                    { val: "18 000+", label: "Клиентов" },
                    { val: "4.9 ★", label: "Рейтинг" },
                    { val: "99.8%", label: "Довольны" },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-4 rounded-xl" style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
                      <p className="font-rajdhani font-bold text-2xl neon-text-purple">{s.val}</p>
                      <p className="text-gray-500 text-xs font-rajdhani uppercase tracking-widest mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "var(--dark-card)", border: "1px solid rgba(0,212,255,0.1)" }}>
                <h3 className="font-rajdhani font-bold text-sm text-gray-400 uppercase tracking-widest mb-3">Контакты</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2"><Icon name="Mail" size={14} className="text-cyan-400" /> support@steammarket.ru</div>
                  <div className="flex items-center gap-2"><Icon name="MessageCircle" size={14} className="text-cyan-400" /> Telegram: @steammarket_sup</div>
                  <div className="flex items-center gap-2"><Icon name="Clock" size={14} className="text-cyan-400" /> Поддержка 24/7</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PROFILE PAGE */}
      {activePage === "profile" && (
        <section className="pt-28 pb-20 max-w-4xl mx-auto px-4">
          <h2 className="font-rajdhani font-bold text-4xl neon-text uppercase tracking-widest mb-8">Личный кабинет</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="rounded-2xl p-6 text-center" style={{ background: "var(--dark-card)", border: "1px solid rgba(0,212,255,0.12)" }}>
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(139,92,246,0.2))", border: "2px solid rgba(0,212,255,0.3)" }}
                >
                  <Icon name="User" size={32} className="text-cyan-400" />
                </div>
                <h3 className="font-rajdhani font-bold text-xl text-white">GAMER_PRO</h3>
                <p className="text-gray-500 text-sm">{userEmail}</p>
                <div className="mt-4 flex justify-center">
                  <span className="verified-badge px-3 py-1 rounded-full text-xs uppercase tracking-widest">Верифицирован</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-gray-600 text-xs font-rajdhani uppercase tracking-widest mb-2">2FA Защита</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${twoFAVerified ? "bg-green-400" : "bg-red-500"}`} />
                    <span className={`text-sm font-rajdhani font-bold ${twoFAVerified ? "text-green-400" : "text-red-400"}`}>
                      {twoFAVerified ? "Включена" : "Отключена"}
                    </span>
                  </div>
                  {!twoFAVerified && (
                    <button onClick={() => setTwoFAOpen(true)} className="mt-3 w-full py-2 rounded-xl text-xs neon-btn-purple">
                      Включить 2FA
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              {/* Уведомление об успешной покупке */}
              {orderSuccess && (
                <div
                  className="flex items-center gap-3 p-4 rounded-2xl"
                  style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)" }}
                >
                  <Icon name="CheckCircle" size={20} className="text-green-400 flex-shrink-0" />
                  <div>
                    <p className="font-rajdhani font-bold text-green-400 text-sm">Заказ оформлен!</p>
                    <p className="text-gray-400 text-xs">Данные для входа доступны ниже</p>
                  </div>
                  <button onClick={() => setOrderSuccess(false)} className="ml-auto text-gray-600 hover:text-white">
                    <Icon name="X" size={14} />
                  </button>
                </div>
              )}
              <div className="rounded-2xl p-6" style={{ background: "var(--dark-card)", border: "1px solid rgba(0,212,255,0.1)" }}>
                <h3 className="font-rajdhani font-bold text-lg text-white mb-4">Мои покупки</h3>
                {purchasedIds.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="PackageX" size={36} className="text-gray-700 mx-auto mb-3" />
                    <p className="text-gray-600 font-rajdhani text-sm uppercase tracking-wide">Покупок пока нет</p>
                    <button
                      onClick={() => { setActivePage("home"); setActiveNav("Каталог"); }}
                      className="mt-4 px-6 py-2 rounded-xl text-sm neon-btn"
                    >
                      В каталог
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {accounts.filter((a) => purchasedIds.includes(a.id)).map((a) => (
                      <div
                        key={a.id}
                        className="rounded-xl overflow-hidden"
                        style={{ border: "1px solid rgba(0,212,255,0.15)" }}
                      >
                        {/* Заголовок карточки */}
                        <div
                          className="flex items-center gap-4 p-4"
                          style={{ background: "rgba(0,212,255,0.04)" }}
                        >
                          <div className="flex-1">
                            <p className="font-rajdhani font-bold text-white">{a.name}</p>
                            <p className="text-gray-500 text-xs">Ур. {a.level} · {a.games} игр</p>
                          </div>
                          <span className="verified-badge px-2 py-1 rounded-full text-xs">Куплен</span>
                          <button
                            onClick={() => setShowCredentials(showCredentials?.id === a.id ? null : a)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-rajdhani font-bold transition-all"
                            style={{
                              background: showCredentials?.id === a.id ? "rgba(0,212,255,0.15)" : "rgba(0,212,255,0.06)",
                              border: "1px solid rgba(0,212,255,0.25)",
                              color: "var(--neon-cyan)",
                            }}
                          >
                            <Icon name={showCredentials?.id === a.id ? "EyeOff" : "Eye"} size={12} />
                            {showCredentials?.id === a.id ? "Скрыть" : "Данные"}
                          </button>
                        </div>
                        {/* Логин и пароль */}
                        {showCredentials?.id === a.id && (
                          <div className="p-4 space-y-3" style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(0,212,255,0.1)" }}>
                            <div>
                              <label className="text-gray-500 text-xs font-rajdhani uppercase tracking-widest block mb-1">Логин</label>
                              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                                style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}>
                                <Icon name="User" size={14} className="text-cyan-400 flex-shrink-0" />
                                <span className="font-rajdhani font-bold text-white text-sm flex-1 tracking-wide">{a.login}</span>
                                <button
                                  onClick={() => navigator.clipboard?.writeText(a.login)}
                                  className="text-gray-500 hover:text-cyan-400 transition-colors"
                                  title="Скопировать"
                                >
                                  <Icon name="Copy" size={13} />
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="text-gray-500 text-xs font-rajdhani uppercase tracking-widest block mb-1">Пароль</label>
                              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                                style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)" }}>
                                <Icon name="Lock" size={14} className="text-purple-400 flex-shrink-0" />
                                <span className="font-rajdhani font-bold flex-1 text-sm tracking-wider"
                                  style={{ color: revealedPasswords.includes(a.id) ? "white" : "transparent", textShadow: revealedPasswords.includes(a.id) ? "none" : "0 0 8px rgba(255,255,255,0.5)" }}>
                                  {a.password}
                                </span>
                                <button
                                  onClick={() => setRevealedPasswords((prev) => prev.includes(a.id) ? prev.filter((i) => i !== a.id) : [...prev, a.id])}
                                  className="text-gray-500 hover:text-purple-400 transition-colors"
                                  title={revealedPasswords.includes(a.id) ? "Скрыть" : "Показать"}
                                >
                                  <Icon name={revealedPasswords.includes(a.id) ? "EyeOff" : "Eye"} size={13} />
                                </button>
                                <button
                                  onClick={() => navigator.clipboard?.writeText(a.password)}
                                  className="text-gray-500 hover:text-purple-400 transition-colors"
                                  title="Скопировать"
                                >
                                  <Icon name="Copy" size={13} />
                                </button>
                              </div>
                            </div>
                            <p className="text-gray-600 text-xs flex items-center gap-1.5">
                              <Icon name="AlertTriangle" size={11} />
                              Сохраните данные — после смены пароля они станут недействительны
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="rounded-2xl p-6" style={{ background: "var(--dark-card)", border: "1px solid rgba(139,92,246,0.1)" }}>
                <h3 className="font-rajdhani font-bold text-lg text-white mb-4">Настройки</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-500 text-xs font-rajdhani uppercase tracking-widest block mb-1">Email</label>
                    <input
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                      style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}
                    />
                  </div>
                  <button className="px-6 py-2 rounded-xl text-sm neon-btn">Сохранить</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ACCOUNT DETAIL MODAL */}
      {accountModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
          onClick={() => setAccountModal(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: "var(--dark-card2)", border: "1px solid rgba(0,212,255,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48">
              <img src={accountModal.image} alt={accountModal.name} className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, var(--dark-card2) 100%)" }} />
              <button
                onClick={() => setAccountModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <Icon name="X" size={16} className="text-white" />
              </button>
              <div className="absolute bottom-4 left-4">
                <h2 className="font-rajdhani font-bold text-2xl text-white">{accountModal.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-rajdhani font-semibold ${rarityColor[accountModal.rarity]}`}>
                  {accountModal.rarity}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { icon: "TrendingUp", val: `Ур. ${accountModal.level}`, label: "Уровень" },
                  { icon: "Gamepad2", val: `${accountModal.games}`, label: "Игр" },
                  { icon: "Clock", val: `${accountModal.hours.toLocaleString()} ч`, label: "Наиграно" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)" }}>
                    <Icon name={s.icon} fallback="Star" size={16} className="text-cyan-400 mx-auto mb-1" />
                    <p className="font-rajdhani font-bold text-white text-sm">{s.val}</p>
                    <p className="text-gray-600 text-xs font-rajdhani uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {accountModal.games_list.map((g) => (
                  <span key={g} className="tag-chip px-2.5 py-1 rounded-lg">{g}</span>
                ))}
              </div>
              <div
                className="flex items-center justify-between mb-4 p-4 rounded-xl"
                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,212,255,0.1)" }}
              >
                <div>
                  {accountModal.verified ? (
                    <div className="flex items-center gap-2">
                      <Icon name="ShieldCheck" size={16} className="text-green-400" />
                      <span className="text-green-400 text-sm font-rajdhani font-bold">Аккаунт проверен</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Icon name="Shield" size={16} className="text-gray-500" />
                      <span className="text-gray-500 text-sm font-rajdhani">Не проверен</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => checkAccount(accountModal.id)}
                  disabled={checkedAccounts.includes(accountModal.id) || checkingAccount === accountModal.id}
                  className="px-4 py-1.5 rounded-lg text-xs font-rajdhani font-bold uppercase transition-all"
                  style={{
                    background: checkedAccounts.includes(accountModal.id) ? "rgba(0,255,136,0.1)" : "rgba(0,212,255,0.1)",
                    border: checkedAccounts.includes(accountModal.id) ? "1px solid rgba(0,255,136,0.3)" : "1px solid rgba(0,212,255,0.2)",
                    color: checkedAccounts.includes(accountModal.id) ? "#00ff88" : "var(--neon-cyan)",
                  }}
                >
                  {checkingAccount === accountModal.id ? "Проверяю..." : checkedAccounts.includes(accountModal.id) ? "✓ Проверен" : "Проверить"}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  {accountModal.oldPrice && (
                    <p className="text-gray-600 text-sm line-through font-rajdhani">{accountModal.oldPrice.toLocaleString()} ₽</p>
                  )}
                  <p className="price-tag text-3xl">{accountModal.price.toLocaleString()} ₽</p>
                </div>
                <button
                  className="px-8 py-3 rounded-xl neon-btn"
                  onClick={() => { addToCart(accountModal.id); setAccountModal(null); setCartOpen(true); }}
                >
                  {cartItems.includes(accountModal.id) ? "Уже в корзине" : "Купить"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2FA MODAL */}
      {twoFAOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-8"
            style={{ background: "var(--dark-card2)", border: "1px solid rgba(139,92,246,0.3)" }}
          >
            <div className="text-center mb-6">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse-slow"
                style={{ background: "rgba(139,92,246,0.15)", border: "2px solid rgba(139,92,246,0.3)" }}
              >
                <Icon name="Lock" size={28} className="text-purple-400" />
              </div>
              <h3 className="font-rajdhani font-bold text-2xl text-white mb-2">Двухфакторная защита</h3>
              <p className="text-gray-500 text-sm">Введите код из приложения аутентификатора</p>
              <p className="text-gray-600 text-xs mt-1">(демо-код: 123456)</p>
            </div>
            <input
              value={twoFACode}
              onChange={(e) => setTwoFACode(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="w-full text-center px-4 py-4 rounded-xl text-2xl font-rajdhani font-bold text-white outline-none mb-4"
              style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.25)", letterSpacing: "0.3em" }}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setTwoFAOpen(false)}
                className="flex-1 py-3 rounded-xl text-sm font-rajdhani font-semibold text-gray-500 transition-all hover:text-white"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                Отмена
              </button>
              <button onClick={verify2FA} className="flex-1 py-3 rounded-xl text-sm neon-btn-purple">
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t py-8" style={{ borderColor: "rgba(0,212,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="Gamepad2" size={18} className="text-cyan-400" />
            <span className="font-rajdhani font-bold text-lg tracking-widest neon-text uppercase">SteamMarket</span>
          </div>
          <p className="text-gray-700 text-xs font-rajdhani uppercase tracking-widest">
            © 2024 SteamMarket · Все права защищены
          </p>
          <div className="flex gap-4 text-gray-700 text-xs font-rajdhani uppercase tracking-widest">
            <button className="hover:text-cyan-400 transition-colors">Условия</button>
            <button className="hover:text-cyan-400 transition-colors">Конфиденциальность</button>
          </div>
        </div>
      </footer>
    </div>
  );
}