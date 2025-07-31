import React, { useState } from "react";
import { FaLinkedin, FaInstagram, FaDiscord, FaRegCopy, FaCheck } from "react-icons/fa";

const Footer = () => {
  const email = "medcslab@gmail.com";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    });
  };

  return (
    <footer className="w-full bg-medcsblue text-white px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} MedCS Lab. All rights reserved.
        </p>

        <div className="flex items-center space-x-4">
          {/* Clickable + Copyable Email */}
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${email}`}
              className="text-sm hover:underline"
              aria-label="Send email"
            >
              {email}
            </a>
            <button
              onClick={copyToClipboard}
              aria-label="Copy email"
              className="hover:text-green-300 transition"
            >
              {copied ? (
                <FaCheck className="text-green-400" />
              ) : (
                <FaRegCopy />
              )}
            </button>
          </div>

          {/* Icons */}
          <a
            href="https://www.linkedin.com/company/medcs-lab/"
            target="_blank"
            className="hover:text-gray-300 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>

          <a
            href="https://www.instagram.com/medcslabnu/"
            target="_blank"
            className="hover:text-gray-300 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>

          <a
            href="https://discord.gg/FbuMFxdsQa"
            target="_blank"
            className="hover:text-gray-300 transition"
            aria-label="Instagram"
          >
            <FaDiscord size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
