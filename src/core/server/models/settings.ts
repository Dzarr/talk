import { Omit } from "coral-common/types";

import {
  GQLAuth,
  GQLCommenterAccountFeatures,
  GQLEntitySettings,
  GQLExternalIntegrations,
  GQLFacebookAuthIntegration,
  GQLGoogleAuthIntegration,
  GQLLiveConfiguration,
  GQLLocalAuthIntegration,
  GQLOIDCAuthIntegration,
  GQLRecentCommentHistoryConfiguration,
  GQLSSOAuthIntegration,
  GQLStoryConfiguration,
  GQLStoryScrapingConfiguration,
  GQLWordList,
} from "coral-server/graph/tenant/schema/__generated__/types";

export type LiveConfiguration = Omit<GQLLiveConfiguration, "configurable">;

export type CloseCommenting = Omit<
  GQLEntitySettings["closeCommenting"],
  "message"
> &
  Partial<Pick<GQLEntitySettings["closeCommenting"], "message">>;

export type DisableCommenting = Omit<
  GQLEntitySettings["disableCommenting"],
  "message"
> &
  Partial<Pick<GQLEntitySettings["disableCommenting"], "message">>;

export type OIDCAuthIntegration = Omit<
  GQLOIDCAuthIntegration,
  "callbackURL" | "redirectURL"
>;

export type GoogleAuthIntegration = Omit<
  GQLGoogleAuthIntegration,
  "callbackURL" | "redirectURL"
>;

export type FacebookAuthIntegration = Omit<
  GQLFacebookAuthIntegration,
  "callbackURL" | "redirectURL"
>;

export interface AuthIntegrations {
  local: GQLLocalAuthIntegration;
  sso: GQLSSOAuthIntegration;
  oidc: OIDCAuthIntegration;
  google: GoogleAuthIntegration;
  facebook: FacebookAuthIntegration;
}

export type Auth = Omit<GQLAuth, "integrations"> & {
  integrations: AuthIntegrations;
};

export type PartialAuth = Omit<GQLAuth, "integrations"> & {
  integrations: Partial<AuthIntegrations>;
};

export type PartialStoryConfiguration = Partial<
  Omit<GQLStoryConfiguration, "scraping">
> & {
  scraping: Partial<GQLStoryScrapingConfiguration>;
};

export type Settings = Pick<
  GQLEntitySettings,
  | "accountFeatures"
  | "charCount"
  | "communityGuidelines"
  | "customCSSURL"
  | "editCommentWindowLength"
  | "email"
  | "integrations"
  | "moderation"
  | "premodLinksEnable"
  | "reaction"
  | "recentCommentHistory"
  | "staff"
  | "staticURI"
  | "stories"
  | "wordList"
> & {
  auth: Auth;
  closeCommenting: CloseCommenting;
  disableCommenting: DisableCommenting;
  live: LiveConfiguration;
};

export type PartialSettings = Partial<
  Pick<
    GQLEntitySettings,
    | "communityGuidelines"
    | "customCSSURL"
    | "editCommentWindowLength"
    | "email"
    | "moderation"
    | "premodLinksEnable"
    | "reaction"
    | "staff"
    | "staticURI"
  >
> & {
  accountFeatures?: Partial<GQLCommenterAccountFeatures>;
  auth?: PartialAuth;
  integrations?: Partial<GQLExternalIntegrations>;
  live?: Partial<LiveConfiguration>;
  recentCommentHistory?: Partial<GQLRecentCommentHistoryConfiguration>;
  stories?: PartialStoryConfiguration;
  wordList?: Partial<GQLWordList>;
};
