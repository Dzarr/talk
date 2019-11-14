import { FormApi } from "final-form";
import React from "react";
import { graphql } from "react-relay";

import { withForm } from "coral-framework/lib/form";
import {
  FetchProp,
  withFetch,
  withFragmentContainer,
} from "coral-framework/lib/relay";

import { OIDCConfigContainer_auth as AuthData } from "coral-admin/__generated__/OIDCConfigContainer_auth.graphql";
import { OIDCConfigContainer_authReadOnly as AuthReadOnlyData } from "coral-admin/__generated__/OIDCConfigContainer_authReadOnly.graphql";

import { OnInitValuesFct } from "./AuthConfigContainer";
import DiscoverOIDCConfigurationFetch from "./DiscoverOIDCConfigurationFetch";
import OIDCConfig from "./OIDCConfig";

interface Props {
  auth: AuthData;
  authReadOnly: AuthReadOnlyData;
  onInitValues: OnInitValuesFct;
  disabled?: boolean;
  discoverOIDCConfiguration: FetchProp<typeof DiscoverOIDCConfigurationFetch>;
  form: FormApi<{auth: AuthData}>;
}

interface State {
  awaitingResponse: boolean;
}

class OIDCConfigContainer extends React.Component<Props, State> {
  public state = {
    awaitingResponse: false,
  };

  private handleDiscover = async () => {
    const issuer = this.props.form.getState().values.auth.integrations.oidc.issuer;
    if (!issuer) {
      return;
    }
    this.setState({ awaitingResponse: true });
    try {
      const config = await this.props.discoverOIDCConfiguration({
        issuer,
      });
      if (config) {
        if (config.issuer) {
          this.props.form.change("auth.integrations.oidc.issuer", config.issuer);
        }
        this.props.form.change(
          "auth.integrations.oidc.authorizationURL",
          config.authorizationURL
        );
        this.props.form.change("auth.integrations.oidc.jwksURI", config.jwksURI);
        this.props.form.change("auth.integrations.oidc.tokenURL", config.tokenURL);
      }
    } catch (error) {
      // FIXME: (wyattjoh) handle error
      // eslint-disable-next-line no-console
      console.warn(error);
    }
    this.setState({ awaitingResponse: false });
  };

  constructor(props: Props) {
    super(props);
    props.onInitValues({ auth: props.auth });
  }

  public render() {
    const { disabled, authReadOnly } = this.props;
    return (
      <OIDCConfig
        disabled={disabled}
        callbackURL={authReadOnly.integrations.oidc.callbackURL}
        onDiscover={this.handleDiscover}
        disableForDiscover={this.state.awaitingResponse}
      />
    );
  }
}

const enhanced = withForm(withFetch(DiscoverOIDCConfigurationFetch)(
  withFragmentContainer<Props>({
    auth: graphql`
      fragment OIDCConfigContainer_auth on Auth {
        integrations {
          oidc {
            enabled
            allowRegistration
            targetFilter {
              admin
              stream
            }
            name
            clientID
            clientSecret
            authorizationURL
            tokenURL
            jwksURI
            issuer
          }
        }
      }
    `,
    authReadOnly: graphql`
      fragment OIDCConfigContainer_authReadOnly on Auth {
        integrations {
          oidc {
            callbackURL
          }
        }
      }
    `,
  })(OIDCConfigContainer)
));

export default enhanced;
