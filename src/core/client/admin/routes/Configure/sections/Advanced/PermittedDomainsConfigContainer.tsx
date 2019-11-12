import React from "react";
import { graphql } from "react-relay";

import { withFragmentContainer } from "coral-framework/lib/relay";

import { PermittedDomainsConfigContainer_organization as OrganizationData } from "coral-admin/__generated__/PermittedDomainsConfigContainer_organization.graphql";

import PermittedDomainsConfig from "./PermittedDomainsConfig";

interface Props {
  organization: OrganizationData;
  onInitValues: (values: OrganizationData) => void;
  disabled: boolean;
}

class PermittedDomainsConfigContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    props.onInitValues(props.organization);
  }

  public render() {
    const { disabled } = this.props;
    return <PermittedDomainsConfig disabled={disabled} />;
  }
}

const enhanced = withFragmentContainer<Props>({
  organization: graphql`
    fragment PermittedDomainsConfigContainer_organization on Organization {
      allowedDomains
    }
  `,
})(PermittedDomainsConfigContainer);

export default enhanced;
