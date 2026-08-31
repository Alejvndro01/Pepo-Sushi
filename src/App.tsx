import { useState, useMemo } from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartProvider, useCart } from './hooks/useCart';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { AdminDashboard } from './pages/AdminDashboard';
import { menu as initialMenu, Product } from './data/menu';

const FloatingCartButton = ({ onOpen }: { onOpen: () => void }) => {
  const { totalItems } = useCart();
  
  return (
    <div className="fixed bottom-8 right-8 z-[45]">
      <button 
        onClick={onOpen}
        className="cta-pill bg-brand-indigo text-white px-8 py-5 rounded-[32px] font-body text-sm tracking-[0.1em] uppercase flex items-center gap-3 shadow-2xl"
        aria-label="Ver carrito"
      >
        <ShoppingBag size={20} strokeWidth={2} />
        VER CARRITO
        <span className="bg-brand-honey text-brand-indigo text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {totalItems}
        </span>
      </button>
    </div>
  );
};

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  // Carga de productos con persistencia local
  const [products] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pepo_menu_admin');
    return saved ? JSON.parse(saved) : initialMenu;
  });

  const categories = useMemo(() => Array.from(new Set(products.map((item) => item.categoria))), [products]);
  const [activeCategory, setActiveCategory] = useState<string>('');

  const currentCategory = categories.includes(activeCategory) ? activeCategory : (categories[0] || '');

  // Filtrado optimizado: Excluye de la carta los productos marcados como agotados (disponible === false)
  const filteredProducts = useMemo(() => {
    return products.filter((item) => 
      item.categoria === currentCategory && item.disponible !== false
    );
  }, [products, currentCategory]);

  // Si está activo el modo admin, renderiza la sección exclusiva
  if (currentView === 'admin') {
    return <AdminDashboard onBackToSite={() => setCurrentView('public')} />;
  }

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-brand-cream">
        <Header 
          onOpenCart={() => setIsCartOpen(true)} 
          onSecretAdminClick={() => setCurrentView('admin')}
        />
        
        {/* SECCIÓN HERO */}
        <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-brand-cream">
          <svg className="absolute top-10 -left-20 w-[420px] h-[420px] animate-float-slow opacity-80" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M220,60 C320,40 380,120 370,220 C360,320 280,380 180,370 C80,360 20,280 30,180 C40,80 120,80 220,60 Z" fill="#ffc400" fillOpacity="0.55"/>
          </svg>
          <svg className="absolute bottom-0 right-10 w-[380px] h-[380px] animate-float-slow-2 opacity-70" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M200,40 C300,60 360,140 340,240 C320,340 240,380 140,360 C40,340 40,240 60,140 C80,40 100,20 200,40 Z" fill="#a2d3a6" fillOpacity="0.5"/>
          </svg>
          <svg className="absolute top-1/2 left-1/3 w-[200px] h-[200px] animate-float-slow opacity-60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,20 C140,30 170,70 160,110 C150,150 120,170 80,160 C40,150 30,110 40,70 C50,30 60,10 100,20 Z" fill="#ed7328" fillOpacity="0.25"/>
          </svg>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative z-10">
              <p className="font-nav text-xs text-brand-indigo/60 mb-6">— CARTA · HUALQUI · 2026</p>
              
              <div className="flex items-center gap-6 mb-2">
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    const count = (window as any)._adminClicks || 0;
                    const newCount = count + 1;
                    (window as any)._adminClicks = newCount;
                    setTimeout(() => { (window as any)._adminClicks = 0; }, 1000);
                    if (newCount >= 3) {
                      (window as any)._adminClicks = 0;
                      setCurrentView('admin');
                    }
                  }}
                  className="flex-shrink-0 cursor-pointer select-none group"
                  title="Pepo Sushi"
                >
                  <img 
                    src="/logo.png" 
                    alt="Pepo Sushi Logo" 
                    className="w-20 h-20 lg:w-28 lg:h-28 object-contain rounded-full shadow-md group-hover:scale-105 transition-transform" 
                  />
                </a>

                <h1 className="font-display text-[14vw] lg:text-[7.5rem] leading-[0.9] text-brand-indigo">
                  EL ARTE
                </h1>
              </div>

              <h1 className="font-display text-[18vw] lg:text-[9rem] leading-[0.9] text-brand-indigo">
                DEL <span className="text-brand-orange">SUSHI</span>
              </h1>

              <p className="font-script text-4xl lg:text-5xl text-brand-indigo mt-6 -rotate-1">
                Nuestra pasión, tu mesa — hoy.
              </p>
              <p className="font-body text-base text-brand-ink/70 mt-8 max-w-md leading-relaxed">
                Rollos artesanales, ceviches frescos y tragos de autor. Preparado con mimo en el corazón de Hualqui.
              </p>
              
              <div className="mt-12 flex items-center gap-8 text-xs font-nav text-brand-indigo/70">
                <div>
                  <p className="text-brand-orange font-bold text-lg font-display tracking-wider">2942</p>
                  <p>SEGUIDORES</p>
                </div>
                <div className="w-px h-10 bg-black/15"></div>
                <div>
                  <p className="text-brand-orange font-bold text-lg font-display tracking-wider">GRATIS</p>
                  <p>DELIVERY</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-[8px] overflow-hidden card-shadow bg-white">
                <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&q=80" alt="Sushi Pepo" className="w-full h-[520px] object-cover"/>
              </div>
              <div className="absolute -top-6 -right-4 lg:-right-8 bg-brand-honey text-brand-indigo font-script text-2xl px-6 py-3 rounded-full rotate-6 shadow-lg">
                ¡Fresco del día!
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN MENÚ */}
        <section id="menu" className="relative bg-brand-orange pt-32 pb-24 lg:pb-32 flex-1">
          <div className="wave-top">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C200,80 400,120 600,80 C800,40 1000,100 1200,60 L1200,0 L0,0 Z" className="shape-fill" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
              <div>
                <p className="font-nav text-xs text-white/70 mb-3">— NUESTRA CARTA</p>
                <h2 className="font-display text-6xl lg:text-8xl text-white leading-none">
                  SABORES <span className="text-brand-honey">QUE</span><br/>
                  <span className="font-script text-5xl lg:text-6xl text-white/90 -rotate-1 inline-block ml-2">enamoran</span>
                </h2>
              </div>
              <p className="font-body text-white/90 max-w-md leading-relaxed">
                Una selección curada de nuestros favoritos. Rollos, ceviches, tragos y promos para compartir.
              </p>
            </div>

            <div className="mb-10">
              <CategoryNav 
                categories={categories}
                activeCategory={currentCategory}
                onSelectCategory={setActiveCategory}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              
              {filteredProducts.length === 0 && (
                <p className="col-span-full text-center text-white/70 py-10 font-medium font-nav tracking-widest">
                  NO HAY PRODUCTOS DISPONIBLES EN ESTA CATEGORÍA.
                </p>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-20">
              <path d="M0,0 C200,80 400,120 600,80 C800,40 1000,100 1200,60 L1200,0 L0,0 Z" fill="#fbf9f6" />
            </svg>
          </div>
        </section>

        <Footer />

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />

        <FloatingCartButton onOpen={() => setIsCartOpen(true)} />
      </div>
    </CartProvider>
  );
}