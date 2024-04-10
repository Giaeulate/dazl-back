import { Column, Entity } from "typeorm";

@Entity("messages", { schema: "dazl_db" })
export class Messages {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("text", { name: "text" })
  text: string;

  @Column("int", { name: "is_sent" })
  isSent: number;

  @Column("varchar", { name: "channel_id", length: 255 })
  channelId: string;

  @Column("varchar", { name: "type", length: 255 })
  type: string;

  @Column("int", { name: "active" })
  active: number;

  @Column("varchar", { name: "user_from_id", length: 255 })
  userFromId: string;

  @Column("varchar", { name: "user_to_id", length: 255 })
  userToId: string;

  @Column("varchar", { name: "user_read_id", length: 255 })
  userReadId: string;

  @Column("tinyint", { name: "reported" })
  reported: number;

  @Column("varchar", { name: "response", length: 255 })
  response: string;

  @Column("varchar", { name: "created_at", nullable: true, length: 255 })
  createdAt: string | null;

  @Column("varchar", { name: "updated_at", nullable: true, length: 255 })
  updatedAt: string | null;
}
