import { Column, Entity } from "typeorm";

@Entity("user_blocked", { schema: "dazl_db" })
export class UserBlocked {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "user_blocked", length: 255 })
  userBlocked: string;

  @Column("varchar", { name: "user_who_blocked", length: 255 })
  userWhoBlocked: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "'0000-00-00 00:00:00'",
  })
  updatedAt: Date;

  @Column("int", { name: "active" })
  active: number;
}
