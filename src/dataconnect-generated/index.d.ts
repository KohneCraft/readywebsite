import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddReviewData {
  review_insert: Review_Key;
}

export interface AddReviewVariables {
  bookingId: UUIDString;
  experienceId: UUIDString;
  travelerId: UUIDString;
  comment: string;
  rating: number;
}

export interface Booking_Key {
  id: UUIDString;
  __typename?: 'Booking_Key';
}

export interface CreateWishlistData {
  wishlist_insert: Wishlist_Key;
}

export interface CreateWishlistVariables {
  travelerId: UUIDString;
  name: string;
}

export interface Experience_Key {
  id: UUIDString;
  __typename?: 'Experience_Key';
}

export interface GetExperienceData {
  experience?: {
    id: UUIDString;
    title: string;
    description: string;
    price: number;
    location: string;
    imageUrls?: string[] | null;
  } & Experience_Key;
}

export interface GetExperienceVariables {
  id: UUIDString;
}

export interface ListExperiencesByCategoryData {
  experiences: ({
    id: UUIDString;
    title: string;
    description: string;
    price: number;
    location: string;
    imageUrls?: string[] | null;
  } & Experience_Key)[];
}

export interface ListExperiencesByCategoryVariables {
  category: string;
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WishlistExperience_Key {
  wishlistId: UUIDString;
  experienceId: UUIDString;
  __typename?: 'WishlistExperience_Key';
}

export interface Wishlist_Key {
  id: UUIDString;
  __typename?: 'Wishlist_Key';
}

interface AddReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddReviewVariables): MutationRef<AddReviewData, AddReviewVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddReviewVariables): MutationRef<AddReviewData, AddReviewVariables>;
  operationName: string;
}
export const addReviewRef: AddReviewRef;

export function addReview(vars: AddReviewVariables): MutationPromise<AddReviewData, AddReviewVariables>;
export function addReview(dc: DataConnect, vars: AddReviewVariables): MutationPromise<AddReviewData, AddReviewVariables>;

interface GetExperienceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExperienceVariables): QueryRef<GetExperienceData, GetExperienceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetExperienceVariables): QueryRef<GetExperienceData, GetExperienceVariables>;
  operationName: string;
}
export const getExperienceRef: GetExperienceRef;

export function getExperience(vars: GetExperienceVariables): QueryPromise<GetExperienceData, GetExperienceVariables>;
export function getExperience(dc: DataConnect, vars: GetExperienceVariables): QueryPromise<GetExperienceData, GetExperienceVariables>;

interface CreateWishlistRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWishlistVariables): MutationRef<CreateWishlistData, CreateWishlistVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateWishlistVariables): MutationRef<CreateWishlistData, CreateWishlistVariables>;
  operationName: string;
}
export const createWishlistRef: CreateWishlistRef;

export function createWishlist(vars: CreateWishlistVariables): MutationPromise<CreateWishlistData, CreateWishlistVariables>;
export function createWishlist(dc: DataConnect, vars: CreateWishlistVariables): MutationPromise<CreateWishlistData, CreateWishlistVariables>;

interface ListExperiencesByCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListExperiencesByCategoryVariables): QueryRef<ListExperiencesByCategoryData, ListExperiencesByCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListExperiencesByCategoryVariables): QueryRef<ListExperiencesByCategoryData, ListExperiencesByCategoryVariables>;
  operationName: string;
}
export const listExperiencesByCategoryRef: ListExperiencesByCategoryRef;

export function listExperiencesByCategory(vars: ListExperiencesByCategoryVariables): QueryPromise<ListExperiencesByCategoryData, ListExperiencesByCategoryVariables>;
export function listExperiencesByCategory(dc: DataConnect, vars: ListExperiencesByCategoryVariables): QueryPromise<ListExperiencesByCategoryData, ListExperiencesByCategoryVariables>;

