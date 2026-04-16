'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const statusLabel = {
  em_breve: { label: 'EM BREVE', color: '#888' },
  vendas_abertas: { label: 'VENDAS ABERTAS', color: '#22c55e' },
  lista_vip: { label: 'LISTA VIP', color: '#F5A800' },
  esgotado: { label: 'ESGOTADO', color: '#ef4444' }
}

export default function Home() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [heroImg, setHeroImg] = useState(0)

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase.from('events').select('*').order('date', { ascending: true })
      setEvents(data || [])
      setLoading(false)
    }
    fetchEvents()
    const interval = setInterval(() => setHeroImg(prev => (prev + 1) % 3), 5000)
    return () => clearInterval(interval)
  }, [])

  const heroImgs = ['/foto1.jpg', '/foto2.jpg', '/foto3.jpg']

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff', fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        .bg-grid {
          position: fixed; inset: 0;
          background-image: linear-gradient(rgba(245,168,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,168,0,0.04) 1px, transparent 1px);
          background-size: 60px 60px; pointer-events: none; z-index: 0;
        }
        .header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.75rem 2.5rem; border-bottom: 1px solid rgba(245,168,0,0.15);
          background: rgba(8,8,8,0.9); position: sticky; top: 0; z-index: 100;
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        }
        .hero {
          position: relative; height: 85vh; min-height: 500px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; z-index: 1;
        }
        .hero-img {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: opacity 1.5s ease;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.95) 100%);
        }
        .hero-content { position: relative; z-index: 2; text-align: center; padding: 2rem; }
        .event-card {
          background: #111; border: 1px solid rgba(255,255,255,0.06);
          overflow: hidden; cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          animation: fadeUp 0.6s ease forwards; opacity: 0;
        }
        .event-card:hover {
          transform: translateY(-6px); border-color: rgba(245,168,0,0.4);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(245,168,0,0.1);
        }
        .event-card:hover .card-img { transform: scale(1.05); }
        .card-img { transition: transform 0.5s ease; }
        .badge-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .event-card:nth-child(1) { animation-delay: 0.05s; }
        .event-card:nth-child(2) { animation-delay: 0.1s; }
        .event-card:nth-child(3) { animation-delay: 0.15s; }
        .event-card:nth-child(4) { animation-delay: 0.2s; }
        .event-card:nth-child(5) { animation-delay: 0.25s; }
        .event-card:nth-child(6) { animation-delay: 0.3s; }
        .event-card:nth-child(7) { animation-delay: 0.35s; }
        .event-card:nth-child(8) { animation-delay: 0.4s; }
        .events-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .logo-glow { filter: drop-shadow(0 0 10px rgba(245,168,0,0.35)); transition: filter 0.3s; }
        .logo-glow:hover { filter: drop-shadow(0 0 20px rgba(245,168,0,0.65)); }
        .gallery-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; }
        .gallery-img { width: 100%; height: 220px; object-fit: cover; filter: brightness(0.7) saturate(0.8); transition: filter 0.4s, transform 0.4s; cursor: pointer; display: block; }
        .gallery-img:hover { filter: brightness(0.9) saturate(1.1); transform: scale(1.02); }
        @media (max-width: 1100px) { .events-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .events-grid { grid-template-columns: repeat(2, 1fr); }
          .header { padding: 0.65rem 1.25rem; }
          .gallery-grid { grid-template-columns: 1fr 1fr; }
          .gallery-img { height: 160px; }
          .hero { height: 60vh; }
        }
        @media (max-width: 480px) {
          .events-grid { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
          .gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="bg-grid" />

      <header className="header">
        <img src="/logo.png" alt="NOS4" className="logo-glow" style={{ height: '56px' }} />
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="https://instagram.com" target="_blank" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.78rem', fontWeight: '600', letterSpacing: '0.12em', opacity: 0.6 }}>INSTAGRAM</a>
          <a href="https://chat.whatsapp.com" target="_blank" style={{ background: '#25D366', color: '#000', padding: '0.55rem 1.1rem', textDecoration: 'none', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px' }}>📲 WHATSAPP</a>
        </div>
      </header>

      <div className="hero">
        {heroImgs.map((img, i) => (
          <div key={img} className="hero-img" style={{ backgroundImage: `url(${img})`, opacity: heroImg === i ? 1 : 0 }} />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content">
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.5em', color: '#F5A800', textTransform: 'uppercase', marginBottom: '1rem' }}>Rio de Janeiro</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '0.05em', lineHeight: 1, margin: '0 0 1rem', textShadow: '0 0 40px rgba(245,168,0,0.3)' }}>NOS4 PRODUÇÕES</h1>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', letterSpacing: '0.05em' }}>As melhores festas e eventos do Rio</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#eventos" style={{ padding: '0.75rem 2rem', background: '#F5A800', color: '#000', textDecoration: 'none', fontSize: '0.78rem', fontWeight: '800', letterSpacing: '0.15em' }}>VER EVENTOS</a>
            <a href="https://chat.whatsapp.com" target="_blank" style={{ padding: '0.75rem 2rem', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', textDecoration: 'none', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.15em' }}>GRUPO WHATSAPP</a>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
            {heroImgs.map((_, i) => (
              <button key={i} onClick={() => setHeroImg(i)} style={{ width: heroImg === i ? '24px' : '8px', height: '8px', borderRadius: '4px', background: heroImg === i ? '#F5A800' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(90deg, #F5A800 0%, #e09400 100%)', padding: '0.85rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.6rem' }}>📲</span>
          <div>
            <p style={{ fontWeight: '800', fontSize: '0.88rem', color: '#000', letterSpacing: '0.05em' }}>ENTRE NO NOSSO GRUPO DO WHATSAPP</p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(0,0,0,0.55)', marginTop: '0.1rem' }}>Avisos exclusivos · Prioridade na abertura · As melhores festas</p>
          </div>
        </div>
        <a href="https://chat.whatsapp.com" target="_blank" style={{ background: '#000', color: '#F5A800', padding: '0.65rem 1.5rem', textDecoration: 'none', fontSize: '0.72rem', fontWeight: '800', letterSpacing: '0.15em' }}>PARTICIPAR</a>
      </div>

      <section id="eventos" style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: '#F5A800', textTransform: 'uppercase', marginBottom: '0.5rem' }}>NOS4 Produções</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.05em', color: '#fff', margin: 0 }}>Próximos Eventos</h2>
          </div>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{events.length} eventos</span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <div style={{ width: '40px', height: '40px', border: '2px solid rgba(245,168,0,0.2)', borderTop: '2px solid #F5A800', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
          </div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0', color: 'rgba(255,255,255,0.15)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎪</p>
            <p style={{ fontSize: '1.1rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}>Em breve novidades!</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map(event => (
              <Link key={event.id} href={`/eventos/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="event-card">
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    {event.image_url ? (
                      <img src={event.image_url} alt={event.title} className="card-img" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{ width: '100%', aspectRatio: '1/1', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '0.75rem' }}>SEM IMAGEM</div>
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.85)', color: '#F5A800', padding: '0.25rem 0.6rem', fontSize: '0.78rem', fontWeight: '700', backdropFilter: 'blur(8px)' }}>
                      {new Date(event.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase()}
                    </div>
                  </div>
                  <div style={{ padding: '0.9rem 1rem' }}>
                    <p style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.25rem', lineHeight: 1.3 }}>{event.title}</p>
                    {event.location && <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem' }}>{event.location}</p>}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em', color: statusLabel[event.status]?.color || '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {event.status === 'vendas_abertas' && <span className="badge-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />}
                        {statusLabel[event.status]?.label || event.status}
                      </span>
                      {event.promo_code && <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)' }}>Cód: <strong style={{ color: '#F5A800' }}>{event.promo_code}</strong></span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section style={{ position: 'relative', zIndex: 1, padding: '0 0 4rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem 1.5rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: '#F5A800', textTransform: 'uppercase', marginBottom: '0.5rem' }}>O cenário</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '0.05em' }}>Rio de Janeiro</h2>
        </div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="gallery-grid">
            {['/foto1.jpg', '/foto2.jpg', '/foto3.jpg'].map((src, i) => (
              <div key={i} style={{ overflow: 'hidden', position: 'relative' }}>
                <img src={src} alt={`Rio ${i + 1}`} className="gallery-img" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.4) 0%, transparent 60%)', pointerEvents: 'none' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(245,168,0,0.1)', padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(245,168,0,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: '#F5A800', textTransform: 'uppercase', marginBottom: '1rem', position: 'relative' }}>Quem somos</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '0.05em', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', position: 'relative' }}>
          NOS4 PRODUÇÕES DE EVENTOS
        </h2>
        <p style={{ maxWidth: '560px', margin: '0 auto', color: 'rgba(255,255,255,0.45)', lineHeight: '1.9', fontSize: '0.95rem', position: 'relative' }}>
          A NOS4 Produções de Eventos nasceu com o propósito de elevar o nível do entretenimento. Somos uma produtora comprometida em criar experiências únicas e inesquecíveis, trazendo os melhores eventos para você.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', position: 'relative' }}>
          <a href="https://instagram.com" target="_blank" style={{ padding: '0.75rem 2rem', border: '1px solid rgba(245,168,0,0.4)', color: '#F5A800', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em' }}>INSTAGRAM</a>
          <a href="https://chat.whatsapp.com" target="_blank" style={{ padding: '0.75rem 2rem', background: '#F5A800', color: '#000', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em' }}>GRUPO WHATSAPP</a>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '2rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 1 }}>
        <img src="/logo.png" alt="NOS4" style={{ height: '36px', opacity: 0.4 }} />
        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.15)' }}>© 2026 NOS4 Produções de Eventos</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="https://instagram.com" target="_blank" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none', fontSize: '0.75rem' }}>Instagram</a>
          <a href="https://chat.whatsapp.com" target="_blank" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none', fontSize: '0.75rem' }}>WhatsApp</a>
        </div>
      </footer>
    </main>
  )
}
