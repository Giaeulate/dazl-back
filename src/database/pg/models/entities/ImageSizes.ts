import { BaseEntity, Column, Entity, Index } from "typeorm";

// @Index("image_sizes_id_f583497b_like", ["id"], {})
// @Index("image_sizes_pkey", ["id"], { unique: true })
@Entity("image_sizes", { schema: "public" })
export class ImageSizes extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 150 })
  id?: string;

  @Column("character varying", { name: "code", length: 255 })
  code?: string;

  @Column("character varying", { name: "parent", length: 255 })
  parent?: string;

  @Column("character varying", { name: "type", length: 255 })
  type?: string;

  @Column("integer", { name: "height" })
  height?: number;

  @Column("integer", { name: "width" })
  width?: number;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt?: Date;

  @Column("timestamp with time zone", { name: "updated_at" })
  updatedAt?: Date;
}
