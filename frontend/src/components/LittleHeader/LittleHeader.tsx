import { useState, useRef, useEffect } from "react";

const LittleHeader = ({children}: {children: React.ReactNode}) => {
    const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowHeader(currentScrollY < lastScrollY.current);
            lastScrollY.current = currentScrollY;
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header className={showHeader ? "visible" : "hidden"}>
            {children}
        </header>
    )
} 
export default LittleHeader