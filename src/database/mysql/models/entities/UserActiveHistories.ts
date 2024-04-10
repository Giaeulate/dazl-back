import { Column, Entity } from "typeorm";

@Entity("user_active_histories", { schema: "dazl_db" })
export class UserActiveHistories {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "user_id", length: 255 })
  userId: string;

  @Column("varchar", { name: "start_time", length: 255 })
  startTime: string;

  @Column("varchar", { name: "end_time", length: 255 })
  endTime: string;

  @Column("varchar", { name: "status", length: 255 })
  status: string;

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
}
