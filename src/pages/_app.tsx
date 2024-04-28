import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'react-calendar/dist/Calendar.css'; 

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
