"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RecipeListSchema_1 = __importDefault(require("../models/RecipeListSchema"));
var RecipeSchema_1 = __importDefault(require("../models/RecipeSchema"));
var listRouter = express_1.default.Router();
listRouter.get('/', function (_request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var lists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, RecipeListSchema_1.default.find({})];
            case 1:
                lists = _a.sent();
                response.json(lists.map(function (l) { return l.toJSON(); }));
                return [2 /*return*/];
        }
    });
}); });
listRouter.post('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var newRecipe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newRecipe = new RecipeListSchema_1.default(__assign({}, request.body));
                return [4 /*yield*/, newRecipe.save()];
            case 1:
                _a.sent();
                response.status(200).end();
                return [2 /*return*/];
        }
    });
}); });
listRouter.get('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var recipe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, RecipeListSchema_1.default.findById(request.params.id).populate('recipes', {
                    ingredients: 1,
                    directions: 1,
                    reviews: 1,
                    tags: 1,
                    title: 1,
                    description: 1,
                    link: 1,
                    id: 1
                })];
            case 1:
                recipe = _a.sent();
                if (recipe) {
                    response.json(recipe.toJSON());
                }
                else {
                    response.status(404).end();
                }
                return [2 /*return*/];
        }
    });
}); });
listRouter.put('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var list, recipeId, recipe, newRecipes, newList, returned;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, RecipeListSchema_1.default.findById(request.params.id)];
            case 1:
                list = _a.sent();
                if (!list) {
                    response.status(404).end();
                }
                console.log(list);
                recipeId = request.body.recipeId;
                return [4 /*yield*/, RecipeSchema_1.default.findById(recipeId)];
            case 2:
                recipe = _a.sent();
                if (!recipe) {
                    response.status(404).end();
                }
                console.log(recipe);
                console.log(list === null || list === void 0 ? void 0 : list.toJSON().recipes);
                newRecipes = list === null || list === void 0 ? void 0 : list.toJSON().recipes.concat(recipe === null || recipe === void 0 ? void 0 : recipe._id);
                console.log(newRecipes);
                newList = {
                    title: list === null || list === void 0 ? void 0 : list.toJSON().title,
                    recipes: newRecipes
                };
                console.log(newList);
                return [4 /*yield*/, RecipeListSchema_1.default.findByIdAndUpdate(list === null || list === void 0 ? void 0 : list.toJSON().id, newList, { new: true })];
            case 3:
                returned = _a.sent();
                response.json(returned === null || returned === void 0 ? void 0 : returned.toJSON());
                return [2 /*return*/];
        }
    });
}); });
/*
blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id).populate('user', { id: 1 })
  const jBlog = blog.toJSON()

  if (jBlog.user.id !== decodedToken.id) {
    response.status(401).json({ error: 'user is not the creator of that entry' })
  } else {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url
   }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog.toJSON())
})

blogRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const oldBlog = await Blog.findById(request.params.id)
  oldBlog.comments = oldBlog.comments.concat(body.comment)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, oldBlog, { new: true }).populate('user', { username: 1, name: 1})
  response.json(updatedBlog.toJSON())
})
*/
exports.default = listRouter;
