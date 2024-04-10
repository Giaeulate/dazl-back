import { Column, Entity } from "typeorm";

@Entity("events", { schema: "dazl_db" })
export class Events {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("text", { name: "address" })
  address: string;

  @Column("varchar", { name: "city_id", length: 255 })
  cityId: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("varchar", { name: "latitude", length: 255 })
  latitude: string;

  @Column("varchar", { name: "longitude", length: 255 })
  longitude: string;

  @Column("int", { name: "price", nullable: true })
  price: number | null;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("timestamp", { name: "start_at", default: () => "CURRENT_TIMESTAMP" })
  startAt: Date;

  @Column("timestamp", {
    name: "end_at",
    default: () => "'0000-00-00 00:00:00'",
  })
  endAt: Date;

  @Column("timestamp", {
    name: "created_at",
    default: () => "'0000-00-00 00:00:00'",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "'0000-00-00 00:00:00'",
  })
  updatedAt: Date;

  @Column("varchar", { name: "status", length: 255 })
  status: string;

  @Column("varchar", { name: "category_id", nullable: true, length: 255 })
  categoryId: string | null;

  @Column("varchar", { name: "contact_phone", nullable: true, length: 255 })
  contactPhone: string | null;

  @Column("tinyint", { name: "free", nullable: true })
  free: number | null;

  @Column("varchar", { name: "facebook_url", nullable: true, length: 255 })
  facebookUrl: string | null;

  @Column("varchar", { name: "instagram_url", nullable: true, length: 255 })
  instagramUrl: string | null;

  @Column("varchar", { name: "payment_url", nullable: true, length: 255 })
  paymentUrl: string | null;

  @Column("varchar", { name: "map", nullable: true, length: 255 })
  map: string | null;

  @Column("varchar", { name: "whatsapp_url", nullable: true, length: 255 })
  whatsappUrl: string | null;

  @Column("varchar", { name: "website", nullable: true, length: 255 })
  website: string | null;

  @Column("text", { name: "image_banner_horizontal", nullable: true })
  imageBannerHorizontal: string | null;

  @Column("text", { name: "image_banner_vertical" })
  imageBannerVertical: string;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("date", { name: "start_at_date", nullable: true })
  startAtDate: string | null;

  @Column("time", { name: "start_at_time", nullable: true })
  startAtTime: string | null;

  @Column("date", { name: "end_at_date", nullable: true })
  endAtDate: string | null;

  @Column("time", { name: "end_at_time", nullable: true })
  endAtTime: string | null;

  @Column("varchar", {
    name: "image_banner_horizontal_pivot",
    nullable: true,
    length: 255,
  })
  imageBannerHorizontalPivot: string | null;

  @Column("varchar", {
    name: "image_banner_vertical_pivot",
    nullable: true,
    length: 255,
  })
  imageBannerVerticalPivot: string | null;

  @Column("text", { name: "sales_description", nullable: true })
  salesDescription: string | null;

  @Column("tinyint", { name: "is_paid", nullable: true, width: 1 })
  isPaid: boolean | null;
}
