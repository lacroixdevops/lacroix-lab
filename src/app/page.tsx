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

  const services = [
    { t: "Diseño de Sitios", d: "Landing pages optimizadas para convertir visitas en clientes. Rápidas, premium, a medida." },
    { t: "Sitios E-Commerce", d: "Tiendas con pagos, stock y envíos. Integración con WhatsApp y sistemas de gestión." },
    { t: "Dashboards a Medida", d: "Sistemas como Presupuestar PRO. Gestión de stock, clientes y presupuestos." },
  ];
  const projects = [
    { name: "Presupuestar PRO", tag: "Dashboard / SaaS", desc: "Sistema de presupuestos, stock y clientes." },
    { name: "VIT CRISTALES", tag: "E-commerce", desc: "Tienda con carrito y pago integrado." },
    { name: "Tu próximo proyecto", tag: "Disponible", desc: "Cotización en 24hs. 100% a medida." },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      // 1. Guardar en Supabase
      const { error: supabaseError } = await supabase.from('contacts').insert({ name, email, message });
      if (supabaseError) throw supabaseError;

      // 2. Mandar mail via Resend a lacroixdevops@gmail.com
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (!res.ok) throw new Error('Error enviando mail');

      alert("¡Mensaje enviado! Te respondo en 24hs.");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A1931] text-white relative overflow-hidden selection:bg-white selection:text-[#0A1931]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: '32px 32px'}} />
        <motion.div animate={{x:[0,100,0], y:[0,50,0]}} transition={{duration:20, repeat:Infinity, ease:"easeInOut"}} className="absolute top-[-100px] left-[10%] w-[800px] h-[600px] bg-gradient-to-br from-[#1e3a8a]/40 to-[#3b82f6]/20 rounded-full blur-[120px]" />
        <motion.div animate={{x:[0,-80,0], y:[0,100,0]}} transition={{duration:25, repeat:Infinity, ease:"easeInOut"}} className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-full blur-[130px]" />
      </div>

      <header className="relative flex justify-between items-center px-8 md:px-16 py-8 z-10">
        <h1 className="text-2xl tracking-[0.3em] font-light">LX</h1>
        <a href="https://wa.me/5493584326915" className="border border-white/20 rounded-full px-6 py-2.5 text-sm hover:bg-white hover:text-[#0A1931] transition backdrop-blur-md">Hablemos →</a>
      </header>

      <section className="relative px-8 md:px-16 pt-20 md:pt-32 pb-20 z-10">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 bg-white/[0.03] backdrop-blur mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Disponible para nuevos proyectos
        </motion.div>
        <motion.h2 initial={{y:40, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.8}} className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tight">DESARROLLO WEB<br/>A MEDIDA</motion.h2>
        <p className="mt-8 text-lg text-white/60 max-w-xl">Landing Pages • Dashboards • E-commerce. Sin plantillas. Sistemas que convierten.</p>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.02] backdrop-blur">
        <div className="px-8 md:px-16 py-6 grid grid-cols-3 md:grid-cols-4 gap-6 text-center">
          <div><p className="text-2xl md:text-3xl font-black">24hs</p><p className="text-[10px] tracking-widest text-white/40 mt-1">TIEMPO DE RESPUESTA</p></div>
          <div><p className="text-2xl md:text-3xl font-black">100%</p><p className="text-[10px] tracking-widest text-white/40 mt-1">A MEDIDA, SIN PLANTILLAS</p></div>
          <div><p className="text-2xl md:text-3xl font-black">+15</p><p className="text-[10px] tracking-widest text-white/40 mt-1">PROYECTOS ENTREGADOS</p></div>
          <div className="hidden md:block"><p className="text-2xl md:text-3xl font-black">Río Cuarto → País</p><p className="text-[10px] tracking-widest text-white/40 mt-1">BASE LOCAL, ALCANCE NACIONAL</p></div>
        </div>
      </section>

      <section id="servicios" className="relative px-8 md:px-16 py-20 border-t border-white/10 z-10 bg-gradient-to-b from-transparent to-[#0e2140]/30">
        <h3 className="text-white/40 text-xs tracking-[0.3em] mb-10">SERVICIOS / WHAT WE DO</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s,i) => (
            <motion.div key={s.t} initial={{y:30, opacity:0}} whileInView={{y:0, opacity:1}} viewport={{once:true}} transition={{delay:i*0.1}} className="border border-white/10 rounded-[32px] p-8 bg-gradient-to-br from-[#122545] to-[#0d1d3a] hover:border-white/20 transition">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">◫</div>
              <h3 className="font-bold text-xl">{s.t}</h3><p className="mt-3 text-white/50 text-sm leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-8 md:px-16 py-20 border-t border-white/10 z-10">
        <h3 className="text-white/40 text-xs tracking-[0.3em] mb-10">PROCESO / CÓMO TRABAJO</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {n:"01", t:"Descubrimiento", d:"15 min de call. Entendemos tu negocio, tu cliente y tu objetivo. Sin humo."},
            {n:"02", t:"Diseño & Desarrollo", d:"Figma + código. Ves avances cada 48hs. Feedback rápido en WhatsApp."},
            {n:"03", t:"Lanzamiento & Soporte", d:"Deploy en Vercel, dominio conectado, capacitación y soporte 30 días."},
          ].map((p,i) => (
            <motion.div key={p.n} initial={{y:20, opacity:0}} whileInView={{y:0, opacity:1}} viewport={{once:true}} transition={{delay:i*0.1}} className="relative rounded-[32px] border border-white/10 p-8 bg-[#122545]/50">
              <span className="text-5xl font-black text-white/10">{p.n}</span>
              <h4 className="mt-4 font-bold text-lg">{p.t}</h4>
              <p className="mt-2 text-white/50 text-sm leading-relaxed">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="trabajos" className="relative px-8 md:px-16 py-20 border-t border-white/10 z-10">
        <h3 className="text-white/40 text-xs tracking-[0.3em] mb-10">TRABAJOS RECIENTES / SELECTED WORKS</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p,i) => (
            <motion.div key={p.name} initial={{y:30, opacity:0}} whileInView={{y:0, opacity:1}} viewport={{once:true}} transition={{delay:i*0.1}} className="border border-white/10 rounded-[32px] p-8 bg-[#122545]/80 backdrop-blur hover:bg-[#1a3360]/80 transition">
              <span className="text-xs border border-white/10 rounded-full px-3 py-1 text-white/40">{p.tag}</span>
              <h4 className="mt-6 text-xl font-bold">{p.name}</h4><p className="mt-2 text-white/50 text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-8 md:px-16 py-20 border-t border-white/10 z-10 bg-[#0b1d3d]/30">
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-12">
          <div><h3 className="text-3xl font-black leading-tight">Preguntas<br/>frecuentes</h3><p className="mt-4 text-white/50 text-sm">Lo que todos me preguntan antes de empezar.</p></div>
          <div className="grid gap-3">
            {[
              {q:"¿Cuánto tarda un proyecto?", a:"Landing en 7-10 días. E-commerce 2-3 semanas. Dashboard depende del alcance, cotizamos por módulos."},
              {q:"¿Trabajás con plantillas?", a:"No. Todo es a medida con Next.js + Tailwind. Más rápido, más seguro y sin pagar licencias."},
              {q:"¿Cómo es el pago?", a:"50% para iniciar, 50% al entregar. Transferencia, aceptamos factura. Hosting y dominio aparte."},
              {q:"¿Das soporte después?", a:"Sí, 30 días de soporte incluido para ajustes. Después plan de mantenimiento opcional."},
            ].map((f) => (
              <div key={f.q} className="rounded-[20px] border border-white/10 bg-[#122545]/60 p-6">
                <p className="font-bold text-sm">{f.q}</p><p className="mt-2 text-white/50 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="relative px-8 md:px-16 py-24 border-t border-white/10 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold">Estamos en Río Cuarto</h3><p className="text-white/50 text-sm mb-6">Base en Córdoba, trabajo remoto para todo el país.</p>
            <div className="rounded-[32px] overflow-hidden border border-white/10 h-[480px] bg-[#122545]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107000!2d-64.38!3d-33.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d2000e4f8a6a1b%3A0x1c1c1c1c!2sR%C3%ADo%20Cuarto!5e0!3m2!1ses!2sar!4v123" width="100%" height="100%" style={{border:0, filter:"invert(90%) hue-rotate(180deg)"}} loading="lazy"></iframe>
            </div>
          </div>
          <div className="order-1 md:order-2 max-w-md md:ml-auto w-full bg-gradient-to-br from-[#122545] to-[#0d1d3a] border border-white/10 rounded-[32px] p-8">
            <h3 className="text-3xl font-black">Hablemos de tu proyecto</h3>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <input name="name" placeholder="Tu nombre" required className="bg-[#0A1931]/60 border border-white/10 rounded-full px-6 py-4 outline-none" />
              <input name="email" type="email" placeholder="Tu email" required className="bg-[#0A1931]/60 border border-white/10 rounded-full px-6 py-4 outline-none" />
              <textarea name="message" placeholder="Contame tu idea..." rows={4} required className="bg-[#0A1931]/60 border border-white/10 rounded-[24px] px-6 py-4 outline-none"></textarea>
              <button type="submit" disabled={loading} className="bg-white text-[#0A1931] rounded-full py-4 font-bold disabled:opacity-50">
                {loading? "Enviando..." : "Enviar mensaje →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="relative px-8 md:px-16 py-12 border-t border-white/10 bg-[#060d1f] z-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div><h4 className="text-xl tracking-[0.3em] font-light">LX - LACROIX LAB</h4><p className="mt-2 text-white/40 text-sm max-w-xs">Desarrollo web a medida. Sin plantillas, sistemas que convierten. Río Cuarto, Córdoba.</p></div>
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2"><span className="text-white/20 text-xs tracking-widest">REDES</span><a href="https://instagram.com/lacroix.lab" className="text-white/60 hover:text-white">Instagram ↗</a><a href="https://wa.me/5493584326915" className="text-white/60 hover:text-white">WhatsApp ↗</a><a href="mailto:hola@lacroixlab.com.ar" className="text-white/60 hover:text-white">Email ↗</a></div>
            <div className="flex flex-col gap-2"><span className="text-white/20 text-xs tracking-widest">SERVICIOS</span><span className="text-white/60">Landing Pages</span><span className="text-white/60">E-commerce</span><span className="text-white/60">Dashboards</span></div>
            <div className="flex flex-col gap-2"><span className="text-white/20 text-xs tracking-widest">STACK</span><span className="text-white/60">Next.js</span><span className="text-white/60">Supabase</span><span className="text-white/60">Tailwind</span></div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-white/20"><p>© 2026 LACROIX LAB. Todos los derechos reservados.</p><p>Hecho con Next.js en Río Cuarto, Córdoba.</p></div>
      </footer>
    </main>
  );
}