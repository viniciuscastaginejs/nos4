import "./globals.css"

export const metadata = {
  title: 'NOS4 Produções de Eventos',
  description: 'As melhores festas e eventos do Rio de Janeiro',
  icons: { icon: '/logo.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, background: '#080808', overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
