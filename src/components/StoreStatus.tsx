import { useState, useEffect } from 'react';
import { storeInfo } from '../data/menu';

export const StoreStatus = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Hora local de Chile (UTC-4 / UTC-3)
      const chileTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Santiago' }));
      const day = chileTime.getDay() as keyof typeof storeInfo.horarios;
      const currentTime = `${String(chileTime.getHours()).padStart(2, '0')}:${String(chileTime.getMinutes()).padStart(2, '0')}`;
      
      const schedule = storeInfo.horarios[day];
      if (!schedule) {
        setIsOpen(false);
        return;
      }

      setIsOpen(currentTime >= schedule.apertura && currentTime <= schedule.cierre);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Revisa cada 1 minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/5 shadow-sm">
      <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
      <span className="font-nav text-[10px] tracking-widest text-brand-indigo uppercase font-semibold">
        {isOpen ? 'Abierto ahora · Atendiendo' : 'Cerrado temporalmente'}
      </span>
    </div>
  );
};