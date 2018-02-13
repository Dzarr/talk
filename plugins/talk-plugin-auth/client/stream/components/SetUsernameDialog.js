import React from 'react';
import PropTypes from 'prop-types';
import styles from './SetUsernameDialog.css';
import {
  Dialog,
  Alert,
  TextField,
  Button,
} from 'plugin-api/beta/client/components/ui';
import { FakeComment } from './FakeComment';
import { t } from 'plugin-api/beta/client/services';

class SetUsernameDialog extends React.Component {
  handleUsernameChange = e => this.props.onUsernameChange(e.target.value);

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit();
  };

  render() {
    const { username, usernameError, errorMessage } = this.props;

    return (
      <Dialog className={styles.dialogusername} id="createUsernameDialog" open>
        <div>
          <div className={styles.header}>
            <h1>{t('createdisplay.write_your_username')}</h1>
          </div>
          <div>
            <p className={styles.yourusername}>
              {t('createdisplay.your_username')}
            </p>
            <FakeComment
              className={styles.fakeComment}
              username={username}
              created_at={new Date().toISOString()}
              body={t('createdisplay.fake_comment_body')}
            />
            {errorMessage && <Alert>{errorMessage}</Alert>}
            <form id="saveUsername" onSubmit={this.handleSubmit}>
              {usernameError && (
                <span className={styles.hint}>
                  {' '}
                  {t('createdisplay.special_characters')}{' '}
                </span>
              )}
              <div className={styles.saveusername}>
                <TextField
                  id="username"
                  style={{ fontSize: 16 }}
                  type="string"
                  label={t('createdisplay.username')}
                  value={username}
                  showErrors={!!usernameError}
                  errorMsg={usernameError}
                  onChange={this.handleUsernameChange}
                />
                <Button id="save" type="submit" className={styles.saveButton}>
                  {t('createdisplay.save')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    );
  }
}

SetUsernameDialog.propTypes = {
  loading: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  usernameError: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default SetUsernameDialog;
