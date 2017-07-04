import * as React from 'react';
import { Icon, Button } from 'semantic-ui-react';

export interface WatchButtonProps {
  isWatched: boolean | 'unknown';
}

export class WatchButton extends React.Component<WatchButtonProps, undefined> {
  render() {
    const color = this.props.isWatched ? 'red' : 'blue';
    const iconName = this.props.isWatched ? 'dont' : 'eye';
    const buttonText = this.props.isWatched ? 'Unwatch' : 'Watch';
    const inProgress = this.props.isWatched === 'unknown';

    return (
      <Button loading={inProgress} disabled={inProgress} fluid color={color}>
        <Icon name={iconName} />
        <span>
          {buttonText}
        </span>
      </Button>
    );
  }
}
