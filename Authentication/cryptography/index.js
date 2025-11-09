import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

//Generate RSA key pair
const generateKeys = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength:2048,
    publicKeyEncoding:{
      type:"pkcs1",
      format:"pem"
    },
    privateKeyEncoding:{
      type:"pkcs1",
      format:"pem"
    }
  });
  return { publicKey, privateKey };
}

//
const encrypt = (message, publicKey) => {
  const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(message));
  return encryptedData.toString("base64");
}
const decrypt = (encryptedMessage,privateKey) => {
  const decryptedData = crypto.privateDecrypt(privateKey,Buffer.from(encryptedMessage,"base64"));
  return decryptedData.toString('utf8');
}

const keys = generateKeys();

const publicKey = keys.publicKey;
const privateKey = keys.privateKey;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/encrypt', (req, res) => {
  const {message} = req.body;
  if(!message){
    return res.status(400).send({error:"Message is required"});
  }
  const encryptedMessage = encrypt(message, publicKey);
  res.status(200).send({encryptedMessage});
});

app.post("/decrypt",(req,res) => {
  const {encryptedMessage} = req.body;
  if(!encryptedMessage){
    return res.status(400).send({error:"Encrypted message is required"});
  }
  try {
    const decryptedMessage = decrypt(encryptedMessage, privateKey);
    res.send({decryptedMessage});
  } catch (error) {
    res.status(400).send({error:"Failed to decrypt message"});
  }
})



app.listen(3000, () => {
  console.log('Server is running on port 3000');
  // console.log('Public Key:', publickKey);
  // console.log('Private Key:', privateKey);
});