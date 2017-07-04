import * as React from 'react';
import { Card, Label } from 'semantic-ui-react';
import autobind from 'autobind-decorator';

import { WatchButton } from '~/components/WatchButton';
import * as Actions from '~/actions/actions';

export interface RepoCardProps {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  language: string;
  description: string;
  owner: {
    login: string;
    html_url: string;
  };
  isSubscribed: boolean | 'unknown';
  actions: typeof Actions;
}

export class RepoCard extends React.Component<RepoCardProps, undefined> {
  @autobind
  handleClick() {
    this.props.actions.changeWatchStatus({
      id: this.props.id,
      full_name: this.props.full_name,
      isSubscribed: !this.props.isSubscribed,
    });
  }

  render() {
    return (
      <Card key={this.props.id}>
        <Card.Content>
          <Label attached="top">
            <p style={{ textAlign: 'right', margin: '0' }}>
              {this.props.language || 'None'}
            </p>
          </Label>
          <Card.Header>
            <a
              href={this.props.html_url}
              target="_blank"
              style={{ color: 'inherit', wordBreak: 'break-all' }}
            >
              {this.props.name}
            </a>
          </Card.Header>
          <Card.Meta>
            <a
              href={this.props.owner.html_url}
              target="_blank"
              style={{ color: 'inherit', wordBreak: 'break-all' }}
            >
              @{this.props.owner.login}
            </a>
          </Card.Meta>
          <Card.Description
            style={{
              maxHeight: '85px',
              overflowX: 'hidden',
              overflowY: 'auto',
              wordBreak: 'break-all',
            }}
          >
            {this.props.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <WatchButton
            onClick={this.handleClick}
            isWatched={this.props.isSubscribed}
          />
        </Card.Content>
      </Card>
    );
  }
}
