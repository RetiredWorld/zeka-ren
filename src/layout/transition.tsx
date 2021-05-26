import React from 'react';

import {
  TransitionGroup,
  Transition as ReactTransition,
} from 'react-transition-group';

const timeout = 300;
const getTransitionStyles = {
  entering: {
    position: 'absolute',
    maxWidth: '100%',
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 0,
  },
};

interface ITransitionProps {
  pathname: string
}

const Transition: React.FC<ITransitionProps> = ({ children, pathname }) => {
    return (
      <TransitionGroup>
        <ReactTransition key={pathname}
                         timeout={{
                           enter: timeout,
                           exit: timeout,
                         }}
        >
          {status => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    );
};

export default Transition;
