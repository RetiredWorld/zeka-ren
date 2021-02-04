import { Actions } from 'gatsby';

const myCreateType = (action: Actions): void => {
    action.createTypes(`
        type ImageUserInfo @infer {
      src: File @imageFile
      alt: String
    }
    
    type MarkdownRemarkUserFrontmatter @infer {
      date: Date @dateformat
      title: String
      tags: [String]
      images: [ImageUserInfo]
    }

    type MarkdownRemark implements Node @infer {
      frontmatter: MarkdownRemarkUserFrontmatter
    }`);
};

export default myCreateType;
