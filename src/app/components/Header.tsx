import Link from 'next/link';
import LogoffWordmark from './LogoffWordmark';

const Header = () => (
  <header className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6">
    <nav className="mx-auto flex justify-between items-center">
      <Link href="/">
        <LogoffWordmark className='h-4 text-white/90 mb-4 mx-1' ></LogoffWordmark>
      </Link>
    </nav>
  </header>
);

export default Header;