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
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  consume: Array<Message>;
  hello?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
};

export type QueryConsumeArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

export type QueryStatusArgs = {
  id: Scalars['ID'];
};

export type Message = {
  __typename?: 'Message';
  availableAt: Scalars['Date'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  completed: Scalars['Boolean'];
  produce: Message;
};

export type MutationCompletedArgs = {
  id: Scalars['ID'];
};

export type MutationProduceArgs = {
  text: Scalars['String'];
};
