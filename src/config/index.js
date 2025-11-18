const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
    throw new Error("FATAL ERROR: JWT_SECRET is not defined.");
}

module.exports = { SECRET };