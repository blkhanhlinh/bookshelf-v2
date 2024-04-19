import { useEffect, useState } from 'react';
import { MainNav, SubNav } from '.'
import { useVisibility } from '@/context/visibility'

const Header = ({ showSubNav = true, books }) => {
	const { isVisible, setIsVisible } = useVisibility();
	const [lastScrollPos, setLastScrollPos] = useState(0);

	const handleScroll = () => {
		const currentScrollPos = window.scrollY;
		if (currentScrollPos > lastScrollPos) {
		  setIsVisible(false);
		} else {
		  setIsVisible(true);
		}
		setLastScrollPos(currentScrollPos);
	}
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollPos, isVisible]);
	return (
		<header className={`sticky ${isVisible ? 'top-0 transition-transform duration-300 ease-in -translate-y-0' : '-top-0 transition-transform duration-300 ease-out -translate-y-full'} z-10`}>
			<MainNav />
			{showSubNav && <SubNav books={books}/>}
		</header>
	)
}

export default Header
