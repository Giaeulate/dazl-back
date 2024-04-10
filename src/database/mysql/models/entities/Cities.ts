import { Column, Entity } from "typeorm";

@Entity("cities", { schema: "dazl_db" })
export class Cities {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "latitude", length: 255 })
  latitude: string;

  @Column("varchar", { name: "longitude", length: 255 })
  longitude: string;

  @Column("varchar", { name: "created_at", length: 255 })
  createdAt: string;

  @Column("varchar", { name: "updated_at", length: 255 })
  updatedAt: string;

  @Column("varchar", { name: "country_id", length: 255 })
  countryId: string;

  @Column("varchar", { name: "map", nullable: true, length: 255 })
  map: string | null;
}
