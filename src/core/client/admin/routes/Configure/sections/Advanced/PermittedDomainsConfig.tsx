import { Localized } from "fluent-react/compat";
import React, { FunctionComponent } from "react";
import { Field } from "react-final-form";
import { graphql } from "react-relay";

import {
  colorFromMeta,
  formatStringList,
  parseStringList,
  ValidationMessage,
} from "coral-framework/lib/form";
import { validateStrictURLList } from "coral-framework/lib/validation";
import {
  FormField,
  HorizontalGutter,
  TextField,
  Typography,
} from "coral-ui/components";

import Header from "../../Header";
import SectionContent from "../../SectionContent";

// eslint-disable-next-line no-unused-expressions
graphql`
  fragment PermittedDomainsConfig_formValues on Settings {
    allowedDomains
  }
`;

interface Props {
  disabled: boolean;
}

const PermittedDomainsConfig: FunctionComponent<Props> = ({ disabled }) => (
  <FormField>
    <HorizontalGutter size="full">
      <Localized id="configure-advanced-permittedDomains">
        <Header
          container={<label htmlFor="configure-advanced-allowedDomains" />}
        >
          Permitted domains
        </Header>
      </Localized>
      <SectionContent>
        <Localized
          id="configure-advanced-permittedDomains-description"
          strong={<strong />}
        >
          <Typography variant="bodyShort">
            The domains you would like to permit for Coral, e.g. your local,
            staging and production environments including the scheme (ex.
            http://localhost:3000, https://staging.domain.com,
            https://domain.com).
          </Typography>
        </Localized>
        <Field
          name="allowedDomains"
          parse={parseStringList}
          format={formatStringList}
          validate={validateStrictURLList}
        >
          {({ input, meta }) => (
            <>
              <TextField
                {...input}
                id={`configure-advanced-${input.name}`}
                disabled={disabled}
                color={colorFromMeta(meta)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                fullWidth
              />
              <ValidationMessage meta={meta} fullWidth />
            </>
          )}
        </Field>
      </SectionContent>
    </HorizontalGutter>
  </FormField>
);

export default PermittedDomainsConfig;
