import React from 'react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const whatsappNumber = "918370092226"; 
  const defaultText = encodeURIComponent("Hi ApniRide! I want to check vehicle availability and rental details in Shivpuri.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultText}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="fixed bottom-20 right-5 md:bottom-6 md:right-6 z-50 bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center group cursor-pointer border-2 border-white"
      aria-label="Chat with ApniRide on WhatsApp (+91 8370092226)"
      title="Chat with ApniRide on WhatsApp (+91 8370092226)"
    >
      {/* Subtle pulse ring animation behind button */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />

      {/* WhatsApp SVG Icon */}
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.265-1.119zm9.739-6.938c.306.153.398.247.459.351.061.104.061.614-.153 1.225-.214.613-1.255 1.206-1.745 1.245-.49.039-1.103.184-3.67-0.877-3.14-1.298-5.11-4.484-5.263-4.688-.153-.204-1.255-1.671-1.255-3.187 0-1.516.796-2.261 1.076-2.567.281-.306.613-.383.817-.383.204 0 .408.001.587.01.194.009.459-.074.719.551.26.626.888 2.169.965 2.322.077.153.128.332.026.536-.102.204-.153.332-.306.51-.153.179-.322.4-.459.536-.153.153-.312.32-.134.626.179.306.792 1.306 1.701 2.115 1.168 1.04 2.155 1.362 2.461 1.515.306.153.485.128.664-.077.179-.204.766-.893.97-1.199.204-.306.408-.255.689-.153z"/>
      </svg>

      {/* Floating Tooltip Desktop */}
      <span className="hidden md:block absolute right-full mr-3 bg-on-surface text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
        WhatsApp Us: +91 8370092226
      </span>
    </motion.a>
  );
}
