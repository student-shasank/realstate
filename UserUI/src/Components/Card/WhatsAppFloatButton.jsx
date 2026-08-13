import { useState } from "react";

/**
 * Floating WhatsApp chat button.
 *
 * Usage:
 *   <WhatsAppFloatButton
 *     phone="971551000911"        // country code + number, no + or spaces
 *     message="Hi, I'm interested in your properties"
 *   />
 *
 * Drop this once near the root of your app (e.g. in App.jsx or your main Layout)
 * so it stays fixed on every page.
 */
export default function WhatsAppFloatButton({
  phone = "971551000911",
  message = "Hi, I'm interested in your properties",
}) {
  const [showTooltip, setShowTooltip] = useState(true);

  const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="relative hidden sm:flex items-center bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow-lg">
          Need help? Chat with us
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss"
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          {/* little triangle pointing right */}
          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45" />
        </div>
      )}

      {/* Round WhatsApp button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="white" aria-hidden="true">
          <path d="M16.001 2.667c-7.364 0-13.334 5.97-13.334 13.334 0 2.353.615 4.646 1.781 6.667L2.667 29.333l6.815-1.787a13.27 13.27 0 0 0 6.519 1.72h.006c7.364 0 13.333-5.97 13.333-13.334S23.365 2.667 16.001 2.667zm7.822 18.828c-.328.92-1.627 1.686-2.657 1.907-.706.15-1.628.27-4.729-1.017-3.972-1.646-6.53-5.68-6.729-5.943-.191-.263-1.615-2.15-1.615-4.101 0-1.951.998-2.909 1.352-3.309.328-.371.719-.463.958-.463.24 0 .479.002.688.013.221.011.517-.084.808.616.328.79 1.113 2.741 1.211 2.941.098.2.163.435.033.7-.13.263-.196.428-.391.657-.196.23-.412.514-.588.69-.196.196-.4.409-.172.802.229.394 1.017 1.678 2.184 2.719 1.5 1.339 2.766 1.754 3.16 1.951.393.196.622.164.85-.098.229-.263.981-1.142 1.243-1.535.263-.393.526-.328.887-.197.36.132 2.294 1.081 2.687 1.278.393.196.654.294.752.46.098.164.098.955-.229 1.877z" />
        </svg>
      </a>
    </div>
  );
}