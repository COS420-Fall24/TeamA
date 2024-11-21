function getSampleText(req, res) {
    console.log(req.user);
    res.json({ message: "This is a sample text from the OpenAI controller." });
}

module.exports = {
    getSampleText
};