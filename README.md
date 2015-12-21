# ObfusCrypto

Simple  JavaScript library  to hide  content from  automatic retrieval
tools. It's  technically a  cryptography tool  that would  encrypt the
text, but the encryption shceme  is vulnerable to numerous attack that
wouldn't   make  it   unsuitable  to   be  hidden   from  an   average
hacker. That's why  it's more of a Obfuscation tool  (which can by the
way always be cracked). It's  not configured to store other characters
than ASCII (no foreign characters). It may be used to hide things, but
shouldn't  be hard  to  decrypt  given the  nature  of the  encryption
scheme. Cryptanalysis (reveal the messsage) could be done like it:

* Search for 100 top popular email domain providers and find the part
  of the key (password) that would correspond to that domain
* Discard all keys containing non-printable characters
* Search for completing the password accroding to a dictionnary

In case the password is totally random & is longer than the text to
encrypt, it may still be vulnerable, because it's only using printable
characters.

## Ressources
* Online cryptography course by Dan Boneh from Stanford. On [Coursera](https://www.coursera.org/course/crypto) 

## Example
There's a simple [Demo](http://etienne.cc/obfucrypto/) not too fancy.

To obfuscate a javascript variable. The  best way right now is to open
browser console and execute the following:

    var x = new ObfusCrypto('example@example.com', false);
    > undefined
    x.encrypt('pass', true);x
    > FRkSHgANFjMVGRIeAA0WXRMOHg==

And  save the  last value  returned in  a variable.  When you  need to
deobfuscate it, prompt for a password and write something like that:

    var cryptotext = 'FRkSHgANFjMVGRIeAA0WXRMOHg=='; // same as last value returned
    var email      = new Obfuscrypto(cryptotext, false);
    var realMail   = email.decrypt(password, true); 

And `realMail` will contain `example@example.com`.

Work in progress
