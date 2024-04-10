import { Column, Entity } from "typeorm";

@Entity("user_live", { schema: "dazl_db" })
export class UserLive {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "user_id", length: 255 })
  userId: string;

  @Column("datetime", { name: "active_date" })
  activeDate: Date;

  @Column("datetime", { name: "expiration_date" })
  expirationDate: Date;

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

  @Column("enum", { name: "status", enum: ["active", "inactive", "holding"] })
  status: "active" | "inactive" | "holding";
}
