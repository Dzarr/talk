import { FormApi } from "final-form";
import { RouteProps } from "found";
import React from "react";
import { graphql } from "react-relay";

import { pureMerge } from "coral-common/utils";
import { withFragmentContainer } from "coral-framework/lib/relay";

import { OrganizationConfigContainer_organization as OrganizationData } from "coral-admin/__generated__/OrganizationConfigContainer_organization.graphql";

import OrganizationConfig from "./OrganizationConfig";

interface Props {
  form: FormApi;
  submitting: boolean;
  organization: OrganizationData;
}

class OrganizationConfigContainer extends React.Component<Props> {
  public static routeConfig: RouteProps;
  private initialValues = {};

  constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    this.props.form.initialize(this.initialValues);
  }

  private handleOnInitValues = (values: any) => {
    this.initialValues = pureMerge(this.initialValues, values);
  };

  public render() {
    return (
      <OrganizationConfig
        disabled={this.props.submitting}
        organization={this.props.organization}
        onInitValues={this.handleOnInitValues}
      />
    );
  }
}

const enhanced = withFragmentContainer<Props>({
  organization: graphql`
    fragment OrganizationConfigContainer_organization on Organization {
      ...OrganizationNameConfigContainer_organization
      ...OrganizationURLConfigContainer_organization
      ...OrganizationContactEmailConfigContainer_organization
    }
  `,
})(OrganizationConfigContainer);

export default enhanced;
