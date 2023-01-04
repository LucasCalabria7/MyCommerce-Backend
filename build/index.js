"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log((0, database_1.queryProductsByName)("Nike"));
console.log((0, database_1.createPurchase)("myiduser", "productsid", 2, 400));
//# sourceMappingURL=index.js.map