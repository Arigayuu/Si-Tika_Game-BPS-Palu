import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Si Tika — Mini Quiz BPS Kota Palu",
  description: "Temani waktu menunggumu dengan quiz singkat bersama Si Tika.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>
}
