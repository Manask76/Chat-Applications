import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Corrected header name to lowercase
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]; // Extract the token
    }

    if (!token) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.id = decoded.userId; // Set the userId to req.id
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" }); // Return an error response
  }
};

export default isAuthenticated;
