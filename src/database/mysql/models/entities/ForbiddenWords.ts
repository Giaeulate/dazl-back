import { Column, Entity } from "typeorm";

@Entity("forbidden_words", { schema: "dazl_db" })
export class ForbiddenWords {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "text", length: 255 })
  text: string;

  @Column("varchar", { name: "created_at", length: 255 })
  createdAt: string;

  @Column("varchar", { name: "updated_at", length: 255 })
  updatedAt: string;
}
