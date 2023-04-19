"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthorsBundle = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp();
exports.createAuthorsBundle = functions.https.onRequest(async (request, response) => {
    const authorsBundle = admin.firestore().bundle('authors');
    const querySnapshot = await admin.firestore().collection('authors').get();
    authorsBundle.add('authorsQuery', querySnapshot).build();
    response.json({ result: `Built bundle from authors collection` });
});
//# sourceMappingURL=index.js.map