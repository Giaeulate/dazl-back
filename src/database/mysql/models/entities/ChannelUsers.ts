import { Column, Entity } from "typeorm";

@Entity("channel_users", { schema: "dazl_db" })
export class ChannelUsers {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "channel_id", length: 255 })
  channelId: string;

  @Column("varchar", { name: "user_activation_id", length: 255 })
  userActivationId: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "'0000-00-00 00:00:00'",
  })
  updatedAt: Date;

  @Column("varchar", { name: "someone_invited_me", length: 255 })
  someoneInvitedMe: string;

  @Column("int", { name: "i_invited" })
  iInvited: number;

  @Column("int", { name: "hide" })
  hide: number;
}
