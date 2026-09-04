import { CertificationSchema, CredentialKind } from "../types";
import { verifiedCertifications } from "./certifications";


export const certificateRegistry: Record<string, CertificationSchema> =
  verifiedCertifications;

export const allCertifications = Object.values(certificateRegistry);

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
