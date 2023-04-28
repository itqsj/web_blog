import JSEncrypt from 'jsencrypt';
import type { EncryptedInt } from '@/types/index';

export default function encrypted(data: any): Promise<EncryptedInt> {
  return new Promise((resolve, reject) => {
    const keySize = '2048';
    const crypt = new JSEncrypt({ default_key_size: keySize });
    const publicKey = `-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoNz/g8qcrEqiGNRLKKiqRpIdXf9cmggxPJkFTxiyNyJY/wMw86i776uUyjR0lm4UBcllscQk8WhaVJ/M5IOJqbfptxp083WDqvChTuOWQ+l3A41HVS3ZVzkvK0O3VE0A8Kt1xc1h5K7CdCuv/YrxwT9wrUvUALi3QUXFGsM4VZKJxBm3rOafZn8+WHHoHs6VJWS2YrZQ6+gExTcG/5sFpnt7gKI+86SwEXlZVKSIxdLyQAt2qkEYt1UPwlhrBN2yMsV6/s/sVtSHU04l5dOmRlGg3wfU79GIdWKEkDWO502HXTDiPdtjXtVzOpdzd71yzRXYdE52U30qwGolgm4J9QIDAQAB-----END PUBLIC KEY-----`;
    crypt.setPublicKey(publicKey);
    const cryptData = crypt.encrypt(JSON.stringify(data)) as string;

    resolve({ cryptData });
  });
}
