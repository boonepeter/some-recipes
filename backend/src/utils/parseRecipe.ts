import { JSDOM } from "jsdom";
import prettyRecipe from "./prettyRecipe";

const isTypeRecipe = (ld: any) => {
    const ldType = ld['@type'];
    if (ldType) {
        if (typeof ldType === 'string') {
            return ldType.toLowerCase() === 'recipe';
        } else if (Array.isArray(ldType)) {
            return ldType.filter(e => e.toLowerCase() === 'recipe').length > 0
        }
    }
    return false;
}

const parseRecipe = (html: string) => {
    const dom = new JSDOM(html);
    const allData = dom.window.document.querySelectorAll('script[type="application/ld+json"]');
    for (let i = 0; i < allData.length; i++) {
        let ld = JSON.parse((allData[i] as any).text);
        if (ld['@graph']) {
            ld = ld['@graph'];
        }
        if (isTypeRecipe(ld)) {
            return prettyRecipe(ld);
        }
        for (let j = 0; j < ld.length; j++) {
            const ldElement = ld[j];
            if (isTypeRecipe(ldElement)) {
                return prettyRecipe(ldElement);
            }
        }
    }
}

export default parseRecipe;