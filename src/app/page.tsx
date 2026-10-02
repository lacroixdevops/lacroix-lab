"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [loading, setLoading] = useState(false);

  const projects = [
    {
      name: "ESTUDIO — Lab",
      tag: "Landing Premium",
      desc: "Arquitectura atemporal. Diseño estilo revista.",
      link: "https://estudio-lab.vercel.app/",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
      color: "from-[#F6F5F2] to-[#E8E6E1]",
    },
    {
      name: "TURNO LAB",
      tag: "SaaS / Agendamiento",
      desc: "Sistema de turnos online con WhatsApp y recordatorios automáticos.",
      link: "https://turno-lab.vercel.app/",
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800",
      color: "from-[#0A1931] to-[#1E3A8A]",
    },
    {
      name: "Presupuestar PRO",
      tag: "Dashboard / SaaS",
      desc: "Sistema de presupuestos, stock y clientes.",
      link: "#",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
      color: "from-[#122545] to-[#0d1d3a]",
    },
    {
      name: "VIT CRISTALES",
      tag: "E-commerce",
      desc: "Tienda con carrito y pago integrado.",
      link: "#",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800",
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
      alert("¡Mensaje enviado! Te respondo en 24hs.");
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
          <a href="#trabajos" className="hidden md:block text-[11px] font-bold tracking-widest text-white/40 hover:text-white transition px-5 py-2.5">TRABAJOS</a>
          <a href="https://wa.me/5493584326915" className="bg-white text-black rounded-full px-6 py-2.5 text-[11px] font-black tracking-widest hover:bg-white/90 transition">HABLEMOS →</a>
        </div>
      </header>

      <section className="relative px-6 md:px-12 pt-20 md:pt-28 pb-16 z-10 max-w-[1400px] mx-auto">
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 text-[11px] font-bold tracking-widest text-white/50 bg-white/[0.04] backdrop-blur mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> DISPONIBLE • 2 CUPOS EN NOVIEMBRE
        </motion.div>
        <motion.h2 initial={{y:40, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.8}} className="text-[48px] md:text-[96px] font-black leading-[0.85] tracking-[-0.04em]">SITIOS QUE<br/><span className="font-light italic text-white/50">venden.</span><br/>NO QUE SE VEN<br/>LINDOS.</motion.h2>
        <div className="mt-8 flex flex-col md:flex-row gap-8 md:items-end justify-between">
          <p className="text-[15px] md:text-[17px] text-white/50 max-w-[520px] leading-relaxed font-medium">Landing Pages premium, Dashboards y E-commerce hechos en Next.js. Sin plantillas. Rápidos, convertidores, a medida.<br/><span className="text-white/80">Río Cuarto → Todo el país.</span></p>
          <div className="flex gap-3">
            <a href="#trabajos" className="bg-white text-black rounded-full px-8 py-4 text-xs font-black tracking-widest">VER TRABAJOS</a>
            <a href="#contacto" className="border border-white/10 rounded-full px-8 py-4 text-xs font-black tracking-widest hover:bg-white/5 transition">COTIZAR</a>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 grid grid-cols-3 md:grid-cols-4 gap-6">
          <div><p className="text-2xl font-black">7 días</p><p className="text-[10px] tracking-widest text-white/30 mt-1 font-black">ENTREGA LANDING</p></div>
          <div><p className="text-2xl font-black">+16</p><p className="text-[10px] tracking-widest text-white/30 mt-1 font-black">PROYECTOS</p></div>
          <div><p className="text-2xl font-black">100/100</p><p className="text-[10px] tracking-widest text-white/30 mt-1 font-black">LIGHTHOUSE SCORE</p></div>
          <div className="hidden md:block"><p className="text-2xl font-black">24hs</p><p className="text-[10px] tracking-widest text-white/30 mt-1 font-black">RESPUESTA</p></div>
        </div>
      </section>

      <section id="trabajos" className="relative px-6 md:px-12 py-24 z-10 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h3 className="text-white/30 text-[11px] tracking-[0.35em] font-black">TRABAJOS / 2024 — 2026</h3>
          <p className="text-[11px] font-bold tracking-widest text-white/20 hidden md:block">4 PROYECTOS SELECCIONADOS</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p,i) => (
            <motion.a href={p.link} target="_blank" key={p.name} initial={{y:30, opacity:0}} whileInView={{y:0, opacity:1}} viewport={{once:true}} transition={{delay:i*0.08}}
              className="group relative border border-white/10 rounded-[28px] overflow-hidden bg-gradient-to-br p-[1px] hover:border-white/20 transition-all">
              <div className={`rounded-[27px] bg-gradient-to-br ${p.color} p-7 md:p-8 h-[380px] flex flex-col justify-between relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition bg-cover bg-center" style={{backgroundImage:`url(${p.img})`}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="relative z-10 flex justify-between">
                  <span className="text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full bg-black/40 backdrop-blur border border-white/10 text-white">{p.tag}</span>
                  <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs group-hover:rotate-45 transition-transform">↗</span>
                </div>
                <div className="relative z-10">
                  <h4 className={`text-[28px] font-black leading-[0.9] tracking-tight ${p.name.includes('ESTUDIO')? 'text-black' : 'text-white'}`}>{p.name}</h4>
                  <p className={`mt-2 text-[13px] font-bold leading-relaxed ${p.name.includes('ESTUDIO')? 'text-black/60' : 'text-white/60'}`}>{p.desc}</p>
                  {p.name === "TURNO LAB" && <p className="mt-3 inline-block text-[10px] font-black tracking-widest px-3 py-1 rounded-full bg-emerald-400 text-black">NUEVO • 2026</p>}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-12 py-10 z-10 max-w-[1400px] mx-auto grid md:grid-cols-3 gap-5">
        {[
          {t:"Landing Premium", p:"Desde USD 350", d:"Diseño estilo revista, copy que vende, deploy en 7 días."},
          {t:"E-Commerce Tech", p:"Desde USD 600", d:"Carrito, stock, pagos, WhatsApp. Optimizado mobile."},
          {t:"SaaS / Turnos", p:"Desde USD 800", d:"Como TURNO LAB. Sistemas para gestionar tu negocio."},
        ].map((s) => (
          <div key={s.t} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
            <p className="text-[10px] font-black tracking-widest text-white/30">{s.p}</p>
            <h4 className="mt-3 text-[18px] font-black">{s.t}</h4>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-white/40">{s.d}</p>
          </div>
        ))}
      </section>

      <section id="contacto" className="relative px-6 md:px-12 py-24 border-t border-white/10 z-10 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="rounded-[28px] overflow-hidden border border-white/10 h-[520px] bg-[#0d1d3a]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107000!2d-64.38!3d-33.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d2000e4f8a6a1b%3A0x1c1c1c1c!2sR%C3%ADo%20Cuarto!5e0!3m2!1ses!2sar!4v123" width="100%" height="100%" style={{border:0, filter:"invert(90%) hue-rotate(180deg)"}} loading="lazy"></iframe>
          </div>
          <div className="max-w-md md:ml-auto w-full bg-white text-black rounded-[28px] p-8">
            <h3 className="text-[28px] font-black leading-[0.9] tracking-tight">Hablemos de<br/>tu proyecto.</h3>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
              <input name="name" placeholder="Tu nombre" required className="bg-black/[0.04] border border-black/10 rounded-full px-6 py-4 outline-none text-sm font-bold placeholder:text-black/30" />
              <input name="email" type="email" placeholder="Tu email" required className="bg-black/[0.04] border border-black/10 rounded-full px-6 py-4 outline-none text-sm font-bold placeholder:text-black/30" />
              <textarea name="message" placeholder="Contame tu idea..." rows={4} required className="bg-black/[0.04] border border-black/10 rounded-[20px] px-6 py-4 outline-none text-sm font-bold placeholder:text-black/30"></textarea>
              <button type="submit" disabled={loading} className="bg-black text-white rounded-full py-4 font-black text-xs tracking-widest disabled:opacity-50">
                {loading? "ENVIANDO..." : "ENVIAR MENSAJE →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="relative px-6 md:px-12 py-12 border-t border-white/10 z-10 bg-[#050A18]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div><h4 className="text-xl tracking-[0.3em] font-black">LX —</h4><p className="mt-2 text-white/30 text-sm max-w-xs font-bold leading-relaxed">Sitios premium que convierten. Hechos en Río Cuarto, para todo el país.</p></div>
          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-2"><span className="text-white/20 text-[10px] tracking-widest font-black">REDES</span><a href="https://instagram.com/lacroix.lab" className="text-white/60 hover:text-white font-bold">Instagram ↗</a><a href="https://wa.me/5493584326915" className="text-white/60 hover:text-white font-bold">WhatsApp ↗</a></div>
            <div className="flex flex-col gap-2"><span className="text-white/20 text-[10px] tracking-widest font-black">STACK</span><span className="text-white/40 font-bold">Next.js / Tailwind / Supabase / Vercel</span></div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-10 pt-8 border-t border-white/5 flex justify-between text-[10px] font-black tracking-widest text-white/20"><p>© 2026 LACROIX LAB</p><p>HECHO PARA VENDER</p></div>
      </footer>
    </main>
  );
}