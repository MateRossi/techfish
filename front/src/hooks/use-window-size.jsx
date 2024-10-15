import { useEffect, useState } from "react";

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        heigth: undefined
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                heigth: window.innerHeight
            });
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}