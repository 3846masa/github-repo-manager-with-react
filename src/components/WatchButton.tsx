import * as React from 'react';
import { Icon, Button } from 'semantic-ui-react';

export interface WatchButtonProps {
  isWatched: boolean | 'unknown';
  onClick: (...args: any[]) => any;
}

export class WatchButton extends React.Component<WatchButtonProps, undefined> {
  render() {
    const inProgress = this.props.isWatched === 'unknown';
    const color = inProgress ? 'grey' : this.props.isWatched ? 'red' : 'blue';
    const iconName = this.props.isWatched ? 'dont' : 'eye';
    const buttonText = this.props.isWatched ? 'Unwatch' : 'Watch';

    return (
      <Button
        onClick={this.props.onClick}
        loading={inProgress}
        disabled={inProgress}
        fluid
        color={color}
      >
        <Icon name={iconName} />
        <span>
          {buttonText}
        </span>
      </Button>
    );
  }
}
