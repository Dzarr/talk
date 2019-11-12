import React from "react";
import { graphql } from "react-relay";

import { withFragmentContainer } from "coral-framework/lib/relay";

import { OrganizationNameConfigContainer_organization as OrganizationData } from "coral-admin/__generated__/OrganizationNameConfigContainer_organization.graphql";

import OrganizationNameConfig from "./OrganizationNameConfig";

interface Props {
  onInitValues: (values: OrganizationData) => void;
  disabled: boolean;
  organization: OrganizationData;
}

class OrganizationNameConfigContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    props.onInitValues(props.organization);
  }

  public render() {
    const { disabled } = this.props;
    return <OrganizationNameConfig disabled={disabled} />;
  }
}

const enhanced = withFragmentContainer<Props>({
  organization: graphql`
    fragment OrganizationNameConfigContainer_organization on Organization {
      name
    }
  `,
})(OrganizationNameConfigContainer);

export default enhanced;
