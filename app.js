require("dotenv").config();

const express = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const app = express();

const host = process.env.HOST;
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: ReasonPhrases.OK,
    });
});

app.all("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: ReasonPhrases.NOT_FOUND,
    });
});

app.listen(port, host, () => {
    console.log(`Server is listening on http://${host}:${port}`);
});
