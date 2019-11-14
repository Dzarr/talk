import { Localized } from "fluent-react/compat";
import React from "react";
import { Field } from "react-final-form";
import { graphql } from "react-relay";

import { LocaleField } from "coral-framework/components";
import { required } from "coral-framework/lib/validation";
import { FormField, HorizontalGutter, Typography } from "coral-ui/components";

import Header from "../../Header";
import SectionContent from "../../SectionContent";
import ValidationMessage from "../../ValidationMessage";

// eslint-disable-next-line no-unused-expressions
graphql`
  fragment LocaleConfig_formValues on Settings {
    locale
  }
`;

interface Props {
  disabled: boolean;
}

const LocaleConfig: React.FunctionComponent<Props> = props => {
  return (
    <FormField>
      <HorizontalGutter size="full">
        <Localized id="configure-general-locale-language">
          <Header container={<label htmlFor="configure-locale-locale" />}>
            Language
          </Header>
        </Localized>
        <SectionContent>
          <Localized
            id="configure-general-locale-chooseLanguage"
            strong={<strong />}
          >
            <Typography variant="detail">
              Choose the language for your Coral community.
            </Typography>
          </Localized>
          <Field name="locale" validate={required}>
            {({ input, meta }) => (
              <>
                <LocaleField
                  id={`configure-locale-${input.name}`}
                  disabled={props.disabled}
                  {...input}
                />
                <ValidationMessage meta={meta} fullWidth />
              </>
            )}
          </Field>
        </SectionContent>
      </HorizontalGutter>
    </FormField>
  );
};

export default LocaleConfig;
