require("dotenv").config();

const express = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { sequelize } = require("./models");
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

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(
            "⚡️[database]: Database connection has been established successfully."
        );
        app.listen(port, host, () => {
            console.log(
                `⚡️[server]: Server is listening on http://${host}:${port}`
            );
        });
    } catch (error) {
        console.error(
            "😥 [database]: Unable to connect to the database:",
            error
        );
    }
};

startServer();
