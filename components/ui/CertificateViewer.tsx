"use client";

import { useState, useEffect } from "react";
import { CertificationSchema } from "@/content/types";
import { credentialNoun } from "@/content/certifications";

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
      {/* Frame corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: accentColor }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: accentColor }} />

      {/* Frame caption — issuer and issue date, nothing more */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#27272a]/60 bg-[#111113]/80 select-none text-[8px] font-mono text-[#71717a] uppercase tracking-wider">
        <span>{cert.authority}</span>
        <span>Issued {cert.date}</span>
      </div>

      {/* Certificate image */}
      <div className="relative aspect-[1.6/1] bg-gradient-to-br from-[#121215] to-[#0a0a0c] flex items-center justify-center p-1">
        {imageError ? (
          /*
           * Explicit failure state.
           *
           * This deliberately does NOT draw a certificate. Never substitute a rendered
           * credential for a missing scan: anything credential-shaped that no issuer
           * produced is a fabricated artifact. A missing image must look missing.
           */
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center px-6 select-none">
            <span className="text-[10px] font-mono text-[#71717a] uppercase tracking-widest">
              Image unavailable
            </span>
            <p className="text-[10px] font-mono text-[#52525b] leading-relaxed">
              The scan for this {credentialNoun[cert.kind]} could not be loaded.
              <br />
              Expected at <span className="text-[#71717a]">{imagePath}</span>
            </p>
          </div>
        ) : (
          /* The actual scanned certificate. Thumbnail crops to fill the card; the
             expanded view shows the whole document — the scan is the evidence, so
             expanding it must not cut any of it off. */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imagePath}
            alt={`Scan of the ${cert.title} issued by ${cert.authority}`}
            className={`w-full h-full transition-transform duration-500 ${
              isModal ? "object-contain" : "object-cover group-hover:scale-[1.01]"
            }`}
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
        aria-label="Expand certificate image"
      >
        {frameContainer(false)}
        <p className="text-center text-[10px] font-mono text-[#71717a] mt-4 select-none uppercase tracking-widest hover:text-[#fafafa] transition-colors duration-200">
          [Click to expand]
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
            aria-label="Close certificate image"
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
