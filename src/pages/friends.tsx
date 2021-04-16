import React, { useEffect, useState } from 'react';

import { IFriendSingle, IFriendsQuery } from '../types/query/friends';

import Header from '../components/public/header';
import SEO from '../components/public/seo';

import { graphql } from 'gatsby';

function shuffleSelf<T>(array: T[], size: number = null) {
    let index = -1;
    const length = array.length;
    const lastIndex = length - 1;

    size = size === null ? length : size;
    while (++index < size) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
        const value = array[rand];
        array[rand] = array[index];
        array[index] = value;
    }
    array.length = size;
    return array;
}

const FriendsList: React.FC<{friends: IFriendSingle[]}> = ({ friends }) => {
    const [ myFriends, setMyFriends ] = useState<IFriendSingle[]>(friends);
    useEffect(() => {
        setMyFriends(shuffleSelf(myFriends));
    }, []);

    return (<div className="my-friends">
        {myFriends.map((friend, index) => {
            const key = `${friend.name}_${index}`;
            return (<a key={key} href={friend.website}>
                <div className="my-friends__item card">
                    <div className="my-friends__avatar is-clearfix" >
                        <img src={friend.avatar? friend.avatar: '/static/images/avatar.jpg'} alt={friend.name} />
                    </div>
                    <div className="my-friends__info is-clearfix">
                        <div className="my-friends__name">{friend.name}</div>
                        <div className="my-friends__intro">{friend.description? friend.description: '这个人很懒，什么都没有留下~'}</div>
                    </div>
                </div>
            </a>);
        })}
    </div>);
};

const FriendsComments: React.FC = () => {
    useEffect(()=> {
        import('../vendors/disqus').then((module)=> {
            module.default();
        });
    });

    return (<div id="disqus_thread">

    </div>);
};

const FriendsIntro: React.FC = () => {
    return (<div className="my-friends-desc">
        <blockquote>
            <h2>本站</h2>
            <p>名称：Zeka 的记事本</p>
            <p>链接：<a target="_blank" rel="noopener noreferrer" href="https://flag.zeka.cloud">https://flag.zeka.cloud</a></p>
            <p>头像：<a target="_blank" rel="noopener noreferrer" href="https://www.gravatar.com/avatar/f3cab2fa088b3f3afe96a92535e5b0ab">www.gravatar.com/avatar/f3cab2fa088b3f3afe96a92535e5b0ab</a></p>
            <p>描述：这个人很懒，什么都没有留下</p>
        </blockquote>
    </div>);
};

const Friends: React.FC<{data: IFriendsQuery}> = ({ data }) =>{
    return (<>
        <SEO title="友链" description="Zeka 的朋友们" />
        <Header title="友链" />
        <FriendsList friends={data.friendsJson.friends} />
        <FriendsIntro />
        <FriendsComments />
    </>);
};

export default Friends;

export const FriendsQuery = graphql`query FriendsAll {
  friendsJson {
    friends {
      description
      name
      website
      avatar
    }
  }
}
`;
