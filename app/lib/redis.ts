import { createClient } from "redis";

const client = createClient({
  url: process.env.NEXT_PUBLIC_REDIS_URL
});


client.on('error', (err) => {
    console.error("Redis error:", err);
});

export default client;