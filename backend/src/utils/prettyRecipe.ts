import {Recipe as RecipeSchema, HowToStep} from "schema-dts";

const prettyRecipe = (recipe: RecipeSchema) => {
    let pretty: any = recipe;
    let dirs = [];
    if (typeof(pretty.author) !== typeof(String)) {
        let author = pretty.author as any;
        pretty.author = author?.name;
    }
    if (typeof(pretty.image) !== "string") {
        const imArray = pretty.image as Array<string>;
        pretty.image = imArray[imArray.length - 1];
    }
    if (typeof(pretty.recipeInstructions) === typeof(String)) {
        pretty.recipeInstructions = [pretty.recipeInstructions as string]
    } else {
        const instr = pretty.recipeInstructions as Array<HowToStep>;
        pretty.recipeInstructions = instr.map(i => i.text);
    }
    if (pretty.recipeYield) {
        pretty.recipeYield = parseInt(pretty.recipeYield);
    }
    if (pretty.keywords) {
        pretty.keywords = pretty.keywords.split(",");
    }
    pretty.cookTime = durationToMinutes(pretty.cookTime);
    pretty.prepTime = durationToMinutes(pretty.prepTime);
    pretty.totalTime = durationToMinutes(pretty.totalTime);
    pretty.performTime = durationToMinutes(pretty.performTime);
    return pretty;
}

var iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;

interface Duration {
    sign: string;
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const durationToMinutes = (duration: string): number => {
    let dur = parseISO8601Duration(duration);
    if (!dur) {
        return 0;
    }
    let minutes = 0;
    minutes += dur.minutes;
    minutes += dur.hours * 60;
    minutes += dur.days * 60 * 24;
    minutes += dur.weeks * 60 * 24 * 7;
    minutes += dur.months * 30 * 60 * 24;
    minutes += dur.years * 365 * 60 * 24;
    return minutes;
}

const parseISO8601Duration = (iso8601Duration: string): Duration | null => {
    if (!iso8601Duration) {
        return null;
    }
    var matches = iso8601Duration.match(iso8601DurationRegex);
    if (matches) {
        return {
            sign: matches[1] === undefined ? '+' : '-',
            years: matches[2] === undefined ? 0 : parseInt(matches[2]),
            months: matches[3] === undefined ? 0 : parseInt(matches[3]),
            weeks: matches[4] === undefined ? 0 : parseInt(matches[4]),
            days: matches[5] === undefined ? 0 : parseInt(matches[5]),
            hours: matches[6] === undefined ? 0 : parseInt(matches[6]),
            minutes: matches[7] === undefined ? 0 : parseInt(matches[7]),
            seconds: matches[8] === undefined ? 0 : parseInt(matches[8])
        };
    }
    return null;
};

export default prettyRecipe;