import { Column, Entity } from "typeorm";

@Entity("user_activations", { schema: "dazl_db" })
export class UserActivations {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "user_id", length: 255 })
  userId: string;

  @Column("varchar", { name: "file_image_id", length: 255 })
  fileImageId: string;

  @Column("varchar", { name: "details", length: 255 })
  details: string;

  @Column("varchar", { name: "time_added", length: 255 })
  timeAdded: string;

  @Column("int", { name: "active" })
  active: number;

  @Column("varchar", { name: "name", length: 255, default: () => "'-'" })
  name: string;

  @Column("int", { name: "male" })
  male: number;

  @Column("int", { name: "female" })
  female: number;

  @Column("varchar", { name: "active_date", length: 255 })
  activeDate: string;

  @Column("varchar", { name: "expiration_date", nullable: true, length: 255 })
  expirationDate: string | null;

  @Column("int", { name: "current_lives", nullable: true })
  currentLives: number | null;

  @Column("varchar", { name: "longitude", length: 255 })
  longitude: string;

  @Column("varchar", { name: "latitude", length: 255 })
  latitude: string;

  @Column("int", { name: "is_active_socket" })
  isActiveSocket: number;

  @Column("varchar", { name: "socket_id", length: 255 })
  socketId: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column("int", { name: "is_the_locator_activated" })
  isTheLocatorActivated: number;

  @Column("int", { name: "user_is_deleted" })
  userIsDeleted: number;

  @Column("int", { name: "age_lower_filter" })
  ageLowerFilter: number;

  @Column("int", { name: "age_upper_filter" })
  ageUpperFilter: number;

  @Column("int", { name: "distance_filter" })
  distanceFilter: number;

  @Column("int", { name: "lgtb" })
  lgtb: number;

  @Column("varchar", { name: "city_id", length: 255 })
  cityId: string;

  @Column("text", { name: "token" })
  token: string;

  isStillActive(): boolean {
    const expirationDate = Number(this.expirationDate);
    const currentDate = new Date().getTime();
    return expirationDate > currentDate;
  }
}
