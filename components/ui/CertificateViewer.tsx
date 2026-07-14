"use client";

import { useState, useEffect } from "react";
import { CertificationSchema } from "@/content/types";

interface CertificateViewerProps {
  cert: CertificationSchema;
}

export function CertificateViewer({ cert }: CertificateViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Esc key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    if (isExpanded) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  const accentColor = cert.badgeHex || "#3b82f6";
  const imagePath = `/static/certificates/${cert.id}.png`;

  const frameContainer = (isModal: boolean) => (
    <div
      className={`relative w-full overflow-hidden border border-[#27272a]/70 rounded-lg bg-[#0d0d0f] transition-all duration-300 ${
        isModal ? "p-2 max-w-4xl" : "hover:border-[#3f3f46] hover:shadow-[0_0_50px_rgba(var(--accent-rgb),0.1)] group cursor-zoom-in"
      }`}
      style={
        {
          "--accent-color": accentColor,
        } as React.CSSProperties
      }
    >
      {/* High-Tech Frame Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: accentColor }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: accentColor }} />

      {/* Frame Status Metadata Overlay (System style) */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#27272a]/60 bg-[#111113]/80 select-none text-[8px] font-mono text-[#71717a] uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
          <span>Secure Credentials Frame // {cert.authority}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Date: {cert.date}</span>
          <span>ID: {cert.id}</span>
        </div>
      </div>

      {/* Certificate Image Container */}
      <div className="relative aspect-[1.6/1] bg-gradient-to-br from-[#121215] to-[#0a0a0c] flex items-center justify-center p-1">
        {imageError ? (
          // Dynamic CSS Fallback Mock Certificate if image file is not found
          <div className="w-full h-full p-8 flex flex-col justify-between text-[#fafafa] relative">
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none select-none" 
              style={{ 
                backgroundImage: 'radial-gradient(circle, #fafafa 1px, transparent 1px)', 
                backgroundSize: '16px 16px' 
              }} 
            />
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono border px-2 py-0.5 rounded" style={{ borderColor: `${accentColor}30`, color: accentColor }}>
                {cert.authority} Node
              </span>
              <span className="text-[9px] font-mono text-[#71717a]">SECURE_FALLBACK_GRID</span>
            </div>
            <div className="my-auto space-y-2">
              <p className="text-[9px] font-mono text-[#71717a] uppercase tracking-widest">Credential Recipient</p>
              <h4 className="text-xl font-bold tracking-tight">Yoshio Nomura</h4>
              <p className="text-sm font-semibold text-[#a1a1aa]">{cert.title}</p>
            </div>
            <div className="flex justify-between items-end border-t border-[#27272a]/40 pt-4 text-[9px] font-mono text-[#71717a]">
              <span>Date: {cert.date}</span>
              <span className="uppercase" style={{ color: accentColor }}>SYSTEM_RECORD_VALIDATED</span>
            </div>
          </div>
        ) : (
          /* Render the actual physical certificate image */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imagePath}
            alt={`Official ${cert.title} Certificate issued by ${cert.authority}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            onError={() => setImageError(true)}
          />
        )}

        {/* Ambient background hover glow */}
        {!isModal && (
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none select-none"
            style={{
              background: `radial-gradient(circle, ${accentColor}80 0%, transparent 70%)`
            }}
          />
        )}
      </div>

      {/* Bottom Frame Status */}
      <div className="px-4 py-1.5 border-t border-[#27272a]/60 bg-[#111113]/40 select-none text-[8px] font-mono text-[#71717a] uppercase tracking-widest flex items-center justify-between">
        <span>Frame status: SECURE_CONTAINER</span>
        <span>Resolution: 100% SCALE</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Thumbnail Container */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsExpanded(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(true);
          }
        }}
        className="w-full animate-boot"
        style={{ "--boot-delay": "100ms" } as React.CSSProperties}
        aria-label="Click to expand secure digital certificate frame"
      >
        {frameContainer(false)}
        <p className="text-center text-[10px] font-mono text-[#71717a] mt-4 select-none uppercase tracking-widest hover:text-[#fafafa] transition-colors duration-200">
          [Click Frame to Expand Secure Lightbox View]
        </p>
      </div>

      {/* Expanded Lightbox Modal Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#09090b]/90 backdrop-blur-md transition-all duration-300 animate-fadeIn"
          onClick={() => setIsExpanded(false)}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-[#27272a] rounded-full text-[#71717a] hover:text-[#fafafa] bg-[#111113]/80 hover:bg-[#18181b] hover:border-[#3f3f46] transition-all duration-200 select-none z-50 font-mono text-sm"
            aria-label="Close credentials frame"
          >
            [X]
          </button>

          {/* Modal Container */}
          <div
            className="w-full max-w-4xl max-h-[85vh] relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {frameContainer(true)}
          </div>
        </div>
      )}
    </>
  );
}
