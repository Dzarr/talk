import { Localized } from "fluent-react/compat";
import React, { FunctionComponent } from "react";
import { Field } from "react-final-form";
import { graphql } from "react-relay";

import { DurationField } from "coral-framework/components";
import { ValidationMessage } from "coral-framework/lib/form";
import {
  composeValidators,
  required,
  validateWholeNumberGreaterThanOrEqual,
} from "coral-framework/lib/validation";
import {
  FieldSet,
  FormField,
  HorizontalGutter,
  InputLabel,
} from "coral-ui/components";

import Header from "../../Header";

// eslint-disable-next-line no-unused-expressions
graphql`
  fragment SessionConfig_formValues on Auth {
    sessionDuration
  }
`;

interface Props {
  disabled?: boolean;
}

const SessionConfig: FunctionComponent<Props> = ({ disabled }) => (
  <HorizontalGutter>
    <HorizontalGutter size="full">
      <Localized id="configure-auth-settings">
        <Header>Session settings</Header>
      </Localized>
    </HorizontalGutter>
    <FormField container={<FieldSet />}>
      <Localized id="configure-auth-settings-session-duration-label">
        <InputLabel container="legend">Session Duration</InputLabel>
      </Localized>
      <Field
        name="auth.sessionDuration"
        validate={composeValidators(
          required,
          validateWholeNumberGreaterThanOrEqual(0)
        )}
      >
        {({ input, meta }) => (
          <>
            <DurationField {...input} disabled={!!disabled} />
            <ValidationMessage meta={meta} />
          </>
        )}
      </Field>
    </FormField>
  </HorizontalGutter>
);

export default SessionConfig;
