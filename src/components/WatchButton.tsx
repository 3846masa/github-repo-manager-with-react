import * as React from 'react';
import { Icon, Button } from 'semantic-ui-react';

export interface WatchButtonProps {
  isWatched: boolean;
  progressing?: boolean;
}

export class WatchButton extends React.Component<WatchButtonProps, undefined> {
  render() {
    const color = this.props.isWatched ? 'red' : 'blue';
    const iconName = this.props.isWatched ? 'dont' : 'eye';
    const buttonText = this.props.isWatched ? 'Unwatch' : 'Watch';

    return (
      <Button
        loading={this.props.progressing}
        disabled={this.props.progressing}
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
