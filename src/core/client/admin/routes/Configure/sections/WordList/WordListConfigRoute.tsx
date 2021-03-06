import { FormApi } from "final-form";
import React from "react";
import { graphql } from "react-relay";

import { withRouteConfig } from "coral-framework/lib/router";
import { Delay, Spinner } from "coral-ui/components";

import { WordListConfigRouteQueryResponse } from "coral-admin/__generated__/WordListConfigRouteQuery.graphql";

import WordListConfigContainer from "./WordListConfigContainer";

interface Props {
  data: WordListConfigRouteQueryResponse | null;
  form: FormApi;
  submitting: boolean;
}

class WordListConfigRoute extends React.Component<Props> {
  public render() {
    if (!this.props.data) {
      return (
        <Delay>
          <Spinner />
        </Delay>
      );
    }
    return (
      <WordListConfigContainer
        settings={this.props.data.settings}
        form={this.props.form}
        submitting={this.props.submitting}
      />
    );
  }
}

const enhanced = withRouteConfig<Props>({
  query: graphql`
    query WordListConfigRouteQuery {
      settings {
        ...WordListConfigContainer_settings
      }
    }
  `,
  cacheConfig: { force: true },
})(WordListConfigRoute);

export default enhanced;
