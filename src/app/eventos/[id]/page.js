'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const statusLabel = {
  em_breve: { label: 'Em breve', color: '#888' },
  vendas_abertas: { label: 'Vendas abertas', color: '#22c55e' },
  lista_vip: { label: 'Lista VIP', color: '#F5A800' },
  esgotado: { label: 'Esgotado', color: '#ef4444' }
}

const typeLabel = {
  festa: 'Festa', show: 'Show', banda: 'Banda', dj: 'DJ', grupo: 'Grupo'
}

export default function EventoPage() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvent() {
      const { data } = await supabase.from('events').select('*').eq('id', id).single()
      setEvent(data)
      setLoading(false)
    }
    fetchEvent()
  }, [id])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Carregando...</div>
  )

  if (!event) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexDirection: 'column', gap: '1rem' }}>
      <p>Evento não encontrado.</p>
      <Link href="/" style={{ color: '#F5A800', textDecoration: 'none' }}>← Voltar</Link>
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
      <style>{`
        .evento-grid { display: grid; grid-template-columns: 1fr 340px; gap: 3rem; align-items: start; }
        @media (max-width: 768px) { .evento-grid { grid-template-columns: 1fr; gap: 2rem; } }
        .header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2.5rem; border-bottom: 1px solid rgba(245,168,0,0.2); background: #0a0a0a; position: sticky; top: 0; z-index: 100; }
        @media (max-width: 768px) { .header { padding: 0.75rem 1.25rem; } }
      `}</style>

      <header className="header">
        <Link href="/"><img src="/logo.png" alt="NOS4" style={{ height: '56px' }} /></Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="https://instagram.com" target="_blank" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.8rem', fontWeight: '500', letterSpacing: '0.1em', opacity: 0.7 }}>INSTAGRAM</a>
          <a href="https://chat.whatsapp.com" target="_blank" style={{ background: '#25D366', color: '#000', padding: '0.6rem 1.25rem', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em' }}>📲 WHATSAPP</a>
        </div>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          ← Voltar para eventos
        </Link>

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>
            {new Date(event.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
            {event.time && ` às ${event.time.slice(0, 5)}`}
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '0.05em', lineHeight: 1, margin: 0 }}>
            {event.title}
          </h1>
          {event.location && <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', fontSize: '0.95rem' }}>{event.location}</p>}
        </div>

        <div className="evento-grid">
          <div>
            {event.image_url ? (
              <img src={event.image_url} alt={event.title} style={{ width: '100%', display: 'block' }} />
            ) : (
              <div style={{ width: '100%', aspectRatio: '1/1', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>SEM IMAGEM</div>
            )}
            {event.description && (
              <div style={{ marginTop: '2rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#F5A800', textTransform: 'uppercase', marginBottom: '1rem' }}>Sobre o evento</p>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8' }}>{event.description}</p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusLabel[event.status]?.color || '#888', flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: statusLabel[event.status]?.color || '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {statusLabel[event.status]?.label || event.status}
              </span>
            </div>

            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {event.date && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <span>📅</span>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                    {new Date(event.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    {event.time && ` às ${event.time.slice(0, 5)}`}
                  </span>
                </div>
              )}
              {event.location && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <span>📍</span>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{event.location}</span>
                </div>
              )}
              {event.type && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <span>🎵</span>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{typeLabel[event.type] || event.type}</span>
                </div>
              )}
            </div>

            {event.promo_code && (
              <div style={{ background: 'rgba(245,168,0,0.08)', border: '1px solid rgba(245,168,0,0.3)', padding: '1rem' }}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#F5A800', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Código promocional</p>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '0.1em', margin: 0 }}>{event.promo_code}</p>
              </div>
            )}

            {event.vip_link && (
              <a href={event.vip_link} target="_blank" style={{ display: 'block', textAlign: 'center', padding: '1rem', background: '#F5A800', color: '#000', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.15em' }}>
                ENTRAR NA LISTA VIP
              </a>
            )}
            {event.ticket_link && (
              <a href={event.ticket_link} target="_blank" style={{ display: 'block', textAlign: 'center', padding: '1rem', background: 'transparent', color: '#fff', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.15em', border: '1px solid rgba(255,255,255,0.2)' }}>
                COMPRAR INGRESSO
              </a>
            )}
          </div>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '2rem 2.5rem', marginTop: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <img src="/logo.png" alt="NOS4" style={{ height: '32px', opacity: 0.5 }} />
        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>© 2026 NOS4 Produções de Eventos</p>
      </footer>
    </main>
  )
}
