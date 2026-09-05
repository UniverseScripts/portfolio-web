import { CertificationSchema, CertificationIdentifier, CredentialKind } from "../types";
import { certifications, verifiedCertifications } from "./certifications";

/**
 * Compile-time proof that every `CertificationIdentifier` has a record.
 *
 * Without this, adding a seventh member to the union and forgetting the record
 * compiles, lints, builds, and silently ships a site missing that route — the
 * `Record<string, …>` below cannot catch it.
 *
 * This only works because `certifications` is declared with `satisfies` rather than
 * an annotation. An annotation widens every `id` back to the full union, `Exclude`
 * then resolves to `never` regardless, and the assertion passes vacuously. If you
 * ever change that declaration, this check silently stops checking.
 */
export const CERTIFICATION_RECORDS_COVER_UNION: Exclude<
  CertificationIdentifier,
  (typeof certifications)[number]["id"]
> extends never
  ? true
  : never = true;

export const certificateRegistry: Record<string, CertificationSchema | undefined> =
  verifiedCertifications;

export const allCertifications: CertificationSchema[] = [...certifications];

/**
 * What to call each kind of credential in prose, metadata and alt text.
 *
 * The noun comes from the record, never from the template. A shared template noun
 * flattens four different kinds of credential into one and upgrades the weakest.
 */
export const credentialNoun: Record<CredentialKind, string> = {
  placement: "competitive placement",
  attendance: "certificate of attendance",
  completion: "course completion",
  honour: "academic honour",
};

export const credentialLabel: Record<CredentialKind, string> = {
  placement: "Placement",
  attendance: "Attendance",
  completion: "Completion",
  honour: "Honour",
};
