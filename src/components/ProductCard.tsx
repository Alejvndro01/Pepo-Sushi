import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Product as MenuProduct } from '../data/menu';

interface ProductCardProps {
  product: MenuProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.nombre,
      description: product.descripcion,
      price: product.precio,
      categoryId: product.categoria,
      image: '', // Requerido por la interfaz, se omiten URLs reales en este paso
    });

    // Feedback visual asíncrono mapeado del comportamiento Vanilla JS
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(product.precio);

  // Fallback temporal de imagen ya que el mock de menu.ts no incluye URLs
  const placeholderImg = "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80";

  return (
    <article className="product-card bg-white rounded-[8px] overflow-hidden card-shadow flex flex-col justify-between">
      <div className="img-container">
        <img 
          src={placeholderImg} 
          alt={product.nombre} 
          className="w-full h-64 object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="p-7 flex flex-col flex-1">
        <header>
          <p className="font-nav text-[10px] text-brand-indigo/60 tracking-widest uppercase">
            {product.categoria} {product.codigo && `· CÓD. ${product.codigo}`}
          </p>
          <h3 className="font-display text-3xl text-brand-indigo mt-2 leading-tight uppercase">
            {product.nombre}
          </h3>
          
          {product.descripcion && (
            <p className="font-body text-sm text-brand-ink/70 mt-3 leading-relaxed line-clamp-3">
              {product.descripcion}
            </p>
          )}
        </header>

        <footer className="mt-auto pt-6 flex items-end justify-between gap-2">
          <div>
            <p className="font-nav text-[10px] text-brand-ink/40 tracking-widest">DESDE</p>
            <p className="font-display text-4xl text-brand-indigo leading-none">
              {formattedPrice}
            </p>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className={`btn-add px-5 py-3 rounded-full font-nav text-[10px] tracking-widest transition-colors shrink-0 ${
              isAdded 
                ? 'bg-brand-mint text-brand-indigo' 
                : 'bg-brand-indigo text-white'
            }`}
            aria-label={`Agregar ${product.nombre} al carrito`}
          >
            {isAdded ? '✓ AGREGADO' : '+ AGREGAR'}
          </button>
        </footer>
      </div>
    </article>
  );
};