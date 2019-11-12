import React from "react";
import { graphql } from "react-relay";

import { withFragmentContainer } from "coral-framework/lib/relay";

import { OrganizationContactEmailConfigContainer_organization as OrganizationData } from "coral-admin/__generated__/OrganizationContactEmailConfigContainer_organization.graphql";

import OrganizationContactEmailConfig from "./OrganizationContactEmailConfig";

interface Props {
  onInitValues: (values: OrganizationData) => void;
  disabled: boolean;
  organization: OrganizationData;
}

class OrganizationContactEmailConfigContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    props.onInitValues(props.organization);
  }

  public render() {
    const { disabled } = this.props;
    return <OrganizationContactEmailConfig disabled={disabled} />;
  }
}

const enhanced = withFragmentContainer<Props>({
  organization: graphql`
    fragment OrganizationContactEmailConfigContainer_organization on Organization {
      contactEmail
    }
  `,
})(OrganizationContactEmailConfigContainer);

export default enhanced;
