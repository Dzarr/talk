import { Localized } from "fluent-react/compat";
import React, { FunctionComponent } from "react";
import { Field } from "react-final-form";
import { graphql } from "react-relay";

import { DURATION_UNIT, DurationField } from "coral-framework/components";
import {
  composeValidators,
  required,
  validateWholeNumberGreaterThanOrEqual,
} from "coral-framework/lib/validation";
import {
  FieldSet,
  FormField,
  HorizontalGutter,
  InputLabel,
  Typography,
} from "coral-ui/components";

import Header from "../../Header";
import SectionContent from "../../SectionContent";
import ValidationMessage from "../../ValidationMessage";

// eslint-disable-next-line no-unused-expressions
graphql`
  fragment CommentEditingConfig_formValues on Settings {
    editCommentWindowLength
  }
`;
interface Props {
  disabled: boolean;
}

const CommentEditingConfig: FunctionComponent<Props> = ({ disabled }) => (
  <HorizontalGutter size="oneAndAHalf">
    <Localized id="configure-general-commentEditing-title">
      <Header>Comment editing</Header>
    </Localized>
    <SectionContent>
      <Localized
        id="configure-general-commentEditing-explanation"
        strong={<strong />}
      >
        <Typography variant="bodyShort">
          Set a limit on how long commenters have to edit their comments
          sitewide. Edited comments are marked as (Edited) on the comment stream
          and the moderation panel.
        </Typography>
      </Localized>

      <FormField container={<FieldSet />}>
        <Localized id="configure-general-commentEditing-commentEditTimeFrame">
          <InputLabel container="legend">Comment edit timeframe</InputLabel>
        </Localized>
        <Field
          name="editCommentWindowLength"
          validate={composeValidators(
            required,
            validateWholeNumberGreaterThanOrEqual(0)
          )}
        >
          {({ input, meta }) => (
            <>
              <DurationField
                {...input}
                units={[
                  DURATION_UNIT.SECONDS,
                  DURATION_UNIT.MINUTES,
                  DURATION_UNIT.HOURS,
                ]}
                disabled={disabled}
              />
              <ValidationMessage meta={meta} />
            </>
          )}
        </Field>
      </FormField>
    </SectionContent>
  </HorizontalGutter>
);

export default CommentEditingConfig;
