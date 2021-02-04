const myCreateType = require('./src/gatsby/create-type.ts');
exports.createSchemaCustomization = ({ actions }) => {
    myCreateType.default(actions);
};

const myCreateSchema = require('./src/gatsby/create-schema.ts');
exports.sourceNodes = ({ actions }) => {
    myCreateSchema.default(actions);
};

const myCreatePages = require('./src/gatsby/page');
exports.createPages = myCreatePages.default;

const myCreateNode = require('./src/gatsby/create-field');
exports.onCreateNode = myCreateNode.default;
