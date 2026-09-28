import { tone } from "../styles/ui.js";

export const requestStatusMeta = {
  Pending: {
    label: "Pending",
    classes: tone.amber,
  },
  Accepted: {
    label: "Accepted",
    classes: tone.sage,
  },
  Rejected: {
    label: "Rejected",
    classes: tone.rose,
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
