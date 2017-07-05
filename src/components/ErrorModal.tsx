import * as React from 'react';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';
import autobind from 'autobind-decorator';
import * as Actions from '~/actions/actions';

export interface ErrorModalProps {
  error?: Error | null;
  actions: typeof Actions;
}

export class ErrorModal extends React.Component<ErrorModalProps, undefined> {
  @autobind
  handleClose() {
    this.props.actions.confirmErrorModal();
  }

  render() {
    const open = !!this.props.error;
    const message = this.props.error ? this.props.error.message : '';

    return (
      <Modal open={open} basic size="small">
        <Header icon="warning circle" content="Oops!" />
        <Modal.Content>
          <h3>Something went wrong...</h3>
          <p>
            {message}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
