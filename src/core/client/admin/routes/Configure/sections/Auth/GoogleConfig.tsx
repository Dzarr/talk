import { Localized } from "fluent-react/compat";
import React, { FunctionComponent } from "react";

import {
  Condition,
  required,
  validateWhen,
} from "coral-framework/lib/validation";
import { HorizontalGutter, TextLink, Typography } from "coral-ui/components";

import HorizontalRule from "../../HorizontalRule";
import ClientIDField from "./ClientIDField";
import ClientSecretField from "./ClientSecretField";
import ConfigBoxWithToggleField from "./ConfigBoxWithToggleField";
import RedirectField from "./RedirectField";
import RegistrationField from "./RegistrationField";
import TargetFilterField from "./TargetFilterField";

interface Props {
  disabled?: boolean;
  callbackURL: string;
}

const GoogleLink = () => (
  <TextLink target="_blank">
    {
      "https://developers.google.com/identity/protocols/OAuth2WebServer#creatingcred"
    }
  </TextLink>
);

const isEnabled: Condition = (value, values) =>
  Boolean(values.auth.integrations.google.enabled);

const GoogleConfig: FunctionComponent<Props> = ({ disabled, callbackURL }) => (
  <ConfigBoxWithToggleField
    title={
      <Localized id="configure-auth-google-loginWith">
        <span>Login with Google</span>
      </Localized>
    }
    name="auth.integrations.google.enabled"
    disabled={disabled}
  >
    {disabledInside => (
      <HorizontalGutter size="double">
        <Localized
          id="configure-auth-google-toEnableIntegration"
          Link={<GoogleLink />}
        >
          <Typography>
            To enable the integration with Google Authentication you need to
            create and set up a web application. For more information visit:
            <br />
            {
              "https://developers.google.com/identity/protocols/OAuth2WebServer#creatingcred"
            }
          </Typography>
        </Localized>
        <HorizontalRule />
        <RedirectField url={callbackURL} />
        <HorizontalRule />
        <ClientIDField
          name="auth.integrations.google.clientID"
          validate={validateWhen(isEnabled, required)}
          disabled={disabledInside}
        />
        <ClientSecretField
          name="auth.integrations.google.clientSecret"
          validate={validateWhen(isEnabled, required)}
          disabled={disabledInside}
        />
        <TargetFilterField
          label={
            <Localized id="configure-auth-google-useLoginOn">
              <span>Use Google login on</span>
            </Localized>
          }
          name="auth.integrations.google.targetFilter"
          disabled={disabledInside}
        />
        <RegistrationField
          name="auth.integrations.google.allowRegistration"
          disabled={disabledInside}
        />
      </HorizontalGutter>
    )}
  </ConfigBoxWithToggleField>
);

export default GoogleConfig;
