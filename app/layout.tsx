import '@/app/globals.css';

export const metadata = {
  title: 'Zeladoria Diadema',
  description: 'Gerenciamento de chamados de zeladoria urbana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50">{children}</body>
    </html>
  );
}