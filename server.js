const express = require('express')

const app = express();
const PORT = 1337

app.use("/build", express.static(__dirname + "/build"));
app.use("/src", express.static(__dirname + "/src"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
    console.log('server started on port: ' + PORT);
});