// src/pages/AdminDashboard.tsx
import { useState } from 'react';
import { Lock, LogOut, ArrowLeft, ShieldAlert } from 'lucide-react';
import { AdminPanel } from '../components/AdminPanel';
import { Product, menu as initialMenu } from '../data/menu';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard = ({ onBackToSite }: AdminDashboardProps) => {
  // Clave segura obtenida desde las variables de entorno de Vite
  const ADMIN_SECRET_KEY = import.meta.env.VITE_ADMIN_PASSWORD || 'peposushi2026';
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('pepo_admin_logged') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pepo_menu_admin');
    return saved ? JSON.parse(saved) : initialMenu;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_SECRET_KEY) {
      setIsAuthenticated(true);
      sessionStorage.setItem('pepo_admin_logged', 'true');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('pepo_admin_logged');
    setIsAuthenticated(false);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    const exists = products.some(p => p.id === updatedProduct.id);
    let newProducts;
    if (exists) {
      newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    } else {
      newProducts = [updatedProduct, ...products];
    }
    setProducts(newProducts);
    localStorage.setItem('pepo_menu_admin', JSON.stringify(newProducts));
  };

  const handleDeleteProduct = (productId: string) => {
    const newProducts = products.filter(p => p.id !== productId);
    setProducts(newProducts);
    localStorage.setItem('pepo_menu_admin', JSON.stringify(newProducts));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-black/10 relative">
          
          <button 
            onClick={onBackToSite}
            className="absolute top-5 left-5 text-brand-indigo/60 hover:text-brand-indigo flex items-center gap-1 font-nav text-xs tracking-wider"
          >
            <ArrowLeft size={16} /> Volver
          </button>

          <div className="text-center mt-8 mb-6">
            <div className="w-14 h-14 bg-brand-indigo text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Lock size={24} />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-brand-indigo">Panel Exclusivo Admin</h1>
            <p className="font-body text-xs sm:text-sm text-brand-ink/70 mt-1">Pepo Sushi · Hualqui</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-nav text-[10px] text-brand-indigo/70 tracking-widest uppercase block mb-2">
                Clave de Acceso
              </label>
              <input 
                type="password"
                placeholder="Ingresa la contraseña..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                className="w-full bg-brand-cream border border-black/10 rounded-xl px-4 py-3.5 text-sm font-body text-brand-indigo focus:outline-none focus:border-brand-orange"
              />
              {error && (
                <p className="text-rose-600 text-xs font-nav mt-2 tracking-wider text-center flex items-center justify-center gap-1">
                  <ShieldAlert size={14} /> Clave incorrecta. Inténtalo de nuevo.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-indigo hover:bg-brand-indigo/90 text-white font-nav text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg mt-2 active:scale-95"
            >
              ACCEDER AL SISTEMA
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <header className="bg-brand-indigo text-white px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md gap-2">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToSite}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg font-nav text-xs tracking-wider flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft size={16} /> <span className="hidden sm:inline">Ver Carta</span>
          </button>
          <h2 className="font-display text-lg sm:text-2xl tracking-wide truncate">Gestión Pepo Sushi</h2>
        </div>

        <button 
          onClick={handleLogout}
          className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-lg font-nav text-xs tracking-wider flex items-center gap-1.5 transition-all flex-shrink-0"
        >
          <LogOut size={15} /> <span className="hidden sm:inline">Salir</span>
        </button>
      </header>

      <main className="flex-1 p-3 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-black/10 overflow-hidden">
          <AdminPanel 
            products={products}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>
      </main>
    </div>
  );
};