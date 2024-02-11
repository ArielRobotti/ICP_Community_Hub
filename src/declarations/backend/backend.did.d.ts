import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Comment {
  'id' : bigint,
  'content' : string,
  'autor' : Principal,
  'date' : bigint,
}
export interface DaoFounder { 'principal' : Principal, 'name' : string }
export interface ICP_Community_Hub {
  'addAdmin' : ActorMethod<[string], boolean>,
  'addComment' : ActorMethod<[TutoId__1, string], boolean>,
  'aprovePublication' : ActorMethod<[bigint], Result>,
  'deleteComment' : ActorMethod<[TutoId__1, bigint], boolean>,
  'deployDaoCanister' : ActorMethod<
    [string, string, Array<DaoFounder>, bigint],
    Principal
  >,
  'editComment' : ActorMethod<[TutoId__1, bigint, string], boolean>,
  'getAprovedPublication' : ActorMethod<[], Array<[TutoId__1, Publication]>>,
  'getIncomingPublication' : ActorMethod<[], Array<Publication>>,
  'getMiId' : ActorMethod<[], [] | [bigint]>,
  'getMiUser' : ActorMethod<[], [] | [User]>,
  'getPrincipalDao' : ActorMethod<[], string>,
  'getPubByID' : ActorMethod<[bigint], [] | [Publication]>,
  'getPubFromUser' : ActorMethod<[bigint], Array<Publication>>,
  'getUsers' : ActorMethod<[], Array<User>>,
  'iamAdmin' : ActorMethod<[], boolean>,
  'iamRegistered' : ActorMethod<[], boolean>,
  'isDaoDeployed' : ActorMethod<[], boolean>,
  'loadAvatar' : ActorMethod<
    [Uint8Array | number[]],
    [] | [Uint8Array | number[]]
  >,
  'qualifyPost' : ActorMethod<[TutoId__1, bigint], boolean>,
  'rejectPublication' : ActorMethod<[bigint], Result>,
  'search' : ActorMethod<[string], Array<Publication>>,
  'signUp' : ActorMethod<
    [string, [] | [string], [] | [Uint8Array | number[]]],
    SignUpResult
  >,
  'uploadTutorial' : ActorMethod<[Tutorial], PublishResult>,
  'userConfig' : ActorMethod<[UserSettings], undefined>,
  'whoAmi' : ActorMethod<[], string>,
}
export interface Publication {
  'content' : Tutorial__1,
  'autor' : bigint,
  'date' : bigint,
  'qualifyQty' : bigint,
  'qualifySum' : bigint,
  'comments' : Array<Comment>,
}
export type PublishResult = { 'ok' : Publication } |
  { 'err' : string };
export type Result = { 'ok' : null } |
  { 'err' : string };
export type SignUpErrors = { 'InBlackList' : null } |
  { 'CallerAnnonymous' : null } |
  { 'IsAlreadyAMember' : null };
export type SignUpResult = { 'ok' : User } |
  { 'err' : SignUpErrors };
export type TutoId = bigint;
export type TutoId__1 = bigint;
export interface Tutorial {
  'title' : string,
  'html' : string,
  'assets' : Array<Uint8Array | number[]>,
  'tags' : Array<string>,
}
export interface Tutorial__1 {
  'title' : string,
  'html' : string,
  'assets' : Array<Uint8Array | number[]>,
  'tags' : Array<string>,
}
export interface User {
  'country' : [] | [string],
  'admissionDate' : bigint,
  'name' : string,
  'email' : [] | [string],
  'postPublicated' : Array<TutoId>,
  'votedPosts' : Array<bigint>,
  'avatar' : [] | [Uint8Array | number[]],
}
export interface UserSettings {
  'country' : [] | [string],
  'name' : [] | [string],
  'email' : [] | [string],
  'avatar' : [] | [Uint8Array | number[]],
}
export interface _SERVICE extends ICP_Community_Hub {}
export declare const idlFactory: IDL.InterfaceFactory;
