import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        < >
            <ToastContainer position="top-center" autoClose={3000} />
            <Component {...pageProps}/>
        </>
    );
}
