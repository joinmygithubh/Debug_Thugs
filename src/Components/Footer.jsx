import logo from "../Images/code.png"; 

function Footer() {
  return (
    <div id="footer">
      <nav id="footer-I">
        <div id="logo">
          <img src={logo} alt="Logo" />  {/* Fixed the self-closing tag */}
          <h2>Synergy Spot</h2>
        </div>
      </nav>
    </div>
  );
}

export default Footer;
