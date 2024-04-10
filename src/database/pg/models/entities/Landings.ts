import { BaseEntity, Column, Entity, Index, OneToMany } from "typeorm";
import { LandingBlocks } from "./LandingBlocks";
import { LandingLinks } from "./LandingLinks";

// @Index("landings_id_aaa95f19_like", ["id"], {})
// @Index("landings_pkey", ["id"], { unique: true })
@Entity("landings", { schema: "public" })
export class Landings extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 150 })
  id?: string;

  @Column("character varying", { name: "name", nullable: true, length: 150 })
  name?: string | null;

  // @Column("character varying", { name: "slug", nullable: true, length: 150 })
  @Column("text", { name: "slug", nullable: true })
  slug?: string | null;

  @Column("text", { name: "summary", nullable: true })
  summary?: string | null;

  @Column("text", { name: "description", nullable: true })
  description?: string | null;

  @Column("character varying", {
    name: "banner_image",
    nullable: true,
    length: 200,
  })
  bannerImage?: string | null;

  @Column("character varying", {
    name: "meta_title",
    nullable: true,
    length: 150,
  })
  metaTitle?: string | null;

  @Column("character varying", {
    name: "meta_description",
    nullable: true,
    length: 150,
  })
  metaDescription?: string | null;

  @Column("character varying", {
    name: "meta_image",
    nullable: true,
    length: 150,
  })
  metaImage?: string | null;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt?: Date;

  @Column("timestamp with time zone", { name: "updated_at" })
  updatedAt?: Date;

  @Column("boolean", { name: "status" })
  status?: boolean;

  @OneToMany(() => LandingBlocks, (landingBlocks) => landingBlocks.parent)
  landingBlocks?: LandingBlocks[];

  @OneToMany(() => LandingLinks, (landingLinks) => landingLinks.parent)
  landingLinks?: LandingLinks[];
}
