import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Activity = {
  __typename?: 'Activity';
  crag?: Maybe<Crag>;
  date: Scalars['DateTime'];
  duration?: Maybe<Scalars['Int']>;
  iceFall?: Maybe<IceFall>;
  id: Scalars['String'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  partners?: Maybe<Scalars['String']>;
  peak?: Maybe<Peak>;
  routes: Array<ActivityRoute>;
  type: Scalars['String'];
  user: User;
};


export type ActivityRoutesArgs = {
  input?: InputMaybe<FindActivityRoutesInput>;
};

export type ActivityRoute = {
  __typename?: 'ActivityRoute';
  activity?: Maybe<Activity>;
  ascentType: Scalars['String'];
  date?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  orderScore: Scalars['Float'];
  partner?: Maybe<Scalars['String']>;
  pitch?: Maybe<Pitch>;
  publish: Scalars['String'];
  rankingScore: Scalars['Float'];
  route: Route;
  routeId: Scalars['String'];
  user: User;
};

export type Area = {
  __typename?: 'Area';
  area?: Maybe<Area>;
  areas: Array<Area>;
  country: Country;
  crags: Array<Crag>;
  description?: Maybe<Scalars['String']>;
  iceFalls: Array<IceFall>;
  id: Scalars['String'];
  images: Array<Image>;
  name: Scalars['String'];
  nrCrags: Scalars['Int'];
  peaks: Array<Peak>;
  slug: Scalars['String'];
  type: Scalars['String'];
};

export type Club = {
  __typename?: 'Club';
  created: Scalars['DateTime'];
  id: Scalars['String'];
  members: Array<ClubMember>;
  name: Scalars['String'];
  nrMembers: Scalars['Float'];
  slug: Scalars['String'];
  updated: Scalars['DateTime'];
};

export type ClubMember = {
  __typename?: 'ClubMember';
  admin: Scalars['Boolean'];
  club: Club;
  created: Scalars['DateTime'];
  id: Scalars['String'];
  legacy: Scalars['String'];
  status: Scalars['String'];
  updated: Scalars['DateTime'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  content?: Maybe<Scalars['String']>;
  crag?: Maybe<Crag>;
  created: Scalars['DateTime'];
  exposedUntil?: Maybe<Scalars['DateTime']>;
  iceFall: IceFall;
  id: Scalars['String'];
  images: Array<Image>;
  peak: Peak;
  route?: Maybe<Route>;
  type: Scalars['String'];
  updated: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type ConfirmInput = {
  id: Scalars['String'];
  token: Scalars['String'];
};

export type Contribution = {
  __typename?: 'Contribution';
  crag?: Maybe<Crag>;
  created: Scalars['DateTime'];
  entity: Scalars['String'];
  id: Scalars['String'];
  publishStatus: Scalars['String'];
  route?: Maybe<Route>;
  sector?: Maybe<Sector>;
  user?: Maybe<User>;
};

export type Country = {
  __typename?: 'Country';
  areas: Array<Area>;
  code: Scalars['String'];
  crags: Array<Crag>;
  iceFalls: Array<IceFall>;
  id: Scalars['String'];
  name: Scalars['String'];
  nrCrags: Scalars['Int'];
  nrIceFalls: Scalars['Float'];
  nrPeaks: Scalars['Float'];
  peaks: Array<Peak>;
  slug: Scalars['String'];
};


export type CountryAreasArgs = {
  hasCrags?: InputMaybe<Scalars['Boolean']>;
};


export type CountryCragsArgs = {
  input?: InputMaybe<FindCragsInput>;
};


export type CountryIceFallsArgs = {
  areaSlug?: InputMaybe<Scalars['String']>;
};


export type CountryPeaksArgs = {
  areaSlug?: InputMaybe<Scalars['String']>;
};

export type Crag = {
  __typename?: 'Crag';
  access?: Maybe<Scalars['String']>;
  activityByMonth?: Maybe<Array<Scalars['Int']>>;
  area?: Maybe<Area>;
  comments: Array<Comment>;
  country: Country;
  created: Scalars['DateTime'];
  defaultGradingSystem?: Maybe<GradingSystem>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  images: Array<Image>;
  isHidden: Scalars['Boolean'];
  lat?: Maybe<Scalars['Float']>;
  lon?: Maybe<Scalars['Float']>;
  maxDifficulty?: Maybe<Scalars['Float']>;
  minDifficulty?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  nrRoutes: Scalars['Int'];
  orientation?: Maybe<Scalars['String']>;
  peak?: Maybe<Peak>;
  properties: Array<CragProperty>;
  publishStatus: Scalars['String'];
  routes: Array<Route>;
  sectors: Array<Sector>;
  slug: Scalars['String'];
  status: Scalars['String'];
  type: Scalars['String'];
  user?: Maybe<User>;
};

export type CragProperty = {
  __typename?: 'CragProperty';
  author?: Maybe<Scalars['String']>;
  crag: Crag;
  id: Scalars['String'];
  numValue?: Maybe<Scalars['Float']>;
  propertyType: PropertyType;
  stringValue?: Maybe<Scalars['String']>;
  textValue?: Maybe<Scalars['String']>;
};

export type CreateActivityInput = {
  cragId?: InputMaybe<Scalars['String']>;
  date: Scalars['DateTime'];
  duration?: InputMaybe<Scalars['Int']>;
  iceFallId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  partners?: InputMaybe<Scalars['String']>;
  peakId?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type CreateActivityRouteInput = {
  ascentType: Scalars['String'];
  date: Scalars['DateTime'];
  notes?: InputMaybe<Scalars['String']>;
  partner?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  publish: Scalars['String'];
  routeId: Scalars['String'];
  votedDifficulty?: InputMaybe<Scalars['Float']>;
  votedStarRating?: InputMaybe<Scalars['Int']>;
};

export type CreateAreaInput = {
  countryId: Scalars['String'];
  name: Scalars['String'];
};

export type CreateClubInput = {
  name: Scalars['String'];
};

export type CreateClubMemberByEmailInput = {
  admin: Scalars['Boolean'];
  clubId: Scalars['String'];
  userEmail: Scalars['String'];
};

export type CreateClubMemberInput = {
  admin: Scalars['Boolean'];
  clubId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateCommentInput = {
  content: Scalars['String'];
  cragId?: InputMaybe<Scalars['String']>;
  exposedUntil?: InputMaybe<Scalars['DateTime']>;
  iceFallId?: InputMaybe<Scalars['String']>;
  peakId?: InputMaybe<Scalars['String']>;
  routeId?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type CreateCountryInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CreateCragInput = {
  access?: InputMaybe<Scalars['String']>;
  areaId?: InputMaybe<Scalars['String']>;
  countryId: Scalars['String'];
  defaultGradingSystemId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  isHidden: Scalars['Boolean'];
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  orientation?: InputMaybe<Scalars['String']>;
  publishStatus: Scalars['String'];
  type: Scalars['String'];
};

export type CreateRouteInput = {
  author?: InputMaybe<Scalars['String']>;
  baseDifficulty?: InputMaybe<Scalars['Float']>;
  defaultGradingSystemId: Scalars['String'];
  isProject: Scalars['Boolean'];
  length?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  position: Scalars['Float'];
  publishStatus: Scalars['String'];
  routeTypeId: Scalars['String'];
  sectorId: Scalars['String'];
};

export type CreateSectorInput = {
  cragId: Scalars['String'];
  label: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Float'];
  publishStatus: Scalars['String'];
};

export type DifficultyVote = {
  __typename?: 'DifficultyVote';
  created: Scalars['DateTime'];
  difficulty: Scalars['Float'];
  id: Scalars['String'];
  includedInCalculation: Scalars['Boolean'];
  isBase: Scalars['Boolean'];
  route: Route;
  updated: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type FindActivitiesInput = {
  cragId?: InputMaybe<Scalars['String']>;
  dateFrom?: InputMaybe<Scalars['DateTime']>;
  dateTo?: InputMaybe<Scalars['DateTime']>;
  hasRoutesWithPublish?: InputMaybe<Array<Scalars['String']>>;
  orderBy?: InputMaybe<OrderByInput>;
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Array<Scalars['String']>>;
  userId?: InputMaybe<Scalars['String']>;
};

export type FindActivityRoutesInput = {
  activityId?: InputMaybe<Scalars['String']>;
  ascentType?: InputMaybe<Array<Scalars['String']>>;
  clubId?: InputMaybe<Scalars['String']>;
  cragId?: InputMaybe<Scalars['String']>;
  dateFrom?: InputMaybe<Scalars['DateTime']>;
  dateTo?: InputMaybe<Scalars['DateTime']>;
  orderBy?: InputMaybe<OrderByInput>;
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  publish?: InputMaybe<Array<Scalars['String']>>;
  routeId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type FindContributionsInput = {
  orderBy?: InputMaybe<OrderByInput>;
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};

export type FindCountriesInput = {
  hasCrags?: InputMaybe<Scalars['Boolean']>;
  hasIceFalls?: InputMaybe<Scalars['Boolean']>;
  hasPeaks?: InputMaybe<Scalars['Boolean']>;
  orderBy: OrderByInput;
};

export type FindCragsInput = {
  allowEmpty?: InputMaybe<Scalars['Boolean']>;
  area?: InputMaybe<Scalars['String']>;
  areaSlug?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  peakId?: InputMaybe<Scalars['String']>;
  routeTypeId?: InputMaybe<Scalars['String']>;
  showPrivate?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type FindCragsServiceInput = {
  allowEmpty?: InputMaybe<Scalars['Boolean']>;
  area?: InputMaybe<Scalars['String']>;
  areaSlug?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  peakId?: InputMaybe<Scalars['String']>;
  routeTypeId?: InputMaybe<Scalars['String']>;
  showPrivate?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type FindRoutesTouchesInput = {
  before: Scalars['DateTime'];
  routeIds: Array<Scalars['String']>;
};

export type Grade = {
  __typename?: 'Grade';
  difficulty: Scalars['Float'];
  gradingSystem: GradingSystem;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GradingSystem = {
  __typename?: 'GradingSystem';
  grades: Array<Grade>;
  id: Scalars['String'];
  name: Scalars['String'];
  routeTypes: Array<RouteType>;
};

export type IceFall = {
  __typename?: 'IceFall';
  area?: Maybe<Area>;
  comments: Array<Comment>;
  country: Country;
  defaultGradingSystem?: Maybe<GradingSystem>;
  description?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Scalars['Float']>;
  grade: Scalars['String'];
  height: Scalars['Float'];
  id: Scalars['String'];
  images: Array<Image>;
  name: Scalars['String'];
  properties: Array<IceFallProperty>;
  slug: Scalars['String'];
};

export type IceFallProperty = {
  __typename?: 'IceFallProperty';
  author?: Maybe<Scalars['String']>;
  iceFall: IceFall;
  id: Scalars['String'];
  numValue?: Maybe<Scalars['Float']>;
  propertyType: PropertyType;
  stringValue?: Maybe<Scalars['String']>;
  textValue?: Maybe<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  area?: Maybe<Area>;
  aspectRatio: Scalars['Float'];
  author?: Maybe<Scalars['String']>;
  comment?: Maybe<Comment>;
  crag?: Maybe<Crag>;
  description?: Maybe<Scalars['String']>;
  extension: Scalars['String'];
  iceFall?: Maybe<IceFall>;
  id: Scalars['String'];
  maxIntrinsicWidth: Scalars['Int'];
  path: Scalars['String'];
  peak?: Maybe<Peak>;
  route?: Maybe<Route>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type LatestCommentsInput = {
  pageNumber?: InputMaybe<Scalars['Float']>;
  pageSize?: InputMaybe<Scalars['Float']>;
};

export type LatestDifficultyVotesInput = {
  cragId?: InputMaybe<Scalars['String']>;
  forUserId?: InputMaybe<Scalars['String']>;
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  routeId?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
  user: User;
};

export type MoveRouteToSectorInput = {
  id: Scalars['String'];
  primaryRoute?: InputMaybe<Scalars['String']>;
  sectorId: Scalars['String'];
  targetRouteId?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  confirm: Scalars['Boolean'];
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
  deleteActivity: Scalars['Boolean'];
  deleteActivityRoute: Scalars['Boolean'];
  deleteArea: Scalars['Boolean'];
  deleteClub: Scalars['Boolean'];
  deleteClubMember: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  deleteCountry: Scalars['Boolean'];
  deleteCrag: Scalars['Boolean'];
  deleteImage: Scalars['Boolean'];
  deleteRoute: Scalars['Boolean'];
  deleteSector: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: LoginResponse;
  moveRouteToSector: Scalars['Boolean'];
  moveSectorToCrag: Scalars['Boolean'];
  processAllCrags: Scalars['Boolean'];
  recover: Scalars['Boolean'];
  register: Scalars['Boolean'];
  setPassword: Scalars['Boolean'];
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
  id: Scalars['String'];
};


export type MutationDeleteActivityRouteArgs = {
  id: Scalars['String'];
};


export type MutationDeleteAreaArgs = {
  id: Scalars['String'];
};


export type MutationDeleteClubArgs = {
  id: Scalars['String'];
};


export type MutationDeleteClubMemberArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCountryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCragArgs = {
  id: Scalars['String'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRouteArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSectorArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMoveRouteToSectorArgs = {
  input: MoveRouteToSectorInput;
};


export type MutationMoveSectorToCragArgs = {
  cragId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationRecoverArgs = {
  email: Scalars['String'];
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
  direction?: InputMaybe<Scalars['String']>;
  field: Scalars['String'];
};

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
  itemCount: Scalars['Float'];
  pageCount: Scalars['Float'];
  pageNumber: Scalars['Float'];
  pageSize: Scalars['Float'];
};

export type PasswordInput = {
  id: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type Peak = {
  __typename?: 'Peak';
  area?: Maybe<Area>;
  comments: Array<Comment>;
  country: Country;
  crags: Array<Crag>;
  description?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  images: Array<Image>;
  lat?: Maybe<Scalars['Float']>;
  lon?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  nrCrags: Scalars['Float'];
  slug: Scalars['String'];
};


export type PeakCragsArgs = {
  input?: InputMaybe<FindCragsServiceInput>;
};

export type Pitch = {
  __typename?: 'Pitch';
  difficulty?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  isProject: Scalars['Boolean'];
  number: Scalars['Float'];
  route: Route;
  user?: Maybe<User>;
};

export type PopularCrag = {
  __typename?: 'PopularCrag';
  crag: Crag;
  nrVisits: Scalars['Int'];
};

export type PropertyType = {
  __typename?: 'PropertyType';
  id: Scalars['String'];
  name: Scalars['String'];
  valueType: Scalars['String'];
};

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
  myActivityRoutes: PaginatedActivityRoutes;
  myClubs: Array<Club>;
  myCragSummary: Array<ActivityRoute>;
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
  id: Scalars['String'];
};


export type QueryActivityRouteArgs = {
  id: Scalars['String'];
};


export type QueryActivityRoutesByClubSlugArgs = {
  clubSlug: Scalars['String'];
  input?: InputMaybe<FindActivityRoutesInput>;
};


export type QueryAreaBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryClubArgs = {
  id: Scalars['String'];
};


export type QueryClubBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryClubsArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryContributionsArgs = {
  input?: InputMaybe<FindContributionsInput>;
};


export type QueryCountriesArgs = {
  input?: InputMaybe<FindCountriesInput>;
};


export type QueryCountryBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryCragArgs = {
  id: Scalars['String'];
};


export type QueryCragBySlugArgs = {
  slug: Scalars['String'];
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
  slug: Scalars['String'];
};


export type QueryLatestCommentsArgs = {
  input: LatestCommentsInput;
};


export type QueryLatestDifficultyVotesArgs = {
  input: LatestDifficultyVotesInput;
};


export type QueryLatestImagesArgs = {
  latest: Scalars['Int'];
};


export type QueryLatestTicksArgs = {
  inLastNDays?: InputMaybe<Scalars['Int']>;
  latestN?: InputMaybe<Scalars['Int']>;
};


export type QueryMyActivitiesArgs = {
  input?: InputMaybe<FindActivitiesInput>;
};


export type QueryMyActivityRoutesArgs = {
  input?: InputMaybe<FindActivityRoutesInput>;
};


export type QueryMyCragSummaryArgs = {
  input?: InputMaybe<FindActivityRoutesInput>;
};


export type QueryPeakArgs = {
  slug: Scalars['String'];
};


export type QueryPopularCragsArgs = {
  dateFrom?: InputMaybe<Scalars['String']>;
  top?: InputMaybe<Scalars['Int']>;
};


export type QueryRouteArgs = {
  id: Scalars['String'];
};


export type QueryRouteBySlugArgs = {
  cragSlug: Scalars['String'];
  routeSlug: Scalars['String'];
};


export type QueryRoutesTouchesArgs = {
  input: FindRoutesTouchesInput;
};


export type QuerySearchArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type QuerySectorArgs = {
  id: Scalars['String'];
};


export type QueryStarRatingVotesArgs = {
  routeIds: Array<Scalars['String']>;
};

export type RegisterInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  gender?: InputMaybe<Scalars['String']>;
  lastname: Scalars['String'];
  password: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  role: Scalars['String'];
};

export type Route = {
  __typename?: 'Route';
  author?: Maybe<Scalars['String']>;
  comments: Array<Comment>;
  crag: Crag;
  created: Scalars['DateTime'];
  defaultGradingSystem: GradingSystem;
  description?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Scalars['Float']>;
  difficultyVotes: Array<DifficultyVote>;
  id: Scalars['String'];
  images: Array<Image>;
  isProject: Scalars['Boolean'];
  length?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  nrClimbers?: Maybe<Scalars['Float']>;
  nrTicks?: Maybe<Scalars['Float']>;
  nrTries?: Maybe<Scalars['Float']>;
  pitches: Array<Pitch>;
  position: Scalars['Float'];
  properties: Array<RouteProperty>;
  publishStatus: Scalars['String'];
  routeEvents: Array<RouteEvent>;
  routeType: RouteType;
  sector: Sector;
  slug: Scalars['String'];
  starRating?: Maybe<Scalars['Float']>;
  starRatingVotes: Array<StarRatingVote>;
  status: Scalars['String'];
  user?: Maybe<User>;
};

export type RouteEvent = {
  __typename?: 'RouteEvent';
  author: Scalars['String'];
  eventDate?: Maybe<Scalars['DateTime']>;
  eventType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  showFullDate?: Maybe<Scalars['Boolean']>;
};

export type RouteProperty = {
  __typename?: 'RouteProperty';
  author?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  numValue?: Maybe<Scalars['Float']>;
  propertyType: PropertyType;
  route: Route;
  stringValue?: Maybe<Scalars['String']>;
  textValue?: Maybe<Scalars['String']>;
};

export type RouteType = {
  __typename?: 'RouteType';
  gradingSystems: Array<GradingSystem>;
  id: Scalars['String'];
  name: Scalars['String'];
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

export type Sector = {
  __typename?: 'Sector';
  bouldersOnly: Scalars['Boolean'];
  crag: Crag;
  created: Scalars['DateTime'];
  id: Scalars['String'];
  label: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Float'];
  publishStatus: Scalars['String'];
  routes: Array<Route>;
  status: Scalars['String'];
  user?: Maybe<User>;
};

export type SideEffect = {
  __typename?: 'SideEffect';
  after: ActivityRoute;
  before: ActivityRoute;
};

export type StarRatingVote = {
  __typename?: 'StarRatingVote';
  created: Scalars['DateTime'];
  id: Scalars['String'];
  route: Route;
  stars: Scalars['Float'];
  updated: Scalars['DateTime'];
  user: User;
};

export type UpdateActivityInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  duration?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  partners?: InputMaybe<Scalars['String']>;
};

export type UpdateActivityRouteInput = {
  id: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  partner?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  publish?: InputMaybe<Scalars['String']>;
};

export type UpdateAreaInput = {
  countryId: Scalars['String'];
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateClubInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateCommentInput = {
  content: Scalars['String'];
  exposedUntil?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['String'];
};

export type UpdateCountryInput = {
  code?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type UpdateCragInput = {
  access?: InputMaybe<Scalars['String']>;
  areaId?: InputMaybe<Scalars['String']>;
  cascadePublishStatus?: InputMaybe<Scalars['Boolean']>;
  countryId?: InputMaybe<Scalars['String']>;
  defaultGradingSystemId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isHidden?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  orientation?: InputMaybe<Scalars['String']>;
  publishStatus?: InputMaybe<Scalars['String']>;
  rejectionMessage?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateRouteInput = {
  author?: InputMaybe<Scalars['String']>;
  baseDifficulty?: InputMaybe<Scalars['Float']>;
  defaultGradingSystemId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isProject?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  length?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Float']>;
  publishStatus?: InputMaybe<Scalars['String']>;
  rejectionMessage?: InputMaybe<Scalars['String']>;
  routeTypeId?: InputMaybe<Scalars['String']>;
  sectorId?: InputMaybe<Scalars['String']>;
};

export type UpdateSectorInput = {
  cascadePublishStatus?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  label?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Float']>;
  publishStatus?: InputMaybe<Scalars['String']>;
  rejectionMessage?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  firstname?: InputMaybe<Scalars['String']>;
  hasUnpublishedContributions?: InputMaybe<Scalars['Boolean']>;
  lastname?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  activities: Array<Activity>;
  clubs: Array<ClubMember>;
  comments: Array<Comment>;
  crags: Array<Crag>;
  difficultyVotes: Array<DifficultyVote>;
  email?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  fullName: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  hasUnpublishedContributions: Scalars['Boolean'];
  id: Scalars['String'];
  images: Array<Image>;
  lastname: Scalars['String'];
  profileImage?: Maybe<Image>;
  roles: Array<Scalars['String']>;
  routeEvents: Array<RouteEvent>;
  routes: Array<Route>;
  sectors: Array<Sector>;
  www?: Maybe<Scalars['String']>;
};


export const HomeLatestAscentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeLatestAscents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activitiesInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindActivitiesInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activityRoutesInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindActivityRoutesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activitiesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"routes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activityRoutesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ascentType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}}]}}]}}]}}]} as unknown as DocumentNode<HomeLatestAscentsQuery, HomeLatestAscentsQueryVariables>;
export const HomeLatestDifficultyVotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeLatestDifficultyVotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LatestDifficultyVotesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latestDifficultyVotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]}}]}}]}}]} as unknown as DocumentNode<HomeLatestDifficultyVotesQuery, HomeLatestDifficultyVotesQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const UpdateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const CragCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CragComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"crag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"crag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CragCommentsQuery, CragCommentsQueryVariables>;
export const CragHeaderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CragHeader"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"crag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"crag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"publishStatus"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CragHeaderQuery, CragHeaderQueryVariables>;
export const CragSectorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CragSectors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"crag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cragBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"crag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"sectors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"publishStatus"}},{"kind":"Field","name":{"kind":"Name","value":"routes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isProject"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"routeType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pitches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"isProject"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nrTicks"}},{"kind":"Field","name":{"kind":"Name","value":"nrTries"}},{"kind":"Field","name":{"kind":"Name","value":"nrClimbers"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"publishStatus"}},{"kind":"Field","name":{"kind":"Name","value":"sector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"bouldersOnly"}}]}}]}}]}}]} as unknown as DocumentNode<CragSectorsQuery, CragSectorsQueryVariables>;
export const MyCragSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyCragSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindActivityRoutesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myCragSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ascentType"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<MyCragSummaryQuery, MyCragSummaryQueryVariables>;
export const CountryBySlugWithCragsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountryBySlugWithCrags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindCragsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countryBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"crags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nrRoutes"}},{"kind":"Field","name":{"kind":"Name","value":"orientation"}},{"kind":"Field","name":{"kind":"Name","value":"lon"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"minDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"maxDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGradingSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"areas"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasCrags"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<CountryBySlugWithCragsQuery, CountryBySlugWithCragsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const namedOperations = {
  Query: {
    HomeLatestAscents: 'HomeLatestAscents',
    HomeLatestDifficultyVotes: 'HomeLatestDifficultyVotes',
    CragComments: 'CragComments',
    CragHeader: 'CragHeader',
    CragSectors: 'CragSectors',
    MyCragSummary: 'MyCragSummary',
    CountryBySlugWithCrags: 'CountryBySlugWithCrags',
    Profile: 'Profile'
  },
  Mutation: {
    CreateComment: 'CreateComment',
    DeleteComment: 'DeleteComment',
    UpdateComment: 'UpdateComment',
    Login: 'Login'
  }
}
export type HomeLatestAscentsQueryVariables = Exact<{
  activitiesInput?: InputMaybe<FindActivitiesInput>;
  activityRoutesInput?: InputMaybe<FindActivityRoutesInput>;
}>;


export type HomeLatestAscentsQuery = { __typename?: 'Query', activities: { __typename?: 'PaginatedActivities', items: Array<{ __typename?: 'Activity', id: string, name: string, date: any, user: { __typename?: 'User', id: string, fullName: string }, routes: Array<{ __typename?: 'ActivityRoute', id: string, ascentType: string, route: { __typename?: 'Route', id: string, name: string, slug: string, difficulty?: number | null, defaultGradingSystem: { __typename?: 'GradingSystem', id: string }, crag: { __typename?: 'Crag', id: string, name: string, slug: string } } }> }>, meta: { __typename?: 'PaginationMeta', itemCount: number, pageCount: number, pageNumber: number, pageSize: number } } };

export type HomeLatestDifficultyVotesQueryVariables = Exact<{
  input: LatestDifficultyVotesInput;
}>;


export type HomeLatestDifficultyVotesQuery = { __typename?: 'Query', latestDifficultyVotes: { __typename?: 'PaginatedDifficultyVotes', items: Array<{ __typename?: 'DifficultyVote', id: string, difficulty: number, created: any, route: { __typename?: 'Route', id: string, name: string, slug: string, difficulty?: number | null, defaultGradingSystem: { __typename?: 'GradingSystem', id: string }, crag: { __typename?: 'Crag', id: string, name: string, slug: string } }, user?: { __typename?: 'User', id: string, fullName: string, gender?: string | null } | null }> } };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type UpdateCommentMutationVariables = Exact<{
  input: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: string, content?: string | null } };

export type CragCommentsQueryVariables = Exact<{
  crag: Scalars['String'];
}>;


export type CragCommentsQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, comments: Array<{ __typename?: 'Comment', id: string, content?: string | null, type: string, updated: any, user?: { __typename?: 'User', id: string, fullName: string } | null }> } };

export type CragHeaderQueryVariables = Exact<{
  crag: Scalars['String'];
}>;


export type CragHeaderQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, status: string, name: string, publishStatus: string, country: { __typename?: 'Country', id: string, name: string, slug: string }, user?: { __typename?: 'User', id: string } | null } };

export type CragSectorsQueryVariables = Exact<{
  crag: Scalars['String'];
}>;


export type CragSectorsQuery = { __typename?: 'Query', cragBySlug: { __typename?: 'Crag', id: string, slug: string, sectors: Array<{ __typename?: 'Sector', id: string, name: string, label: string, publishStatus: string, bouldersOnly: boolean, routes: Array<{ __typename?: 'Route', id: string, name: string, slug: string, difficulty?: number | null, isProject: boolean, length?: number | null, nrTicks?: number | null, nrTries?: number | null, nrClimbers?: number | null, position: number, starRating?: number | null, publishStatus: string, defaultGradingSystem: { __typename?: 'GradingSystem', id: string }, routeType: { __typename?: 'RouteType', id: string }, comments: Array<{ __typename?: 'Comment', id: string }>, pitches: Array<{ __typename?: 'Pitch', id: string, difficulty?: number | null, isProject: boolean, number: number, height?: number | null }>, sector: { __typename?: 'Sector', position: number, label: string, name: string } }> }> } };

export type MyCragSummaryQueryVariables = Exact<{
  input?: InputMaybe<FindActivityRoutesInput>;
}>;


export type MyCragSummaryQuery = { __typename?: 'Query', myCragSummary: Array<{ __typename?: 'ActivityRoute', ascentType: string, route: { __typename?: 'Route', id: string, slug: string } }> };

export type CountryBySlugWithCragsQueryVariables = Exact<{
  country: Scalars['String'];
  input?: InputMaybe<FindCragsInput>;
}>;


export type CountryBySlugWithCragsQuery = { __typename?: 'Query', countryBySlug: { __typename?: 'Country', id: string, name: string, slug: string, code: string, crags: Array<{ __typename?: 'Crag', id: string, slug: string, name: string, nrRoutes: number, orientation?: string | null, lon?: number | null, lat?: number | null, minDifficulty?: number | null, maxDifficulty?: number | null, defaultGradingSystem?: { __typename?: 'GradingSystem', id: string } | null }>, areas: Array<{ __typename?: 'Area', id: string, name: string, slug: string }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, email?: string | null, fullName: string, firstname: string, lastname: string, gender?: string | null, roles: Array<string> } } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, firstname: string, lastname: string, fullName: string, email?: string | null, roles: Array<string> } };
