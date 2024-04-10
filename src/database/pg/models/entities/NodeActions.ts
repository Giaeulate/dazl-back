import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Nodes } from "./Nodes";

// @Index("node_actions_pkey", ["id"], { unique: true })
// @Index("node_actions_id_b16ccd77_like", ["id"], {})
// @Index("node_actions_parent_id_b325a0a9", ["parentId"], {})
// @Index("node_actions_parent_id_b325a0a9_like", ["parentId"], {})
@Entity("node_actions", { schema: "public" })
export class NodeActions extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 150 })
  id?: string;

  @Column("character varying", { name: "name", length: 255 })
  name?: string;

  @Column("character varying", { name: "data_type", length: 255 })
  dataType?: string;

  @Column("character varying", { name: "view_type", length: 255 })
  viewType?: string;

  @Column("jsonb", { name: "data" })
  data?: object;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt?: Date;

  @Column("timestamp with time zone", { name: "updated_at" })
  updatedAt?: Date;

  @Column("character varying", { name: "type", length: 255 })
  type?: string;

  @Column("integer", { name: "active" })
  active?: number;

  @Column("character varying", { name: "parent_id", length: 150 })
  parentId?: string;

  @ManyToOne(() => Nodes, (nodes) => nodes.nodeActions)
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent?: Nodes;
}
