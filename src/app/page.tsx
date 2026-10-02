"use client";
import { useState } from "react";
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

  const projects = [
    {
      name: "ESTUDIO — Lab",
      tag: "Landing Premium",
      desc: "Identidad visual y experiencia web para estudio de arquitectura.",
      link: "https://estudio-lab.vercel.app/",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
      color: "from-[#F6F5F2] to-[#E8E6E1]",
    },
    {
      name: "TURNO LAB",
      tag: "SaaS / Agendamiento",
      desc: "Plataforma de gestión de turnos con integración a WhatsApp.",
      link: "https://turno-lab.vercel.app/",
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop",
      color: "from-[#0A1931] to-[#1E3A8A]",
    },
    {
      name: "Presupuestar PRO",
      tag: "Dashboard / SaaS",
      desc: "Sistema integral para presupuestos, stock y gestión de clientes.",
      link: "#",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      color: "from-[#122545] to-[#0d1d3a]",
    },
    {
      name: "VIT CRISTALES",
      tag: "E-commerce",
      desc: "Tienda online con carrito, stock y pasarela de pagos.",
      link: "#",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop",
      color: "from-[#1a1a1a] to-[#2a2a2a]",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    try {
      const { error } = await supabase.from('contacts').insert({ name, email, message });
      if (error) throw error;
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      alert("Gracias por tu mensaje. Te responderemos dentro de las 24 horas.");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070E22] text-white selection:bg-white selection:text-[#070E22]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: '40px 40px'}} />
        <motion.div animate={{x:[0,80,0], y:[0,40,0]}} transition={{duration:18, repeat:Infinity, ease:"easeInOut"}} className="absolute top-[-10%] left-[5%] w-[900px] h-[700px] bg-[#1E3A8A]/30 rounded-full blur-[140px]" />
        <motion.div animate={{x:[0,-60,0], y:[0,80,0]}} transition={{duration:22, repeat:Infinity, ease:"easeInOut"}} className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-[#6366F1]/15 rounded-full blur-[140px]" />
      </div>

      <header className="relative flex justify-between items-center px-6 md:px-12 py-6 z-50 sticky top-0 backdrop-blur-xl bg-[#070E22]/70 border-b border-white/5">
        <h1 className="text-[22px] tracking-[0.35em] font-black">LX</h1>
        <div className="flex gap-3">
          <a href="#trabajos" className="hidden md:block text-[11px] font-bold tracking-widest text-white/40 hover:text-white transition px-5 py-2.5">PROYECTOS</a>
          <a href="https://wa.me/5493584326915" className="bg-white text-black rounded-full px-6 py-2.5 text-[11px] font-black tracking-widest hover:bg-white/90 transition">CONTACTAR →</a>
        </div>
      </header>

      <section className="relative px-6 md:px-12 pt-20 md:pt-28 pb-16 z-10 max-w-[1400px] mx-auto">
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 text-[11px] font-bold tracking-widest text-white/50 bg-white/[0.04] backdrop-blur mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> DISPONIBLE PARA NUEVOS PROYECTOS
        </motion.div>
        <motion.h2 initial={{y:40, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.8}} className="text-[44px] md:text-[88px] font-black leading-[0.88] tracking-[-0.04em]">Sitios web<br/><span className="font-light italic text-white/50">profesionales</span><br/>que impulsan<br/>tu negocio.</motion.h2>
        <div className="mt-8 flex flex-col md:flex-row gap-8 md:items-end justify-between">
          <p className="text-[15px] md:text-[17px] text-white/50 max-w-[520px] leading-relaxed font-medium">Desarrollamos Landing Pages, E-commerce y Sistemas a medida en Next.js. Diseño cuidado, alto rendimiento y enfoque en conversión.<br/><span className="text-white/80">Estudio basado en Río Cuarto, Córdoba. Trabajamos para todo el país.</span></p>
          <div className="flex gap-3">
            <a href="#trabajos" className="bg-white text-black rounded-full px-8 py-4 text-xs font-black tracking-widest">VER PROYECTOS</a>
            <a href="#contacto" className="border border-white/10 rounded-full px-8 py-4 text-xs font-black tracking-widest hover:bg-white/5 transition">SOLICITAR PRESUPUESTO</a>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 grid grid-cols-3 md:grid-cols-4 gap-6">
          <div><p className="text-2xl font-black">7 días</p><p className="text-[10px] tracking-widest text-white/30 mt-1 font-black">PLAZO PROMEDIO LANDING</p></div>
          <div><p className="text-2xl font-black">+16</p><p className="text-[10px] tracking-widest text-white/30 mt-1 font-black">PROYECTOS ENTREGADOS</p></div>
          <div><p className="text-2xl font-black">100/100</p><p className="text-[10px] tracking-widest text-white/30 mt-1 font-black">PERFORMANCE SCORE</p></div>
          <div className="hidden md:block"><p className="text-2xl font-black">24hs</p><p className="text-[10px] tracking-widest text-white/30 mt-1 font-black">TIEMPO DE RESPUESTA</p></div>
        </div>
      </section>

      <section id="trabajos" className="relative px-6 md:px-12 py-20 z-10 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-white/30 text-[11px] tracking-[0.35em] font-black">PROYECTOS SELECCIONADOS / 2024 — 2026</h3>
          <p className="text-[11px] font-bold tracking-widest text-white/20 hidden md:block">4 CASOS DESTACADOS</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p,i) => (
            <motion.a href={p.link} target="_blank" key={p.name} initial={{y:20, opacity:0}} whileInView={{y:0, opacity:1}} viewport={{once:true}} transition={{delay:i*0.06}}
              className="group relative rounded-[24px] p-[1px] bg-gradient-to-b from-white/20 to-white/5 hover:from-white/30 hover:to-white/10 transition-all duration-500">
              <div className={`relative rounded-[23px] bg-gradient-to-br ${p.color} h-[300px] md:h-[330px] overflow-hidden flex flex-col justify-between p-6`}>
                <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" quality={60} priority={i === 0} className="absolute inset-0 object-cover opacity-[0.18] group-hover:opacity-[0.28] group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-[9px] font-black tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white">{p.tag}</span>
                  <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-[12px] font-bold group-hover:rotate-45 group-hover:scale-110 transition-all duration-300 shadow-lg">↗</span>
                </div>
                <div className="relative z-10">
                  <h4 className={`text-[24px] md:text-[26px] font-black leading-[0.9] tracking-[-0.02em] ${p.name.includes('ESTUDIO')? 'text-black' : 'text-white'}`}>{p.name}</h4>
                  <p className={`mt-2 text-[12.5px] font-medium leading-relaxed max-w-[30ch] ${p.name.includes('ESTUDIO')? 'text-black/60' : 'text-white/60'}`}>{p.desc}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-12 py-10 z-10 max-w-[1400px] mx-auto grid md:grid-cols-3 gap-4">
        {[
          {t:"Landing Pages", p:"Desde USD 350", d:"Diseño editorial, estrategia de conversión y desarrollo optimizado. Entrega en 7 días."},
          {t:"E-commerce", p:"Desde USD 600", d:"Gestión de productos, stock, pagos y envíos. Experiencia optimizada para mobile."},
          {t:"Sistemas a medida", p:"Desde USD 800", d:"Plataformas como gestión de turnos, presupuestos o clientes. Desarrolladas a medida."},
        ].map((s) => (
          <div key={s.t} className="rounded-[20px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <p className="text-[10px] font-black tracking-widest text-white/30">{s.p}</p>
            <h4 className="mt-2.5 text-[16px] font-black">{s.t}</h4>
            <p className="mt-1.5 text-[12.5px] font-medium leading-relaxed text-white/40">{s.d}</p>
          </div>
        ))}
      </section>

      <section className="relative px-6 md:px-12 py-24 z-10 max-w-[1400px] mx-auto border-t border-white/5">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div className="sticky top-28">
            <h3 className="text-white/30 text-[11px] tracking-[0.35em] font-black mb-6">METODOLOGÍA DE TRABAJO</h3>
            <h2 className="text-[40px] md:text-[52px] font-black leading-[0.88] tracking-[-0.03em]">Proceso claro,<br/><span className="text-white/30">resultados medibles.</span></h2>
            <p className="mt-6 text-[14px] leading-relaxed text-white/40 max-w-[38ch] font-medium">Trabajamos por etapas con entregables definidos. Comunicación continua y seguimiento cada 48 horas. Transparencia en tiempos y costos desde el inicio.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4"><p className="text-[11px] font-black tracking-widest text-white/20">PLAZO DE ENTREGA</p><p className="mt-1 text-[15px] font-black">7 a 14 días hábiles</p></div>
              <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4"><p className="text-[11px] font-black tracking-widest text-white/20">MODALIDAD DE PAGO</p><p className="mt-1 text-[15px] font-black">50% inicio / 50% entrega</p></div>
            </div>
          </div>
          <div className="grid gap-3">
            {[
              {n:"01", t:"Relevamiento y propuesta", d:"Reunión inicial para comprender objetivos, público y alcance. Presentación de propuesta técnica y presupuesto detallado en 24 horas.", list:["Reunión de 20 min","Propuesta técnica","Presupuesto cerrado"]},
              {n:"02", t:"Diseño y validación", d:"Diseño de interfaz en Figma y prototipo navegable desplegado en entorno de prueba. Dos instancias de revisión incluidas.", list:["Diseño en Figma","Demo en Vercel","2 revisiones"]},
              {n:"03", t:"Desarrollo y puesta en producción", d:"Desarrollo en Next.js, integración con base de datos, pasarelas de pago y servicios externos. Deploy en dominio final con optimización de rendimiento.", list:["Next.js + Supabase","Integración de servicios","Optimización 100/100"]},
              {n:"04", t:"Entrega y soporte", d:"Capacitación para la gestión del sitio, documentación y 30 días de soporte para ajustes menores y corrección de incidencias.", list:["30 días de soporte","Video de capacitación","Documentación"]},
            ].map((s) => (
              <div key={s.n} className="group relative rounded-[24px] border border-white/10 bg-white/[0.03] p-7 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                <div className="flex gap-6">
                  <span className="text-[13px] font-black tracking-widest text-white/20 group-hover:text-white/40 transition">{s.n}</span>
                  <div className="flex-1">
                    <h4 className="text-[18px] font-black tracking-tight">{s.t}</h4>
                    <p className="mt-2 text-[13px] leading-[1.6] text-white/40 font-medium">{s.d}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{s.list.map(l => (<span key={l} className="text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/50">{l}</span>))}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="rounded-[24px] bg-white text-black p-7 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
              <div><p className="text-[12px] font-black tracking-widest opacity-50">NUESTRO ENFOQUE</p><p className="mt-2 text-[14px] font-bold leading-relaxed max-w-[42ch]">Trabajamos sin plantillas genéricas ni soluciones estandarizadas. Cada proyecto es desarrollado a medida, con código propio y atención al detalle.</p></div>
              <a href="https://wa.me/5493584326915" className="bg-black text-white rounded-full px-6 py-3 text-[11px] font-black tracking-widest whitespace-nowrap hover:bg-zinc-800 transition">CONSULTAR DISPONIBILIDAD →</a>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="relative px-6 md:px-12 py-24 border-t border-white/10 z-10 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="rounded-[28px] overflow-hidden border border-white/10 h-[520px] bg-[#0d1d3a] relative">
            {!showMap? (
              <div onClick={() => setShowMap(true)} className="absolute inset-0 cursor-pointer bg-[#0d1d3a] flex flex-col items-center justify-center gap-4 group">
                <div className="w-full h-full absolute opacity-40">
                  <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=60&auto=format&fit=crop" alt="mapa rio cuarto" fill sizes="50vw" className="object-cover" />
                </div>
                <div className="relative z-10 bg-white text-black px-6 py-3 rounded-full text-[11px] font-black tracking-widest group-hover:scale-105 transition">VER UBICACIÓN — RÍO CUARTO</div>
                <p className="relative z-10 text-white/40 text-[10px] font-black tracking-widest">CLICK PARA CARGAR MAPA</p>
              </div>
            ) : (
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107000!2d-64.38!3d-33.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d2000e4f8a6a1b%3A0x1c1c1c1c!2sR%C3%ADo%20Cuarto!5e0!3m2!1ses!2sar!4v123" width="100%" height="100%" style={{border:0, filter:"invert(90%) hue-rotate(180deg)"}} loading="lazy"></iframe>
            )}
          </div>
          <div className="max-w-md md:ml-auto w-full bg-white text-black rounded-[28px] p-8">
            <h3 className="text-[28px] font-black leading-[0.9] tracking-tight">Conversemos sobre<br/>tu proyecto.</h3>
            <p className="mt-3 text-[13px] text-black/50 font-bold leading-relaxed">Completá el formulario y te responderemos dentro de las 24 horas hábiles con una propuesta.</p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
              <input name="name" placeholder="Nombre y apellido" required className="bg-black/[0.04] border border-black/10 rounded-full px-6 py-4 outline-none text-sm font-bold placeholder:text-black/30" />
              <input name="email" type="email" placeholder="Correo electrónico" required className="bg-black/[0.04] border border-black/10 rounded-full px-6 py-4 outline-none text-sm font-bold placeholder:text-black/30" />
              <textarea name="message" placeholder="Contanos brevemente sobre tu proyecto..." rows={4} required className="bg-black/[0.04] border border-black/10 rounded-[20px] px-6 py-4 outline-none text-sm font-bold placeholder:text-black/30"></textarea>
              <button type="submit" disabled={loading} className="bg-black text-white rounded-full py-4 font-black text-xs tracking-widest disabled:opacity-50">{loading? "ENVIANDO..." : "ENVIAR CONSULTA →"}</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="relative px-6 md:px-12 py-12 border-t border-white/10 z-10 bg-[#050A18]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div><h4 className="text-xl tracking-[0.3em] font-black">LX —</h4><p className="mt-2 text-white/30 text-sm max-w-xs font-bold leading-relaxed">Estudio de desarrollo web. Sitios profesionales y sistemas a medida. Río Cuarto, Córdoba.</p></div>
          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-2"><span className="text-white/20 text-[10px] tracking-widest font-black">CONTACTO</span><a href="https://instagram.com/lacroix.lab" className="text-white/60 hover:text-white font-bold">Instagram ↗</a><a href="https://wa.me/5493584326915" className="text-white/60 hover:text-white font-bold">WhatsApp ↗</a></div>
            <div className="flex flex-col gap-2"><span className="text-white/20 text-[10px] tracking-widest font-black">TECNOLOGÍAS</span><span className="text-white/40 font-bold">Next.js / Tailwind / Supabase / Vercel</span></div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-10 pt-8 border-t border-white/5 flex justify-between text-[10px] font-black tracking-widest text-white/20"><p>© 2026 LACROIX LAB — RÍO CUARTO</p><p>DESARROLLO WEB PROFESIONAL</p></div>
      </footer>
    </main>
  );
}