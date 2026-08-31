import { useState } from 'react';
import { Plus, Trash2, Edit3, Save, Eye, EyeOff, X } from 'lucide-react';
import { Product } from '../data/menu';

interface AdminPanelProps {
  products: Product[];
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const AdminPanel = ({ products, onSaveProduct, onDeleteProduct }: AdminPanelProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsCreating(false);
  };

  const handleAddNew = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setFormData({
      id: Date.now().toString(),
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: 'SUSHI',
      image: '',
      disponible: true
    });
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.precio) return;
    const payload: Product = {
      id: formData.id || Date.now().toString(),
      nombre: formData.nombre || '',
      descripcion: formData.descripcion || '',
      precio: Number(formData.precio) || 0,
      categoria: formData.categoria || 'SUSHI',
      image: formData.image || '',
      disponible: formData.disponible ?? true
    };
    onSaveProduct(payload);
    setEditingProduct(null);
    setIsCreating(false);
    setFormData({});
  };

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

  return (
    <div className="flex flex-col w-full bg-white rounded-2xl shadow-xl border border-black/10 overflow-hidden">
      
      {/* Cabecera del panel */}
      <div className="bg-brand-indigo text-white p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl tracking-wide">PANEL DE CONTROL</h2>
          <p className="font-body text-xs text-white/70 mt-0.5">Gestión de productos y disponibilidad</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-brand-orange hover:bg-brand-orange/95 text-white px-4 py-3 sm:py-2.5 rounded-xl sm:rounded-full font-nav text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Plus size={16} /> NUEVO PRODUCTO
        </button>
      </div>

      <div className="p-3 sm:p-6 lg:p-8">
        {/* Aviso de desplazamiento horizontal para móviles */}
        <p className="text-[11px] font-nav text-brand-indigo/60 tracking-wider mb-2 sm:hidden text-right">
          ← Desliza la tabla para ver más →
        </p>

        {/* Contenedor con scroll horizontal fluido habilitado para celulares */}
        <div className="w-full overflow-x-auto rounded-xl border border-black/10 shadow-sm bg-white">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-brand-cream border-b border-black/10 font-nav text-[10px] text-brand-indigo/70 tracking-widest uppercase">
                <th className="p-3 sm:p-4">Producto</th>
                <th className="p-3 sm:p-4">Categoría</th>
                <th className="p-3 sm:p-4">Precio</th>
                <th className="p-3 sm:p-4">Estado</th>
                <th className="p-3 sm:p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm font-body">
              {products.map((product) => {
                const isAvailable = product.disponible !== false;
                return (
                  <tr key={product.id} className="hover:bg-brand-cream/50 transition-colors">
                    <td className="p-3 sm:p-4 flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-black/5 overflow-hidden flex-shrink-0">
                        <img src={product.image || "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&q=80"} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-brand-indigo text-xs sm:text-sm">{product.nombre}</p>
                        <p className="text-[11px] sm:text-xs text-brand-ink/60 line-clamp-1">{product.descripcion}</p>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 font-nav text-[11px] sm:text-xs text-brand-indigo/80 whitespace-nowrap">{product.categoria}</td>
                    <td className="p-3 sm:p-4 font-display text-base sm:text-lg text-brand-indigo whitespace-nowrap">{formatPrice(product.precio)}</td>
                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-nav tracking-wider uppercase ${isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {isAvailable ? 'Disponible' : 'Agotado'}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-right space-x-1 whitespace-nowrap">
                      <button 
                        onClick={() => handleEditClick(product)}
                        className="p-2 text-brand-indigo hover:bg-brand-indigo/10 rounded-lg transition-colors inline-flex items-center justify-center"
                        title="Editar"
                      >
                        <Edit3 size={17} />
                      </button>
                      <button 
                        onClick={() => onSaveProduct({ ...product, disponible: !isAvailable })}
                        className="p-2 text-brand-orange hover:bg-brand-orange/10 rounded-lg transition-colors inline-flex items-center justify-center"
                        title={isAvailable ? 'Marcar Agotado' : 'Marcar Disponible'}
                      >
                        {isAvailable ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                      <button 
                        onClick={() => onDeleteProduct(product.id)}
                        className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors inline-flex items-center justify-center"
                        title="Eliminar"
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 100% RESPONSIVO PARA EDITAR O CREAR PRODUCTO */}
      {(isCreating || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/60 backdrop-blur-sm p-3 sm:p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-brand-cream w-full max-w-xl rounded-2xl shadow-2xl p-5 sm:p-8 relative border border-black/10 my-auto max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => { setEditingProduct(null); setIsCreating(false); }}
              className="absolute top-4 right-4 p-2 text-brand-indigo/60 hover:text-brand-indigo rounded-full bg-black/5"
            >
              <X size={20} />
            </button>

            <h3 className="font-display text-xl sm:text-2xl text-brand-indigo mb-5">
              {isCreating ? '➕ Agregar Nuevo Producto' : '✏️ Editar Producto'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="font-nav text-[10px] text-brand-indigo/70 tracking-widest uppercase">Nombre</label>
                <input 
                  type="text" 
                  value={formData.nombre || ''} 
                  onChange={e => setFormData({...formData, nombre: e.target.value})}
                  className="w-full mt-1 bg-white border border-black/10 rounded-xl p-3 text-sm font-body outline-none focus:border-brand-orange shadow-inner"
                  placeholder="Ej. Roll Polaco"
                />
              </div>

              <div>
                <label className="font-nav text-[10px] text-brand-indigo/70 tracking-widest uppercase">Precio (CLP)</label>
                <input 
                  type="number" 
                  value={formData.precio || ''} 
                  onChange={e => setFormData({...formData, precio: Number(e.target.value)})}
                  className="w-full mt-1 bg-white border border-black/10 rounded-xl p-3 text-sm font-body outline-none focus:border-brand-orange shadow-inner"
                  placeholder="Ej. 6500"
                />
              </div>

              <div>
                <label className="font-nav text-[10px] text-brand-indigo/70 tracking-widest uppercase">Categoría</label>
                <select 
                  value={formData.categoria || 'SUSHI'} 
                  onChange={e => setFormData({...formData, categoria: e.target.value})}
                  className="w-full mt-1 bg-white border border-black/10 rounded-xl p-3 text-sm font-body outline-none focus:border-brand-orange shadow-inner"
                >
                  <option value="SUSHI">SUSHI</option>
                  <option value="SUSHI PREMIUM">SUSHI PREMIUM</option>
                  <option value="PROMOCIONES">PROMOCIONES</option>
                  <option value="TRAGOS">TRAGOS</option>
                  <option value="ENTRADAS">ENTRADAS</option>
                  <option value="GOHAN BOWLS">GOHAN BOWLS</option>
                  <option value="OTROS">OTROS</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-nav text-[10px] text-brand-indigo/70 tracking-widest uppercase">URL de Imagen</label>
                <input 
                  type="text" 
                  value={formData.image || ''} 
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full mt-1 bg-white border border-black/10 rounded-xl p-3 text-sm font-body outline-none focus:border-brand-orange shadow-inner"
                  placeholder="https://..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-nav text-[10px] text-brand-indigo/70 tracking-widest uppercase">Descripción</label>
                <textarea 
                  rows={3}
                  value={formData.descripcion || ''} 
                  onChange={e => setFormData({...formData, descripcion: e.target.value})}
                  className="w-full mt-1 bg-white border border-black/10 rounded-xl p-3 text-sm font-body outline-none focus:border-brand-orange shadow-inner resize-none"
                  placeholder="Ingredientes o detalles del plato..."
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 sm:gap-3 mt-6 pt-4 border-t border-black/10">
              <button 
                onClick={() => { setEditingProduct(null); setIsCreating(false); }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full font-nav text-xs text-brand-indigo hover:bg-black/5 transition-colors text-center"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className="w-full sm:w-auto bg-brand-indigo text-white px-7 py-3 rounded-xl sm:rounded-full font-nav text-xs tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-brand-indigo/90 transition-all"
              >
                <Save size={16} /> GUARDAR CAMBIOS
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};