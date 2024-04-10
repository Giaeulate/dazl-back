import { Column, Entity } from "typeorm";

@Entity("file", { schema: "dazl_db" })
export class File {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "content_type", length: 255 })
  contentType: string;

  @Column("varchar", { name: "location", length: 255 })
  location: string;

  @Column("varchar", { name: "created_at", length: 255 })
  createdAt: string;

  @Column("varchar", { name: "updated_at", length: 255 })
  updatedAt: string;
}
