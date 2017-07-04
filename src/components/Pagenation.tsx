import * as React from 'react';
import { Icon, Button, Label } from 'semantic-ui-react';

export interface PagenationProps {
  onClickPrev: (...args: any[]) => any;
  onClickNext: (...args: any[]) => any;
  page: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export class Pagenation extends React.Component<PagenationProps, undefined> {
  render() {
    return (
      <Button.Group>
        <Button
          onClick={this.props.onClickPrev}
          disabled={this.props.isFirstPage}
        >
          <Icon name="caret left" />
          <span>Prev</span>
        </Button>
        <Label basic>
          <span>Page </span>
          <span>
            {this.props.page}
          </span>
        </Label>
        <Button
          onClick={this.props.onClickNext}
          disabled={this.props.isLastPage}
        >
          <span>Next</span>
          <Icon name="caret right" />
        </Button>
      </Button.Group>
    );
  }
}
