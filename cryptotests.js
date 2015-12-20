/* cryptotest --- Test if ObfusCrypto lib works

 Comments: Although it may test that ObfusCrypto works, IT IS IN NO
 WAY A LIBRARY FOR REAL SECURITY. It is not intended for securing
 assets, but rather for hiding things from automatic retrieval
 tools. Eg: Protecting an email. Cryptanalysis of ObfusCrypto may not
 be hard, given that the distribution is biased.

 IN PROGRESS. IT WON'T EVEN WORK.

 Code:
 */

var ObfusCryptoTest = function(_pass, _text) {
    if(!_pass || !_text){
        console.log("Calling ObfusCryptoTest constructor was not sucessful");
        return false;
    }

    this.pass = _pass;
    this.text = _text;
    this.crypto_instance = new ObfusCrypto(this.text, false);
};

/* Test if case insensitive pass is ok */
ObfusCryptoTest.prototype.test1 = function() {
    var test = this.crypto_instance;

    test.encrypt(this.pass, true);
    if(test.decrypt(this.pass) != this.text) {
        return 0;
    }
};

var ObfusCryptoTest1 = {
    pass: 'THis Is aShort Pswd!(?^',
    text: 'This is a test intended to Verify that the Lib Is Ok%?/\'"()'
};

/* crytotest ends here */
