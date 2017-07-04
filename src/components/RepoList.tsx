import * as React from 'react';
import { Card } from 'semantic-ui-react';
import { RepoCard } from '~/components/RepoCard';

export interface RepoListProps {
  repos: any[];
  itemsPerRow?: number;
}

export class RepoList extends React.Component<RepoListProps, undefined> {
  render() {
    return (
      <Card.Group
        itemsPerRow={(this.props.itemsPerRow as any) || 1}
        style={{
          margin: '0',
          overflowX: 'hidden',
          overflowY: 'scroll',
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        }}
      >
        {this.props.repos.map(repo => <RepoCard key={repo.id} {...repo} />)}
      </Card.Group>
    );
  }
}
