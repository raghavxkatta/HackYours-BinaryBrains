import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            smooth: true,
            direction: "vertical",
            gestureDirection: "both",
            smoothTouch: true,
            wheelMultiplier: 1.2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        lenisRef.current = lenis;

        return () => {
            lenis.destroy();
        };
    }, []);

    return <div>{children}</div>;
}

export default SmoothScroll;
