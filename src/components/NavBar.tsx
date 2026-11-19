import { navLinks } from "@/constants";

const NavBar = () => {
  return (
    <header>
      <nav aria-label="Main">
        <a href="#main" aria-label="Apple home">
          <img src="/logo.svg" alt="" width={24} height={24} />
        </a>

        <ul>
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="flex-center gap-3">
          <button type="button" aria-label="Search">
            <img src="/search.svg" alt="" width={24} height={24} />
          </button>
          <button type="button" aria-label="Shopping bag">
            <img src="/cart.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
