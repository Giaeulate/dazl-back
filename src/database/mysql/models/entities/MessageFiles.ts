import { Column, Entity } from "typeorm";

@Entity("message_files", { schema: "dazl_db" })
export class MessageFiles {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "file_id", length: 255 })
  fileId: string;

  @Column("varchar", { name: "message_id", length: 255 })
  messageId: string;
}
