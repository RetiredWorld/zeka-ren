import React, { useEffect } from "react";

import {IFriendSingle, IFriendsQuery} from "../types/query/friends";

import SEO from "../components/public/seo";
import Header from "../components/public/header";

import {graphql} from "gatsby";

const FriendsList = ({friends}: {friends: IFriendSingle[]}): JSX.Element => {
    return (<div className="my-friends">
        {friends.map((friend, index) => {
            return (<a key={`${friend.name}_${index}`} href={friend.website}>
                <div className="my-friends__item card">
                    <div className="my-friends__avatar is-clearfix" >
                        <img src={friend.avatar? friend.avatar: "/static/images/avatar.jpg"} alt={friend.name}/>
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

const FriendsComments = (): JSX.Element => {
    useEffect(()=> {
        import("../vendors/disqus").then((module)=> {
            module.default()
        })
    })

    return (<div id="disqus_thread">

    </div>);
};

const Friends = ({data}: {data: IFriendsQuery}): JSX.Element =>{
    return (<>
        <SEO title="友链" />
        <Header title="友链" />
        <FriendsList friends={data.friendsJson.friends} />
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
`
