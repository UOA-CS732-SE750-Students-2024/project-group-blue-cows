import * as logger from "firebase-functions/logger";

import {
  beforeUserCreated,
  beforeUserSignedIn,
} from "firebase-functions/v2/identity";

export const beforeCreated = beforeUserCreated((event) => {
  logger.info("beforeCreated", event);
  // TODO
  return;
});

export const beforeSignedIn = beforeUserSignedIn((event) => {
  logger.info("beforeSignedIn", event);
  // TODO
});
