import { Column, Entity } from "typeorm";

@Entity("user_photos", { schema: "dazl_db" })
export class UserPhotos {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "user_id", length: 255 })
  userId: string;

  @Column("varchar", { name: "photo", length: 255 })
  photo: string;

  @Column("tinyint", { name: "active" })
  active: number;

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
