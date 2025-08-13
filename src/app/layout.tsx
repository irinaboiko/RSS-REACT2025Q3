import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RSS: Star Wars React App',
  description: 'Rolling Scopes School Educational Project: Star Wars App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
