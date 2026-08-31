export interface Product {
  id: string;
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  codigo?: string;
  image?: string;       
  disponible?: boolean;
}

export const menu: Product[] = [
  // --- BEBIDAS ---
  { id: "beb_01", categoria: "Bebidas", nombre: "Coca, Fanta o Sprite 1.5 litros", descripcion: "", precio: 2500 },
  { id: "beb_02", categoria: "Bebidas", nombre: "Lata 330 ml", descripcion: "", precio: 1390 },
  { id: "beb_03", categoria: "Bebidas", nombre: "Monster", descripcion: "", precio: 1850 },
  { id: "beb_04", categoria: "Bebidas", nombre: "Agua Mineral", descripcion: "", precio: 1190 },

  // --- CERVEZAS ---
  { id: "cer_01", categoria: "Cervezas", nombre: "Base michelada", descripcion: "Solo sal y merkén", precio: 500, codigo: "69" },
  { id: "cer_02", categoria: "Cervezas", nombre: "Corona", descripcion: "", precio: 2200 },
  { id: "cer_03", categoria: "Cervezas", nombre: "Heineken o Miller", descripcion: "", precio: 2200, codigo: "80" },
  { id: "cer_04", categoria: "Cervezas", nombre: "Kunstmann o Austral", descripcion: "", precio: 4000, codigo: "81" },

  // --- CEVICHES ---
  { id: "cev_01", categoria: "Ceviches", nombre: "Salmón Camarón 500 grs", descripcion: "", precio: 9000 },
  { id: "cev_02", categoria: "Ceviches", nombre: "Ceviche + pan de ajo para servir", descripcion: "", precio: 7490 },
  { id: "cev_03", categoria: "Ceviches", nombre: "Ceviche 1 kilo", descripcion: "", precio: 14000 },
  { id: "cev_04", categoria: "Ceviches", nombre: "Ceviche 250 gr", descripcion: "", precio: 3500 },
  { id: "cev_05", categoria: "Ceviches", nombre: "Ceviche 350 gr", descripcion: "", precio: 4500 },
  { id: "cev_06", categoria: "Ceviches", nombre: "Ceviche champiñón 250 gr", descripcion: "", precio: 3000 },
  { id: "cev_07", categoria: "Ceviches", nombre: "Ceviche champiñón 350 gr", descripcion: "", precio: 4000 },
  { id: "cev_08", categoria: "Ceviches", nombre: "Ceviche champiñón 500 gr", descripcion: "", precio: 6000 },
  { id: "cev_09", categoria: "Ceviches", nombre: "Ceviche salmón para llevar 500 grs", descripcion: "", precio: 7000 },

  // --- HANDROLLS ---
  { id: "han_01", categoria: "Handroll", nombre: "Handroll Camarón o Salmón", descripcion: "Queso + 1 vegetal a elección (morrón, cebollín, palta, palmito, choclo baby, champiñón).", precio: 5000 },
  { id: "han_02", categoria: "Handroll", nombre: "Handroll Pollo o Kanikama", descripcion: "Queso + 1 vegetal a elección (cebollín, palta, morrón, choclo baby, palmito, champiñón).", precio: 4500 },
  { id: "han_03", categoria: "Handroll", nombre: "Handroll sin nori Camarón o Salmón", descripcion: "", precio: 5500 },
  { id: "han_04", categoria: "Handroll", nombre: "Handroll sin nori Pollo o Kanikama", descripcion: "", precio: 5000 },
  { id: "han_05", categoria: "Handroll", nombre: "Promo Handroll", descripcion: "", precio: 12000 },
  { id: "han_06", categoria: "Handroll", nombre: "Promo Handrolls (4)", descripcion: "", precio: 4000 },
  { id: "han_07", categoria: "Handroll", nombre: "Promo Handrolls x3", descripcion: "", precio: 12000 },
  { id: "han_08", categoria: "Handroll", nombre: "SODEXO Promo Handroll 3x", descripcion: "", precio: 12000 },

  // --- MOJITOS ---
  { id: "moj_01", categoria: "Mojitos", nombre: "Mojito Jagger", descripcion: "", precio: 6500 },
  { id: "moj_02", categoria: "Mojitos", nombre: "Mojito Polaco", descripcion: "Frambuesa, mango, maracuyá, piña", precio: 5000, codigo: "67" },
  { id: "moj_03", categoria: "Mojitos", nombre: "Mojito Ramazzotti", descripcion: "", precio: 6500, codigo: "68" },
  { id: "moj_04", categoria: "Mojitos", nombre: "Mojito Sabores", descripcion: "Frambuesa, mango, maracuyá, piña, cubano", precio: 4500, codigo: "66" },

  // --- PROMOS 30 PIEZAS ---
  { id: "p30_01", categoria: "Promos 30 piezas", nombre: "2 panko 1 palta", descripcion: "20 panko: 10 pollo/morrón/queso, 10 pollo/palta/queso. 10 palta: pollo/cebollín/queso", precio: 13000 },
  { id: "p30_02", categoria: "Promos 30 piezas", nombre: "2 panko 1 queso", descripcion: "20 panko: 10 pollo/palta/queso, 10 pollo/morrón/queso", precio: 13000 },
  { id: "p30_03", categoria: "Promos 30 piezas", nombre: "Promo 30 piezas panko", descripcion: "20 panko: pollo/morrón/queso crema. 10 panko: pollo/palta/queso crema", precio: 12500 },
  { id: "p30_04", categoria: "Promos 30 piezas", nombre: "Promo Especial", descripcion: "10 palta: pollo/cebollín/queso. 10 queso: kanikama/palta/queso. 10 panko: pollo/morrón/queso", precio: 13500 },
  { id: "p30_05", categoria: "Promos 30 piezas", nombre: "Promo Normal (Roll sésamo vegetariano)", descripcion: "10 sésamo: choclo baby/cebollín/queso. 10 nori: kanikama/palta/queso. 10 panko: pollo/morrón/queso", precio: 12000 },

  // --- PROMOS FAMILIARES ---
  { id: "fam_01", categoria: "Promos familiares", nombre: "Familiar 56 piezas solo panko", descripcion: "20 pollo/morrón/queso, 20 pollo/palta/queso, 10 kanikama/cebollín/queso, 6 arrollados primavera.", precio: 18500 },
  { id: "fam_02", categoria: "Promos familiares", nombre: "Familiar Mixta", descripcion: "10 palta, 10 sésamo, 10 nori, 20 panko, 6 rollitos primavera.", precio: 17500 },
  { id: "fam_03", categoria: "Promos familiares", nombre: "Bote 46 piezas", descripcion: "", precio: 25000 },

  // --- SUSHI TRADICIONAL & PREMIUM ---
  { id: "sus_01", categoria: "Sushi", nombre: "30 piezas Pepolov", descripcion: "", precio: 15000 },
  { id: "sus_02", categoria: "Sushi", nombre: "40 piezas Pepolov", descripcion: "", precio: 18000 },
  { id: "sus_03", categoria: "Sushi", nombre: "70 piezas Pepolov", descripcion: "", precio: 28000 },
  { id: "pre_01", categoria: "Sushi premium", nombre: "30 piezas Premium", descripcion: "10 palta, 10 queso (salmón crispy), 10 jamón serrano", precio: 14500 },
  { id: "pre_02", categoria: "Sushi premium", nombre: "40 piezas Premium", descripcion: "10 palta, 10 jamón serrano, 10 sésamo, 10 panko", precio: 16500 },
  { id: "pre_03", categoria: "Sushi premium", nombre: "66 piezas Premium", descripcion: "", precio: 23990 },

  // --- ROLLS EXTRAS ---
  { id: "rol_01", categoria: "Sushi", nombre: "Roll acevichado (envoltura a elección)", descripcion: "", precio: 10500 },
  { id: "rol_02", categoria: "Sushi", nombre: "Roll extra (Camarón o Salmón)", descripcion: "", precio: 5500 },
  { id: "rol_03", categoria: "Sushi", nombre: "Roll extra (Pollo o Kanikama)", descripcion: "", precio: 5000 },
  { id: "rol_04", categoria: "Sushi", nombre: "Roll sin nori (Pollo o Kanikama)", descripcion: "", precio: 5500 },

  // --- GOHAN BOWLS ---
  { id: "goh_01", categoria: "Gohan Bowls", nombre: "Gohan bowl pequeño", descripcion: "", precio: 3600 },
  { id: "goh_02", categoria: "Gohan Bowls", nombre: "Gohan bowl", descripcion: "", precio: 5990 },
  { id: "goh_03", categoria: "Gohan Bowls", nombre: "Gohan bowl XS", descripcion: "", precio: 3600 },

  // --- ENTRADAS Y PARA COMPARTIR ---
  { id: "ent_01", categoria: "Entradas", nombre: "10 Gyoza Camarón", descripcion: "", precio: 5000 },
  { id: "ent_02", categoria: "Entradas", nombre: "10 Gyoza Pollo", descripcion: "", precio: 4000 },
  { id: "ent_03", categoria: "Entradas", nombre: "4 Aros de cebolla", descripcion: "", precio: 2000 },
  { id: "ent_04", categoria: "Entradas", nombre: "6 Empanadas de queso", descripcion: "", precio: 2000 },
  { id: "ent_05", categoria: "Entradas", nombre: "4 Anillos de calamar", descripcion: "", precio: 2000 },
  { id: "ent_06", categoria: "Entradas", nombre: "4 Arrollados jamón queso (grandes)", descripcion: "", precio: 1990 },
  { id: "ent_07", categoria: "Entradas", nombre: "6 Arrollados primavera", descripcion: "", precio: 2000 },
  { id: "ent_08", categoria: "Entradas", nombre: "6 Bocaditos de carne", descripcion: "", precio: 2000 },
  { id: "ent_09", categoria: "Entradas", nombre: "10 Camarón crispy", descripcion: "", precio: 5000 },
  { id: "ent_10", categoria: "Entradas", nombre: "5 Pancitos de ajo", descripcion: "", precio: 1000 },
  { id: "ent_11", categoria: "Entradas", nombre: "Papas con filetes de pollo", descripcion: "", precio: 8000 },
  { id: "ent_12", categoria: "Entradas", nombre: "Porción de papas + nuggets o salchipapa", descripcion: "", precio: 4000 },
  { id: "ent_13", categoria: "Entradas", nombre: "Picoteo mixto", descripcion: "Papas fritas, camarón crispy, aros de calamar, empanadas camarón queso", precio: 9990 },

  // --- TRAGOS ---
  { id: "tra_01", categoria: "Tragos", nombre: "Caipiriña", descripcion: "Limón macerado con cachaza", precio: 6500 },
  { id: "tra_02", categoria: "Tragos", nombre: "Corto de Whisky", descripcion: "A las rocas", precio: 5000, codigo: "75" },
  { id: "tra_03", categoria: "Tragos", nombre: "Cucaracha", descripcion: "Shot de tequila, licor de café y fuego", precio: 3500 },
  { id: "tra_04", categoria: "Tragos", nombre: "Orgasmo", descripcion: "", precio: 6500, codigo: "71" },
  { id: "tra_05", categoria: "Tragos", nombre: "Piscola Promo", descripcion: "2 vasos de pisco más una bebida en lata", precio: 5000, codigo: "74" },
  { id: "tra_06", categoria: "Tragos", nombre: "Pitufos", descripcion: "Shot de tequila con curazao y fuego", precio: 3500, codigo: "76" },
  { id: "tra_07", categoria: "Tragos", nombre: "Ramazzotti Spritz", descripcion: "", precio: 6500, codigo: "78" },
  { id: "tra_08", categoria: "Tragos", nombre: "Ruso Blanco", descripcion: "", precio: 6500, codigo: "70" },
  { id: "tra_09", categoria: "Tragos", nombre: "Tequila Blue", descripcion: "", precio: 6500, codigo: "73" },
  { id: "tra_10", categoria: "Tragos", nombre: "Tequila Margarita", descripcion: "", precio: 5000, codigo: "72" },
  { id: "tra_11", categoria: "Tragos", nombre: "Tequilazo", descripcion: "Shot tequila limón y sal (Unidad)", precio: 2500, codigo: "77" },
  { id: "tra_12", categoria: "Tragos", nombre: "Pisco Sour", descripcion: "", precio: 5000 },

  // --- SOLO RETIRO LOCAL ---
  { id: "ret_01", categoria: "Solo retiro local", nombre: "Churros (6 unidades)", descripcion: "Solo retiro local", precio: 2990 },
  { id: "ret_02", categoria: "Solo retiro local", nombre: "Pepodog", descripcion: "Roll envuelto en panko estilo Hot dog (queso crema, pollo/ceviche salmón, palta, cebollín)", precio: 7000 },

  // --- EXTRAS Y SALSAS ---
  { id: "ext_01", categoria: "Extras y Salsas", nombre: "Salsa Extra", descripcion: "", precio: 500 },
  { id: "ext_02", categoria: "Extras y Salsas", nombre: "Salsa Maracuyá", descripcion: "", precio: 700 },
  { id: "ext_03", categoria: "Extras y Salsas", nombre: "Wasabi", descripcion: "", precio: 1000 },
  { id: "ext_04", categoria: "Extras y Salsas", nombre: "Jengibre", descripcion: "", precio: 1000 },
  { id: "ext_05", categoria: "Extras y Salsas", nombre: "Ayuda para Palillos", descripcion: "", precio: 500 },
  { id: "ext_06", categoria: "Extras y Salsas", nombre: "Cambio Coberturas (Promo Sushi)", descripcion: "", precio: 1000 },
  { id: "ext_07", categoria: "Extras y Salsas", nombre: "Cambio Proteína", descripcion: "", precio: 1000 },
  { id: "ext_08", categoria: "Extras y Salsas", nombre: "Proteína Extra Bowl", descripcion: "", precio: 1500 },
  { id: "ext_09", categoria: "Extras y Salsas", nombre: "Cobertura de Salmón", descripcion: "", precio: 1500 },
  { id: "ext_10", categoria: "Extras y Salsas", nombre: "Vegetal Extra", descripcion: "", precio: 500 },
  
  // --- OTROS ---
  { id: "otr_01", categoria: "Otros", nombre: "Té o Café", descripcion: "", precio: 1400 },
  { id: "otr_02", categoria: "Otros", nombre: "Frutos secos o confites", descripcion: "", precio: 1500 },
  { id: "otr_03", categoria: "Otros", nombre: "Galletas Cracker", descripcion: "", precio: 1000 },
  { id: "otr_04", categoria: "Otros", nombre: "Tarjeta dedicatoria", descripcion: "", precio: 2000 },
  { id: "otr_05", categoria: "Otros", nombre: "Cobro por Envío", descripcion: "", precio: 1000 }
];

// --- INFORMACIÓN DEL LOCAL ---
export const storeInfo = {
  nombre: "Pepo Sushi",
  telefono: "+56977831766", // Reemplazar con el número real de Hualqui
  email: "contacto@peposushi.cl",
  instagram: "@peposushi.hualqui",
  ubicacion: "Hualqui, Región del Biobío",
  // Horarios para el indicador de estado (Días 0=Domingo, 1=Lunes, etc.)
  horarios: {
    1: { apertura: "12:00", cierre: "23:00" }, // Lunes
    2: { apertura: "12:00", cierre: "23:00" }, // Martes
    3: { apertura: "12:00", cierre: "23:00" }, // Miércoles
    4: { apertura: "12:00", cierre: "23:00" }, // Jueves
    5: { apertura: "12:00", cierre: "00:00" }, // Viernes
    6: { apertura: "12:00", cierre: "00:00" }, // Sábados
    0: { apertura: "13:00", cierre: "22:00" }, // Domingos
    }
};