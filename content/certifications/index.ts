import { CertificationSchema } from "../types";
import { verifiedCertifications } from "./certifications";


export const certificateRegistry: Record<string, CertificationSchema> =
  verifiedCertifications;

export const allCertifications = Object.values(certificateRegistry);
