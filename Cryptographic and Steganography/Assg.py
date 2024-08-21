import math

# Affine Cipher Encrypt
def affine_encrypt(plaintext, a, b):
    ciphertext = ""
    for char in plaintext:
        if char.isalpha():
            if char.islower():
                ciphertext += chr(((ord(char) - 97) * a + b) % 26 + 97)
            else:
                ciphertext += chr(((ord(char) - 65) * a + b) % 26 + 65)
        elif char.isdigit():
            ciphertext += chr(((ord(char) - 48) * a + b) % 10 + 48)
        else:
            ciphertext += char
    return ciphertext

# Affine Cipher Decrypt
def affine_decrypt(ciphertext, a, b):
    plaintext = ""
    a_inverse = None
    digit_inverse = None

    for i in range(26):
        if (a * i) % 26 == 1:
            a_inverse = i
            break

    for j in range(10):
        if (a * j) % 10 == 1:
            digit_inverse = j
            break

    if a_inverse is None or digit_inverse is None:
        raise ValueError("No modular multiplicative inverse found for 'a' with the given modulo.")

    for char in ciphertext:
        if char.isalpha():
            if char.islower():
                plaintext += chr(((ord(char) - 97 - b) * a_inverse) % 26 + 97)
            else:
                plaintext += chr(((ord(char) - 65 - b) * a_inverse) % 26 + 65)
        elif char.isdigit():
            plaintext += chr(((ord(char) - 48 - b) * digit_inverse) % 10 + 48)
        else:
            plaintext += char
    return plaintext

# Columnar Transposition Encrypt
def columnar_transposition_encrypt(plaintext, key):
    # Check for repeated characters in the key
    if len(set(key)) != len(key):
        raise ValueError("The key cannot contain repeated characters.")
    
    cipher = ""
    k_indx = 0
    msg_len = float(len(plaintext))
    msg_lst = list(plaintext)
    key_lst = sorted(list(key))
    col = len(key)
    row = int(math.ceil(msg_len / col))
    fill_null = int((row * col) - msg_len)
    msg_lst.extend('_' * fill_null)
    matrix = [msg_lst[i: i + col] for i in range(0, len(msg_lst), col)]

    for _ in range(col):
        curr_idx = key.index(key_lst[k_indx])
        cipher += ''.join([row[curr_idx] for row in matrix])
        k_indx += 1

    return cipher

# Columnar Transposition Decrypt
def columnar_transposition_decrypt(cipher, key):
    msg = ""
    k_indx = 0
    msg_indx = 0
    msg_len = float(len(cipher))
    msg_lst = list(cipher)
    col = len(key)
    row = int(math.ceil(msg_len / col))
    key_lst = sorted(list(key))
    dec_cipher = []
    for _ in range(row):
        dec_cipher += [[None] * col]

    for _ in range(col):
        curr_idx = key.index(key_lst[k_indx])
        for j in range(row):
            if msg_indx < len(cipher):
                dec_cipher[j][curr_idx] = msg_lst[msg_indx]
                msg_indx += 1
        k_indx += 1

    try:
        # Flatten the list and filter out None values before joining
        msg = ''.join([char for row in dec_cipher for char in row if char is not None])
    except TypeError:
        raise TypeError("This program cannot handle repeating words.")

    msg = msg.replace('_', '')

    return msg

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def define_key(combined_key):
    try:
        a = int(combined_key[:2])
        b = int(combined_key[2:4])
        col_key = combined_key[4:]

        if gcd(a, 26) != 1:
            raise ValueError(f"The value of key 'a' ({a:02}) must be relatively prime to 26.")
        
    except ValueError as e:
        raise ValueError(f"Invalid key format or value: {e}")
    
    return a, b, col_key

# Main execution code
def main():
    operation = input("(1) Encrypt\n(2) Decrypt\nChoose an option: ")

    if operation not in ['1', '2']:
        print("Invalid option. Please choose 1 or 2.")
        return

    text = input("Enter the text: ")
    combined_key = input("Enter the key: ")

    try:
        a, b, columnar_key = define_key(combined_key)
    except ValueError as e:
        print(e)
        return

    if operation == '1':
        # Encryption
        affine_encrypted = affine_encrypt(text, a, b)
        columnar_encrypted = columnar_transposition_encrypt(affine_encrypted, columnar_key)
        print("Encrypted Message:", columnar_encrypted)
    elif operation == '2':
        # Decryption
        columnar_decrypted = columnar_transposition_decrypt(text, columnar_key)
        affine_decrypted = affine_decrypt(columnar_decrypted, a, b)
        print("Decrypted Message:", affine_decrypted)

if __name__ == "__main__":
    main()
