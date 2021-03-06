import cn from "classnames";
import React, { FunctionComponent, useCallback, useEffect } from "react";

import { CopyButton } from "coral-framework/components";
import { useViewerEvent } from "coral-framework/lib/events";
import CLASSES from "coral-stream/classes";
import { CopyPermalinkEvent, ShowSharePopoverEvent } from "coral-stream/events";
import { Flex, TextField } from "coral-ui/components";

import styles from "./PermalinkPopover.css";

interface Props {
  permalinkURL: string;
  commentID: string;
}

const PermalinkPopover: FunctionComponent<Props> = ({
  permalinkURL,
  commentID,
}) => {
  const emitShowEvent = useViewerEvent(ShowSharePopoverEvent);
  const emitCopyEvent = useViewerEvent(CopyPermalinkEvent);
  const onButtonClick = useCallback(() => emitCopyEvent({ commentID }), [
    emitCopyEvent,
    commentID,
  ]);
  // Run once.
  useEffect(() => {
    emitShowEvent({ commentID });
  }, []);
  return (
    <Flex
      itemGutter="half"
      className={cn(styles.root, CLASSES.sharePopover.$root)}
    >
      <TextField
        defaultValue={permalinkURL}
        className={styles.textField}
        readOnly
      />
      <CopyButton
        onClick={onButtonClick}
        text={permalinkURL}
        className={CLASSES.sharePopover.copyButton}
      />
    </Flex>
  );
};

export default PermalinkPopover;
