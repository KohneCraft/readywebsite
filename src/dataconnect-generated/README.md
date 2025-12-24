# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetExperience*](#getexperience)
  - [*ListExperiencesByCategory*](#listexperiencesbycategory)
- [**Mutations**](#mutations)
  - [*AddReview*](#addreview)
  - [*CreateWishlist*](#createwishlist)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetExperience
You can execute the `GetExperience` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getExperience(vars: GetExperienceVariables): QueryPromise<GetExperienceData, GetExperienceVariables>;

interface GetExperienceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExperienceVariables): QueryRef<GetExperienceData, GetExperienceVariables>;
}
export const getExperienceRef: GetExperienceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getExperience(dc: DataConnect, vars: GetExperienceVariables): QueryPromise<GetExperienceData, GetExperienceVariables>;

interface GetExperienceRef {
  ...
  (dc: DataConnect, vars: GetExperienceVariables): QueryRef<GetExperienceData, GetExperienceVariables>;
}
export const getExperienceRef: GetExperienceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getExperienceRef:
```typescript
const name = getExperienceRef.operationName;
console.log(name);
```

### Variables
The `GetExperience` query requires an argument of type `GetExperienceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetExperienceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetExperience` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetExperienceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetExperience`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getExperience, GetExperienceVariables } from '@dataconnect/generated';

// The `GetExperience` query requires an argument of type `GetExperienceVariables`:
const getExperienceVars: GetExperienceVariables = {
  id: ..., 
};

// Call the `getExperience()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getExperience(getExperienceVars);
// Variables can be defined inline as well.
const { data } = await getExperience({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getExperience(dataConnect, getExperienceVars);

console.log(data.experience);

// Or, you can use the `Promise` API.
getExperience(getExperienceVars).then((response) => {
  const data = response.data;
  console.log(data.experience);
});
```

### Using `GetExperience`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getExperienceRef, GetExperienceVariables } from '@dataconnect/generated';

// The `GetExperience` query requires an argument of type `GetExperienceVariables`:
const getExperienceVars: GetExperienceVariables = {
  id: ..., 
};

// Call the `getExperienceRef()` function to get a reference to the query.
const ref = getExperienceRef(getExperienceVars);
// Variables can be defined inline as well.
const ref = getExperienceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getExperienceRef(dataConnect, getExperienceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.experience);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.experience);
});
```

## ListExperiencesByCategory
You can execute the `ListExperiencesByCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listExperiencesByCategory(vars: ListExperiencesByCategoryVariables): QueryPromise<ListExperiencesByCategoryData, ListExperiencesByCategoryVariables>;

interface ListExperiencesByCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListExperiencesByCategoryVariables): QueryRef<ListExperiencesByCategoryData, ListExperiencesByCategoryVariables>;
}
export const listExperiencesByCategoryRef: ListExperiencesByCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listExperiencesByCategory(dc: DataConnect, vars: ListExperiencesByCategoryVariables): QueryPromise<ListExperiencesByCategoryData, ListExperiencesByCategoryVariables>;

interface ListExperiencesByCategoryRef {
  ...
  (dc: DataConnect, vars: ListExperiencesByCategoryVariables): QueryRef<ListExperiencesByCategoryData, ListExperiencesByCategoryVariables>;
}
export const listExperiencesByCategoryRef: ListExperiencesByCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listExperiencesByCategoryRef:
```typescript
const name = listExperiencesByCategoryRef.operationName;
console.log(name);
```

### Variables
The `ListExperiencesByCategory` query requires an argument of type `ListExperiencesByCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListExperiencesByCategoryVariables {
  category: string;
}
```
### Return Type
Recall that executing the `ListExperiencesByCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListExperiencesByCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListExperiencesByCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listExperiencesByCategory, ListExperiencesByCategoryVariables } from '@dataconnect/generated';

// The `ListExperiencesByCategory` query requires an argument of type `ListExperiencesByCategoryVariables`:
const listExperiencesByCategoryVars: ListExperiencesByCategoryVariables = {
  category: ..., 
};

// Call the `listExperiencesByCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listExperiencesByCategory(listExperiencesByCategoryVars);
// Variables can be defined inline as well.
const { data } = await listExperiencesByCategory({ category: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listExperiencesByCategory(dataConnect, listExperiencesByCategoryVars);

console.log(data.experiences);

// Or, you can use the `Promise` API.
listExperiencesByCategory(listExperiencesByCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.experiences);
});
```

### Using `ListExperiencesByCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listExperiencesByCategoryRef, ListExperiencesByCategoryVariables } from '@dataconnect/generated';

// The `ListExperiencesByCategory` query requires an argument of type `ListExperiencesByCategoryVariables`:
const listExperiencesByCategoryVars: ListExperiencesByCategoryVariables = {
  category: ..., 
};

// Call the `listExperiencesByCategoryRef()` function to get a reference to the query.
const ref = listExperiencesByCategoryRef(listExperiencesByCategoryVars);
// Variables can be defined inline as well.
const ref = listExperiencesByCategoryRef({ category: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listExperiencesByCategoryRef(dataConnect, listExperiencesByCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.experiences);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.experiences);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddReview
You can execute the `AddReview` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addReview(vars: AddReviewVariables): MutationPromise<AddReviewData, AddReviewVariables>;

interface AddReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddReviewVariables): MutationRef<AddReviewData, AddReviewVariables>;
}
export const addReviewRef: AddReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addReview(dc: DataConnect, vars: AddReviewVariables): MutationPromise<AddReviewData, AddReviewVariables>;

interface AddReviewRef {
  ...
  (dc: DataConnect, vars: AddReviewVariables): MutationRef<AddReviewData, AddReviewVariables>;
}
export const addReviewRef: AddReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addReviewRef:
```typescript
const name = addReviewRef.operationName;
console.log(name);
```

### Variables
The `AddReview` mutation requires an argument of type `AddReviewVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddReviewVariables {
  bookingId: UUIDString;
  experienceId: UUIDString;
  travelerId: UUIDString;
  comment: string;
  rating: number;
}
```
### Return Type
Recall that executing the `AddReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddReviewData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddReviewData {
  review_insert: Review_Key;
}
```
### Using `AddReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addReview, AddReviewVariables } from '@dataconnect/generated';

// The `AddReview` mutation requires an argument of type `AddReviewVariables`:
const addReviewVars: AddReviewVariables = {
  bookingId: ..., 
  experienceId: ..., 
  travelerId: ..., 
  comment: ..., 
  rating: ..., 
};

// Call the `addReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addReview(addReviewVars);
// Variables can be defined inline as well.
const { data } = await addReview({ bookingId: ..., experienceId: ..., travelerId: ..., comment: ..., rating: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addReview(dataConnect, addReviewVars);

console.log(data.review_insert);

// Or, you can use the `Promise` API.
addReview(addReviewVars).then((response) => {
  const data = response.data;
  console.log(data.review_insert);
});
```

### Using `AddReview`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addReviewRef, AddReviewVariables } from '@dataconnect/generated';

// The `AddReview` mutation requires an argument of type `AddReviewVariables`:
const addReviewVars: AddReviewVariables = {
  bookingId: ..., 
  experienceId: ..., 
  travelerId: ..., 
  comment: ..., 
  rating: ..., 
};

// Call the `addReviewRef()` function to get a reference to the mutation.
const ref = addReviewRef(addReviewVars);
// Variables can be defined inline as well.
const ref = addReviewRef({ bookingId: ..., experienceId: ..., travelerId: ..., comment: ..., rating: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addReviewRef(dataConnect, addReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.review_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.review_insert);
});
```

## CreateWishlist
You can execute the `CreateWishlist` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createWishlist(vars: CreateWishlistVariables): MutationPromise<CreateWishlistData, CreateWishlistVariables>;

interface CreateWishlistRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWishlistVariables): MutationRef<CreateWishlistData, CreateWishlistVariables>;
}
export const createWishlistRef: CreateWishlistRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createWishlist(dc: DataConnect, vars: CreateWishlistVariables): MutationPromise<CreateWishlistData, CreateWishlistVariables>;

interface CreateWishlistRef {
  ...
  (dc: DataConnect, vars: CreateWishlistVariables): MutationRef<CreateWishlistData, CreateWishlistVariables>;
}
export const createWishlistRef: CreateWishlistRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createWishlistRef:
```typescript
const name = createWishlistRef.operationName;
console.log(name);
```

### Variables
The `CreateWishlist` mutation requires an argument of type `CreateWishlistVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateWishlistVariables {
  travelerId: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `CreateWishlist` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateWishlistData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateWishlistData {
  wishlist_insert: Wishlist_Key;
}
```
### Using `CreateWishlist`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createWishlist, CreateWishlistVariables } from '@dataconnect/generated';

// The `CreateWishlist` mutation requires an argument of type `CreateWishlistVariables`:
const createWishlistVars: CreateWishlistVariables = {
  travelerId: ..., 
  name: ..., 
};

// Call the `createWishlist()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createWishlist(createWishlistVars);
// Variables can be defined inline as well.
const { data } = await createWishlist({ travelerId: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createWishlist(dataConnect, createWishlistVars);

console.log(data.wishlist_insert);

// Or, you can use the `Promise` API.
createWishlist(createWishlistVars).then((response) => {
  const data = response.data;
  console.log(data.wishlist_insert);
});
```

### Using `CreateWishlist`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createWishlistRef, CreateWishlistVariables } from '@dataconnect/generated';

// The `CreateWishlist` mutation requires an argument of type `CreateWishlistVariables`:
const createWishlistVars: CreateWishlistVariables = {
  travelerId: ..., 
  name: ..., 
};

// Call the `createWishlistRef()` function to get a reference to the mutation.
const ref = createWishlistRef(createWishlistVars);
// Variables can be defined inline as well.
const ref = createWishlistRef({ travelerId: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createWishlistRef(dataConnect, createWishlistVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.wishlist_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.wishlist_insert);
});
```

