import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Activity = {
  __typename?: 'Activity';
  crag?: Maybe<Crag>;
  date: Scalars['DateTime']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  iceFall?: Maybe<IceFall>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  partners?: Maybe<Scalars['String']['output']>;
  peak?: Maybe<Peak>;
  routes: Array<ActivityRoute>;
  type: Scalars['String']['output'];
  user: User;
};


export type ActivityRoutesArgs = {
  input?: InputMaybe<FindActivityRoutesInput>;
};

export type ActivityRoute = {
  __typename?: 'ActivityRoute';
  activity?: Maybe<Activity>;
  ascentType: AscentType;
  date?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  orderScore: Scalars['Float']['output'];
  partner?: Maybe<Scalars['String']['output']>;
  pitch?: Maybe<Pitch>;
  publish: PublishType;
  rankingScore: Scalars['Float']['output'];
  route: Route;
  routeId: Scalars['String']['output'];
  user: User;
};

export type Area = {
  __typename?: 'Area';
  area?: Maybe<Area>;
  areas: Array<Area>;
  country: Country;
  crags: Array<Crag>;
  description?: Maybe<Scalars['String']['output']>;
  iceFalls: Array<IceFall>;
  id: Scalars['String']['output'];
  images: Array<Image>;
  name: Scalars['String']['output'];
  nrCrags: Scalars['Int']['output'];
  peaks: Array<Peak>;
  slug: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export enum AscentType {
  Aid = 'aid',
  Allfree = 'allfree',
  Attempt = 'attempt',
  Flash = 'flash',
  Onsight = 'onsight',
  Redpoint = 'redpoint',
  Repeat = 'repeat',
  TAid = 't_aid',
  TAllfree = 't_allfree',
  TAttempt = 't_attempt',
  TFlash = 't_flash',
  TOnsight = 't_onsight',
  TRedpoint = 't_redpoint',
  TRepeat = 't_repeat',
  Tick = 'tick'
}

export type Club = {
  __typename?: 'Club';
  created: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  members: Array<ClubMember>;
  name: Scalars['String']['output'];
  nrMembers: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type ClubMember = {
  __typename?: 'ClubMember';
  admin: Scalars['Boolean']['output'];
  club: Club;
  created: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  legacy: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  content?: Maybe<Scalars['String']['output']>;
  crag?: Maybe<Crag>;
  created: Scalars['DateTime']['output'];
  exposedUntil?: Maybe<Scalars['DateTime']['output']>;
  iceFall: IceFall;
  id: Scalars['String']['output'];
  images: Array<Image>;
  peak: Peak;
  route?: Maybe<Route>;
  type: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type ConfirmInput = {
  id: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Contribution = {
  __typename?: 'Contribution';
  crag?: Maybe<Crag>;
  created: Scalars['DateTime']['output'];
  entity: Scalars['String']['output'];
  id: Scalars['String']['output'];
  publishStatus: Scalars['String']['output'];
  route?: Maybe<Route>;
  sector?: Maybe<Sector>;
  user?: Maybe<User>;
};

export type Country = {
  __typename?: 'Country';
  areas: Array<Area>;
  code: Scalars['String']['output'];
  crags: Array<Crag>;
  iceFalls: Array<IceFall>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nrCrags: Scalars['Int']['output'];
  nrIceFalls: Scalars['Float']['output'];
  nrPeaks: Scalars['Float']['output'];
  peaks: Array<Peak>;
  slug: Scalars['String']['output'];
};


export type CountryAreasArgs = {
  hasCrags?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CountryCragsArgs = {
  input?: InputMaybe<FindCragsInput>;
};


export type CountryIceFallsArgs = {
  areaSlug?: InputMaybe<Scalars['String']['input']>;
};


export type CountryPeaksArgs = {
  areaSlug?: InputMaybe<Scalars['String']['input']>;
};

export type Crag = {
  __typename?: 'Crag';
  access?: Maybe<Scalars['String']['output']>;
  activityByMonth: Array<Scalars['Int']['output']>;
  approachTime?: Maybe<Scalars['Int']['output']>;
  area?: Maybe<Area>;
  comments: Array<Comment>;
  country: Country;
  coverImage?: Maybe<Image>;
  created: Scalars['DateTime']['output'];
  defaultGradingSystem?: Maybe<GradingSystem>;
  description?: Maybe<Scalars['String']['output']>;
  hasBoulder: Scalars['Boolean']['output'];
  hasMultipitch: Scalars['Boolean']['output'];
  hasSport: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  images: Array<Image>;
  isHidden: Scalars['Boolean']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  maxDifficulty?: Maybe<Scalars['Float']['output']>;
  minDifficulty?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  nrRoutes: Scalars['Int']['output'];
  nrRoutesByGrade?: Maybe<Scalars['JSON']['output']>;
  orientation?: Maybe<Scalars['String']['output']>;
  orientations?: Maybe<Array<Orientation>>;
  peak?: Maybe<Peak>;
  properties: Array<CragProperty>;
  publishStatus: Scalars['String']['output'];
  rainproof?: Maybe<Scalars['Boolean']['output']>;
  routes: Array<Route>;
  seasons?: Maybe<Array<Season>>;
  sectors: Array<Sector>;
  slug: Scalars['String']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
  user?: Maybe<User>;
  wallAngles?: Maybe<Array<WallAngle>>;
};

export type CragProperty = {
  __typename?: 'CragProperty';
  author?: Maybe<Scalars['String']['output']>;
  crag: Crag;
  id: Scalars['String']['output'];
  numValue?: Maybe<Scalars['Float']['output']>;
  propertyType: PropertyType;
  stringValue?: Maybe<Scalars['String']['output']>;
  textValue?: Maybe<Scalars['String']['output']>;
};

export type CreateActivityInput = {
  cragId?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['DateTime']['input'];
  duration?: InputMaybe<Scalars['Int']['input']>;
  iceFallId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  partners?: InputMaybe<Scalars['String']['input']>;
  peakId?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type CreateActivityRouteInput = {
  ascentType: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  partner?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  publish: Scalars['String']['input'];
  routeId: Scalars['String']['input'];
  votedDifficulty?: InputMaybe<Scalars['Float']['input']>;
  votedStarRating?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateAreaInput = {
  countryId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateClubInput = {
  name: Scalars['String']['input'];
};

export type CreateClubMemberByEmailInput = {
  admin: Scalars['Boolean']['input'];
  clubId: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type CreateClubMemberInput = {
  admin: Scalars['Boolean']['input'];
  clubId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  cragId?: InputMaybe<Scalars['String']['input']>;
  exposedUntil?: InputMaybe<Scalars['DateTime']['input']>;
  iceFallId?: InputMaybe<Scalars['String']['input']>;
  peakId?: InputMaybe<Scalars['String']['input']>;
  routeId?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type CreateCountryInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateCragInput = {
  access?: InputMaybe<Scalars['String']['input']>;
  approachTime?: InputMaybe<Scalars['Int']['input']>;
  areaId?: InputMaybe<Scalars['String']['input']>;
  countryId: Scalars['String']['input'];
  coverImageId?: InputMaybe<Scalars['String']['input']>;
  defaultGradingSystemId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isHidden: Scalars['Boolean']['input'];
  lat?: InputMaybe<Scalars['Float']['input']>;
  lon?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  orientation?: InputMaybe<Scalars['String']['input']>;
  orientations?: InputMaybe<Array<Orientation>>;
  publishStatus: Scalars['String']['input'];
  rainproof?: InputMaybe<Scalars['Boolean']['input']>;
  seasons?: InputMaybe<Array<Season>>;
  type: Scalars['String']['input'];
  wallAngles?: InputMaybe<Array<WallAngle>>;
};

export type CreateRouteInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  baseDifficulty?: InputMaybe<Scalars['Float']['input']>;
  defaultGradingSystemId: Scalars['String']['input'];
  isProject: Scalars['Boolean']['input'];
  length?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
  publishStatus: Scalars['String']['input'];
  routeTypeId: Scalars['String']['input'];
  sectorId: Scalars['String']['input'];
};

export type CreateSectorInput = {
  cragId: Scalars['String']['input'];
  label: Scalars['String']['input'];
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
  publishStatus: Scalars['String']['input'];
};

export type DifficultyVote = {
  __typename?: 'DifficultyVote';
  created: Scalars['DateTime']['output'];
  difficulty: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  includedInCalculation: Scalars['Boolean']['output'];
  isBase: Scalars['Boolean']['output'];
  route: Route;
  updated: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type FindActivitiesInput = {
  activityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  cragId?: InputMaybe<Scalars['String']['input']>;
  dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  dateTo?: InputMaybe<Scalars['DateTime']['input']>;
  hasRoutesWithPublish?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<OrderByInput>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Array<Scalars['String']['input']>>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type FindActivityRoutesInput = {
  activityId?: InputMaybe<Scalars['String']['input']>;
  ascentType?: InputMaybe<Array<Scalars['String']['input']>>;
  clubId?: InputMaybe<Scalars['String']['input']>;
  cragId?: InputMaybe<Scalars['String']['input']>;
  dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  dateTo?: InputMaybe<Scalars['DateTime']['input']>;
  orderBy?: InputMaybe<OrderByInput>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  publish?: InputMaybe<Array<Scalars['String']['input']>>;
  routeId?: InputMaybe<Scalars['String']['input']>;
  routeTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type FindContributionsInput = {
  orderBy?: InputMaybe<OrderByInput>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type FindCountriesInput = {
  hasCrags?: InputMaybe<Scalars['Boolean']['input']>;
  hasIceFalls?: InputMaybe<Scalars['Boolean']['input']>;
  hasPeaks?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: OrderByInput;
};

export type FindCragsInput = {
  allowEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  area?: InputMaybe<Scalars['String']['input']>;
  areaSlug?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  peakId?: InputMaybe<Scalars['String']['input']>;
  routeTypeId?: InputMaybe<Scalars['String']['input']>;
  showPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type FindCragsServiceInput = {
  allowEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  area?: InputMaybe<Scalars['String']['input']>;
  areaSlug?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  peakId?: InputMaybe<Scalars['String']['input']>;
  routeTypeId?: InputMaybe<Scalars['String']['input']>;
  showPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type FindDifficultyVotesInput = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type FindRoutesTouchesInput = {
  before: Scalars['DateTime']['input'];
  routeIds: Array<Scalars['String']['input']>;
};

export type FindStarRatingVotesInput = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Grade = {
  __typename?: 'Grade';
  difficulty: Scalars['Float']['output'];
  gradingSystem: GradingSystem;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GradingSystem = {
  __typename?: 'GradingSystem';
  grades: Array<Grade>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  routeTypes: Array<RouteType>;
};

export type IceFall = {
  __typename?: 'IceFall';
  area?: Maybe<Area>;
  comments: Array<Comment>;
  country: Country;
  defaultGradingSystem?: Maybe<GradingSystem>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['Float']['output']>;
  grade: Scalars['String']['output'];
  height: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  images: Array<Image>;
  name: Scalars['String']['output'];
  properties: Array<IceFallProperty>;
  slug: Scalars['String']['output'];
};

export type IceFallProperty = {
  __typename?: 'IceFallProperty';
  author?: Maybe<Scalars['String']['output']>;
  iceFall: IceFall;
  id: Scalars['String']['output'];
  numValue?: Maybe<Scalars['Float']['output']>;
  propertyType: PropertyType;
  stringValue?: Maybe<Scalars['String']['output']>;
  textValue?: Maybe<Scalars['String']['output']>;
};

export type Image = {
  __typename?: 'Image';
  area?: Maybe<Area>;
  aspectRatio: Scalars['Float']['output'];
  author?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Comment>;
  crag?: Maybe<Crag>;
  description?: Maybe<Scalars['String']['output']>;
  extension: Scalars['String']['output'];
  iceFall?: Maybe<IceFall>;
  id: Scalars['String']['output'];
  maxIntrinsicWidth: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  peak?: Maybe<Peak>;
  route?: Maybe<Route>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type LatestCommentsInput = {
  pageNumber?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
};

export type LatestDifficultyVotesInput = {
  cragId?: InputMaybe<Scalars['String']['input']>;
  forUserId?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  routeId?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type MergeRoutesInput = {
  sourceRouteId: Scalars['String']['input'];
  targetRouteId: Scalars['String']['input'];
};

export type MoveRouteToSectorInput = {
  id: Scalars['String']['input'];
  primaryRoute?: InputMaybe<Scalars['String']['input']>;
  sectorId: Scalars['String']['input'];
  targetRouteId?: InputMaybe<Scalars['String']['input']>;
};

export type MoveRoutesToSectorInput = {
  ids: Array<Scalars['String']['input']>;
  sectorId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirm: Scalars['Boolean']['output'];
  confirmClubMembership: Club;
  createActivity: Activity;
  createActivityRoutes: Array<ActivityRoute>;
  createArea: Area;
  createClub: Club;
  createClubMember: ClubMember;
  createClubMemberByEmail: ClubMember;
  createComment: Comment;
  createCountry: Country;
  createCrag: Crag;
  createRoute: Route;
  createSector: Sector;
  deleteActivity: Scalars['Boolean']['output'];
  deleteActivityRoute: Scalars['Boolean']['output'];
  deleteArea: Scalars['Boolean']['output'];
  deleteClub: Scalars['Boolean']['output'];
  deleteClubMember: Scalars['Boolean']['output'];
  deleteComment: Scalars['Boolean']['output'];
  deleteCountry: Scalars['Boolean']['output'];
  deleteCrag: Scalars['Boolean']['output'];
  deleteImage: Scalars['Boolean']['output'];
  deleteRoute: Scalars['Boolean']['output'];
  deleteRoutes: Array<Scalars['Boolean']['output']>;
  deleteSector: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: LoginResponse;
  mergeAllSectors: Scalars['Boolean']['output'];
  mergeRoutes: Scalars['Boolean']['output'];
  moveRouteToSector: Scalars['Boolean']['output'];
  moveRoutesToSector: Scalars['Boolean']['output'];
  moveSectorToCrag: Scalars['Boolean']['output'];
  processAllCrags: Scalars['Boolean']['output'];
  recover: Scalars['Boolean']['output'];
  register: Scalars['Boolean']['output'];
  setPassword: Scalars['Boolean']['output'];
  updateActivity: Activity;
  updateActivityRoute: ActivityRoute;
  updateArea: Area;
  updateClub: Club;
  updateComment: Comment;
  updateCountry: Country;
  updateCrag: Crag;
  updateRoute: Route;
  updateRoutes: Array<Route>;
  updateSector: Sector;
  updateSectors: Array<Sector>;
  updateUser: User;
};


export type MutationConfirmArgs = {
  input: ConfirmInput;
};


export type MutationConfirmClubMembershipArgs = {
  input: ConfirmInput;
};


export type MutationCreateActivityArgs = {
  input: CreateActivityInput;
  routes: Array<CreateActivityRouteInput>;
};


export type MutationCreateActivityRoutesArgs = {
  routes: Array<CreateActivityRouteInput>;
};


export type MutationCreateAreaArgs = {
  input: CreateAreaInput;
};


export type MutationCreateClubArgs = {
  createClubInput: CreateClubInput;
};


export type MutationCreateClubMemberArgs = {
  input: CreateClubMemberInput;
};


export type MutationCreateClubMemberByEmailArgs = {
  input: CreateClubMemberByEmailInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateCountryArgs = {
  input: CreateCountryInput;
};


export type MutationCreateCragArgs = {
  input: CreateCragInput;
};


export type MutationCreateRouteArgs = {
  input: CreateRouteInput;
};


export type MutationCreateSectorArgs = {
  input: CreateSectorInput;
};


export type MutationDeleteActivityArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteActivityRouteArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteAreaArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteClubArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteClubMemberArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCountryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCragArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteRouteArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteRoutesArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationDeleteSectorArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMergeAllSectorsArgs = {
  cragId: Scalars['String']['input'];
};


export type MutationMergeRoutesArgs = {
  input: MergeRoutesInput;
};


export type MutationMoveRouteToSectorArgs = {
  input: MoveRouteToSectorInput;
};


export type MutationMoveRoutesToSectorArgs = {
  input: MoveRoutesToSectorInput;
};


export type MutationMoveSectorToCragArgs = {
  cragId: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationRecoverArgs = {
  email: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationSetPasswordArgs = {
  input: PasswordInput;
};


export type MutationUpdateActivityArgs = {
  input: UpdateActivityInput;
  routes: Array<CreateActivityRouteInput>;
};


export type MutationUpdateActivityRouteArgs = {
  input: UpdateActivityRouteInput;
};


export type MutationUpdateAreaArgs = {
  input: UpdateAreaInput;
};


export type MutationUpdateClubArgs = {
  updateClubInput: UpdateClubInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdateCountryArgs = {
  input: UpdateCountryInput;
};


export type MutationUpdateCragArgs = {
  input: UpdateCragInput;
};


export type MutationUpdateRouteArgs = {
  input: UpdateRouteInput;
};


export type MutationUpdateRoutesArgs = {
  input: Array<UpdateRouteInput>;
};


export type MutationUpdateSectorArgs = {
  input: UpdateSectorInput;
};


export type MutationUpdateSectorsArgs = {
  input: Array<UpdateSectorInput>;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type OrderByInput = {
  direction?: InputMaybe<Scalars['String']['input']>;
  field: Scalars['String']['input'];
};

export enum Orientation {
  East = 'east',
  North = 'north',
  Northeast = 'northeast',
  Northwest = 'northwest',
  South = 'south',
  Southeast = 'southeast',
  Southwest = 'southwest',
  West = 'west'
}

export type PaginatedActivities = {
  __typename?: 'PaginatedActivities';
  items: Array<Activity>;
  meta: PaginationMeta;
};

export type PaginatedActivityRoutes = {
  __typename?: 'PaginatedActivityRoutes';
  items: Array<ActivityRoute>;
  meta: PaginationMeta;
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  items: Array<Comment>;
  meta: PaginationMeta;
};

export type PaginatedDifficultyVotes = {
  __typename?: 'PaginatedDifficultyVotes';
  items: Array<DifficultyVote>;
  meta: PaginationMeta;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  itemCount: Scalars['Float']['output'];
  pageCount: Scalars['Float']['output'];
  pageNumber: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
};

export type Parking = {
  __typename?: 'Parking';
  id: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  lon: Scalars['Float']['output'];
};

export type PasswordInput = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Peak = {
  __typename?: 'Peak';
  area?: Maybe<Area>;
  comments: Array<Comment>;
  country: Country;
  crags: Array<Crag>;
  description?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  images: Array<Image>;
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  nrCrags: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
};


export type PeakCragsArgs = {
  input?: InputMaybe<FindCragsServiceInput>;
};

export type Pitch = {
  __typename?: 'Pitch';
  difficulty?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  isProject: Scalars['Boolean']['output'];
  number: Scalars['Float']['output'];
  route: Route;
  user?: Maybe<User>;
};

export type PopularCrag = {
  __typename?: 'PopularCrag';
  crag: Crag;
  nrVisits: Scalars['Int']['output'];
};

export type PropertyType = {
  __typename?: 'PropertyType';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  valueType: Scalars['String']['output'];
};

export enum PublishType {
  Club = 'club',
  Log = 'log',
  Private = 'private',
  Public = 'public'
}

export type Query = {
  __typename?: 'Query';
  activities: PaginatedActivities;
  activity: Activity;
  activityRoute: ActivityRoute;
  activityRoutesByClubSlug: PaginatedActivityRoutes;
  areaBySlug: Area;
  club: Club;
  clubBySlug: Club;
  clubs: Array<Club>;
  contributions: Array<Contribution>;
  countries: Array<Country>;
  countryBySlug: Country;
  crag: Crag;
  cragBySlug: Crag;
  crags: Array<Crag>;
  dryRunCreateActivity: Array<SideEffect>;
  dryRunUpdateActivity: Array<SideEffect>;
  exposedWarnings: Array<Comment>;
  gradingSystems: Array<GradingSystem>;
  iceFallBySlug: IceFall;
  latestComments: PaginatedComments;
  latestDifficultyVotes: PaginatedDifficultyVotes;
  latestImages: Array<Image>;
  latestTicks: Array<ActivityRoute>;
  myActivities: PaginatedActivities;
  myActivitiesStatistics: Array<StatsActivities>;
  myActivityRoutes: PaginatedActivityRoutes;
  myClubs: Array<Club>;
  myCragSummary: Array<ActivityRoute>;
  myRoutesStatistics: Array<StatsRoutes>;
  peak: Peak;
  popularCrags: Array<PopularCrag>;
  profile: User;
  route: Route;
  routeBySlug: Route;
  routesTouches: RoutesTouches;
  search: SearchResults;
  sector: Sector;
  starRatingVotes: Array<StarRatingVote>;
  users: Array<User>;
};


export type QueryActivitiesArgs = {
  input?: InputMaybe<FindActivitiesInput>;
};


export type QueryActivityArgs = {
  id: Scalars['String']['input'];
};


export type QueryActivityRouteArgs = {
  id: Scalars['String']['input'];
};


export type QueryActivityRoutesByClubSlugArgs = {
  clubSlug: Scalars['String']['input'];
  input?: InputMaybe<FindActivityRoutesInput>;
};


export type QueryAreaBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryClubArgs = {
  id: Scalars['String']['input'];
};


export type QueryClubBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryClubsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryContributionsArgs = {
  input?: InputMaybe<FindContributionsInput>;
};


export type QueryCountriesArgs = {
  input?: InputMaybe<FindCountriesInput>;
};


export type QueryCountryBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryCragArgs = {
  id: Scalars['String']['input'];
};


export type QueryCragBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryCragsArgs = {
  input?: InputMaybe<FindCragsServiceInput>;
};


export type QueryDryRunCreateActivityArgs = {
  input: CreateActivityInput;
  routes: Array<CreateActivityRouteInput>;
};


export type QueryDryRunUpdateActivityArgs = {
  input: UpdateActivityInput;
  routes: Array<CreateActivityRouteInput>;
};


export type QueryIceFallBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryLatestCommentsArgs = {
  input: LatestCommentsInput;
};


export type QueryLatestDifficultyVotesArgs = {
  input: LatestDifficultyVotesInput;
};


export type QueryLatestImagesArgs = {
  latest: Scalars['Int']['input'];
};


export type QueryLatestTicksArgs = {
  inLastNDays?: InputMaybe<Scalars['Int']['input']>;
  latestN?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyActivitiesArgs = {
  input?: InputMaybe<FindActivitiesInput>;
};


export type QueryMyActivitiesStatisticsArgs = {
  input?: InputMaybe<FindActivitiesInput>;
};


export type QueryMyActivityRoutesArgs = {
  input?: InputMaybe<FindActivityRoutesInput>;
};


export type QueryMyCragSummaryArgs = {
  input?: InputMaybe<FindActivityRoutesInput>;
};


export type QueryMyRoutesStatisticsArgs = {
  input?: InputMaybe<FindActivityRoutesInput>;
};


export type QueryPeakArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPopularCragsArgs = {
  dateFrom?: InputMaybe<Scalars['String']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRouteArgs = {
  id: Scalars['String']['input'];
};


export type QueryRouteBySlugArgs = {
  cragSlug: Scalars['String']['input'];
  routeSlug: Scalars['String']['input'];
};


export type QueryRoutesTouchesArgs = {
  input: FindRoutesTouchesInput;
};


export type QuerySearchArgs = {
  input?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySectorArgs = {
  id: Scalars['String']['input'];
};


export type QueryStarRatingVotesArgs = {
  routeIds: Array<Scalars['String']['input']>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  gender?: InputMaybe<Scalars['String']['input']>;
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  role: Scalars['String']['output'];
};

export type Route = {
  __typename?: 'Route';
  activityRoutes: PaginatedActivityRoutes;
  author?: Maybe<Scalars['String']['output']>;
  comments: Array<Comment>;
  crag: Crag;
  created: Scalars['DateTime']['output'];
  defaultGradingSystem: GradingSystem;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['Float']['output']>;
  difficultyVotes: Array<DifficultyVote>;
  id: Scalars['String']['output'];
  images: Array<Image>;
  isProject: Scalars['Boolean']['output'];
  length?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  nrClimbers?: Maybe<Scalars['Float']['output']>;
  nrTicks?: Maybe<Scalars['Float']['output']>;
  nrTries?: Maybe<Scalars['Float']['output']>;
  pitches: Array<Pitch>;
  position: Scalars['Float']['output'];
  properties: Array<RouteProperty>;
  publishStatus: Scalars['String']['output'];
  routeEvents: Array<RouteEvent>;
  routeType: RouteType;
  sector: Sector;
  slug: Scalars['String']['output'];
  starRating?: Maybe<Scalars['Float']['output']>;
  starRatingVotes: Array<StarRatingVote>;
  status: Scalars['String']['output'];
  user?: Maybe<User>;
};


export type RouteActivityRoutesArgs = {
  input?: InputMaybe<FindActivityRoutesInput>;
};


export type RouteDifficultyVotesArgs = {
  input?: InputMaybe<FindDifficultyVotesInput>;
};


export type RouteStarRatingVotesArgs = {
  input?: InputMaybe<FindStarRatingVotesInput>;
};

export type RouteEvent = {
  __typename?: 'RouteEvent';
  author: Scalars['String']['output'];
  eventDate?: Maybe<Scalars['DateTime']['output']>;
  eventType?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  showFullDate?: Maybe<Scalars['Boolean']['output']>;
};

export type RouteProperty = {
  __typename?: 'RouteProperty';
  author?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  numValue?: Maybe<Scalars['Float']['output']>;
  propertyType: PropertyType;
  route: Route;
  stringValue?: Maybe<Scalars['String']['output']>;
  textValue?: Maybe<Scalars['String']['output']>;
};

export type RouteType = {
  __typename?: 'RouteType';
  gradingSystems: Array<GradingSystem>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type RoutesTouches = {
  __typename?: 'RoutesTouches';
  ticked: Array<ActivityRoute>;
  trTicked: Array<ActivityRoute>;
  tried: Array<ActivityRoute>;
};

export type SearchResults = {
  __typename?: 'SearchResults';
  comments?: Maybe<Array<Comment>>;
  crags?: Maybe<Array<Crag>>;
  routes?: Maybe<Array<Route>>;
  sectors?: Maybe<Array<Sector>>;
  users?: Maybe<Array<User>>;
};

export enum Season {
  Autumn = 'autumn',
  Spring = 'spring',
  Summer = 'summer',
  Winter = 'winter'
}

export type Sector = {
  __typename?: 'Sector';
  bouldersOnly: Scalars['Boolean']['output'];
  crag: Crag;
  created: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parkings: Array<Parking>;
  position: Scalars['Float']['output'];
  publishStatus: Scalars['String']['output'];
  routes: Array<Route>;
  status: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type SideEffect = {
  __typename?: 'SideEffect';
  after: ActivityRoute;
  before: ActivityRoute;
};

export type StarRatingVote = {
  __typename?: 'StarRatingVote';
  created: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  route: Route;
  stars: Scalars['Float']['output'];
  updated: Scalars['DateTime']['output'];
  user: User;
};

export type StatsActivities = {
  __typename?: 'StatsActivities';
  nr_activities: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

export type StatsRoutes = {
  __typename?: 'StatsRoutes';
  ascent_type: Scalars['String']['output'];
  difficulty: Scalars['Float']['output'];
  nr_routes: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type UpdateActivityInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  partners?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateActivityRouteInput = {
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  partner?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  publish?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAreaInput = {
  countryId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateClubInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommentInput = {
  content: Scalars['String']['input'];
  exposedUntil?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
};

export type UpdateCountryInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCragInput = {
  access?: InputMaybe<Scalars['String']['input']>;
  approachTime?: InputMaybe<Scalars['Int']['input']>;
  areaId?: InputMaybe<Scalars['String']['input']>;
  cascadePublishStatus?: InputMaybe<Scalars['Boolean']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  coverImageId?: InputMaybe<Scalars['String']['input']>;
  defaultGradingSystemId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lon?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orientation?: InputMaybe<Scalars['String']['input']>;
  orientations?: InputMaybe<Array<Orientation>>;
  publishStatus?: InputMaybe<Scalars['String']['input']>;
  rainproof?: InputMaybe<Scalars['Boolean']['input']>;
  rejectionMessage?: InputMaybe<Scalars['String']['input']>;
  seasons?: InputMaybe<Array<Season>>;
  type?: InputMaybe<Scalars['String']['input']>;
  wallAngles?: InputMaybe<Array<WallAngle>>;
};

export type UpdateRouteInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  baseDifficulty?: InputMaybe<Scalars['Float']['input']>;
  defaultGradingSystemId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isProject?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Float']['input']>;
  publishStatus?: InputMaybe<Scalars['String']['input']>;
  rejectionMessage?: InputMaybe<Scalars['String']['input']>;
  routeTypeId?: InputMaybe<Scalars['String']['input']>;
  sectorId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSectorInput = {
  cascadePublishStatus?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Float']['input']>;
  publishStatus?: InputMaybe<Scalars['String']['input']>;
  rejectionMessage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  firstname?: InputMaybe<Scalars['String']['input']>;
  hasUnpublishedContributions?: InputMaybe<Scalars['Boolean']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  activities: Array<Activity>;
  clubs: Array<ClubMember>;
  comments: Array<Comment>;
  crags: Array<Crag>;
  difficultyVotes: Array<DifficultyVote>;
  email?: Maybe<Scalars['String']['output']>;
  firstname: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  hasUnpublishedContributions: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  images: Array<Image>;
  lastname: Scalars['String']['output'];
  profileImage?: Maybe<Image>;
  roles: Array<Scalars['String']['output']>;
  routeEvents: Array<RouteEvent>;
  routes: Array<Route>;
  sectors: Array<Sector>;
  www?: Maybe<Scalars['String']['output']>;
};

export enum WallAngle {
  Overhang = 'overhang',
  Roof = 'roof',
  Slab = 'slab',
  Vertical = 'vertical'
}


export const EditCragPageCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditCragPageCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"areas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<EditCragPageCountriesQuery, EditCragPageCountriesQueryVariables>;
export const EditCragPageCragDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditCragPageCrag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cragSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cragSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"area"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lon"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"wallAngles"}},{"kind":"Field","name":{"kind":"Name","value":"rainproof"}},{"kind":"Field","name":{"kind":"Name","value":"orientations"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"}},{"kind":"Field","name":{"kind":"Name","value":"approachTime"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"isHidden"}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"maxIntrinsicWidth"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}}]}}]}}]} as unknown as DocumentNode<EditCragPageCragQuery, EditCragPageCragQueryVariables>;
export const UpdateCragDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCrag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCragInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCrag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<UpdateCragMutation, UpdateCragMutationVariables>;
export const EditRoutesPageSectorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditRoutesPageSector"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sector"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"crag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sectors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"routes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"routeType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"created"}}]}}]}}]}}]} as unknown as DocumentNode<EditRoutesPageSectorQuery, EditRoutesPageSectorQueryVariables>;
export const CreateRouteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoute"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRouteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoute"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateRouteMutation, CreateRouteMutationVariables>;
export const DeleteRouteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoute"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoute"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteRouteMutation, DeleteRouteMutationVariables>;
export const DeleteRoutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoutes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteRoutesMutation, DeleteRoutesMutationVariables>;
export const MergeRoutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MergeRoutes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MergeRoutesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mergeRoutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<MergeRoutesMutation, MergeRoutesMutationVariables>;
export const MoveRoutesToSectorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveRoutesToSector"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MoveRoutesToSectorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveRoutesToSector"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<MoveRoutesToSectorMutation, MoveRoutesToSectorMutationVariables>;
export const UpdateRouteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRoute"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRouteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoute"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateRouteMutation, UpdateRouteMutationVariables>;
export const UpdateRoutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRoutes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRouteInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateRoutesMutation, UpdateRoutesMutationVariables>;
export const EditSectorsPageCragDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditSectorsPageCrag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cragSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cragSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sectors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<EditSectorsPageCragQuery, EditSectorsPageCragQueryVariables>;
export const CreateSectorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSector"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSectorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSector"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateSectorMutation, CreateSectorMutationVariables>;
export const DeleteSectorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSector"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSector"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteSectorMutation, DeleteSectorMutationVariables>;
export const MergeAllSectorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MergeAllSectors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cragId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mergeAllSectors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cragId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cragId"}}}]}]}}]} as unknown as DocumentNode<MergeAllSectorsMutation, MergeAllSectorsMutationVariables>;
export const UpdateSectorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSector"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSectorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSector"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateSectorMutation, UpdateSectorMutationVariables>;
export const NewCragPageCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NewCragPageCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"areas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<NewCragPageCountriesQuery, NewCragPageCountriesQueryVariables>;
export const CreateCragDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCrag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCragInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCrag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CreateCragMutation, CreateCragMutationVariables>;
export const HomeLatestAscentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeLatestAscents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activitiesInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindActivitiesInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activityRoutesInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindActivityRoutesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activitiesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"routes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activityRoutesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ascentType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}}]}}]}}]}}]} as unknown as DocumentNode<HomeLatestAscentsQuery, HomeLatestAscentsQueryVariables>;
export const HomeLatestDifficultyVotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeLatestDifficultyVotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LatestDifficultyVotesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latestDifficultyVotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]}}]}}]}}]} as unknown as DocumentNode<HomeLatestDifficultyVotesQuery, HomeLatestDifficultyVotesQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const UpdateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const CragCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CragComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"crag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"crag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CragCommentsQuery, CragCommentsQueryVariables>;
export const RouteDifficultyVotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RouteDifficultyVotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"routeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"routeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"difficultyVotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"isBase"}},{"kind":"Field","name":{"kind":"Name","value":"includedInCalculation"}}]}}]}}]}}]} as unknown as DocumentNode<RouteDifficultyVotesQuery, RouteDifficultyVotesQueryVariables>;
export const CragGalleryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CragGallery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"crag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"crag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}},{"kind":"Field","name":{"kind":"Name","value":"maxIntrinsicWidth"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CragGalleryQuery, CragGalleryQueryVariables>;
export const CragInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CragInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"crag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"crag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sectors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"routes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parkings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lon"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activityByMonth"}},{"kind":"Field","name":{"kind":"Name","value":"orientations"}},{"kind":"Field","name":{"kind":"Name","value":"approachTime"}},{"kind":"Field","name":{"kind":"Name","value":"wallAngles"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"}},{"kind":"Field","name":{"kind":"Name","value":"rainproof"}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"maxIntrinsicWidth"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lon"}}]}}]}}]} as unknown as DocumentNode<CragInfoQuery, CragInfoQueryVariables>;
export const CragHeaderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CragHeader"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"crag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"crag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"publishStatus"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CragHeaderQuery, CragHeaderQueryVariables>;
export const CragSectorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CragSectors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"crag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstTickArInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindActivityRoutesInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstTryArInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindActivityRoutesInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstTrTickArInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindActivityRoutesInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"difficultyVotesInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindDifficultyVotesInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"starRatingVotesInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindStarRatingVotesInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loggedIn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"crag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sectors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"publishStatus"}},{"kind":"Field","name":{"kind":"Name","value":"bouldersOnly"}},{"kind":"Field","name":{"kind":"Name","value":"routes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isProject"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"routeType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pitches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"isProject"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nrTicks"}},{"kind":"Field","name":{"kind":"Name","value":"nrTries"}},{"kind":"Field","name":{"kind":"Name","value":"nrClimbers"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"publishStatus"}},{"kind":"Field","name":{"kind":"Name","value":"sector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"firstTry"},"name":{"kind":"Name","value":"activityRoutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstTryArInput"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loggedIn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"firstTick"},"name":{"kind":"Name","value":"activityRoutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstTickArInput"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loggedIn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"firstTrTick"},"name":{"kind":"Name","value":"activityRoutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstTrTickArInput"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loggedIn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"difficultyVotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"difficultyVotesInput"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loggedIn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}}]}},{"kind":"Field","name":{"kind":"Name","value":"starRatingVotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"starRatingVotesInput"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loggedIn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stars"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CragSectorsQuery, CragSectorsQueryVariables>;
export const MyCragSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyCragSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindActivityRoutesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myCragSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ascentType"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<MyCragSummaryQuery, MyCragSummaryQueryVariables>;
export const AllCragsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllCrags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"crags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"sport","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"area"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"orientations"}},{"kind":"Field","name":{"kind":"Name","value":"minDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"maxDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"}},{"kind":"Field","name":{"kind":"Name","value":"rainproof"}},{"kind":"Field","name":{"kind":"Name","value":"wallAngles"}},{"kind":"Field","name":{"kind":"Name","value":"approachTime"}},{"kind":"Field","name":{"kind":"Name","value":"nrRoutesByGrade"}},{"kind":"Field","name":{"kind":"Name","value":"hasSport"}},{"kind":"Field","name":{"kind":"Name","value":"hasBoulder"}},{"kind":"Field","name":{"kind":"Name","value":"hasMultipitch"}},{"kind":"Field","name":{"kind":"Name","value":"nrRoutes"}}]}}]}}]} as unknown as DocumentNode<AllCragsQuery, AllCragsQueryVariables>;
export const AllCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"nrCrags"}},{"kind":"Field","name":{"kind":"Name","value":"areas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"nrCrags"}}]}}]}}]}}]} as unknown as DocumentNode<AllCountriesQuery, AllCountriesQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CragDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Crag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"crag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"crag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"sectors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"routes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CragQuery, CragQueryVariables>;
export const CragActivitiesByMonthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CragActivitiesByMonth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"crag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"crag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"activityByMonth"}}]}}]}}]} as unknown as DocumentNode<CragActivitiesByMonthQuery, CragActivitiesByMonthQueryVariables>;
export const CreateActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateActivityInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"routes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateActivityRouteInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createActivity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"routes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"routes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateActivityMutation, CreateActivityMutationVariables>;
export const DryRunCreateActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DryRunCreateActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateActivityInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"routes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateActivityRouteInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dryRunCreateActivity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"routes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"routes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"before"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"ascentType"}},{"kind":"Field","name":{"kind":"Name","value":"routeId"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"after"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"ascentType"}},{"kind":"Field","name":{"kind":"Name","value":"routeId"}}]}}]}}]}}]} as unknown as DocumentNode<DryRunCreateActivityQuery, DryRunCreateActivityQueryVariables>;
export const ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const namedOperations = {
  Query: {
    EditCragPageCountries: 'EditCragPageCountries',
    EditCragPageCrag: 'EditCragPageCrag',
    EditRoutesPageSector: 'EditRoutesPageSector',
    EditSectorsPageCrag: 'EditSectorsPageCrag',
    NewCragPageCountries: 'NewCragPageCountries',
    HomeLatestAscents: 'HomeLatestAscents',
    HomeLatestDifficultyVotes: 'HomeLatestDifficultyVotes',
    CragComments: 'CragComments',
    RouteDifficultyVotes: 'RouteDifficultyVotes',
    CragGallery: 'CragGallery',
    CragInfo: 'CragInfo',
    CragHeader: 'CragHeader',
    CragSectors: 'CragSectors',
    MyCragSummary: 'MyCragSummary',
    AllCrags: 'AllCrags',
    AllCountries: 'AllCountries',
    Crag: 'Crag',
    CragActivitiesByMonth: 'CragActivitiesByMonth',
    DryRunCreateActivity: 'DryRunCreateActivity',
    Profile: 'Profile'
  },
  Mutation: {
    UpdateCrag: 'UpdateCrag',
    CreateRoute: 'CreateRoute',
    DeleteRoute: 'DeleteRoute',
    DeleteRoutes: 'DeleteRoutes',
    MergeRoutes: 'MergeRoutes',
    MoveRoutesToSector: 'MoveRoutesToSector',
    UpdateRoute: 'UpdateRoute',
    UpdateRoutes: 'UpdateRoutes',
    CreateSector: 'CreateSector',
    DeleteSector: 'DeleteSector',
    MergeAllSectors: 'MergeAllSectors',
    UpdateSector: 'UpdateSector',
    CreateCrag: 'CreateCrag',
    CreateComment: 'CreateComment',
    DeleteComment: 'DeleteComment',
    UpdateComment: 'UpdateComment',
    Login: 'Login',
    CreateActivity: 'CreateActivity'
  }
}
export type EditCragPageCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type EditCragPageCountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', id: string, name: string, slug: string, areas: Array<{ __typename?: 'Area', id: string, name: string, slug: string }> }> };

export type EditCragPageCragQueryVariables = Exact<{
  cragSlug: Scalars['String']['input'];
}>;


export type EditCragPageCragQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, name: string, type: string, lat?: number | null, lon?: number | null, description?: string | null, wallAngles?: Array<WallAngle> | null, rainproof?: boolean | null, orientations?: Array<Orientation> | null, seasons?: Array<Season> | null, approachTime?: number | null, access?: string | null, isHidden: boolean, country: { __typename?: 'Country', id: string }, area?: { __typename?: 'Area', id: string } | null, defaultGradingSystem?: { __typename?: 'GradingSystem', id: string } | null, coverImage?: { __typename?: 'Image', id: string, path: string, extension: string, maxIntrinsicWidth: number, aspectRatio: number } | null } };

export type UpdateCragMutationVariables = Exact<{
  input: UpdateCragInput;
}>;


export type UpdateCragMutation = { __typename?: 'Mutation', updateCrag: { __typename?: 'Crag', id: string, slug: string } };

export type EditRoutesPageSectorQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type EditRoutesPageSectorQuery = { __typename?: 'Query', sector: { __typename?: 'Sector', id: string, label: string, name: string, crag: { __typename?: 'Crag', id: string, slug: string, name: string, sectors: Array<{ __typename?: 'Sector', id: string, label: string, name: string }> }, routes: Array<{ __typename?: 'Route', id: string, name: string, difficulty?: number | null, length?: number | null, position: number, created: any, routeType: { __typename?: 'RouteType', id: string }, defaultGradingSystem: { __typename?: 'GradingSystem', id: string } }> } };

export type CreateRouteMutationVariables = Exact<{
  input: CreateRouteInput;
}>;


export type CreateRouteMutation = { __typename?: 'Mutation', createRoute: { __typename?: 'Route', id: string } };

export type DeleteRouteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteRouteMutation = { __typename?: 'Mutation', deleteRoute: boolean };

export type DeleteRoutesMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DeleteRoutesMutation = { __typename?: 'Mutation', deleteRoutes: Array<boolean> };

export type MergeRoutesMutationVariables = Exact<{
  input: MergeRoutesInput;
}>;


export type MergeRoutesMutation = { __typename?: 'Mutation', mergeRoutes: boolean };

export type MoveRoutesToSectorMutationVariables = Exact<{
  input: MoveRoutesToSectorInput;
}>;


export type MoveRoutesToSectorMutation = { __typename?: 'Mutation', moveRoutesToSector: boolean };

export type UpdateRouteMutationVariables = Exact<{
  input: UpdateRouteInput;
}>;


export type UpdateRouteMutation = { __typename?: 'Mutation', updateRoute: { __typename?: 'Route', id: string } };

export type UpdateRoutesMutationVariables = Exact<{
  input: Array<UpdateRouteInput> | UpdateRouteInput;
}>;


export type UpdateRoutesMutation = { __typename?: 'Mutation', updateRoutes: Array<{ __typename?: 'Route', id: string }> };

export type EditSectorsPageCragQueryVariables = Exact<{
  cragSlug: Scalars['String']['input'];
}>;


export type EditSectorsPageCragQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, name: string, sectors: Array<{ __typename?: 'Sector', id: string, name: string, label: string, position: number }> } };

export type CreateSectorMutationVariables = Exact<{
  input: CreateSectorInput;
}>;


export type CreateSectorMutation = { __typename?: 'Mutation', createSector: { __typename?: 'Sector', id: string } };

export type DeleteSectorMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteSectorMutation = { __typename?: 'Mutation', deleteSector: boolean };

export type MergeAllSectorsMutationVariables = Exact<{
  cragId: Scalars['String']['input'];
}>;


export type MergeAllSectorsMutation = { __typename?: 'Mutation', mergeAllSectors: boolean };

export type UpdateSectorMutationVariables = Exact<{
  input: UpdateSectorInput;
}>;


export type UpdateSectorMutation = { __typename?: 'Mutation', updateSector: { __typename?: 'Sector', id: string } };

export type NewCragPageCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type NewCragPageCountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', id: string, name: string, slug: string, areas: Array<{ __typename?: 'Area', id: string, name: string, slug: string }> }> };

export type CreateCragMutationVariables = Exact<{
  input: CreateCragInput;
}>;


export type CreateCragMutation = { __typename?: 'Mutation', createCrag: { __typename?: 'Crag', id: string, slug: string } };

export type HomeLatestAscentsQueryVariables = Exact<{
  activitiesInput?: InputMaybe<FindActivitiesInput>;
  activityRoutesInput?: InputMaybe<FindActivityRoutesInput>;
}>;


export type HomeLatestAscentsQuery = { __typename?: 'Query', activities: { __typename?: 'PaginatedActivities', items: Array<{ __typename?: 'Activity', id: string, name: string, date: any, user: { __typename?: 'User', id: string, fullName: string }, routes: Array<{ __typename?: 'ActivityRoute', id: string, ascentType: AscentType, route: { __typename?: 'Route', id: string, name: string, slug: string, difficulty?: number | null, defaultGradingSystem: { __typename?: 'GradingSystem', id: string }, crag: { __typename?: 'Crag', id: string, name: string, slug: string } } }> }>, meta: { __typename?: 'PaginationMeta', itemCount: number, pageCount: number, pageNumber: number, pageSize: number } } };

export type HomeLatestDifficultyVotesQueryVariables = Exact<{
  input: LatestDifficultyVotesInput;
}>;


export type HomeLatestDifficultyVotesQuery = { __typename?: 'Query', latestDifficultyVotes: { __typename?: 'PaginatedDifficultyVotes', items: Array<{ __typename?: 'DifficultyVote', id: string, difficulty: number, created: any, route: { __typename?: 'Route', id: string, name: string, slug: string, difficulty?: number | null, defaultGradingSystem: { __typename?: 'GradingSystem', id: string }, crag: { __typename?: 'Crag', id: string, name: string, slug: string } }, user?: { __typename?: 'User', id: string, fullName: string, gender?: string | null } | null }> } };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type UpdateCommentMutationVariables = Exact<{
  input: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: string, content?: string | null } };

export type CragCommentsQueryVariables = Exact<{
  crag: Scalars['String']['input'];
}>;


export type CragCommentsQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, comments: Array<{ __typename?: 'Comment', id: string, content?: string | null, type: string, created: any, updated: any, user?: { __typename?: 'User', id: string, fullName: string } | null }> } };

export type RouteDifficultyVotesQueryVariables = Exact<{
  routeId: Scalars['String']['input'];
}>;


export type RouteDifficultyVotesQuery = { __typename?: 'Query', route: { __typename?: 'Route', id: string, slug: string, difficulty?: number | null, name: string, length?: number | null, defaultGradingSystem: { __typename?: 'GradingSystem', id: string }, difficultyVotes: Array<{ __typename?: 'DifficultyVote', id: string, difficulty: number, created: any, updated: any, isBase: boolean, includedInCalculation: boolean, user?: { __typename?: 'User', id: string, fullName: string, firstname: string, lastname: string } | null }> } };

export type CragGalleryQueryVariables = Exact<{
  crag: Scalars['String']['input'];
}>;


export type CragGalleryQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, images: Array<{ __typename?: 'Image', id: string, title?: string | null, path: string, extension: string, aspectRatio: number, maxIntrinsicWidth: number, author?: string | null, user?: { __typename?: 'User', id: string } | null }> } };

export type CragInfoQueryVariables = Exact<{
  crag: Scalars['String']['input'];
}>;


export type CragInfoQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, name: string, activityByMonth: Array<number>, orientations?: Array<Orientation> | null, approachTime?: number | null, wallAngles?: Array<WallAngle> | null, seasons?: Array<Season> | null, rainproof?: boolean | null, lat?: number | null, lon?: number | null, sectors: Array<{ __typename?: 'Sector', id: string, label: string, name: string, routes: Array<{ __typename?: 'Route', id: string, difficulty?: number | null, length?: number | null }>, parkings: Array<{ __typename?: 'Parking', id: string, lat: number, lon: number }> }>, defaultGradingSystem?: { __typename?: 'GradingSystem', id: string } | null, coverImage?: { __typename?: 'Image', id: string, path: string, extension: string, maxIntrinsicWidth: number, aspectRatio: number } | null } };

export type CragHeaderQueryVariables = Exact<{
  crag: Scalars['String']['input'];
}>;


export type CragHeaderQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, status: string, name: string, publishStatus: string, country: { __typename?: 'Country', id: string, name: string, slug: string }, user?: { __typename?: 'User', id: string } | null } };

export type CragSectorsQueryVariables = Exact<{
  crag: Scalars['String']['input'];
  firstTickArInput?: InputMaybe<FindActivityRoutesInput>;
  firstTryArInput?: InputMaybe<FindActivityRoutesInput>;
  firstTrTickArInput?: InputMaybe<FindActivityRoutesInput>;
  difficultyVotesInput?: InputMaybe<FindDifficultyVotesInput>;
  starRatingVotesInput?: InputMaybe<FindStarRatingVotesInput>;
  loggedIn: Scalars['Boolean']['input'];
}>;


export type CragSectorsQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, name: string, sectors: Array<{ __typename?: 'Sector', id: string, name: string, label: string, publishStatus: string, bouldersOnly: boolean, routes: Array<{ __typename?: 'Route', id: string, name: string, slug: string, difficulty?: number | null, isProject: boolean, length?: number | null, nrTicks?: number | null, nrTries?: number | null, nrClimbers?: number | null, position: number, starRating?: number | null, publishStatus: string, defaultGradingSystem: { __typename?: 'GradingSystem', id: string }, routeType: { __typename?: 'RouteType', id: string }, comments: Array<{ __typename?: 'Comment', id: string }>, pitches: Array<{ __typename?: 'Pitch', id: string, difficulty?: number | null, isProject: boolean, number: number, height?: number | null }>, sector: { __typename?: 'Sector', position: number, label: string, name: string }, firstTry?: { __typename?: 'PaginatedActivityRoutes', items: Array<{ __typename?: 'ActivityRoute', id: string, date?: any | null }> }, firstTick?: { __typename?: 'PaginatedActivityRoutes', items: Array<{ __typename?: 'ActivityRoute', id: string, date?: any | null }> }, firstTrTick?: { __typename?: 'PaginatedActivityRoutes', items: Array<{ __typename?: 'ActivityRoute', id: string, date?: any | null }> }, difficultyVotes?: Array<{ __typename?: 'DifficultyVote', difficulty: number, updated: any }>, starRatingVotes?: Array<{ __typename?: 'StarRatingVote', stars: number, updated: any }> }> }> } };

export type MyCragSummaryQueryVariables = Exact<{
  input?: InputMaybe<FindActivityRoutesInput>;
}>;


export type MyCragSummaryQuery = { __typename?: 'Query', myCragSummary: Array<{ __typename?: 'ActivityRoute', ascentType: AscentType, route: { __typename?: 'Route', id: string, slug: string } }> };

export type AllCragsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCragsQuery = { __typename?: 'Query', crags: Array<{ __typename?: 'Crag', id: string, slug: string, name: string, orientations?: Array<Orientation> | null, minDifficulty?: number | null, maxDifficulty?: number | null, seasons?: Array<Season> | null, rainproof?: boolean | null, wallAngles?: Array<WallAngle> | null, approachTime?: number | null, nrRoutesByGrade?: any | null, hasSport: boolean, hasBoulder: boolean, hasMultipitch: boolean, nrRoutes: number, country: { __typename?: 'Country', id: string, name: string, slug: string }, area?: { __typename?: 'Area', id: string, name: string, slug: string, country: { __typename?: 'Country', slug: string } } | null }> };

export type AllCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', name: string, slug: string, nrCrags: number, areas: Array<{ __typename?: 'Area', name: string, slug: string, nrCrags: number }> }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, email?: string | null, fullName: string, firstname: string, lastname: string, gender?: string | null, roles: Array<string> } } };

export type CragQueryVariables = Exact<{
  crag: Scalars['String']['input'];
}>;


export type CragQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, sectors: Array<{ __typename?: 'Sector', id: string, routes: Array<{ __typename?: 'Route', id: string, difficulty?: number | null }> }>, defaultGradingSystem?: { __typename?: 'GradingSystem', id: string } | null } };

export type CragActivitiesByMonthQueryVariables = Exact<{
  crag: Scalars['String']['input'];
}>;


export type CragActivitiesByMonthQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, activityByMonth: Array<number> } };

export type CreateActivityMutationVariables = Exact<{
  input: CreateActivityInput;
  routes: Array<CreateActivityRouteInput> | CreateActivityRouteInput;
}>;


export type CreateActivityMutation = { __typename?: 'Mutation', createActivity: { __typename?: 'Activity', id: string } };

export type DryRunCreateActivityQueryVariables = Exact<{
  input: CreateActivityInput;
  routes: Array<CreateActivityRouteInput> | CreateActivityRouteInput;
}>;


export type DryRunCreateActivityQuery = { __typename?: 'Query', dryRunCreateActivity: Array<{ __typename?: 'SideEffect', before: { __typename?: 'ActivityRoute', date?: any | null, ascentType: AscentType, routeId: string, route: { __typename?: 'Route', name: string } }, after: { __typename?: 'ActivityRoute', date?: any | null, ascentType: AscentType, routeId: string } }> };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, firstname: string, lastname: string, fullName: string, email?: string | null, roles: Array<string> } };
