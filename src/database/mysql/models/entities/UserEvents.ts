import { Column, Entity } from "typeorm";

@Entity("user_events", { schema: "dazl_db" })
export class UserEvents {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "user_id", nullable: true, length: 255 })
  userId: string | null;

  @Column("varchar", { name: "event_id", nullable: true, length: 255 })
  eventId: string | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;
}
