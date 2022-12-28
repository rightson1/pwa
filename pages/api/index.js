const handler = async(req, res) => {
    if (req.method === "GET") {
        return res.status(200).json({ msg: "A GET REQUEST" });
    }
    if (req.method === "PUT") {
        return res.status(200).json({ msg: "A PUT" });
    } else {
        return res.status(200).json({ msg: "Method not allowed" });
    }
};
export default handler;