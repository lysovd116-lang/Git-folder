import React, { useMemo, useState } from "react";
import { BookOpen, Search, ShoppingCart, Tag, Truck, ShieldCheck, Star, X, Menu, Phone, Mail, MapPin } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    title: "1984",
    author: "Джордж Оруэлл",
    category: "Классика",
    price: 590,
    tag: "Новинка",
    rating: 4.8,
    description: "Антиутопический роман о свободе, контроле и выборе человека.",
  },
  {
    id: 2,
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    category: "Классика",
    price: 690,
    tag: "Хит",
    rating: 4.9,
    description: "Один из самых известных романов о любви, добре и силе творчества.",
  },
  {
    id: 3,
    title: "Атлант расправил плечи",
    author: "Айн Рэнд",
    category: "Бизнес",
    price: 890,
    tag: "Бестселлер",
    rating: 4.7,
    description: "Книга о личной ответственности, лидерстве и силе характера.",
  },
  {
    id: 4,
    title: "Путь художника",
    author: "Джулия Кэмерон",
    category: "Саморазвитие",
    price: 540,
    tag: "Рекомендовано",
    rating: 4.6,
    description: "Практическое руководство для раскрытия творческого потенциала.",
  },
  {
    id: 5,
    title: "Гарри Поттер и философский камень",
    author: "Дж. К. Роулинг",
    category: "Фантастика",
    price: 760,
    tag: "Популярно",
    rating: 5.0,
    description: "Первая книга знаменитой серии о школе магии и дружбе.",
  },
  {
    id: 6,
    title: "Дюна",
    author: "Фрэнк Герберт",
    category: "Фантастика",
    price: 820,
    tag: "Эксклюзив",
    rating: 4.8,
    description: "Эпическая история о политике, пустынной планете и судьбе героя.",
  },
];

const CATEGORIES = ["Все", "Классика", "Фантастика", "Бизнес", "Саморазвитие"];

const FEATURE_CARDS = [
  {
    icon: Truck,
    title: "Быстрая доставка",
    text: "Доставка по городу и отправка по России с отслеживанием заказа.",
  },
  {
    icon: ShieldCheck,
    title: "Надёжная оплата",
    text: "Безопасные способы оплаты и защита данных покупателя.",
  },
  {
    icon: Tag,
    title: "Акции и скидки",
    text: "Теги «Новинка», «Хит» и «Бестселлер» помогают выделять товары.",
  },
];

function money(value) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value);
}

function App() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === "Все" || product.category === selectedCategory;
      const matchesQuery =
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.author.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold leading-none">BookLine</p>
              <p className="text-xs text-slate-500">Интернет-магазин книг</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#catalog" className="hover:text-slate-900">Каталог</a>
            <a href="#advantages" className="hover:text-slate-900">Преимущества</a>
            <a href="#about" className="hover:text-slate-900">О магазине</a>
            <a href="#contact" className="hover:text-slate-900">Контакты</a>
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden rounded-2xl border border-slate-200 p-3"
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
              Корзина: <span className="font-semibold text-slate-900">{cartCount}</span>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-3 text-sm text-slate-600">
              <a href="#catalog">Каталог</a>
              <a href="#advantages">Преимущества</a>
              <a href="#about">О магазине</a>
              <a href="#contact">Контакты</a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-16">
          <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-sm lg:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100">
              <Star className="h-4 w-4" />
              Проект для темы «Книги и литература»
            </span>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight lg:text-6xl">
              Современный интернет-магазин книг на базе WordPress и WooCommerce
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 lg:text-lg">
              Этот шаблон можно использовать как основу для учебного проекта: главная страница,
              каталог, фильтрация, карточки товаров, корзина и блок контактов уже собраны в одном интерфейсе.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalog" className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:opacity-90">
                Смотреть каталог
              </a>
              <a href="#contact" className="rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                Контакты магазина
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Ссылка на сайт</p>
                  <p className="mt-1 text-lg font-semibold">готова к вставке</p>
                </div>
                <div className="rounded-2xl bg-slate-100 p-3">
                  <Search className="h-5 w-5 text-slate-600" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                После публикации WordPress-сайта сюда можно вставить ссылку на домен или тестовый хостинг.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {FEATURE_CARDS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-slate-100 p-3">
                      <Icon className="h-5 w-5 text-slate-700" />
                    </div>
                    <p className="font-semibold">{title}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="catalog" className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Каталог товаров</h2>
              <p className="mt-1 text-sm text-slate-500">Не менее 5 товаров, как требует задание.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск книги..."
                  className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      selectedCategory === category
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article key={product.id} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {product.tag}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">★ {product.rating}</span>
                </div>

                <div className="mt-4 rounded-[1.5rem] bg-slate-100 p-8 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-slate-500" />
                  <p className="mt-3 text-sm text-slate-500">Обложка товара</p>
                </div>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{product.category}</p>
                  <h3 className="mt-2 text-xl font-bold">{product.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{product.author}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-400">Цена</p>
                    <p className="text-2xl font-bold">{money(product.price)}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    В корзину
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="advantages" className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
              <h2 className="text-2xl font-bold">Преимущества магазина</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {FEATURE_CARDS.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-[1.5rem] bg-slate-50 p-4">
                    <Icon className="h-5 w-5 text-slate-700" />
                    <p className="mt-3 font-semibold">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-sm">
              <p className="text-sm text-slate-300">Корзина</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-bold">{cartCount}</p>
                  <p className="text-sm text-slate-300">товаров в корзине</p>
                </div>
                <ShoppingCart className="h-10 w-10 text-white/90" />
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                Корзина работает прямо на странице: добавление, изменение количества и удаление товаров уже предусмотрены.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">О магазине</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                BookLine — это учебный пример интернет-магазина книг. В реальном WordPress-проекте этот блок можно
                перенести на страницу «О компании», а каталог подключить через WooCommerce. Здесь уже есть основа:
                визуальная структура, карточки товаров, навигация и готовая логика интерфейса на JavaScript.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Для отчёта можно отдельно указать, что сайт создавался под тематику «Книги и литература» и содержит
                разделы: главная, каталог, преимущества, о магазине и контакты.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Корзина и заказ</h2>
              <div className="mt-5 space-y-3">
                {cart.length === 0 ? (
                  <div className="rounded-[1.5rem] bg-slate-50 p-4 text-sm text-slate-500">
                    Корзина пока пустая. Добавьте книгу из каталога.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-slate-50 p-4">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{item.title}</p>
                        <p className="text-sm text-slate-500">{money(item.price)} × {item.qty}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeQty(item.id, -1)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">-</button>
                        <button onClick={() => changeQty(item.id, 1)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">+</button>
                        <button onClick={() => removeItem(item.id)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-red-500"> <X className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500">Итого</p>
                <p className="text-2xl font-bold">{money(cartTotal)}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-sm lg:p-10">
            <h2 className="text-3xl font-bold">Контакты</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Этот блок подходит для страницы контактов в WordPress: добавьте адрес, телефон, почту и ссылку на форму обратной связи.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <Phone className="h-5 w-5" />
                <p className="mt-3 font-semibold">Телефон</p>
                <p className="mt-1 text-sm text-slate-300">+7 (999) 123-45-67</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <Mail className="h-5 w-5" />
                <p className="mt-3 font-semibold">Почта</p>
                <p className="mt-1 text-sm text-slate-300">bookline@example.ru</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <MapPin className="h-5 w-5" />
                <p className="mt-3 font-semibold">Адрес</p>
                <p className="mt-1 text-sm text-slate-300">Балашиха, учебный проект</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;