/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package assignment;

import java.io.FileWriter;
/**
 *
 * @author chana
 */
public class Encryptor {
    static String vigenereKey = "";
    static String vernamKey = "";
    public static String vigenereEncrypt(String plaintext, String key) {
        vigenereKey = key;
        StringBuilder ciphertext = new StringBuilder();
        int keyLength = key.length();
        for (int i = 0; i < plaintext.length(); i++) {
            char currentChar = plaintext.charAt(i);
            char currentKeyChar = key.charAt(i % keyLength);
            int shift = Character.toUpperCase(currentKeyChar) - 'A';
            if (Character.isLetter(currentChar)) {
                char base = Character.isUpperCase(currentChar) ? 'A' : 'a';
                int encryptedChar = (currentChar - base + shift) % 26 + base;
                ciphertext.append((char) encryptedChar);
            } else {
                ciphertext.append(currentChar);
            }
        }
        return ciphertext.toString();
    }

    public static String vernamEncrypt(String plaintext, String key) {
        vernamKey = key;
        StringBuilder ciphertext = new StringBuilder();
        for (int i = 0; i < plaintext.length(); i++) {
            char currentChar = plaintext.charAt(i);
            char currentKeyChar = key.charAt(i);
            int shift = Character.toUpperCase(currentKeyChar) - 'A';
            if (Character.isLetter(currentChar)) {
                char base = Character.isUpperCase(currentChar) ? 'A' : 'a';
                int encryptedChar = (currentChar - base + shift) % 26 + base;
                ciphertext.append((char) encryptedChar);
            } else {
                ciphertext.append(currentChar);
            }
        }
        makeFile(ciphertext.toString());
        return ciphertext.toString();
    }

    public static String combineCiphers(String plaintext, String vigenereKey, String vernamKey) {
        String vigenereEncrypted = vigenereEncrypt(plaintext.toUpperCase(), vigenereKey.toUpperCase());
        return vernamEncrypt(vigenereEncrypted, vernamKey.toUpperCase());
    }
    
    public static void makeFile(String text){
            try{
            FileWriter fw = new FileWriter("C:/BCS3232_NetBeans/Assignment/encrypted.txt"); 
            fw.write(text);
            fw.close();
        }catch(Exception e ){
        }
            
        try{
            FileWriter fw = new FileWriter("C:/BCS3232_NetBeans/Assignment/key.txt"); 
            fw.write(vigenereKey + "," + vernamKey);
            fw.close();
            }catch(Exception e){    
            }
        }
}


