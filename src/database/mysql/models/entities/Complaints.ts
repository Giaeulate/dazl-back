import { Column, Entity } from "typeorm";

@Entity("complaints", { schema: "dazl_db" })
export class Complaints {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "complainant_id", length: 255 })
  complainantId: string;

  @Column("varchar", { name: "message_id", length: 255 })
  messageId: string;

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
