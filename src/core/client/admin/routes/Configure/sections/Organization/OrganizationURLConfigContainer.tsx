import React from "react";
import { graphql } from "react-relay";

import { withFragmentContainer } from "coral-framework/lib/relay";

import { OrganizationURLConfigContainer_organization as OrganizationData } from "coral-admin/__generated__/OrganizationURLConfigContainer_organization.graphql";

import OrganizationURLConfig from "./OrganizationURLConfig";

interface Props {
  organization: OrganizationData;
  onInitValues: (values: OrganizationData) => void;
  disabled: boolean;
}

class OrganizationURLConfigContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    props.onInitValues(props.organization);
  }

  public render() {
    const { disabled } = this.props;
    return <OrganizationURLConfig disabled={disabled} />;
  }
}

const enhanced = withFragmentContainer<Props>({
  organization: graphql`
    fragment OrganizationURLConfigContainer_organization on Organization {
      url
    }
  `,
})(OrganizationURLConfigContainer);

export default enhanced;
