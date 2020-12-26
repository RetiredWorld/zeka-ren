import React, { useRef } from "react";

const Message  = (): JSX.Element => {
    function onClickClose() {
        ref.current.classList.add('is-invisible')
    }

    function onClickRefresh() {
        location.reload();
    }
    const ref = useRef<HTMLDivElement>(null);

    return (<div ref={ref} id="my-message" className="my-message is-invisible">
        <article className="message is-warning">
            <div className="message-header">
                <p>Hello World</p>
                <button className="delete" onClick={onClickClose} aria-label="delete" />
            </div>
            <div className="message-body">
                <p>好久不见了，刷新一下吗？</p>
                <button onClick={onClickRefresh} className="button my-confirm-btn" >好呀</button>
            </div>
        </article>
    </div>);
}

export default Message;
