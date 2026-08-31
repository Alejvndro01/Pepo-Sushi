import { storeInfo } from '../data/menu';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-cream py-20 mt-auto border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-3 gap-12">
        
        {/* Marca y Ubicación */}
        <div>
          <h3 className="font-display text-4xl text-brand-indigo">
            PEPO<span className="text-brand-orange">·</span>SUSHI
          </h3>
          <p className="font-script text-2xl text-brand-indigo mt-2">Hualqui, Chile</p>
          <p className="font-body text-sm text-brand-ink/60 mt-4 leading-relaxed">
            {storeInfo.ubicacion.split(',')[0]}<br/>
            Hualqui · Región del Biobío
          </p>
        </div>
        
        {/* Contacto Dinámico */}
        <div>
          <p className="font-nav text-xs text-brand-indigo/60 tracking-widest mb-4">CONTACTO</p>
          <ul className="space-y-2 font-body text-sm text-brand-ink/80">
            <li>
              <a 
                href={`tel:${storeInfo.telefono}`} 
                className="hover:text-brand-orange transition-colors"
              >
                {storeInfo.telefono}
              </a>
            </li>
            <li>
              <a 
                href={`mailto:${storeInfo.email}`} 
                className="hover:text-brand-orange transition-colors"
              >
                {storeInfo.email}
              </a>
            </li>
            <li>
              <a 
                href={`https://instagram.com/${storeInfo.instagram.replace('@', '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-orange transition-colors"
              >
                {storeInfo.instagram}
              </a>
            </li>
          </ul>
        </div>
        
        {/* Horarios (Estáticos) */}
        <div>
          <p className="font-nav text-xs text-brand-indigo/60 tracking-widest mb-4">HORARIOS</p>
          <ul className="space-y-2 font-body text-sm text-brand-ink/80">
            <li>Lun — Jue · 12:00 — 23:00</li>
            <li>Vie — Sáb · 12:00 — 00:00</li>
            <li>Dom · 13:00 — 22:00</li>
          </ul>
        </div>
        
      </div>
      
      {/* Copyright y Créditos */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between gap-4 font-nav text-[10px] text-brand-indigo/50 tracking-widest uppercase">
        <p>© {currentYear} {storeInfo.nombre} HUALQUI</p>
        <p>HECHO CON ♥ EN EL SUR DE CHILE POR ALEJANDRODEV</p>
      </div>
    </footer>
  );
};