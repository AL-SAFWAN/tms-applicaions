import "server-only";
import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { roleEnum } from "@/schemas/authSchema";

const encodedKey = new TextEncoder().encode("changethis");
interface jwtPayload extends JWTPayload {
  sub: string;
  role: roleEnum;
}
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as jwtPayload;
  } catch (error) {
    console.error("Failed to verify session");
  }
}
