export const requestStatusMeta = {
  Pending: {
    label: "Pending",
    classes:
      "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300",
  },
  Accepted: {
    label: "Accepted",
    classes:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  Rejected: {
    label: "Rejected",
    classes:
      "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300",
  },
};

export function getRequestStatusMessage(request) {
  if (request.status === "Accepted") {
    return request.direction === "received"
      ? `You accepted the request from ${request.counterpart}. Coordinate delivery with them in person; TheBridge does not send messages for you.`
      : `${request.counterpart} accepted your request. Reach out to them to coordinate delivery in person.`;
  }

  if (request.status === "Rejected") {
    return request.direction === "received"
      ? `You rejected the request from ${request.counterpart}. They will see this listing as no longer available to them.`
      : `${request.counterpart} rejected your request. You can look for another listing in the Marketplace.`;
  }

  return request.direction === "received"
    ? `Waiting for you to accept or reject ${request.counterpart}'s request.`
    : `Waiting for ${request.counterpart} to respond to your request.`;
}
