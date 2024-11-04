require("dotenv").config();

const express = require("express");
const app = express();

const router = require("./src/routes/routes");

const swaggerUi = require("swagger-ui-express");
const swaggerV1 = require("./src/helpers/swaggerHelperV1");
const swaggerV2 = require("./src/helpers/swaggerHelperV2");

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css";

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
  customCssUrl: CSS_URL,
};

const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/", router);
app.use(
  "/docs/v1",
  swaggerUi.serveFiles(swaggerV1),
  swaggerUi.setup(swaggerV1, options)
);
app.use(
  "/docs",
  swaggerUi.serveFiles(swaggerV2),
  swaggerUi.setup(swaggerV2, options)
);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
