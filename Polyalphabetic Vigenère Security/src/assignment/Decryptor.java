/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package assignment;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

/**
 *
 * @author chana
 */
public class Decryptor {
    static String vigenereKey  = "";
    static String vernamKey = "";
    static String cipherTxt = "";

    public static String vigenereDecrypt(String ciphertext, String key) {
        StringBuilder decryptedText = new StringBuilder();
        int keyLength = key.length();
        for (int i = 0; i < ciphertext.length(); i++) {
            char currentChar = ciphertext.charAt(i);
            char currentKeyChar = key.charAt(i % keyLength);
            int shift = Character.toUpperCase(currentKeyChar) - 'A';
            if (Character.isLetter(currentChar)) {
                char base = Character.isUpperCase(currentChar) ? 'A' : 'a';
                int decryptedChar = (currentChar - base - shift + 26) % 26 + base;
                decryptedText.append((char) decryptedChar);
            } else {
                decryptedText.append(currentChar);
            }
        }
        return decryptedText.toString();
    }

    public static String vernamDecrypt(String ciphertext, String key) {
        StringBuilder decryptedText = new StringBuilder();
        for (int i = 0; i < ciphertext.length(); i++) {
            char currentChar = ciphertext.charAt(i);
            char currentKeyChar = key.charAt(i);
            int shift = Character.toUpperCase(currentKeyChar) - 'A';
            if (Character.isLetter(currentChar)) {
                char base = Character.isUpperCase(currentChar) ? 'A' : 'a';
                int decryptedChar = (currentChar - base - shift + 26) % 26 + base;
                decryptedText.append((char) decryptedChar);
            } else {
                decryptedText.append(currentChar);
            }
        }
        return decryptedText.toString();
    }

    public static String decryptMessage() {
        String vernamDecrypted = vernamDecrypt(cipherTxt, vernamKey.toUpperCase());
        return vigenereDecrypt(vernamDecrypted, vigenereKey.toUpperCase());
    }
    
    public static void readKeyFile(File file){  
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                // Split the line by comma
                String[] values = line.split(",");
                // Check if the line contains exactly two values
                if (values.length == 2) {
                    vigenereKey = values[0].trim();
                    vernamKey = values[1].trim();
                } else {
                    System.out.println("Invalid line format: " + line);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void readTxtFile(File file){
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                cipherTxt = line;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}