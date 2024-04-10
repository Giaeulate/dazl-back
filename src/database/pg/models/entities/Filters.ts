import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Nodes } from "./Nodes";

// @Index("filters_pkey", ["id"], { unique: true })
// @Index("filters_id_4ccb474a_like", ["id"], {})
// @Index("filters_parent_id_600eec8a_like", ["parentId"], {})
// @Index("filters_parent_id_600eec8a", ["parentId"], {})
@Entity("filters", { schema: "public" })
export class Filters extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 150 })
  id?: string;

  @Column("character varying", { name: "field_id", length: 255 })
  fieldId?: string;

  @Column("character varying", { name: "operator", length: 255 })
  operator?: string;

  @Column("character varying", { name: "field", length: 255 })
  field?: string;

  @Column("integer", { name: "order" })
  order?: number;

  @Column("character varying", { name: "value", length: 255 })
  value?: string;

  @Column("character varying", { name: "user_id", length: 255 })
  userId?: string;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt?: Date;

  @Column("timestamp with time zone", { name: "updated_at" })
  updatedAt?: Date;

  @Column("character varying", { name: "type", length: 255 })
  type?: string;

  @Column("character varying", { name: "parent_id", length: 150 })
  parentId?: string;

  @ManyToOne(() => Nodes, (nodes) => nodes.filters)
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent?: Nodes;
}
