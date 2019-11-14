import { Localized } from "fluent-react/compat";
import React, { FunctionComponent } from "react";
import { graphql } from "react-relay";

import { HorizontalGutter } from "coral-ui/components";

import ConfigBoxWithToggleField from "./ConfigBoxWithToggleField";
import RegistrationField from "./RegistrationField";
import TargetFilterField from "./TargetFilterField";

// eslint-disable-next-line no-unused-expressions
graphql`
  fragment LocalAuthConfig_formValues on Auth {
    integrations {
      local {
        enabled
        allowRegistration
        targetFilter {
          admin
          stream
        }
      }
    }
  }
`;

interface Props {
  disabled?: boolean;
}

const LocalAuthConfig: FunctionComponent<Props> = ({ disabled }) => (
  <ConfigBoxWithToggleField
    title={
      <Localized id="configure-auth-local-loginWith">
        <span>Login with email authentication</span>
      </Localized>
    }
    name="auth.integrations.local.enabled"
    disabled={disabled}
  >
    {disabledInside => (
      <HorizontalGutter size="double">
        <TargetFilterField
          label={
            <Localized id="configure-auth-local-useLoginOn">
              <span>Use email authentication login on</span>
            </Localized>
          }
          name="auth.integrations.local.targetFilter"
          disabled={disabledInside}
        />
        <RegistrationField
          name="auth.integrations.local.allowRegistration"
          disabled={disabledInside}
        />
      </HorizontalGutter>
    )}
  </ConfigBoxWithToggleField>
);

export default LocalAuthConfig;
