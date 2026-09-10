import { ProjectionSubscriptionSchema } from "beast-contracts/core";
import { readCache } from "../data/ProjectionCache";

export class ProjectionSubscriptionHub {
  subscribe(envelope) {
    const valid = ProjectionSubscriptionSchema.safeParse(envelope);
    if (!valid.success) throw new Error("Invalid projection subscription");

    const { target, subscriber } = valid.data;

    const snapshot = readCache(target);

    return {
      subscriber,
      target,
      snapshot,
      deliveredAt: new Date().toISOString()
    };
  }
}
