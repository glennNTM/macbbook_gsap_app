import { footerLinks } from "@/constants";

const YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
      <div className="info">
        <p>
          More ways to shop: <span>Find an Apple Store</span> or other retailer near you.
        </p>
        <img src="/logo.svg" alt="" width={24} height={24} />
      </div>

      <hr />

      <div className="links">
        <p>Copyright © {YEAR} Apple Inc. All rights reserved.</p>

        <nav aria-label="Legal">
          <ul>
            {footerLinks.map(({ label, link }) => (
              <li key={label}>
                <a href={link}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
