// src/components/CartDrawer.tsx
import { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { storeInfo } from '../data/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeliveryOption = 'Retiro en local' | 'Delivery';
type PaymentOption = 'Efectivo' | 'Tarjeta' | 'Pago en tienda';

interface PastOrder {
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  
  const [delivery, setDelivery] = useState<DeliveryOption>('Retiro en local');
  const [payment, setPayment] = useState<PaymentOption>('Pago en tienda');
  const [itemNotes, setItemNotes] = useState<Record<string, string>>({});
  
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [pastOrders, setPastOrders] = useState<PastOrder[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('pepo_past_orders');
    if (saved) {
      try { setPastOrders(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

  const handleNoteChange = (id: string, note: string) => {
    setItemNotes(prev => ({ ...prev, [id]: note }));
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let message = `¡Hola Pepo Sushi! Me gustaría hacer el siguiente pedido:\n\n`;
    message += `*MI PEDIDO:*\n`;
    
    items.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} (${formatPrice(item.price * item.quantity)})`;
      if (itemNotes[item.id]) {
        message += `\n  _Nota: ${itemNotes[item.id]}_`;
      }
      message += `\n`;
    });
    
    message += `\n*Total a pagar: ${formatPrice(totalPrice)}*\n\n`;
    message += `*Entrega:* ${delivery}\n`;
    message += `*Pago:* ${payment}\n\n`;
    message += `¡Quedo atento/a para coordinar!`;

    // 1. Guardar en Historial del Cliente
    const newHistoryOrder: PastOrder = {
      date: new Date().toLocaleDateString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
      total: totalPrice
    };
    const updatedHistory = [newHistoryOrder, ...pastOrders.slice(0, 4)];
    setPastOrders(updatedHistory);
    localStorage.setItem('pepo_past_orders', JSON.stringify(updatedHistory));

    // 2. INYECTAR EN EL PANEL DE PEDIDOS KDS (Simulación en tiempo real)
    const savedKdsOrders = JSON.parse(localStorage.getItem('pepo_orders') || '[]');
    const newKdsOrder = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      cliente: delivery === 'Delivery' ? 'Delivery Web' : 'Retiro Web',
      items: items.map(i => ({
        id: i.id,
        nombre: i.name + (itemNotes[i.id] ? ` (${itemNotes[i.id]})` : ''),
        cantidad: i.quantity,
        precio: i.price
      })),
      total: totalPrice,
      estado: 'pendiente'
    };
    localStorage.setItem('pepo_orders', JSON.stringify([...savedKdsOrders, newKdsOrder]));

    setIsConfirmed(true);

    const params = new URLSearchParams({
      phone: storeInfo.telefono.replace('+', ''),
      text: message
    });

    setTimeout(() => {
      window.open(`https://api.whatsapp.com/send?${params.toString()}`, '_blank', 'noopener,noreferrer');
      setIsConfirmed(false);
      clearCart();
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-brand-ink/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <aside className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-brand-cream border-l border-black/10 shadow-2xl h-[100dvh]">
        <header className="flex items-center justify-between p-6 border-b border-black/10 bg-white/50">
          <h2 className="font-display text-2xl text-brand-indigo tracking-wide">TU PEDIDO</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 text-brand-indigo transition-colors">
            <X size={24} />
          </button>
        </header>

        {isConfirmed ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-brand-cream animate-fadeIn">
            <CheckCircle2 size={64} className="text-emerald-500 mb-4 animate-bounce" />
            <h3 className="font-display text-3xl text-brand-indigo">¡Pedido Empaquetado!</h3>
            <p className="font-body text-sm text-brand-ink/70 mt-2">Redirigiendo de forma segura a WhatsApp para confirmar con el local...</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-brand-indigo/50 space-y-3">
                <span className="text-5xl">🥢</span>
                <p className="text-center font-body text-sm">Tu carrito está vacío.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-nav text-[10px] text-brand-indigo/60 tracking-widest uppercase">PRODUCTOS SELECCIONADOS</p>
                {items.map((item) => (
                  <div key={item.id} className="p-4 bg-white border border-black/5 rounded-[8px] card-shadow space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-display text-lg text-brand-indigo leading-tight">{item.name}</h3>
                        <p className="text-brand-orange font-bold font-display text-lg mt-0.5">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-500/10 p-1.5 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/5">
                      <div className="flex items-center bg-brand-cream border border-black/10 rounded-lg">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-brand-indigo hover:text-brand-orange"><Minus size={14} /></button>
                        <span className="w-6 text-center text-xs font-bold text-brand-indigo">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-brand-indigo hover:text-brand-orange"><Plus size={14} /></button>
                      </div>
                    </div>

                    <input 
                      type="text"
                      placeholder="Ej: Sin cebollín, salsa extra..."
                      value={itemNotes[item.id] || ''}
                      onChange={(e) => handleNoteChange(item.id, e.target.value)}
                      className="w-full bg-brand-cream border border-black/10 rounded px-2.5 py-1.5 text-xs font-body text-brand-indigo focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                ))}
              </div>
            )}

            {pastOrders.length > 0 && (
              <div className="pt-4 border-t border-black/10">
                <p className="font-nav text-[10px] text-brand-indigo/60 tracking-widest uppercase mb-3 flex items-center gap-1.5">
                  <Clock size={14} /> Pedidos Recientes (Recompra rápida)
                </p>
                <div className="space-y-2">
                  {pastOrders.map((order, idx) => (
                    <div key={idx} className="bg-white/80 p-3 rounded border border-black/5 text-xs flex justify-between items-center">
                      <div>
                        <p className="font-bold text-brand-indigo">{order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                        <p className="text-[10px] text-brand-ink/50">{order.date} · {formatPrice(order.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!isConfirmed && (
          <footer className="border-t border-black/10 bg-white/50 p-6 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-nav text-[10px] text-brand-indigo/80 tracking-widest uppercase">Entrega</label>
                <select value={delivery} onChange={(e) => setDelivery(e.target.value as DeliveryOption)} className="bg-white border border-black/10 rounded-lg px-3 py-2 text-xs font-body text-brand-indigo">
                  <option value="Retiro en local">Retiro en local</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-nav text-[10px] text-brand-indigo/80 tracking-widest uppercase">Pago</label>
                <select value={payment} onChange={(e) => setPayment(e.target.value as PaymentOption)} className="bg-white border border-black/10 rounded-lg px-3 py-2 text-xs font-body text-brand-indigo">
                  <option value="Pago en tienda">Pago en tienda</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-nav text-xs text-brand-indigo/60 uppercase">Total:</span>
              <span className="font-display text-3xl text-brand-indigo">{formatPrice(totalPrice)}</span>
            </div>
            
            <button
              onClick={handleWhatsAppCheckout}
              disabled={items.length === 0}
              className="w-full py-4 bg-[#25D366] hover:bg-[#22bf5b] disabled:bg-black/10 disabled:text-black/30 text-white font-nav text-xs tracking-widest uppercase rounded-full shadow-lg flex items-center justify-center gap-2"
            >
              HACER PEDIDO POR WHATSAPP
            </button>
          </footer>
        )}
      </aside>
    </>
  );
};