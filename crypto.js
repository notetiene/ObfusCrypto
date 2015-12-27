/* crypto.js --- simple obfuscation JS library Comments:

 Comments:
 It is  not intenteded to be  secure, but to hide  simple informations
 with a password key,  to be fast and be done by hand.  It may be used
 for hiding  email from  information retrivial  tools or  most average
 users if the password is kept secret.

 It's  basically  a  VIGENÈRE  CIPHER where  each  characters  of  the
 CIPHERTEXT

 ------------------------------
 GLOSSARY:

 ASCII: American  Standard Code  for Information  Exchange. It  is the
 most widely supported encoding format. It contains all the letters of
 the  English  language,  numbers  &  special  characters  of  the  US
 keyboard.

 BINARY  NUMBER: Number  expressed  in the  binary  numeral system  or
 base-2  numeral  system  which  represent numeric  values  using  two
 different symbols: typically  0 (zero) and 1 (one).  Like the decimal
 number, except  that there  is only two  numeric symbol.  See DECIMAL
 NUMBER. EG:
    DECIMAL: 9+1 = 10
    BINARY:  1+1 = 10
 Note that  in the binary system  10 means 2 since  the numeric symbol
 "2" doesn't exist.

 DECIMAL NUMBER: Number expressed has  ten as its base. By definition,
 it  contains 10  letters  from 0-9  (0 being  one  also). When  digit
 becomes 9, if we add 1 to it, an other digit is added to the left and
 the current digit becomes 0.

 DRY: Don't repeat yourself.

 CAESAR  CIPHER:  One  of  simplest &  most  widely  known  encryption
 techniques. It is a type of  SUBSTITUTION CIPHER in which each letter
 in the  PLAINTEXT is  replaced by  a letter of  some fixed  number of
 position down the alphabet.

 CLEARTEXT: See PLAINTEXT

 CODE: System  of rules to  convert information  into an other  set of
 information (like text to BINARY NUMBER)

 CIPHER: Algorithm used to encrypt or decrypt the text

 CIPHERTEXT: Text that is the result of the encryption

 ENCODING:  Converts  information  to  symbols  for  communication  or
 storage

 ENCRYPTING/ENCRYPTION: Process of encoding messages or information in
 such a way that only authorized  parties can read it. Encryption does
 not of itself prevent interception, but denies the message content to
 the interceptor.

 EXCLUSIVE OR (XOR): LOGICAL OPERATOR  that output true only when both
 inputs  differ (one  must  be true  &  the other  must  be false).  A
 representation  of   this  LOGICAL  OPERATOR  in   plain  English  is
 "Either... or", meaning  that both cannot be  true.  In cryptography,
 its properties are unique in the  way XOR render the CIPHERTEXT to be
 completly unrelated unless someone has  the key while being simple to
 implement. It is the operator used by the OTP.

 MODULAR ARITHMETIC: Subset of  arithmetic for integers, where numbers
 "wrap  around" up  reaching a  certain value  — the  modulus. A  good
 example could be the 12-hour clock,  in which the day is divided into
 two 12-hour periods. If  the time is 7:00 now, then  8 hours later it
 will  be 3:00.  Usual addition  would  suggest that  the latter  time
 should be 7+8=15.

 OTP (ONE  TIME PAD): ENCRYPTION  technique that cannot be  cracked if
 used  correctly. In  this technique,  a  PLAINTEXT is  paired with  a
 random secret  KEY. Then each  bit or  character of the  PLAINTEXT is
 ENCRYPTED  by  combining  it  with with  the  correscponding  bit  or
 character from the pad using MODULAR ADDITION.

 PLAINTEXT: Information a sender wishes to transmit to a receiver.

 VIGENÈRE CIPHER: is a method of ENCRYPTING alphabetic text by using a
 series of different CEASAR CIPHERS based  on the letters of a keyword
 (or password).

 Glossary ends here
 ------------------------------
 Code:
 */

/* Constants */
var CNST = {
    /* Case sensitive */
    CS: true,
    /* How many times should we repeat the enc/decryption */
    TIMES: 1
};

/* Utility function. Checks if string is all ascii characters and
 * returns a boolean */
function is_ascii(_string) {
    var string = _string;

    /* Loop into each characters of the string */
    for(var pos = 0; pos < string.length; pos++) {
        /* If it's not a ascii character, abort*/
        if(string.charCodeAt(pos) > 127) {
            return false;
        }
    }
    return true;
}

/* Constructor */
function ObfusCrypto(_text, _case_s, _times) {
    /* If text is empty */
    if(_text === '') {
        /* The object cannot be valid */
        return undefined;
    }
    if(!is_ascii(_text)){
        /* The object cannot be valid */
        return undefined;
    }
    this.text = _text;

    /* Whether the key should be case sensitive */
    /* If _case_s is not provided assign CNST.CS to attribute */
    this.case = _case_s || CNST.CS;

    /* TODO: How many time should we encrypt
     * If _times is not provided assign CNST.TIMES to attribute */
    this.times = _times || CNST.TIMES;

    return true;
}

/* Member method encrypting the text. The key is not kept in memory
 * for obvious reasons */
ObfusCrypto.prototype.encrypt = function(_key, _encode) {
    /* Cryptotext contains the final result & clear_txt contains the
     * text to encrypt */
    var crypto_txt = [];
    var clear_txt;
    var times = this.times;

    /* _encode by default true if not set */
    _encode = (_encode === undefined) || _encode;

    /* To lower letters if case sensitive is not set */
    if(!this.case) {
        clear_txt = this.text.toLowerCase();
    } else {
        clear_txt = this.text;
    }

    /* If not all ascii characters */
    if(!is_ascii(_key)) {
        /* Flush text attribute */
        this.text = '';
        clear_txt = '';
    }

    for(var i = 0; i < clear_txt.length; i++) {
        crypto_txt[i] = String.fromCharCode(clear_txt.charCodeAt(i) ^ _key.charCodeAt(i%_key.length));
    }

    /* Make a string from the array */
    this.text = crypto_txt.join('');

    /* Encode the string since most characters won't be visible in the
     * screen or may even break a script if embedded */
    if(_encode) {
        this.text = window.btoa(this.text);
    }

    /* Return text if the user wants to store it elsewhere */
    return this.text;
};
/* encrypt method ends here */

ObfusCrypto.prototype.decrypt = function (_key) {
    /* Remove base encoding for when it's encrypted */
    try {
        this.text = window.atob(this.text);
    }
    catch(e) {
        return -1;
    }
    /* Call encrypt function again since it's a reverse function like
     * if you did 1/(1/x) => x (sort of) */
    this.encrypt(_key, false);

    return this.text;
};

/* crypto.js ends here */
