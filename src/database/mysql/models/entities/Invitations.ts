import { Column, Entity } from "typeorm";

@Entity("invitations", { schema: "dazl_db" })
export class Invitations {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "user_activation_to_id", length: 255 })
  userActivationToId: string;

  @Column("varchar", { name: "user_activation_from_id", length: 255 })
  userActivationFromId: string;

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
