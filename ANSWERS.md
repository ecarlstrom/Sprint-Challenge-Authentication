<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

Sessions are used to temporarily store information about a client so that the client does not have to enter their credentials every on every new request. When the user is successfully authenticated, the session is created and the user will have access to all resources they are authorized to interact with. The duration of the session and the way in which it is stored can vary, but the basic function is the same across all these methods: allowing a user's authentication to persist across more than one request.

2. What does bcrypt do to help us store passwords in a secure manner.

We use bcrypt to hash passwords, which essentially means that we take some set of parameters and the password input to create illegible strings of characters that are impossible to convert back to the original password. This is the important distinction between encrypting (which has become a sort of catch-all term) and hashing. Encryption is a two-way process in which a plaintext password and a private key are used to create an encrypted password but the encrypted password plus the key return the plaintext password, whereas hashing simply uses the given parameters and password input to create a hash with no expectation of returning the plaintext password in any way. We hash passwords before they are stored so that users' plaintext passwords do not appear anywhere within our database or system.

3. What does bcrypt do to slow down attackers?

In addition to its base function as a hashing algorithm, bcrypt provides two extra layers of security: hash salting and accumulative rounds. Salting is a term used to describe extra random data, or salt, that is added to a hashing function to safeguard against attack methods like dictionary or rainbow table attacks. Take the following example with a password of "password":

String to be hashed without salt: "password" -> hashed value of "password"
With salt: "password" + salt value of "84B03D034B409D4E" so the string to be hashed becomes "password84B03D034B409D4E" and thus the hashed value is changed. This prevents a rainbow table style attack in which the attackers already know the hashed value of "password". Different salt values will create different hash values, allowing for an extra layer of security.

Accumulative rounds are another piece of the puzzle that simply means the algorithm hashes the information multiple times. This means that in addition to the hash and the particular algorithm used, an attacker also has to know the exact number of rounds that the algorithm used to generate the hash. This adds yet another layer of security onto the basic hashing function and the use of salting.

4. What are the three parts of the JSON Web Token?

Header, payload, and signature. Header stores information about the algorithm used to generate the token, payload contains claims (properties such as role, time the request was made, length of token life, etc.) about the request, and the signature securely validates the token via cryptographic encoding.
