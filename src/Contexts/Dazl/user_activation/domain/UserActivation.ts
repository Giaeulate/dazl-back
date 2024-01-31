import { UserId } from '../../users/domain/UserId';
import { UserActivationId } from './UserActivationId';
import { UserActivationDetails } from './UserActivationDetails';
import { UserActivationTimeAdded } from './UserActivationTimeAdded';
import { UserActivationActive } from './UserActivationActive';
import { UserActivationName } from './UserActivationName';
import { UserActivationMale } from './UserActivationMale';
import { UserActivationFemale } from './UserActivationFemale';
import { UserActivationActiveDate } from './UserActivationActiveDate';
import { UserActivationExpirationDate } from './UserActivationExpirationDate';
import { UserActivationLongitude } from './UserActivationLongitude';
import { UserActivationLatitude } from './UserActivationLatitude';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserActivationCreatedDomainEvent } from './UserActivationCreatedDomainEvent';
import { UserActivationSocketId } from './UserActivationSocketId';
import { FileId } from '../../file/domain/FileId';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UserActivationEntityDto } from './dto/indexDto';
import { UserActivationCurrentLives } from './UserActivationCurrentLives';
import { UserActivationIsActiveSocket } from './UserActivationIsActiveSocket';
import { IsBoolean } from '../../Shared/IsBoolean';
import { UserActivationDeactivatedDomainEvent } from './UserActivationDeactivatedDomainEvent';
import { UserActivationActivatedDomainEvent } from './UserActivationActivatedDomainEvent';
import { TimeActivation } from '../../../../apps/dazl/backend/config/TimeActivation';
import { UserActivationIsTheLocatorActivated } from './UserActivationIsTheLocatorActivated';
import { UserActivationUpdateLocatorDomainEvent } from './UserActivationUpdateLocatorDomainEvent';
import { UserActivationUserIsDeleted } from './UserActivationUserIsDeleted';
import { UserActivationAgeUpperFilter } from './UserActivationAgeUpperFilter';
import { UserActivationAgeLowerFilter } from './UserActivationAgeLowerFilter';
import { UserActivationDistanceFilter } from './UserActivationDistanceFilter';
import { UserActivationLgtb } from './UserActivationLgtb';
import { CityId } from '../../City/domain/CityId';
import { UserActivationToken } from './UserActivationToken';

export class UserActivation extends AggregateRoot {
  get distanceFilter(): UserActivationDistanceFilter {
    return this._distanceFilter;
  }

  set distanceFilter(value: UserActivationDistanceFilter) {
    this._distanceFilter = value;
  }

  get ageLowerFilter(): UserActivationAgeLowerFilter {
    return this._ageLowerFilter;
  }

  set ageLowerFilter(value: UserActivationAgeLowerFilter) {
    this._ageLowerFilter = value;
  }

  get ageUpperFilter(): UserActivationAgeUpperFilter {
    return this._ageUpperFilter;
  }

  set ageUpperFilter(value: UserActivationAgeUpperFilter) {
    this._ageUpperFilter = value;
  }

  get details(): UserActivationDetails {
    return this._details;
  }

  set details(value: UserActivationDetails) {
    this._details = value;
  }

  get isTheLocatorActivated(): UserActivationIsTheLocatorActivated {
    return this._isTheLocatorActivated;
  }

  set isTheLocatorActivated(value: UserActivationIsTheLocatorActivated) {
    this._isTheLocatorActivated = value;
  }

  set active(value: UserActivationActive) {
    this._active = value;
  }

  get active(): UserActivationActive {
    return this._active;
  }

  activeSession(): void {
    this._active = new UserActivationActive(1);
    this.record(
      new UserActivationActivatedDomainEvent({
        aggregateId: this.id.value,
        userId: this.userId.value,
      }),
    );
  }

  updateLocator(value: UserActivationIsTheLocatorActivated): void {
    this._isTheLocatorActivated = value;
    this.record(
      new UserActivationUpdateLocatorDomainEvent({
        aggregateId: this.id.value,
        socketId: this.socketId.value,
      }),
    );
  }

  changeDetails(value: UserActivationDetails): void {
    this._details = value;
  }

  id: UserActivationId;
  cityId: CityId;
  userId: UserId;
  fileImageId: FileId;
  private _details: UserActivationDetails;
  timeAdded: UserActivationTimeAdded;
  private _active: UserActivationActive;
  private _isTheLocatorActivated: UserActivationIsTheLocatorActivated;
  name: UserActivationName;
  male: UserActivationMale;
  lgtb: UserActivationLgtb;
  female: UserActivationFemale;
  activeDate: UserActivationActiveDate;
  expirationDate: UserActivationExpirationDate;
  currentLives: UserActivationCurrentLives;
  private _ageUpperFilter: UserActivationAgeUpperFilter;
  private _ageLowerFilter: UserActivationAgeLowerFilter;
  private _distanceFilter: UserActivationDistanceFilter;
  longitude: UserActivationLongitude;
  latitude: UserActivationLatitude;
  isActiveSocket: UserActivationIsActiveSocket;
  socketId: UserActivationSocketId;
  userIsDeleted: UserActivationUserIsDeleted;
  token: UserActivationToken;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;

  constructor(
    id: UserActivationId,
    cityId: CityId,
    userId: UserId,
    fileImageId: FileId,
    details: UserActivationDetails,
    name: UserActivationName,
    male: UserActivationMale,
    lgtb: UserActivationLgtb,
    female: UserActivationFemale,
    longitude: UserActivationLongitude,
    latitude: UserActivationLatitude,
    socketId: UserActivationSocketId,
    token: UserActivationToken,
  ) {
    super();
    this.id = id;
    this.cityId = cityId;
    this.userId = userId;
    this.fileImageId = fileImageId;
    this._details = details;
    this.timeAdded = new UserActivationTimeAdded(
      new Date().toISOString().slice(0, 19).replace('T', ' '),
    );
    this._isTheLocatorActivated = new UserActivationIsTheLocatorActivated(1);
    this._active = new UserActivationActive(IsBoolean.TRUE);
    this.name = name;
    this.male = male;
    this.female = female;
    this.lgtb = lgtb;
    this.activeDate = new UserActivationActiveDate(
      new Date().getTime().toString(),
    );
    this.expirationDate = new UserActivationExpirationDate(
      new Date(new Date().getTime() + TimeActivation.ACTIVATION_TIME)
        .getTime()
        .toString(),
    );
    this.currentLives = new UserActivationCurrentLives(3);
    this._ageUpperFilter = new UserActivationAgeUpperFilter(0);
    this._ageLowerFilter = new UserActivationAgeLowerFilter(0);
    this._distanceFilter = new UserActivationDistanceFilter(0);
    this.longitude = longitude;
    this.latitude = latitude;
    this.isActiveSocket = new UserActivationIsActiveSocket(IsBoolean.TRUE);
    this.socketId = socketId;
    this.userIsDeleted = UserActivationUserIsDeleted.available();
    this.token = token;
    this.createdAt = new CreatedAt(new Date().toISOString());
    this.updatedAt = new UpdatedAt(new Date().toISOString());
  }

  deactivate(): void {
    this._active = new UserActivationActive(0);
    this.record(
      new UserActivationDeactivatedDomainEvent({
        aggregateId: this.id.value,
        userId: this.userId.value,
      }),
    );
  }

  static create(plainData: {
    id: string;
    cityId: string;
    userId: string;
    fileImageId: string;
    details: string;
    name: string;
    male: boolean;
    female: boolean;
    lgtb: boolean;
    longitude: string;
    latitude: string;
    socketId: string;
    token: string;
  }): UserActivation {
    const userActivationFromPrimitives = this.fromPrimitives(plainData);
    const userActivation = new UserActivation(
      userActivationFromPrimitives.id,
      userActivationFromPrimitives.cityId,
      userActivationFromPrimitives.userId,
      userActivationFromPrimitives.fileImageId,
      userActivationFromPrimitives._details,
      userActivationFromPrimitives.name,
      userActivationFromPrimitives.male,
      userActivationFromPrimitives.lgtb,
      userActivationFromPrimitives.female,
      userActivationFromPrimitives.longitude,
      userActivationFromPrimitives.latitude,
      userActivationFromPrimitives.socketId,
      userActivationFromPrimitives.token,
    );
    userActivation.record(
      new UserActivationCreatedDomainEvent({
        aggregateId: userActivation.id.value,
        socketId: userActivation.socketId.value,
      }),
    );
    return userActivation;
  }

  addExpirationDate(addedTime: UserActivationExpirationDate): void {
    const expirationDate = Number(this.expirationDate.value);
    const addedTimeNumber = Number(addedTime.value);
    const newExpirationDate = expirationDate + addedTimeNumber;
    this.expirationDate = new UserActivationExpirationDate(
      newExpirationDate.toString(),
    );
  }

  isSocketActive(): boolean {
    return this.isActiveSocket.value === IsBoolean.TRUE;
  }

  isActivated(): boolean {
    return this.active.value === IsBoolean.TRUE;
  }

  isDeactivated(): boolean {
    return this.active.value === IsBoolean.FALSE;
  }

  isStillActive(): boolean {
    const expirationDate = Number(this.expirationDate.value);
    const currentDate = new Date().getTime();
    return expirationDate > currentDate;
  }

  userDeleted(): void {
    this.userIsDeleted = UserActivationUserIsDeleted.deleted();
  }

  static fromPrimitives(plainData: {
    id: string;
    cityId: string;
    userId: string;
    fileImageId: string;
    details: string;
    name: string;
    male: boolean;
    female: boolean;
    lgtb: boolean;
    longitude: string;
    latitude: string;
    socketId: string;
    token: string;
  }): UserActivation {
    return new UserActivation(
      new UserActivationId(plainData.id),
      new CityId(plainData.cityId),
      new UserId(plainData.userId),
      new FileId(plainData.fileImageId),
      new UserActivationDetails(plainData.details),
      new UserActivationName(plainData.name),
      new UserActivationMale(plainData.male ? 1 : 0),
      new UserActivationLgtb(plainData.lgtb ? 1 : 0),
      new UserActivationFemale(plainData.female ? 1 : 0),
      new UserActivationLongitude(plainData.longitude),
      new UserActivationLatitude(plainData.latitude),
      new UserActivationSocketId(plainData.socketId),
      new UserActivationToken(plainData.token),
    );
  }

  toPrimitives(): UserActivationEntityDto {
    return new UserActivationEntityDto(
      this.userId?.value,
      this.id?.value,
      this._details?.value,
      this.fileImageId?.value,
      this.timeAdded?.value,
      this._active?.value,
      this.name?.value,
      this.male?.value,
      this.female?.value,
      this.activeDate?.value,
      this.expirationDate?.value,
      this.isActiveSocket?.value,
      this.currentLives?.value,
      this.longitude?.value,
      this.latitude?.value,
      this.socketId?.value,
      this.createdAt?.value,
      this.updatedAt?.value,
    );
  }

  updateLatLng(params: {
    longitude: UserActivationLongitude;
    latitude: UserActivationLatitude;
  }): void {
    this.longitude = params.longitude;
    this.latitude = params.latitude;
    this.updatedAt = new UpdatedAt(new Date().toISOString());
  }

  takeLives() {
    this.currentLives = new UserActivationCurrentLives(0);
    this.updatedAt = new UpdatedAt(new Date().toISOString());
  }

  restartLive() {
    const expirationDateNumber = Number(this.expirationDate.value);
    const nowDateNumber = new Date().getTime();

    // Calcular la diferencia en milisegundos
    const diferenciaEnMilisegundos: number =
      expirationDateNumber - nowDateNumber;

    // Convertir la diferencia en minutos
    const diferenciaEnMinutos: number = diferenciaEnMilisegundos / (1000 * 60);

    // Convertir la diferencia en horas y minutos
    const horasDeDiferencia: number = Math.floor(diferenciaEnMinutos / 60);
    const minutosRestantes: number = Math.round(diferenciaEnMinutos % 60);

    if (horasDeDiferencia % 2 === 0 && minutosRestantes == 0) {
      this.currentLives = new UserActivationCurrentLives(3);
    }
  }

  updateConfig(
    male: UserActivationMale,
    female: UserActivationFemale,
    lgtb: UserActivationLgtb,
  ) {
    this.male = male;
    this.female = female;
    this.lgtb = lgtb;
    this.updatedAt = new UpdatedAt(new Date().toISOString());
  }
}
