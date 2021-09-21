// import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
// import { promisify } from 'util';

// export class CryptoService {
//   constructor(

//   ) {}
//   private readonly iv = randomBytes(16);
//   private readonly password = 'Password used to generate key';

//   // The key length is dependent on the algorithm.
//   // In this case for aes256, it is 32 bytes.
//   private readonly key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
//   private readonly cipher = createCipheriv('aes-256-ctr', key, iv);
//   private readonly 

//   encrypt(text: string) {
//     const encryptedText = Buffer.concat([
//       this.cipher.update(text),
//       this.cipher.final(),
//     ]);
//   }

//   decrypt(text: string) {
//     const decipher = createDecipheriv('aes-256-ctr', this.key, this.iv);
//     const decryptedText = Buffer.concat([
//       decipher.update(text),
//       decipher.final(),
//     ]);

//   }
// }