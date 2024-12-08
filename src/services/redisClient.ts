import Redis from "ioredis";

class RedisClient {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisClient.instance) {
      RedisClient.instance = new Redis({
        host: "localhost",
        port: 6379,
      });

      RedisClient.instance.on("connect", () => {
        console.log("Conexión a Redis exitosa");
      });

      RedisClient.instance.on("error", (err) => {
        console.error("Error en Redis:", err);
      });
    }

    return RedisClient.instance;
  }
}

export default RedisClient;
