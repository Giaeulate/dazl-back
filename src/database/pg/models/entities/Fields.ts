import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Nodes } from "./Nodes";

// @Index("fields_pkey", ["id"], { unique: true })
// @Index("fields_id_9b17d68b_like", ["id"], {})
// @Index("fields_parent_id_36549e58_like", ["parentId"], {})
// @Index("fields_parent_id_36549e58", ["parentId"], {})
@Entity("fields", { schema: "public" })
export class Fields extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 150 })
  id?: string;

  @Column("character varying", { name: "name", length: 255 })
  name?: string;

  @Column("character varying", { name: "label", length: 255 })
  label?: string;

  @Column("character varying", { name: "type", length: 255 })
  type?: string;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt?: Date;

  @Column("timestamp with time zone", { name: "updated_at" })
  updatedAt?: Date;

  @Column("integer", { name: "form" })
  form?: number;

  @Column("integer", { name: "show_list" })
  showList?: number;

  @Column("integer", { name: "show_excel" })
  showExcel?: number;

  @Column("integer", { name: "relation" })
  relation?: number;

  @Column("character varying", { name: "placeholder", length: 255 })
  placeholder?: string;

  @Column("character varying", { name: "name_domain", length: 255 })
  nameDomain?: string;

  @Column("integer", { name: "order" })
  order?: number;

  @Column("character varying", { name: "type_filter", length: 255 })
  typeFilter?: string;

  @Column("character varying", { name: "parent_id", length: 150 })
  parentId?: string;

  @ManyToOne(() => Nodes, (nodes) => nodes.fields)
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent?: Nodes;
}
