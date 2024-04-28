import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    if (!req.headers.authorization) {
      console.log('Authorization header is missing');
      return res.status(401).json({ message: "Authorization header is missing" });
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      console.log('Authorization token is not provided correctly');
      return res.status(401).json({ message: "Authorization token is not provided correctly" });
    }

    const isCustomAuth = token.length < 500;
    let decodedData;

    if (isCustomAuth) {      
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default auth;