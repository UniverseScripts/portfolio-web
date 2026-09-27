"use client";

import { useState, useEffect, useRef } from "react";
import { CertificationSchema } from "@/content/types";
import { credentialNoun } from "@/content/certifications";

interface CertificateViewerProps {
  cert: CertificationSchema;
}

export function CertificateViewer({ cert }: CertificateViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /*
   * Modal focus management.
   *
   * Escape and the scroll lock were already here; everything else was missing, and
   * the gap was not cosmetic. Focus never entered the dialog, so a keyboard user who
   * opened it and pressed Tab walked into the page behind an overlay they could not
   * scroll — and on close, React unmounted the focused button and the browser reset
   * focus to <body>, dumping the reader at the top of the document every single time.
   */
  useEffect(() => {
    if (!isExpanded) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Captured now, not read in cleanup: by then the ref may point elsewhere.
    const trigger = triggerRef.current;

    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    focusables()[0]?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      // Put the reader back where they were, not at the top of the page.
      (trigger ?? previouslyFocused)?.focus();
    };
  }, [isExpanded]);

  const imagePath = `/static/certificates/${cert.id}.png`;

  const scan = (isModal: boolean) =>
    imageError ? (
      /*
       * Explicit failure state. This deliberately does NOT draw a certificate: anything
       * credential-shaped that no issuer produced is a fabricated artifact (rule 7).
       * A missing image must look missing.
       */
      <div className="flex aspect-[1.414/1] w-full flex-col items-center justify-center gap-2 px-6 text-center">
        <span className="font-cond text-[15px] font-medium text-ink-2">Image unavailable</span>
        <p className="m-0 font-cond text-[14px] text-ink-2">
          The scan for this {credentialNoun[cert.kind]} could not be loaded. Expected at {imagePath}.
        </p>
      </div>
    ) : (
      // The scan is the evidence, so it is never cropped — thumbnail or expanded.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imagePath}
        alt={`Scan of the ${cert.title} issued by ${cert.authority}`}
        className={`block w-full object-contain ${isModal ? "max-h-[80vh]" : ""}`}
        onError={() => setImageError(true)}
      />
    );

  return (
    <>
      <figure className="m-0">
        {/* A real <button>. Its accessible name starts with its visible text (2.5.3). */}
        <button
          type="button"
          ref={triggerRef}
          onClick={() => setIsExpanded(true)}
          className="block w-full cursor-zoom-in rounded-card border border-rule bg-sheet p-3 text-left hover:border-rule-strong"
          aria-label={`Expand the scan of the ${cert.title}`}
          aria-expanded={isExpanded}
        >
          {scan(false)}
        </button>
        <figcaption className="mt-2 flex flex-wrap justify-between gap-2 font-cond text-[14px] text-ink-2">
          <span>{cert.authority} · issued {cert.date}</span>
          <span aria-hidden="true">Select the scan to expand it</span>
        </figcaption>
      </figure>

      {isExpanded && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${cert.title} — full scan`}
          className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
          onClick={() => setIsExpanded(false)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            className="absolute right-5 top-5 z-50 rounded-[3px] bg-sheet px-3 py-1.5 font-cond text-[15px] text-ink hover:bg-paper"
          >
            Close
          </button>
          <div
            className="animate-scaleIn relative max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-card bg-sheet p-3"
            onClick={(e) => e.stopPropagation()}
          >
            {scan(true)}
          </div>
        </div>
      )}
    </>
  );
}
