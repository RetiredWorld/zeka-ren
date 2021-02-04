import { Actions } from 'gatsby';

import path from 'path';

const myCreateSchema = (actions: Actions): void => {
    actions.createFieldExtension({
        name: 'imageFile',
        extend: ()=>({
            resolve: function (src, args, context, info) {
                // look up original string, i.e img/photo.jpg
                const { fieldName } = info;
                let partialPath = src[fieldName];
                const ancestor = context.nodeModel.findRootNodeAncestor(src);

                if (!partialPath) {
                    return null;
                }

                if (partialPath.startsWith('/')){
                    partialPath = partialPath.slice(1);
                } else if (partialPath.startsWith('./')) {
                    partialPath = partialPath.slice(2);
                }

                if (partialPath.indexOf('\\') === -1 && partialPath.indexOf('/') === -1){
                    const currentDate = ancestor.name;
                    partialPath = currentDate + '/' + partialPath;
                }

                // get the absolute path of the image file in the filesystem
                const filePath = path.join(
                    ancestor.dir,
                    partialPath,
                );
                // look for a node with matching path
                // check out the query object, it's the same as a regular query filter
                const fileNode = context.nodeModel.runQuery({
                    firstOnly: true,
                    type: 'File',
                    query: {
                        filter: {
                            absolutePath: {
                                eq: filePath,
                            },
                        },
                    },
                });

                // no node? return
                if (!fileNode) {
                    return null;
                }

                // else return the node
                return fileNode;
            },
        }),
    });
};

export default myCreateSchema;
