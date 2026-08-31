import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryNav = ({ categories, activeCategory, onSelectCategory }: CategoryNavProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative flex items-center w-full max-w-7xl mx-auto px-2 md:px-6">
      {/* Botón Izquierdo - Sin fondo, solo icono, separado hacia afuera */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-8 z-30 items-center justify-center w-10 h-10 text-white hover:text-brand-honey transition-transform hover:scale-125 focus:outline-none"
        aria-label="Desplazar a la izquierda"
      >
        <ChevronLeft size={32} strokeWidth={2.5} />
      </button>

      {/* Contenedor central con espacio lateral para las flechas */}
      <div className="w-full overflow-hidden px-0 md:px-10">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-4 gap-3 w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            
            return (
              <div key={category} className="flex-shrink-0">
                <button
                  onClick={() => onSelectCategory(category)}
                  aria-pressed={isActive}
                  className={`px-6 py-2.5 rounded-full font-nav text-[11px] tracking-widest transition-all duration-300 ${
                    isActive 
                      ? 'bg-brand-indigo text-white shadow-[0_4px_15px_rgba(35,67,134,0.4)] scale-105' 
                      : 'bg-white/20 text-white border border-white/30 backdrop-blur-sm hover:bg-white/30 hover:scale-105'
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botón Derecho - Sin fondo, solo icono, separado hacia afuera */}
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-8 z-30 items-center justify-center w-10 h-10 text-white hover:text-brand-honey transition-transform hover:scale-125 focus:outline-none"
        aria-label="Desplazar a la derecha"
      >
        <ChevronRight size={32} strokeWidth={2.5} />
      </button>
    </div>
  );
};