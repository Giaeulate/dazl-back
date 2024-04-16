import { BaseEntity, Column, Entity } from "typeorm";

@Entity("users", { schema: "dazl_db" })
export class Users extends BaseEntity {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("varchar", { name: "gender", length: 255 })
  gender: string;

  @Column("int", { name: "age" })
  age: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("int", { name: "popularity" })
  popularity: number;

  @Column("varchar", { name: "confirmation_code", length: 255 })
  confirmationCode: string;

  @Column("varchar", { name: "confirmation_time", nullable: true, length: 255 })
  confirmationTime: string | null;

  @Column("varchar", { name: "token_firebase", nullable: true, length: 255 })
  tokenFirebase: string | null;

  @Column("varchar", { name: "status", length: 255 })
  status: string;

  @Column("varchar", { name: "latitude", length: 255 })
  latitude: string;

  @Column("varchar", { name: "longitude", length: 255 })
  longitude: string;

  @Column("varchar", { name: "active_date", nullable: true, length: 255 })
  activeDate: string | null;

  @Column("varchar", { name: "expiration_date", nullable: true, length: 255 })
  expirationDate: string | null;

  @Column("varchar", { name: "facebook_url", length: 255 })
  facebookUrl: string;

  @Column("varchar", { name: "instagram_url", length: 255 })
  instagramUrl: string;

  @Column("varchar", { name: "whatsapp_url", length: 255 })
  whatsappUrl: string;

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

  @Column("int", { name: "active" })
  active: number;

  @Column("int", { name: "badge" })
  badge: number;

  @Column("varchar", { name: "email_confirmation_code", length: 255 })
  emailConfirmationCode: string;

  @Column("int", { name: "is_email_confirmed", default: () => "'1'" })
  isEmailConfirmed: number;

  @Column("int", { name: "is_blocked", default: () => "'0'" })
  isBlocked: number;

  @Column("int", { name: "blocked_user_id", nullable: true })
  blockedUserId: number | null;

  @Column("text", { name: "blocked_message", nullable: true })
  blockedMessage: string | null;

  isActiveEmail() {
    return this.isEmailConfirmed === 1;
  }

  activeUser() { return 1; }

  inactiveUser() { return 0; }


}
