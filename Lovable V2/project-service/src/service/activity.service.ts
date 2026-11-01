import { redis } from "../config/redis.js"
const ACTIVITY_KEY_PREFIX = "preview:active:"
const ACTIVITY_CHANNEL = "preview:activity"
const IDLE_TTL_MS = Number(process.env.PREVIEW_IDLE_TTL_MS || 10 * 60 * 1000)



/**
 * Refreshes the idle timer for a preview. The key's expiry is what later
 * triggers the Redis keyspace event that reaps the pod and service.
 *
 * Failures are logged rather than thrown so a Redis outage never breaks proxying.
 *
 * @param uniqueId Preview id taken from the request subdomain.
 */
export async function recordActivity(uniqueId: string) {
    try {
        await redis
            .multi()
            .set(`${ACTIVITY_KEY_PREFIX}${uniqueId}`, Date.now().toString(), "PX", IDLE_TTL_MS)
            .publish(ACTIVITY_CHANNEL, uniqueId)
            .exec()
    } catch (error) {
        console.error(`[idle-reaper] failed to record activity for ${uniqueId}:`, error)
    }
}
