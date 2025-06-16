import Link from "next/link";
import TimmWordmark from "./TimmWordmark";

interface HeaderProps {
  light?: boolean;
}

const Header: React.FC<HeaderProps> = ({ light }) => {
  const textColor = light ? "text-primary-light" : "text-primary-dark";
  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6">
      <nav className="mx-auto flex justify-between items-center">
        <Link href="/">
          <TimmWordmark className={`h-4 ${textColor} mx-1`} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
