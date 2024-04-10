import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Landings } from "./Landings";

// @Index("landing_blocks_id_1056c34d_like", ["id"], {})
// @Index("landing_blocks_pkey", ["id"], { unique: true })
// @Index("landing_blocks_parent_id_6f0f168a_like", ["parentId"], {})
// @Index("landing_blocks_parent_id_6f0f168a", ["parentId"], {})
@Entity("landing_blocks", { schema: "public" })
export class LandingBlocks extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 150 })
  id?: string;

  @Column("integer", { name: "order" })
  order?: number;

  @Column("text", { name: "content", nullable: true })
  content?: string | null;

  // column added
  @Column("character varying", { name: "content_type", length: 255 })
  content_type: string;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt?: Date;

  @Column("timestamp with time zone", { name: "updated_at" })
  updatedAt?: Date;

  @Column("boolean", { name: "status" })
  status?: boolean;

  @Column("character varying", { name: "parent_id", length: 150 })
  parentId?: string;

  @ManyToOne(() => Landings, (landings) => landings.landingBlocks)
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent?: Landings;
}
