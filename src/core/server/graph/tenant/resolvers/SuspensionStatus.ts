import { GQLSuspensionStatusTypeResolver } from "coral-server/graph/tenant/schema/__generated__/types";
import * as user from "coral-server/models/user";

export type SuspensionStatusInput = user.ConsolidatedSuspensionStatus & {
  userID: string;
};

export const SuspensionStatus: Required<
  GQLSuspensionStatusTypeResolver<SuspensionStatusInput>
> = {
  active: ({ active }) => active,
  until: ({ until }) => until,
  history: ({ history, userID }) =>
    history.map(status => ({ ...status, userID })),
};
