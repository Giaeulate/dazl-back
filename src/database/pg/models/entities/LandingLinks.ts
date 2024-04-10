import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Landings } from "./Landings";

// @Index("landing_links_pkey", ["id"], { unique: true })
// @Index("landing_links_id_c82ee480_like", ["id"], {})
// @Index("landing_links_parent_id_684d5051", ["parentId"], {})
// @Index("landing_links_parent_id_684d5051_like", ["parentId"], {})
@Entity("landing_links", { schema: "public" })
export class LandingLinks extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 150 })
  id?: string;

  @Column("character varying", { name: "name", nullable: true, length: 150 })
  name?: string | null;

  @Column("integer", { name: "order" })
  order?: number;

  @Column("text", { name: "content", nullable: true })
  content?: string | null;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt?: Date;

  @Column("timestamp with time zone", { name: "updated_at" })
  updatedAt?: Date;

  @Column("boolean", { name: "status" })
  status?: boolean;

  @Column("character varying", { name: "parent_id", length: 150 })
  parentId?: string;

  @ManyToOne(() => Landings, (landings) => landings.landingLinks)
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent?: Landings;
}
