import * as React from 'react';
import { Card, Label } from 'semantic-ui-react';

import { WatchButton } from '~/components/WatchButton';

export interface RepoCardProps {
  id: number;
  name: string;
  html_url: string;
  language: string;
  description: string;
  owner: {
    login: string;
    html_url: string;
  };
  isWatched: boolean;
  progressing: boolean;
}

export class RepoCard extends React.Component<RepoCardProps, undefined> {
  render() {
    return (
      <Card key={this.props.id}>
        <Card.Content>
          <Card.Header>
            <Label attached="top right">
              {this.props.language}
            </Label>
            <a href={this.props.html_url} style={{ color: 'inherit' }}>
              {this.props.name}
            </a>
          </Card.Header>
          <Card.Meta>
            <a href={this.props.owner.html_url} style={{ color: 'inherit' }}>
              @{this.props.owner.login}
            </a>
          </Card.Meta>
          <Card.Description style={{ wordBreak: 'break-all' }}>
            {this.props.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <WatchButton
            isWatched={this.props.isWatched}
            progressing={this.props.progressing}
          />
        </Card.Content>
      </Card>
    );
  }
}
