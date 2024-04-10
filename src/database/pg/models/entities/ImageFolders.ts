import { BaseEntity, Column, Entity, Index } from "typeorm";

// @Index("image_folders_pkey", ["id"], { unique: true })
// @Index("image_folders_id_db0cc3dd_like", ["id"], {})
@Entity("image_folders", { schema: "public" })
export class ImageFolders extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 150 })
  id?: string;

  @Column("character varying", { name: "name", length: 255 })
  name?: string;

  @Column("character varying", { name: "extension", length: 255 })
  extension?: string;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt?: Date;

  @Column("timestamp with time zone", { name: "updated_at" })
  updatedAt?: Date;
}
