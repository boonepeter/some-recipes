import { Recipe, WithContext, Class } from "schema-dts";
import { JSDOM } from "jsdom";
import axios from "axios";
import express from "express";
import prettyRecipe from "../utils/prettyRecipe";


const router = express.Router();

router.get("/", async (request, response) => {
    if (request.query.url) {
        const url = request.query.url.toString();
        const page = await axios.get(url);
        console.log("Got page...");
        var dom = new JSDOM(page.data);
        const doc = dom.window.document;
        const allData = doc.querySelectorAll('script[type="application/ld+json"]');
        for (let i = 0; i < allData.length; i++) {
            let ld = JSON.parse(allData[i].text);
            console.log(ld);
            if (ld["@graph"]) {
                console.log("has graph.");
                ld = ld["@graph"];
            }
            if (ld["@type"]) {
                response.json(prettyRecipe(ld));
                return;
            }
            for (let j = 0; j < ld.length; j++) {
                const el = ld[j];
                if (el["@type"] == "Recipe") {
                    response.json(prettyRecipe(el));
                    return;
                }
            }
        }
    }
    response.json({"Error": true})
})

export default router