import jwt from "jsonwebtoken";
import { env } from "../../env.mjs";

const privateKey = env.PRIVATE_KEY;
const publicKey = env.PUBLIC_KEY;

/*export function signJwt(
  object: Object, 
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256"
  })
}*/

export function verifyJwt(token: string){
  try{
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded
    }
  }catch(error){
    return {
      valid: false,
      expired: true,
      decoded: null
    }
  }

}