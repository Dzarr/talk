import { createForm, FormApi, FormState } from "final-form";
import { Localized } from "fluent-react/compat";
import { mapValues } from "lodash";
import React, { FunctionComponent, useEffect, useMemo } from "react";
import { Form, FormSpy } from "react-final-form";

import MainLayout from "coral-admin/components/MainLayout";
import { Button, CallOut, HorizontalGutter } from "coral-ui/components";

import Layout from "./Layout";
import Link from "./Link";
import Main from "./Main";
import Navigation from "./Navigation";
import SideBar from "./SideBar";

interface Props {
  onSubmit: (settings: any, form: FormApi) => void;
  onChange: (formState: FormState<any>) => void;
  children: React.ReactElement;
}

const Configure: FunctionComponent<Props> = ({
  onSubmit,
  onChange,
  children,
}) => {
  // Set up child form key so we can work around the fact that
  // final-form and relay don't play nice together. The latest
  // update of final-form process the field props on the second
  // component render, we need to trigger a re-render and be
  // efficient with the value loading.
  const child = React.Children.only(children);
  // Incrementing a key value so that we can keep snapshots
  // working.
  let keyValue = 0;
  const formKey = useMemo(() => {
    keyValue++;
    return keyValue;
  }, [child, keyValue]);
  // Create the form we will use to handle the value load order
  const form = useMemo(() => {
    return createForm({
      onSubmit,
    });
  }, [child]);
  // Get our initial values, map them to null so that the first
  // render pass is efficient so that we can force a reload with
  // the values we care about.
  useEffect(() => {
    const initialValues = form.getState().initialValues as Record<string, any>;
    form.reset(mapValues(initialValues, () => null));
    form.reset(initialValues);
  }, [child]);
  return (
    <MainLayout data-testid="configure-container">
      <Form onSubmit={onSubmit} form={form} key={formKey}>
        {({ handleSubmit, submitting, pristine, submitError }) => (
          <form autoComplete="off" onSubmit={handleSubmit} id="configure-form">
            <FormSpy onChange={onChange} />
            <Layout>
              <SideBar>
                <HorizontalGutter size="double">
                  <Navigation>
                    <Localized id="configure-sideBarNavigation-general">
                      <Link to="/admin/configure/general">General</Link>
                    </Localized>
                    <Localized id="configure-sideBarNavigation-organization">
                      <Link to="/admin/configure/organization">
                        Organization
                      </Link>
                    </Localized>
                    <Localized id="configure-sideBarNavigation-moderation">
                      <Link to="/admin/configure/moderation">Moderation</Link>
                    </Localized>
                    <Localized id="configure-sideBarNavigation-bannedAndSuspectWords">
                      <Link to="/admin/configure/wordList">
                        Banned and Suspect Words
                      </Link>
                    </Localized>
                    <Localized id="configure-sideBarNavigation-authentication">
                      <Link to="/admin/configure/auth">Authentication</Link>
                    </Localized>
                    <Localized id="configure-sideBarNavigation-email">
                      <Link to="/admin/configure/email">Email</Link>
                    </Localized>
                    <Localized id="configure-sideBarNavigation-advanced">
                      <Link to="/admin/configure/advanced">Advanced</Link>
                    </Localized>
                  </Navigation>
                </HorizontalGutter>
                <HorizontalGutter size="double">
                  <Localized id="configure-sideBar-saveChanges">
                    <Button
                      data-testid="configure-sideBar-saveChanges"
                      color="success"
                      variant="filled"
                      type="submit"
                      disabled={submitting || pristine}
                    >
                      Save Changes
                    </Button>
                  </Localized>
                  {submitError && (
                    <CallOut
                      color="error"
                      fullWidth
                      data-testid="configure-auth-submitError"
                    >
                      {submitError}
                    </CallOut>
                  )}
                </HorizontalGutter>
              </SideBar>
              <Main>
                {React.cloneElement(React.Children.only(children), {
                  form,
                  submitting,
                })}
              </Main>
            </Layout>
          </form>
        )}
      </Form>
    </MainLayout>
  );
};

export default Configure;
