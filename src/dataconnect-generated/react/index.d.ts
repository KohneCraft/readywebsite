import { AddReviewData, AddReviewVariables, GetExperienceData, GetExperienceVariables, CreateWishlistData, CreateWishlistVariables, ListExperiencesByCategoryData, ListExperiencesByCategoryVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddReview(options?: useDataConnectMutationOptions<AddReviewData, FirebaseError, AddReviewVariables>): UseDataConnectMutationResult<AddReviewData, AddReviewVariables>;
export function useAddReview(dc: DataConnect, options?: useDataConnectMutationOptions<AddReviewData, FirebaseError, AddReviewVariables>): UseDataConnectMutationResult<AddReviewData, AddReviewVariables>;

export function useGetExperience(vars: GetExperienceVariables, options?: useDataConnectQueryOptions<GetExperienceData>): UseDataConnectQueryResult<GetExperienceData, GetExperienceVariables>;
export function useGetExperience(dc: DataConnect, vars: GetExperienceVariables, options?: useDataConnectQueryOptions<GetExperienceData>): UseDataConnectQueryResult<GetExperienceData, GetExperienceVariables>;

export function useCreateWishlist(options?: useDataConnectMutationOptions<CreateWishlistData, FirebaseError, CreateWishlistVariables>): UseDataConnectMutationResult<CreateWishlistData, CreateWishlistVariables>;
export function useCreateWishlist(dc: DataConnect, options?: useDataConnectMutationOptions<CreateWishlistData, FirebaseError, CreateWishlistVariables>): UseDataConnectMutationResult<CreateWishlistData, CreateWishlistVariables>;

export function useListExperiencesByCategory(vars: ListExperiencesByCategoryVariables, options?: useDataConnectQueryOptions<ListExperiencesByCategoryData>): UseDataConnectQueryResult<ListExperiencesByCategoryData, ListExperiencesByCategoryVariables>;
export function useListExperiencesByCategory(dc: DataConnect, vars: ListExperiencesByCategoryVariables, options?: useDataConnectQueryOptions<ListExperiencesByCategoryData>): UseDataConnectQueryResult<ListExperiencesByCategoryData, ListExperiencesByCategoryVariables>;
