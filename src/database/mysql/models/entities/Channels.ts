import { Column, Entity } from "typeorm";

@Entity("channels", { schema: "dazl_db" })
export class Channels {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("varchar", { name: "start_time", length: 255 })
  startTime: string;

  @Column("varchar", { name: "thumb", length: 255 })
  thumb: string;

  @Column("varchar", { name: "second_chance", length: 255 })
  secondChance: string;

  @Column("int", { name: "active" })
  active: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
