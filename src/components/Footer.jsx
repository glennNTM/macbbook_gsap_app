import { footerLinks } from "../../constants";

const Footer = () => {
  return (
    <footer>
      <div className="info">
        <p>More ways to shop: Find Apple Store or other retailer near you.</p>
        <img src="/logo.svg" alt="Apple Logo" />

        <hr />
        <div className="links">
          <p>Copyright © 2024 Apple Inc. All rights reserved.</p>

          <ul>
            {footerLinks.map(({ label, link }) => (
              <li key={label}>
                <a href={link}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
