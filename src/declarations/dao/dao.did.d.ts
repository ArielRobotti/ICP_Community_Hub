import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Dao {
  'addMember' : ActorMethod<[Principal, string], boolean>,
  'disableMember' : ActorMethod<[Principal], boolean>,
  'eneableMember' : ActorMethod<[Principal], boolean>,
  'getManifesto' : ActorMethod<[], string>,
  'getName' : ActorMethod<[], string>,
  'getmembersQty' : ActorMethod<[], bigint>,
  'isAMember' : ActorMethod<[], boolean>,
  'votePublication' : ActorMethod<[TutoId, bigint, boolean], boolean>,
  'whoAmi' : ActorMethod<[], Principal>,
}
export interface DaoFounder { 'principal' : Principal, 'name' : string }
export type TutoId = bigint;
export interface _SERVICE extends Dao {}
export declare const idlFactory: IDL.InterfaceFactory;
