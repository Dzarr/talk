import { Localized } from "fluent-react/compat";
import React, { FunctionComponent } from "react";
import { Field } from "react-final-form";
import { graphql } from "react-relay";

import { formatEmpty, parseEmptyAsNull } from "coral-framework/lib/form";
import {
  composeValidators,
  createValidator,
  validateWholeNumberGreaterThan,
} from "coral-framework/lib/validation";
import {
  FieldSet,
  FormField,
  HorizontalGutter,
  InputLabel,
  TextField,
  Typography,
} from "coral-ui/components";

import Header from "../../Header";
import OnOffField from "../../OnOffField";
import SectionContent from "../../SectionContent";
import ValidationMessage from "../../ValidationMessage";

import styles from "./CommentLengthConfig.css";

// eslint-disable-next-line no-unused-expressions
graphql`
  fragment CommentLengthConfig_formValues on Settings {
    charCount {
      enabled
      min
      max
    }
  }
`;

const validateMaxLongerThanMin = createValidator(
  (v: any, values: any) =>
    v === null ||
    values.charCount.min === null ||
    parseInt(v, 10) > parseInt(values.charCount.min, 10),
  // eslint-disable-next-line:jsx-wrap-multiline
  <Localized id="configure-general-commentLength-validateLongerThanMin">
    <span>Please enter a number longer than the minimum length</span>
  </Localized>
);

interface Props {
  disabled: boolean;
}

const CommentLengthConfig: FunctionComponent<Props> = ({ disabled }) => (
  <HorizontalGutter size="oneAndAHalf" container={<FieldSet />}>
    <Localized id="configure-general-commentLength-title">
      <Header container="legend">Comment length</Header>
    </Localized>
    <SectionContent>
      <Localized
        id="configure-general-commentLength-setLimit"
        strong={<strong />}
      >
        <Typography variant="bodyShort">
          Set minimum and maximum comment length requirements. Blank spaces at
          the beginning and the end of a comment will be trimmed.
        </Typography>
      </Localized>

      <FormField>
        <Localized id="configure-general-commentLength-limitCommentLength">
          <InputLabel>Limit comment length</InputLabel>
        </Localized>
        <OnOffField name="charCount.enabled" disabled={disabled} />
      </FormField>

      <FormField>
        <Localized id="configure-general-commentLength-minCommentLength">
          <InputLabel htmlFor="configure-general-commentLength-min">
            Minimum comment length
          </InputLabel>
        </Localized>
        <Field
          name="charCount.min"
          validate={validateWholeNumberGreaterThan(0)}
          parse={parseEmptyAsNull}
          format={formatEmpty}
        >
          {({ input, meta }) => (
            <>
              <Localized
                id="configure-general-commentLength-textField"
                attrs={{ placeholder: true }}
              >
                <TextField
                  {...input}
                  id="configure-general-commentLength-min"
                  classes={{
                    input: styles.commentLengthTextInput,
                  }}
                  disabled={disabled}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  adornment={
                    <Localized id="configure-general-commentLength-characters">
                      <Typography variant="bodyCopy">Characters</Typography>
                    </Localized>
                  }
                  placeholder={"No limit"}
                  textAlignCenter
                />
              </Localized>
              <ValidationMessage meta={meta} />
            </>
          )}
        </Field>
      </FormField>
      <FormField>
        <Localized id="configure-general-commentLength-maxCommentLength">
          <InputLabel htmlFor="configure-general-commentLength-max">
            Maximum comment length
          </InputLabel>
        </Localized>
        <Field
          name="charCount.max"
          validate={composeValidators(
            validateWholeNumberGreaterThan(0),
            validateMaxLongerThanMin
          )}
          parse={parseEmptyAsNull}
          format={formatEmpty}
        >
          {({ input, meta }) => (
            <>
              <Localized
                id="configure-general-commentLength-textField"
                attrs={{ placeholder: true }}
              >
                <TextField
                  {...input}
                  id="configure-general-commentLength-max"
                  classes={{
                    input: styles.commentLengthTextInput,
                  }}
                  disabled={disabled}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  adornment={
                    <Localized id="configure-general-commentLength-characters">
                      <Typography variant="bodyCopy">Characters</Typography>
                    </Localized>
                  }
                  placeholder={"No limit"}
                  textAlignCenter
                />
              </Localized>
              <ValidationMessage meta={meta} />
            </>
          )}
        </Field>
      </FormField>
    </SectionContent>
  </HorizontalGutter>
);

export default CommentLengthConfig;
