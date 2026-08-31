import { useState } from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { StoreStatus } from './StoreStatus';

interface HeaderProps {
  onOpenCart: () => void;
  onSecretAdminClick: () => void;
}

export const Header = ({ onOpenCart, onSecretAdminClick }: HeaderProps) => {
  const { totalItems } = useCart();
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = clickCount + 1;
    setClickCount(newCount);

    setTimeout(() => setClickCount(0), 1000);

    if (newCount >= 3) {
      setClickCount(0);
      onSecretAdminClick();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        
        {/* Logo pequeño con imagen + Estado del local al lado */}
        <div className="flex items-center gap-6">
          <a 
            href="#" 
            onClick={handleLogoClick}
            className="flex items-center gap-2 select-none cursor-pointer group"
            title="Pepo Sushi"
          >
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-9 h-9 object-contain rounded-full group-hover:scale-105 transition-transform" 
            />
            <span className="font-display text-2xl text-brand-indigo tracking-wider">
              PEPO<span className="text-brand-orange">·</span>SUSHI
            </span>
          </a>

          <div className="hidden lg:block">
            <StoreStatus />
          </div>
        </div>

        {/* Enlaces de navegación rápida */}
        <ul className="hidden md:flex items-center gap-8 font-nav text-xs font-medium text-brand-indigo/70">
          <li><a href="#menu" className="nav-link active">TODO</a></li>
          <li><a href="#menu" className="nav-link">PROMOCIONES</a></li>
          <li><a href="#menu" className="nav-link">SUSHI</a></li>
          <li><a href="#menu" className="nav-link">TRAGOS</a></li>
        </ul>

        {/* Botón de Carrito */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenCart}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-nav text-brand-indigo hover:text-brand-orange transition relative"
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
            MI PEDIDO
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-brand-honey text-[10px] font-bold text-brand-indigo">
                {totalItems}
              </span>
            )}
          </button>

          <button onClick={onOpenCart} className="md:hidden text-brand-indigo relative p-1" aria-label="Abrir menú">
            <Menu size={24} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-honey text-[10px] font-bold text-brand-indigo">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};