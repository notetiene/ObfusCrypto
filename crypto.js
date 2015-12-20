/* crypto.js --- simple obfuscation JS library Comments:

 Comments: It is not intenteded to be secure, but to hide simple
 informations with a password key, to be to fast and be done by
 hand. It may be used for hiding email from information retrivial
 tools or most average users if the password is kept secret.

 GLOSSARY:
 DRY: don't repeat yourself.

 Code:
 */

/* Constants */
var cnst = {
    /* Case sensitive */
    cs: true,
    /* How many times should we repeat the enc/decryption */
    times: 1
};

/* Utility function. Checks if string is all ascii characters and
 * returns a boolean */
function is_ascii(_string) {
    var string = _string;

    for(var pos = 0; pos < string.length; pos++) {
        /* If it's not a ascii character */
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
    /* If _case_s is not provided assign cnst.cs to attribute */
    this.case = _case_s || cnst.cs;

    /* TODO: How many time should we encrypt
     * If _times is not provided assign cnst.times to attribute */
    this.times = _times || cnst.times;

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

    /* If _encode is by default true if not set */
    _encode = (_encode === undefined) || _encode;

    /* To lower letters if not case sensitive */
    if(!this.case) {
        clear_txt = this.text.toLowerCase();
    } else {
        clear_txt = this.text;
    }

    /* If not ascii characters */
    if(!is_ascii(_key)) {
        /* Flush text attribute */
        this.text = '';
        clear_txt = '';
    }

    for(var i = 0; i < clear_txt.length; i++) {
        crypto_txt[i] = String.fromCharCode(clear_txt.charCodeAt(i) ^ _key.charCodeAt(_key.lenght%i));
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
    this.text = window.atob(this.text);
    /* Call encrypt function again since it's a reverse function like
     * if you did 1/(1/x) => x (sort of) */
    this.encrypt(_key, false);

    return this.text;
};

/* crypto.js ends here */
