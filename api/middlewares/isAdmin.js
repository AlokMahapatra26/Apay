

const isAdmin = async (req , res , next) => {
    try{
        const user = req.header("id");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (user !== "679b92073b0325127f81feab") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        next();
    }catch(error){
        res.status(500).json({ message: "Error verifying admin role", error: error.message });
    }
}

module.exports = isAdmin;