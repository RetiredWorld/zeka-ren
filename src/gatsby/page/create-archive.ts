import { Actions  } from "gatsby";

import path from 'path';
import { ArchiveQuery} from "../../types/query/archive";
import { rootDir } from "../config";

const archiveTemplate = path.join(rootDir, 'src/template/archive.tsx');

export default function createArchive(res: ArchiveQuery, actions: Actions) {
    // TODO: remove fakeContext once issue https://github.com/gatsbyjs/gatsby/issues/26520 resolved
    const fakeContext = 'fakeContext';
    actions.createPage({
        path: '/archive',
        component: archiveTemplate,
        context: fakeContext
    });

    actions.createPage({
        path: '/archive',
        component: archiveTemplate,
        context: {
            data: res
        }
    });
};
