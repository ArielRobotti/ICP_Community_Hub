import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface DaoFounder { 'principal' : Principal, 'name' : string }
export interface ICP_Community_Hub {
  'addAdmin' : ActorMethod<[string], boolean>,
  'aprovePublication' : ActorMethod<[bigint], Result>,
  'deployDaoCanister' : ActorMethod<
    [string, string, Array<DaoFounder>, bigint],
    Principal
  >,
  'getAprovedPublication' : ActorMethod<[], Array<[TutoId, Publication]>>,
  'getIncomingPublication' : ActorMethod<[], Array<Publication>>,
  'getMiId' : ActorMethod<[], [] | [bigint]>,
  'getMiUser' : ActorMethod<[], [] | [User]>,
  'getPubByID' : ActorMethod<[bigint], [] | [Publication]>,
  'getPubFromUser' : ActorMethod<[bigint], Array<Publication>>,
  'getUsers' : ActorMethod<[], Array<User>>,
  'iamRegistered' : ActorMethod<[], boolean>,
  'loadAvatar' : ActorMethod<
    [Uint8Array | number[]],
    [] | [Uint8Array | number[]]
  >,
  'publish' : ActorMethod<[Tutorial__1], PublishResult>,
  'rejectPublication' : ActorMethod<[bigint], Result>,
  'search' : ActorMethod<[string], Array<Publication>>,
  'signUp' : ActorMethod<
    [string, [] | [string], [] | [Uint8Array | number[]]],
    SignUpResult
  >,
  'userConfig' : ActorMethod<[UserSettings], undefined>,
}
export interface Publication {
  'content' : Tutorial,
  'autor' : bigint,
  'date' : bigint,
  'score' : [] | [number],
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
