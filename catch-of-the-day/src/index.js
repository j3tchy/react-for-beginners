import React from "react";
import { render } from "react-dom";
import "./css/style.css";

import Router from "./components/Router";

require("dotenv").config({
    path: "../env"
});

render(<Router />, document.querySelector("#main"));
