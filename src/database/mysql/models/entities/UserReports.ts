import { Column, Entity } from "typeorm";

@Entity("user_reports", { schema: "dazl_db" })
export class UserReports {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "reason", length: 255 })
  reason: string;

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

  @Column("varchar", { name: "user_who_reported", length: 255 })
  userWhoReported: string;

  @Column("varchar", { name: "user_who_was_reported", length: 255 })
  userWhoWasReported: string;
}
