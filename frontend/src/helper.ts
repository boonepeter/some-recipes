
export interface Ingredient {
    quantity: number;
    unit: string;
    ingredient: string;
}
/*
Volume
Metric
Imperial and US customary
Weight
Metric
mg (also milligram or milligramme)
g (also gram or gramme)
kg (also kilogram or kilogramme)
Imperial and US customary
pound (also lb or #)
ounce (also oz)
Length
Metric
mm (also millimeter or millimetre)
cm (also centimeter or centimetre)
m (also meter or metre)
Imperial and US customary
inch (also in or ")
yard
Temperature
See the oven temperature table.

Metric
°C (also degree celsius)
Imperial and US customary
°F (aslo degree Farenheit)
Other
Gas mark (informal temperature measurement on gas cookers)

*/

const units = {
    milliliter: ["ml", "mL", "milliliter", "millilitre", "cc"],
    liter: ["l", "L", "liter", "litre"],
    deciliter: ["dl", "dL", "deciliter", "decilitre"],
    teaspoon: ["teaspoon", "t", "tsp", "Teaspoon", "t", "Tsp"],
    tablespoon: ["tablespoon", "T", "tbl", "tbs", "tbsp", "tablespoon", "T", "Tbl", "Tbs", "Tbsp"], // T, tbl., tbs., or tbsp.)
    fluid_ounce: ["fluid ounce", "fl oz", "oz"],
    gill: ["gill"],
    cup: ["cup", "c", "C"],
    pint: ["pint", "p", "pt", "fl pt"],
    quart: ["quart", "q", "qt", "fl qt"],
    gallon: ["gallon", /*"g",*/ "gal"],        
}

const parseIngredient = (ingredient: string) => {
    const quantity = ingredient.match(/^[^a-zA-Z]*/);
    let minMatch = ingredient.length;
    let unit = '';
    let unitMatch: RegExpMatchArray|null = [];
    Object.entries(units).forEach(
        ([key, value]) => {
            for (let i = 0; i < value.length; i++) {
                const synonym = value[i];
                let s = `(?:\\W|\\b)${synonym}s?(?:\\W|\\b)`;
                let match = ingredient.match(s);
                if (match && match.index) {
                    if (match.index < minMatch) {
                        unitMatch = match;
                        unit = key;
                        minMatch = match.index;
                    }
                }
            }
        }
      );
    let qString = "";
    let leftIndex = 0;
    if (quantity && quantity?.length > 0) {
        qString = quantity[0].trim();
        console.log(`Quantity: ${qString}`)
        leftIndex = quantity[0].length;
    }
    if (unitMatch && unitMatch.length > 0) {
        console.log(`Unit: ${unit}`);
        if (unitMatch.index) {
            leftIndex = unitMatch.index + unitMatch[0].length;
        } 
    }
    let ing = ingredient
                .substring(leftIndex)
                .replace(/^\([^\)]*\)/g, '')
                .trim();
    if (qString && unit) {
        return `${qString} ${unit} ${ing}`
    } else {
        return ingredient;
    }
}

export default parseIngredient;