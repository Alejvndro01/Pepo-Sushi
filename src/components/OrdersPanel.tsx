// src/components/OrdersPanel.tsx
import { useState, useEffect, useRef } from 'react';
import { Clock, ChefHat, CheckCircle, Trash2 } from 'lucide-react';

export type OrderStatus = 'pendiente' | 'preparando' | 'completado';

export interface OrderItem {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface Order {
  id: string;
  timestamp: number;
  cliente: string;
  items: OrderItem[];
  total: number;
  estado: OrderStatus;
}

export const OrdersPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  
  // useRef mantiene variables mutables sin provocar re-renderizados.
  // isInitialLoad evita que el sonido se dispare al abrir el panel.
  const isInitialLoad = useRef(true);
  const previousOrderCount = useRef(0);

  useEffect(() => {
    const fetchOrders = () => {
      const saved = localStorage.getItem('pepo_orders');
      if (saved) {
        const parsedOrders: Order[] = JSON.parse(saved);
        
        // Verifica si hay más pedidos de los que teníamos registrados (nuevo ingreso)
        if (!isInitialLoad.current && parsedOrders.length > previousOrderCount.current) {
          playAlertSound();
        }

        setOrders(parsedOrders);
        previousOrderCount.current = parsedOrders.length;
        isInitialLoad.current = false;
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  // Instancia el objeto Audio nativo del navegador apuntando a la carpeta public
  const playAlertSound = () => {
    const audio = new Audio('/alert.mp3');
    audio.play().catch(error => console.warn('Navegador bloqueó el autoplay:', error));
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, estado: newStatus } : o);
    setOrders(updated);
    localStorage.setItem('pepo_orders', JSON.stringify(updated));
  };

  const deleteOrder = (orderId: string) => {
    if (!window.confirm('¿Eliminar este pedido del sistema?')) return;
    const updated = orders.filter(o => o.id !== orderId);
    setOrders(updated);
    localStorage.setItem('pepo_orders', JSON.stringify(updated));
    // Actualizamos la referencia para que no suene por error al borrar
    previousOrderCount.current = updated.length; 
  };

  const formatTime = (ts: number) => 
    new Date(ts).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

  const renderOrderCard = (order: Order) => (
    <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-black/5 flex flex-col gap-3 animate-fadeIn">
      <div className="flex justify-between items-start border-b border-black/5 pb-2">
        <div>
          <p className="font-display text-lg text-brand-indigo">#{order.id.slice(-4)}</p>
          <p className="text-[10px] font-nav text-brand-indigo/60">{formatTime(order.timestamp)} · {order.cliente}</p>
        </div>
        <p className="font-bold text-brand-orange">{formatPrice(order.total)}</p>
      </div>
      
      <div className="flex-1">
        <ul className="text-xs font-body text-brand-ink/80 space-y-1">
          {order.items.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span><span className="font-bold text-brand-indigo">{item.cantidad}x</span> {item.nombre}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button onClick={() => deleteOrder(order.id)} className="p-1.5 text-rose-400 hover:bg-rose-50 rounded-md transition-colors" title="Eliminar pedido">
          <Trash2 size={16} />
        </button>
        <div className="flex gap-2">
          {order.estado === 'pendiente' && (
            <button onClick={() => updateOrderStatus(order.id, 'preparando')} className="bg-brand-honey text-brand-indigo px-3 py-1.5 rounded-lg text-[10px] font-nav font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <ChefHat size={14} /> Preparar
            </button>
          )}
          {order.estado === 'preparando' && (
            <button onClick={() => updateOrderStatus(order.id, 'completado')} className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-nav font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <CheckCircle size={14} /> Listo
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 h-full bg-brand-cream/30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-start">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/5 min-h-[60vh]">
          <div className="flex items-center gap-2 mb-4 text-rose-500 font-nav text-xs tracking-widest uppercase font-bold">
            <Clock size={16} /> Nuevos ({orders.filter(o => o.estado === 'pendiente').length})
          </div>
          <div className="space-y-4">
            {orders.filter(o => o.estado === 'pendiente').map(renderOrderCard)}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/5 min-h-[60vh]">
          <div className="flex items-center gap-2 mb-4 text-brand-orange font-nav text-xs tracking-widest uppercase font-bold">
            <ChefHat size={16} /> En Cocina ({orders.filter(o => o.estado === 'preparando').length})
          </div>
          <div className="space-y-4">
            {orders.filter(o => o.estado === 'preparando').map(renderOrderCard)}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/5 min-h-[60vh]">
          <div className="flex items-center gap-2 mb-4 text-emerald-500 font-nav text-xs tracking-widest uppercase font-bold">
            <CheckCircle size={16} /> Listos ({orders.filter(o => o.estado === 'completado').length})
          </div>
          <div className="space-y-4 opacity-60">
            {orders.filter(o => o.estado === 'completado').map(renderOrderCard)}
          </div>
        </div>
      </div>
    </div>
  );
};