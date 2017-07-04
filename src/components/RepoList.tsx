import * as React from 'react';
import { Card } from 'semantic-ui-react';
import { RepoCard } from '~/components/RepoCard';
import * as Actions from '~/actions/actions';

export interface RepoListProps {
  repos: any[];
  itemsPerRow?: number;
  actions: typeof Actions;
}

export class RepoList extends React.Component<RepoListProps, undefined> {
  render() {
    return (
      <div
        style={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        }}
      >
        <Card.Group
          itemsPerRow={(this.props.itemsPerRow as any) || 1}
          style={{ margin: '0' }}
        >
          {this.props.repos.map(repo =>
            <RepoCard key={repo.id} actions={this.props.actions} {...repo} />,
          )}
        </Card.Group>
      </div>
    );
  }
}
