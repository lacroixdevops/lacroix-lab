"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = (() => {
  if (typeof window!== 'undefined') {
    const w = window as any;
    if (!w.__supabase) w.__supabase = createClient(supabaseUrl, supabaseKey);
    return w.__supabase;
  }
  return createClient(supabaseUrl, supabaseKey);
})();

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const projects = [
    { name: "ESTUDIO — Lab", tag: "Landing Page", year:"2025", result:"0.8s • +40% consultas", desc: "Identidad visual y sitio web para estudio de arquitectura.", link: "https://estudio-lab.vercel.app/", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop" },
    { name: "TURNO LAB", tag: "Plataforma SaaS", year:"2025", result:"200 clientes activos", desc: "Sistema de gestión de turnos con integración a WhatsApp.", link: "https://turno-lab.vercel.app/", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop" },
    { name: "Presupuestar PRO", tag: "Dashboard", year:"2024", result:"Stock en tiempo real", desc: "Sistema integral para presupuestos y gestión comercial.", link: "#", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop" },
    { name: "VIT CRISTALES", tag: "E-commerce", year:"2024", result:"2.3% tasa de conversión", desc: "Tienda online con carrito y pasarela de pagos.", link: "#", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop" },
    { name: "CLINICA NORTE", tag: "Sitio Institucional", year:"2024", result:"+60% en solicitudes", desc: "Sitio institucional para clínica privada.", link: "#", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop" },
    { name: "AGRO GESTION", tag: "Sistema a medida", year:"2023", result:"ERP completo", desc: "Plataforma de gestión agrícola y control de stock.", link: "#", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop" },
  ];

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left"? -320 : 320, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name') as string; const email = fd.get('email') as string; const message = fd.get('message') as string;
    try {
      const { error } = await supabase.from('contacts').insert({ name, email, message });
      if (error) throw error;
      alert("Gracias por su consulta. Responderemos dentro de las 24 horas hábiles.");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-[#070E22] text-white selection:bg-white selection:text-[#070E22]">
      <header className="flex justify-between items-center px-6 md:px-12 py-6 z-50 sticky top-0 backdrop-blur-xl bg-[#070E22]/80 border-b border-white/5">
        <h1 className="text-[22px] tracking-[0.35em] font-black">LX</h1>
        <a href="https://wa.me/5493584326915" className="bg-white text-black rounded-full px-6 py-2.5 text-[11px] font-black tracking-widest">INICIAR PROYECTO</a>
      </header>

      <section className="px-6 md:px-12 pt-20 md:pt-28 pb-12 max-w-[1400px] mx-auto">
        <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 text-[11px] font-bold tracking-widest text-white/50 bg-white/[0.04] mb-8"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> AGENDA ABIERTA Q4 2026</div>
        <h2 className="text-[44px] md:text-[80px] font-black leading-[0.88] tracking-[-0.04em]">Desarrollo web<br/><span className="font-light text-white/50">de alto rendimiento</span><br/>para empresas que<br/>buscan crecer.</h2>
      </section>

      <section id="trabajos" className="max-w-[1400px] mx-auto">
        <div className="px-6 md:px-12 flex justify-between items-center mb-6">
          <div className="flex items-center gap-6">
            <h3 className="text-white/30 text-[10px] tracking-[0.35em] font-black">PROYECTOS / 2024—2026</h3>
            <div className="hidden md:flex gap-2"><button onClick={() => scroll("left")} className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition">←</button><button onClick={() => scroll("right")} className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition">→</button></div>
          </div>
          <p className="text-[10px] font-bold tracking-widest text-white/20">DESLIZAR PARA VER MÁS</p>
        </div>
        <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-none px-6 md:px-12 pb-8 snap-x snap-mandatory cursor-grab active:cursor-grabbing" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {projects.map((p,i) => (
            <motion.a href={p.link} target="_blank" key={p.name+i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="group min-w-[280px] max-w-[280px] md:min-w-[300px] snap-start rounded-[16px] bg-[#0E172E] border border-white/[0.06] overflow-hidden hover:border-white/15 transition-all shrink-0">
              <div className="flex justify-between items-center px-4 py-3 border-b border-white/[0.05]"><span className="text-[9px] font-black tracking-[0.15em] text-white/30">{p.tag.toUpperCase()}</span><span className="text-[9px] font-bold text-white/20">{p.year}</span></div>
              <div className="relative h-[150px] bg-[#070E22] overflow-hidden"><Image src={p.img} alt={p.name} fill sizes="300px" className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-[#0E172E] to-transparent" /><div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-[8px] font-black tracking-widest text-white/70">{p.result}</div></div>
              <div className="px-4 py-3.5"><h4 className="text-[13px] font-black group-hover:text-[#93C5FD] transition">{p.name}</h4><p className="text-[11px] text-white/40 mt-1 truncate">{p.desc}</p></div>
            </motion.a>
          ))}
          <div className="min-w-[280px] snap-start rounded-[16px] border border-dashed border-white/15 bg-white/[0.02] p-6 flex flex-col justify-between shrink-0"><div><p className="text-[10px] font-black tracking-widest text-white/20">PROYECTOS ADICIONALES</p><p className="text-[15px] font-black mt-2 leading-[1.2]">12 proyectos adicionales bajo acuerdo de confidencialidad.</p></div><a href="https://wa.me/5493584326915" className="mt-6 bg-white text-black rounded-full py-3 text-center text-[10px] font-black tracking-widest">SOLICITAR PORTFOLIO</a></div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-[1400px] mx-auto border-t border-white/5">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div className="sticky top-28">
            <p className="text-[10px] tracking-[0.35em] font-black text-[#60A5FA]">METODOLOGÍA DE TRABAJO</p>
            <h2 className="text-[32px] md:text-[44px] font-black leading-[0.9] mt-4 tracking-tight">Proceso estructurado,<br/><span className="text-white/30 font-light">entregables definidos.</span></h2>
            <p className="mt-4 text-[13px] leading-[1.6] text-white/40 max-w-[36ch]">Trabajamos por etapas con seguimiento cada 48 horas. Tiempos y costos definidos desde el inicio.</p>
          </div>
          <div className="grid gap-3">
            {[
              { n:"01", t:"Relevamiento y propuesta técnica", d:"Reunión inicial para relevar objetivos y alcance. Propuesta detallada en 24 horas.", list:["Reunión inicial","Propuesta técnica","Presupuesto"] },
              { n:"02", t:"Diseño y validación", d:"Diseño en Figma y prototipo navegable en Vercel. Dos revisiones incluidas.", list:["Figma","Demo Vercel","2 revisiones"] },
              { n:"03", t:"Desarrollo y producción", d:"Next.js, Supabase e integraciones. Optimización 100/100.", list:["Next.js + Supabase","Integraciones","100/100"] },
              { n:"04", t:"Entrega y soporte técnico", d:"Deploy final, capacitación y 30 días de soporte.", list:["Deploy","Capacitación","30 días soporte"] },
            ].map((s) => (
              <div key={s.n} className="rounded-[18px] border border-white/10 bg-[#0E172E]/60 p-6 hover:bg-[#111E3A] transition-all">
                <div className="flex gap-5"><span className="text-[11px] font-black tracking-widest text-[#60A5FA] mt-1">{s.n}</span><div className="flex-1"><h4 className="text-[15px] font-black tracking-tight">{s.t}</h4><p className="mt-2 text-[12px] leading-[1.6] text-white/40">{s.d}</p><div className="mt-3 flex flex-wrap gap-2">{s.list.map(l => (<span key={l} className="text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/40">{l}</span>))}</div></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO OSCURO */}
      <section id="contacto" className="px-6 md:px-12 py-20 border-t border-white/10 max-w-[1400px] mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-[20px] overflow-hidden border border-white/10 h-[500px] bg-[#0d1d3a] relative">
          {!showMap? (<div onClick={() => setShowMap(true)} className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center gap-3 group"><Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=60&auto=format&fit=crop" alt="mapa" fill className="object-cover opacity-30" /><div className="relative z-10 bg-white text-black px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest group-hover:scale-105 transition">VER UBICACIÓN — RÍO CUARTO</div></div>) : (<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107000!2d-64.38!3d-33.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d2000e4f8a6a1b%3A0x1c1c1c1c!2sR%C3%ADo%20Cuarto!5e0!3m2!1ses!2sar!4v123" width="100%" height="100%" style={{border:0, filter:"invert(90%) hue-rotate(180deg)"}} loading="lazy"></iframe>)}
        </div>

        <div className="max-w-md md:ml-auto w-full rounded-[24px] border border-white/10 bg-[#0E172E] p-[1px]">
          <div className="rounded-[23px] bg-gradient-to-b from-[#111E3A] to-[#0E172E] p-7 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[20px] font-black leading-[0.9] tracking-tight">Solicite una propuesta<br/><span className="text-white/30 font-light">para su proyecto.</span></h3>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[12px]">✦</div>
            </div>
            <p className="text-[12px] leading-[1.5] text-white/40 mb-6">Respuesta dentro de las 24 horas hábiles con propuesta técnica y presupuesto.</p>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-1.5">
                <label className="text-[9px] font-black tracking-[0.2em] text-white/30 ml-1">NOMBRE Y APELLIDO</label>
                <input name="name" placeholder="Juan Pérez" required className="w-full bg-[#070E22] border border-white/10 rounded-full px-5 py-3.5 text-[13px] font-medium text-white outline-none focus:border-[#3B82F6] focus:bg-[#0B1430] placeholder:text-white/20 transition" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-[9px] font-black tracking-[0.2em] text-white/30 ml-1">CORREO ELECTRÓNICO</label>
                <input name="email" type="email" placeholder="juan@empresa.com" required className="w-full bg-[#070E22] border border-white/10 rounded-full px-5 py-3.5 text-[13px] font-medium text-white outline-none focus:border-[#3B82F6] focus:bg-[#0B1430] placeholder:text-white/20 transition" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-[9px] font-black tracking-[0.2em] text-white/30 ml-1">DESCRIPCIÓN DEL PROYECTO</label>
                <textarea name="message" placeholder="Tipo de proyecto, objetivos, referencias..." rows={4} required className="w-full bg-[#070E22] border border-white/10 rounded-[18px] px-5 py-4 text-[13px] font-medium text-white outline-none focus:border-[#3B82F6] focus:bg-[#0B1430] placeholder:text-white/20 resize-none transition"></textarea>
              </div>
              <button disabled={loading} className="mt-2 w-full bg-white text-black rounded-full py-4 font-black text-[11px] tracking-widest hover:bg-white/90 transition disabled:opacity-50">
                {loading? "ENVIANDO..." : "ENVIAR CONSULTA →"}
              </button>
              <p className="text-[10px] text-center text-white/20 font-medium">Sus datos están protegidos. No compartimos información.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[#050A18] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-14 pb-10 grid md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black text-[10px]">LX</div><p className="text-[11px] tracking-[0.4em] font-black">LACROIX LAB</p></div>
            <p className="mt-4 text-[12px] leading-[1.6] text-white/40 max-w-[30ch]">Estudio de desarrollo web basado en Río Cuarto, Córdoba. Sitios de alto rendimiento y sistemas a medida.</p>
          </div>
          <div><p className="text-[10px] font-black tracking-[0.2em] text-white/20">SERVICIOS</p><div className="mt-4 grid gap-3 text-[12px] text-white/50"><span>Landing Pages</span><span>E-commerce</span><span>Sistemas a medida</span></div></div>
          <div><p className="text-[10px] font-black tracking-[0.2em] text-white/20">ESTUDIO</p><div className="mt-4 grid gap-3 text-[12px] text-white/50"><a href="#trabajos" className="hover:text-white">Proyectos</a><a href="#contacto" className="hover:text-white">Contacto</a></div></div>
          <div><p className="text-[10px] font-black tracking-[0.2em] text-white/20">CONTACTO</p><div className="mt-4 grid gap-2"><p className="text-[12px] font-bold text-white">Río Cuarto, Córdoba</p><p className="text-[12px] text-white/50">+54 9 358 432-6915</p><div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0F1E42] border border-[#1E3A8A]/30 px-3 py-1.5"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /><span className="text-[10px] font-black tracking-widest text-[#60A5FA]">AGENDA ABIERTA</span></div></div></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 border-t border-white/5 flex justify-between text-[10px] font-black tracking-widest text-white/20"><p>© 2026 LACROIX LAB</p><p>NEXT.JS • SUPABASE • VERCEL</p></div>
      </footer>
      <style>{`.scrollbar-none::-webkit-scrollbar{display:none}.scrollbar-none{-ms-overflow-style:none; scrollbar-width:none;}`}</style>
    </main>
  );
}