"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const ChannelId_1 = require("./ChannelId");
const ChannelName_1 = require("./ChannelName");
const ChannelThumb_1 = require("./ChannelThumb");
const ChannelDescription_1 = require("./ChannelDescription");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const ChannelActive_1 = require("./ChannelActive");
const ChannelStartTime_1 = require("./ChannelStartTime");
const ChannelSecondChance_1 = require("./ChannelSecondChance");
const ChannelCreatedDomainEvent_1 = require("./ChannelCreatedDomainEvent");
class Channel extends AggregateRoot_1.AggregateRoot {
    constructor(id, name, thumb, description, startTime, active) {
        super();
        this.id = id;
        this.name = name;
        this.thumb = thumb;
        this.description = description;
        this.active = active;
        this.startTime = startTime;
        this.secondChance = new ChannelSecondChance_1.ChannelSecondChance("neutral");
        this.createdAt = new CreatedAt_1.CreatedAt(new Date().toISOString());
        this.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
    isStillActive() {
        return this.active.value === 1;
    }
    getMissingTime() {
        const now = new Date().getTime();
        const startTime = new Date(Number(this.startTime.value)).getTime();
        const timeToExpire = startTime + 2100000;
        return Number(timeToExpire) - Number(now);
    }
    static create(plainData) {
        const channelFromPrimitives = Channel.fromPrimitives(plainData);
        const channel = new Channel(channelFromPrimitives.id, channelFromPrimitives.name, channelFromPrimitives.thumb, channelFromPrimitives.description, channelFromPrimitives.startTime, channelFromPrimitives.active);
        channel.record(new ChannelCreatedDomainEvent_1.ChannelCreatedDomainEvent({
            aggregateId: channel.id.value,
        }));
        return channel;
    }
    static fromPrimitives(plainData) {
        return new Channel(new ChannelId_1.ChannelId(plainData.id), new ChannelName_1.ChannelName(plainData.name), new ChannelThumb_1.ChannelThumb(plainData.thumb), new ChannelDescription_1.ChannelDescription(plainData.description), new ChannelStartTime_1.ChannelStartTime(plainData.startTime), new ChannelActive_1.ChannelActive(plainData.active));
    }
    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            thumb: this.thumb.value,
            description: this.description.value,
            startTime: this.startTime.value,
            active: this.active.value,
            secondChance: this.secondChance.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
    desactivate() {
        this.active = new ChannelActive_1.ChannelActive(0);
    }
}
exports.Channel = Channel;
//# sourceMappingURL=Channel.js.map