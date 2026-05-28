/**
 * Simple in-memory rate limiter with sliding window.
 * Suitable for Vercel/Next.js (single instances) and standard Node servers.
 */

type RateLimitRecord = {
  timestamps: number[];
};

const tracker = new Map<string, RateLimitRecord>();

// Clean up memory every 10 minutes to avoid memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of tracker.entries()) {
      // Filter out timestamps older than 15 minutes
      const activeTimestamps = record.timestamps.filter((t) => now - t < 15 * 60 * 1000);
      if (activeTimestamps.length === 0) {
        tracker.delete(ip);
      } else {
        tracker.set(ip, { timestamps: activeTimestamps });
      }
    }
  }, 10 * 60 * 1000);
}

interface RateLimitConfig {
  limit: number;       // Max requests
  windowMs: number;    // Time window in ms
}

/**
 * Checks if a request is rate limited for a given key (e.g. IP).
 * Returns an object with limit details.
 */
export function rateLimit(key: string, config: RateLimitConfig) {
  const now = Date.now();
  const record = tracker.get(key) || { timestamps: [] };
  
  // Filter out expired timestamps
  const activeTimestamps = record.timestamps.filter((t) => now - t < config.windowMs);
  
  const count = activeTimestamps.length;
  
  if (count >= config.limit) {
    const oldestTimestamp = activeTimestamps[0];
    const resetTime = oldestTimestamp + config.windowMs;
    const retryAfterSeconds = Math.ceil((resetTime - now) / 1000);
    
    return {
      isLimited: true,
      limit: config.limit,
      remaining: 0,
      resetTime,
      retryAfterSeconds,
    };
  }
  
  // Add new request timestamp
  activeTimestamps.push(now);
  tracker.set(key, { timestamps: activeTimestamps });
  
  return {
    isLimited: false,
    limit: config.limit,
    remaining: config.limit - activeTimestamps.length,
    resetTime: now + config.windowMs,
    retryAfterSeconds: 0,
  };
}
