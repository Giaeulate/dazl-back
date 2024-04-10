import { BaseEntity, Column, Entity, Index, OneToMany } from "typeorm";
import { Fields } from "./Fields";
import { Filters } from "./Filters";
import { NodeActions } from "./NodeActions";

// @Index("nodes_pkey", ["id"], { unique: true })
// @Index("nodes_id_d0dba2bd_like", ["id"], {})
@Entity("nodes", { schema: "public" })
export class Nodes extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 150 })
  id?: string;

  @Column("character varying", { name: "name", length: 255 })
  name?: string;

  @Column("character varying", { name: "table_name", length: 255 })
  tableName?: string;

  @Column("character varying", { name: "type", length: 255 })
  type?: string;

  @Column("character varying", { name: "singular", length: 255 })
  singular?: string;

  @Column("character varying", { name: "plural", length: 255 })
  plural?: string;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt?: Date;

  @Column("timestamp with time zone", { name: "updated_at" })
  updatedAt?: Date;

  @OneToMany(() => Fields, (fields) => fields.parent)
  fields?: Fields[];

  @OneToMany(() => Filters, (filters) => filters.parent)
  filters?: Filters[];

  @OneToMany(() => NodeActions, (nodeActions) => nodeActions.parent)
  nodeActions?: NodeActions[];
}
