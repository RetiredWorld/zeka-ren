import {BaseContext, BaseMarkdownRemark} from "./base";

export interface IImage {
    alt: string | null,
    src: {
        image: {
            fluid: {
                aspectRatio: number,
                src: string,
                srcSet: string,
            }
        }
    } | null
}

export interface IFrontMatter {
    date: string,
    images: IImage[],
    tags: string[],
    title: string
}

export interface NodeItem {
    frontmatter: IFrontMatter,
    html: string
}

export interface GroupItem {
    nodes: NodeItem[]
    yearMonth: string
}

export interface PostQuery extends BaseMarkdownRemark {
    allMarkdownRemark: {
        group: GroupItem[]
    }
}

export interface PostContext extends BaseContext{
    pageContext: PostContextObj
}

export interface PostContextObj {
    data: GroupItem
    prev: string | null
    next: string | null
    now: number
    sum: number
}
