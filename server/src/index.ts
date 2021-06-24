import { MikroORM } from "@mikro-orm/core";

// External Imports
import { __prod__ } from "./constants";

// Entities
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: "letit",
    type: "postgresql",
    debug: !__prod__,
  });

  const post = orm.em.create(Post, { title: "my first post" });
};

main();
