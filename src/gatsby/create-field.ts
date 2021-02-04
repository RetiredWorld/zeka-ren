import { Actions, Node } from 'gatsby';

interface IMyNode extends Node {
    frontmatter: {
        date: string
    }
}

const myCreateField = ({ node, actions }: { node: IMyNode, actions: Actions}) => {

    if (node.internal.type === 'MarkdownRemark') {
        try {
            const date = new Date(node.frontmatter.date);

            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            actions.createNodeField({ node, name: 'year-month', value: `${year}-${month}` });

        } catch (e) {
            const date = new Date();

            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            actions.createNodeField({ node, name: 'year-month', value: `${year}-${month}` });

        }
    } else {
        return ;
    }
};

export default myCreateField;
