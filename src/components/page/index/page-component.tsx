import React from "react";

import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faLink } from '@fortawesome/free-solid-svg-icons';
import { IFrontMatter, IImage, NodeItem } from "../../../types/query/post";
import { PhotoProvider, PhotoConsumer } from 'react-photo-view';

import MyImage from "../../public/image";
import { getPageUrl } from "../../../template/homepage";

const PageHeader = ({frontmatter}: {
    frontmatter: IFrontMatter
}): JSX.Element => {
    const [year, month, day] = frontmatter.date.split('-').map(str=>parseInt(str));
    const url = getPageUrl({
        year,
        month,
        hashId: frontmatter.title,
    });

    const tags = frontmatter.tags;

    return (<>
    <Link className="my-page-link" to={url}>
        <header className='my-page-header'>
            <div className='my-page-hashtag' id={frontmatter.title} />
            <FontAwesomeIcon className="my-page-header__icon" icon={faLink} />
            {frontmatter.title}
        </header>
    </Link>
        <div className="my-page-sub is-clearfix">
            <span className="my-page-sub__item">在 {year} 年 {month} 月 {day} 日说：</span>
            {tags?tags.map((tag, index) => {
                return (<span key={`${frontmatter.title}_${index}`}  className="my-page-sub__item"><FontAwesomeIcon icon={faTag} /> {tag} </span>);
            }): null}
        </div>
    </>);
};

const PageContent = ({content}: {
    content: string
}): JSX.Element => {

    return (<div className="my-page-content" dangerouslySetInnerHTML={{
        __html: content
    }}>
    </div>);
};

const PageMediaMulti = ({ images }: {
    images: IImage[]
}): JSX.Element => {

    return (<>
        {images.map((image, index)=>{
            if (!image.src) return ;
            const myImage = image.src.image.fluid;
            return (<PhotoConsumer key={`${myImage.src}_${index}`} src={myImage.src} intro="aaa">
                    <div className="my-page-media__container" style={{
                        ["--asp-ratio" as any]: myImage.aspectRatio
                    }}>
                        <MyImage className="my-page-media__img" alt={image.alt} src={myImage.src} srcSet={myImage.srcSet} />
                    </div>
                </PhotoConsumer>);
        })}
    </>);
};

const PageMediaSingle = ({ images }: {
    images: IImage[]
}): JSX.Element => {

    return (<>
        {images.map((image, index) => {
            if (image.src === null) return;

            const myImage = image.src.image.fluid;
            return (<PhotoConsumer key={`image-${myImage.src}_${index}`} src={myImage.src} intro="">
                    <div className="my-page-media__single" style={{
                        ["--asp-ratio" as any]: myImage.aspectRatio
                    }}>
                        <MyImage className="my-page-media__img" alt={image.alt} srcSet={myImage.srcSet} src={myImage.src} />
                    </div>
                </PhotoConsumer>
            );
        })}
    </>);
};

const PageMedia = ({frontmatter}: {
    frontmatter: IFrontMatter
}): JSX.Element => {
    let imageEle: JSX.Element;
    const images = frontmatter.images;

    if (!images) {
        return null;
    }

    if (images.length === 0) {
        imageEle = null;
    } else if (images.length === 1) {
        imageEle = (<PageMediaSingle images={images} />);
    } else {
        let validNum = 0;
        for (let i=0; i<images.length; i++) {
            if (images[i].src){
                validNum++;
            }
            if (validNum >= 2) break;
        }

        if (validNum >= 2) {
            imageEle = (<PageMediaMulti images={images} />);
        } else {
            imageEle = (<PageMediaSingle images={images} />);
        }
    }

    return (<div className="my-page-media">
        <PhotoProvider>
            {imageEle}
        </PhotoProvider>
    </div>);
};

const PageComponent = ({data}: {
    data: NodeItem
}): JSX.Element => {

    return (<section className="my-page-component">
        <PageHeader frontmatter={data.frontmatter} />
        <PageContent content={data.html} />
        <PageMedia frontmatter={data.frontmatter} />
    </section>);
};

export default PageComponent;
