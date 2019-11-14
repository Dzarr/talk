import { Localized } from "fluent-react/compat";
import React, { useMemo } from "react";
import { Field, useForm } from "react-final-form";
import { graphql } from "react-relay";

import { DeepNullable } from "coral-common/types";
import { parseBool } from "coral-framework/lib/form";
import { withFragmentContainer } from "coral-framework/lib/relay";
import { GQLSettings } from "coral-framework/schema";
import {
  CheckBox,
  Flex,
  FormField,
  HorizontalGutter,
} from "coral-ui/components";

import { EmailConfigContainer_email } from "coral-admin/__generated__/EmailConfigContainer_email.graphql";

import Header from "../../Header";
import SectionContent from "../../SectionContent";
import From from "./From";
import SMTP from "./SMTP";

import styles from "./EmailConfigContainer.css";

interface Props {
  submitting: boolean;
  email: EmailConfigContainer_email;
}

export type FormProps = DeepNullable<Pick<GQLSettings, "email">>;

const EmailConfigContainer: React.FunctionComponent<Props> = ({
  email,
  submitting,
}) => {
  const form = useForm();
  useMemo(() => {
    let values: any = { email };
    if (email && email.smtp && email.smtp.authentication === null) {
      values = {
        email: {
          ...email,
          smtp: { ...email.smtp, authentication: true },
        },
      };
    }
    if (email && email.smtp && email.smtp.secure === null) {
      values = {
        email: {
          ...email,
          smtp: { ...email.smtp, secure: true },
        },
      };
    }
    form.initialize(values);
  }, []);
  return (
    <HorizontalGutter size="double">
      <Field name="email.enabled" type="checkbox" parse={parseBool}>
        {({ input }) => (
          <Header
            className={styles.title}
            container={<Flex justifyContent="space-between" />}
          >
            <div>
              <Localized id="configure-email">
                <span>Email settings</span>
              </Localized>
            </div>
            <div>
              <FormField>
                <Localized id="configure-email-configBoxEnabled">
                  <CheckBox
                    id={input.name}
                    {...input}
                    light
                    disabled={submitting}
                  >
                    Enabled
                  </CheckBox>
                </Localized>
              </FormField>
            </div>
          </Header>
        )}
      </Field>
      <Field name="email.enabled" subscription={{ value: true }}>
        {({ input: { value } }) => (
          <SectionContent>
            <From disabled={submitting || !value} />
            <SMTP disabled={submitting || !value} />
          </SectionContent>
        )}
      </Field>
    </HorizontalGutter>
  );
};

const enhanced = withFragmentContainer<Props>({
  email: graphql`
    fragment EmailConfigContainer_email on EmailConfiguration {
      enabled
      ...From_formValues @relay(mask: false)
      ...SMTP_formValues @relay(mask: false)
    }
  `,
})(EmailConfigContainer);

export default enhanced;
