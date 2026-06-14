import crypto from "crypto";

const SECRET = process.env.NEXTAUTH_SECRET || "school-management-secret-key";

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const verify = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === verify;
}

export function createSessionToken(userId) {
  const payload = JSON.stringify({ userId, iat: Date.now() });
  const hmac = crypto.createHmac("sha256", SECRET);
  const signature = hmac.update(payload).digest("hex");
  return Buffer.from(payload).toString("base64") + "." + signature;
}

export function verifySessionToken(token) {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return null;
    const payload = Buffer.from(payloadB64, "base64").toString("utf-8");
    const hmac = crypto.createHmac("sha256", SECRET);
    const expectedSig = hmac.update(payload).digest("hex");
    if (signature !== expectedSig) return null;
    const data = JSON.parse(payload);
    if (Date.now() - data.iat > 7 * 24 * 60 * 60 * 1000) return null;
    return data.userId;
  } catch {
    return null;
  }
}
