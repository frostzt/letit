import {
  Entity,
  PrimaryKey,
  SerializedPrimaryKey,
  Property,
} from "@mikro-orm/core";

@Entity()
export class Post {
  @PrimaryKey()
  _id!: number;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  name!: string;
}
