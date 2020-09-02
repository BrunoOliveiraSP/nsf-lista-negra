using System;
using System.Security.Cryptography;
using System.Text;

namespace backend.Utils.Criptografia
{
    public class AESCript
    {
        public string Criptografar(string chave, string mensagem)
        {
            // Cria objeto para criptografia AES
            RijndaelManaged rijndael = new RijndaelManaged();
            rijndael.Mode = CipherMode.CBC;
            rijndael.KeySize = 128;

            byte[] chaveBytes;
            byte[] criptografiaBytes;
            byte[] mensagemBytes;
            string criptografia;

            // Transforma chave e mensagem em array de byts
            chaveBytes = Encoding.UTF8.GetBytes(chave);
            mensagemBytes = Encoding.UTF8.GetBytes(mensagem);

            // Realiza criptografia
            ICryptoTransform cryptor = rijndael.CreateEncryptor(chaveBytes, chaveBytes);
            criptografiaBytes = cryptor.TransformFinalBlock(mensagemBytes, 0, mensagemBytes.Length);
            cryptor.Dispose();

            // Transforma criptografia em string
            criptografia = Convert.ToBase64String(criptografiaBytes);
            return criptografia;
        }


        public string Descriptografar(string chave, string criptografia)
        {
            // Cria objeto para criptografia AES
            RijndaelManaged rijndael = new RijndaelManaged();
            rijndael.Mode = CipherMode.CBC;
            rijndael.KeySize = 128;

            byte[] chaveBytes;
            byte[] criptografiaBytes;
            byte[] mensagemBytes;
            string mensagem;

            // Transforma chave e mensagem em array de byts
            chaveBytes = Encoding.UTF8.GetBytes(chave);
            mensagemBytes = Convert.FromBase64String(criptografia);


            // Realiza criptografia
            ICryptoTransform cryptor = rijndael.CreateDecryptor(chaveBytes, chaveBytes);
            criptografiaBytes = cryptor.TransformFinalBlock(mensagemBytes, 0, mensagemBytes.Length);
            cryptor.Dispose();

            // Transforma criptografia em string
            mensagem = Encoding.UTF8.GetString(criptografiaBytes);
            return mensagem;
        }
    }
}