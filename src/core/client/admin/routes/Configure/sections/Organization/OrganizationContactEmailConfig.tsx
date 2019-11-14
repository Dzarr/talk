import { Localized } from "fluent-react/compat";
import React, { FunctionComponent } from "react";
import { Field } from "react-final-form";
import { graphql } from "react-relay";

import {
  composeValidators,
  required,
  validateEmail,
} from "coral-framework/lib/validation";
import {
  FormField,
  HorizontalGutter,
  TextField,
  Typography,
} from "coral-ui/components";

import Header from "../../Header";
import SectionContent from "../../SectionContent";
import ValidationMessage from "../../ValidationMessage";

// eslint-disable-next-line no-unused-expressions
graphql`
  fragment OrganizationContactEmailConfig_formValues on Settings {
    organization {
      contactEmail
    }
  }
`;

interface Props {
  disabled: boolean;
}

const OrganizationContactEmailConfig: FunctionComponent<Props> = ({
  disabled,
}) => (
  <FormField>
    <HorizontalGutter size="full">
      <Localized id="configure-organization-email">
        <Header
          container={
            <label htmlFor="configure-organization-organization.contactEmail" />
          }
        >
          Organization email
        </Header>
      </Localized>
      <SectionContent>
        <Localized
          id="configure-organization-emailExplanation"
          strong={<strong />}
        >
          <Typography variant="bodyShort">
            This email address will be used as in emails and across the platform
            for community members to get in touch with the organization should
            they have any questions about the status of their accounts or
            moderation questions.
          </Typography>
        </Localized>
        <Field
          name="organization.contactEmail"
          validate={composeValidators(required, validateEmail)}
        >
          {({ input, meta }) => (
            <>
              <TextField
                {...input}
                id={`configure-organization-${input.name}`}
                disabled={disabled}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                fullWidth
              />
              <ValidationMessage fullWidth meta={meta} />
            </>
          )}
        </Field>
      </SectionContent>
    </HorizontalGutter>
  </FormField>
);

export default OrganizationContactEmailConfig;
