import { Localized } from "fluent-react/compat";
import React, { FunctionComponent, Suspense } from "react";
import { Field } from "react-final-form";
import { graphql } from "react-relay";

import { MarkdownEditor } from "coral-framework/components/loadables";
import { parseEmptyAsNull } from "coral-framework/lib/form";
import { ExternalLink } from "coral-framework/lib/i18n/components";
import {
  FieldSet,
  FormField,
  HorizontalGutter,
  InputDescription,
  InputLabel,
  Spinner,
} from "coral-ui/components";

import Header from "../../Header";
import OnOffField from "../../OnOffField";
import SectionContent from "../../SectionContent";
import ValidationMessage from "../../ValidationMessage";

// eslint-disable-next-line no-unused-expressions
graphql`
  fragment GuidelinesConfig_formValues on Settings {
    communityGuidelines {
      enabled
      content
    }
  }
`;

interface Props {
  disabled: boolean;
}

const GuidelinesConfig: FunctionComponent<Props> = ({ disabled }) => (
  <HorizontalGutter size="oneAndAHalf" container={<FieldSet />}>
    <Localized id="configure-general-guidelines-title">
      <Header container="legend">Community guidelines summary</Header>
    </Localized>
    <SectionContent>
      <FormField container={<FieldSet />}>
        <Localized id="configure-general-guidelines-showCommunityGuidelines">
          <InputLabel container="legend">
            Show community guidelines summary
          </InputLabel>
        </Localized>
        <OnOffField name="communityGuidelines.enabled" disabled={disabled} />
      </FormField>

      <FormField>
        <Localized id="configure-general-guidelines-title">
          <InputLabel htmlFor="configure-general-guidelines-content">
            Community guidelines summary
          </InputLabel>
        </Localized>
        <Localized
          id="configure-general-guidelines-explanation"
          strong={<strong />}
          externalLink={<ExternalLink href="#" />}
        >
          <InputDescription>
            Write a summary of your community guidelines that will appear at the
            top of each comment stream sitewide. Your summary can be formatted
            using Markdown Syntax. More information on how to use Markdown can
            be found here.
          </InputDescription>
        </Localized>
      </FormField>

      <Field name="communityGuidelines.content" parse={parseEmptyAsNull}>
        {({ input, meta }) => (
          <>
            <Suspense fallback={<Spinner />}>
              <MarkdownEditor
                {...input}
                id="configure-general-guidelines-content"
              />
            </Suspense>
            <ValidationMessage meta={meta} />
          </>
        )}
      </Field>
    </SectionContent>
  </HorizontalGutter>
);

export default GuidelinesConfig;
