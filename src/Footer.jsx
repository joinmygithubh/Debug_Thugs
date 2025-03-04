import React from "react";
import { Twitter } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { Instagram } from 'lucide-react';
import './index.css'

const Footer = () => {
  return (
    <div className="footer">
         
      <span className="footer sect-1">
        <div className="address">
            <h3>Address</h3>
            <p>1234 Street Name</p>
            <p>City,AA 99999</p>
        </div>
        <div className="contacts">
            <h3>Contacts</h3>
            <p>Email:support@synergyspot.com</p>
            <p>Phone: +1(0) 000 0000 001</p>
            <p>Fax: +1(0) 000 0000 002</p>
        </div>
        <div className="links">
            <h3>Links</h3>
            <a href="">Website builder</a>
            <a href="">Download for Windows</a>
            <a href="">Download for Mac</a>
        </div>
      </span>

      <span className="footer sect-2">
        <div className="copyright">&copy;Copyright 2025 Synergy Spot - All Rights Reserved</div>
        <div className="footer-logos">
        <Twitter />
        <Facebook />
        <Youtube />
        <Instagram />
        </div>
      </span>
    </div>
  );
};

export default Footer;
