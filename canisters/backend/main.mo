import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
// import HashMap "mo:base/HashMap";
import HashMap "libs/FunctionalStableHashMap";
import Result "mo:base/Result";
import Types "Types";
import { tutoIdHash; tutoIdEqual } = "Types";
import User "user";
import Account "account";

import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Bool "mo:base/Bool";

shared ({ caller }) actor class ICPTutorials() = {

  let DAO = Principal.fromText("aaaaa-aa");

  public type Tutorial = Types.Tutorial;
  public type Publication = Types.Publication;
  public type Account = Account.Account;
  public type User = User.User;
  public type SignUpResult = Result.Result<User, User.SignUpErrors>;
  public type PublishResult = Result.Result<Publication, Text>;
  public type TutoId = Nat;
  public type UserId = Nat;
  public type UserSettings = User.UserSettings;

  stable var currentUserId = 0;
  stable var currentTutorialId = 0;
  stable var admins : [Principal] = [caller];


  stable let userIds = HashMap.init<Principal, UserId>();
  stable let users = HashMap.init<UserId, User>();
  stable let blackList = HashMap.init<Principal, ()>();
  stable let incomingPublications = HashMap.init<TutoId, Publication>();
  stable let aprovedPublications = HashMap.init<TutoId, Publication>();

  // public shared ({caller}) func deployDaoCanister();

  public query func getUsers() : async [User] {
    Iter.toArray<User>(HashMap.vals(users))
  };

  func inBlackList(p : Principal) : Bool {
    return switch (HashMap.get(blackList, Principal.equal, Principal.hash, p)) {
      case null { false };
      case _ { true }
    }
  };
  func isAdmin(p : Principal) : Bool {
    for (a in admins.vals()) {
      if (a == p) { return true }
    };
    false
  };

  public shared ({ caller }) func addAdmin(p : Text) : async Bool {
    assert (isAdmin(caller));
    for (a in admins.vals()) { if (a == Principal.fromText(p)) { return true } };
    var tempBuffer = Buffer.fromArray<Principal>(admins);
    tempBuffer.add(Principal.fromText(p));

    admins := Buffer.toArray<Principal>(tempBuffer);
    true
  };

  public shared ({ caller }) func signUp(name : Text, _email : ?Text, _avatar : ?Blob) : async SignUpResult {
    //TODO: Validación de campos
    if (Principal.isAnonymous(caller)) { return #err(#CallerAnnonymous) };
    if (inBlackList(caller)) { return #err(#InBlackList) };
    switch (HashMap.get(userIds, Principal.equal, Principal.hash, caller)) {
      case null {
        let timestamp = Time.now() / 1_000_000_000 : Int; //Timestamp in seconds
        HashMap.put(userIds, Principal.equal, Principal.hash, caller, currentUserId);

        let newMember = {
          name;
          email = _email;
          country = null;
          admissionDate = timestamp;
          avatar = _avatar;
          votedPosts = []
        };
        // users.put(currentUserId,newMember);
        HashMap.put(users, Nat.equal, Nat32.fromNat, currentUserId, newMember);
        currentUserId += 1;
        return #ok(newMember)
      };
      case (?member) {
        return #err(#IsAlreadyAMember)
      }
    }
  };

  public shared ({ caller }) func isRegistered() : async Bool {
    return switch (HashMap.get(userIds, Principal.equal, Principal.hash, caller)) {
      case null { false };
      case _ { true }
    }
  };
  public shared ({ caller }) func getMiId() : async ?Nat {
    HashMap.get(userIds, Principal.equal, Principal.hash, caller)
  };

  public shared ({ caller }) func getMiUser() : async ?User {
    assert not Principal.isAnonymous(caller);
    switch (HashMap.get(userIds, Principal.equal, Principal.hash, caller)) {
      case null { return null };
      case (?userId) {
        return HashMap.get(users, Nat.equal, Nat32.fromNat, userId)
      }
    }
  };

  public shared ({ caller }) func userConfig(settings : UserSettings) : async () {
    switch (getUser(caller)) {
      case null {};
      case (?user) {
        var userId = 0;
        switch (HashMap.get(userIds, Principal.equal, Principal.hash, caller)) {
          case null { return };
          case (?id) { userId := id }
        };
        let updateUser = {
          name = switch (settings.name) {
            case null { user.name };
            case (?newName) { newName }
          };
          avatar = switch (settings.avatar) {
            case null { user.avatar };
            case (newAvatar) { newAvatar }
          };
          country = switch (settings.country) {
            case null { user.country };
            case (newCountry) { newCountry }
          };
          email = switch (settings.email) {
            case null { user.email };
            case (email) { email }
          };
          votedPosts = user.votedPosts;
          admissionDate = user.admissionDate
        };
        // users.put(userId,updateUser);
        HashMap.put<UserId, User>(users, Nat.equal, Nat32.fromNat, userId, updateUser)
      }
    }
  };

  public shared ({ caller }) func loadAvatar(avatar : Blob) : async ?Blob {
    switch (HashMap.get(userIds, Principal.equal, Principal.hash, caller)) {
      case null { return null };
      case (?userId) {
        switch (HashMap.get(users, Nat.equal, Nat32.fromNat, userId)) {
          case null { return null };
          case (?user) {
            //comprimir la imagen
            var userUpdate = {
              email = user.email;
              name = user.name;
              country = user.country;
              admissionDate = user.admissionDate; //Timestamp in secconds
              avatar = ?avatar;
              votedPosts = user.votedPosts
            };
            HashMap.put(users, Nat.equal, Nat32.fromNat, userId, userUpdate);
            return userUpdate.avatar
          }
        }
      }
    }
  };

  func isUser(p : Principal) : Bool {
    return switch (HashMap.get(userIds, Principal.equal, Principal.hash, p)) {
      case null { false };
      case _ { true }
    }
  };

  public shared ({ caller }) func publish(content : Tutorial) : async PublishResult {
    switch (HashMap.get(userIds, Principal.equal, Principal.hash, caller)) {
      case null { return #err("Caller is not a member") };
      case (?userId) {
        let date = Time.now() / 1_000_000_000 : Int;
        let pub = {
          autor = userId;
          date;
          content;
          score = null
        };
        // incomingPublications.put(currentTutorialId, pub);
        HashMap.put(incomingPublications, tutoIdEqual, tutoIdHash, currentTutorialId, pub);

        currentTutorialId += 1;
        #ok(pub)
      }
    }
  };

  func getUser(p : Principal) : ?User {
    switch (HashMap.get(userIds, Principal.equal, Principal.hash, p)) {
      case null { null };
      case (?userId) { HashMap.get(users, Nat.equal, Nat32.fromNat, userId) }
    }
  };

  public shared ({ caller }) func aprovePublication(id : Nat) : async Result.Result<(), Text> {
    // assert (caller != DAO);
    assert (isAdmin(caller));

    let pub = HashMap.remove(incomingPublications, tutoIdEqual, tutoIdHash, id);
    switch (pub) {
      case null { return #err("Tutorial id does not exist") };
      case (?tuto) {
        HashMap.put(aprovedPublications, tutoIdEqual, tutoIdHash, id, tuto);
        return #ok()
      }
    }
  };

  public shared ({ caller }) func rejectPublication(id : Nat) : async Result.Result<(), Text> {
    //assert (caller != DAO);
    assert (isAdmin(caller));
    let pub = HashMap.remove(incomingPublications, tutoIdEqual, tutoIdHash, id);
    return switch (pub) {
      case null { #err("Tutorial id does not exist") };
      case (_) { #ok() }
    }
  };

  public shared ({ caller }) func getIncomingPublication() : async [Publication] {
    //assert (caller != DAO);
    assert (isAdmin(caller));
    return Iter.toArray(HashMap.vals(incomingPublications))
  };

  public query func getAprovedPublication() : async [(TutoId, Publication)] {
    return Iter.toArray(HashMap.entries(aprovedPublications))
  };

  public query func getPubFromUser(userId : Nat) : async [Publication] {
    var pubs = Iter.toArray(HashMap.vals(aprovedPublications));
    Array.filter<Publication>(pubs, func x : Bool { x.autor == userId })
  };

  public query func getPubByID(id : Nat) : async ?Publication {
    HashMap.get(aprovedPublications, tutoIdEqual, tutoIdHash, id)
  };

  public query func search(target : Text) : async [Publication] {
    var tokens = Iter.fromArray<Text>([]);
    let pubs = HashMap.vals(aprovedPublications);
    let tempBuffer = Buffer.fromArray<Publication>([]);
    label for0 loop {
      switch (pubs.next()) {
        case (?pub) {
          tokens := Text.split(target, #char(' '));
          label for1 loop {
            switch (tokens.next()) {
              case (?p) {
                if (Text.contains(pub.content.title, #text(p))) {
                  tempBuffer.add(pub);
                  break for1
                }
              };
              case (null) break for1
            }
          }
        };
        case null { break for0 }
      }
    };
    Buffer.toArray<Publication>(tempBuffer)
  };



  /*
  func inArray<T>(a: [T], e: T): Bool{
    for(elem in a.vals()){
      if(elem == e){return true};
    };
    return false;
  };

  public shared ({caller}) func qualify(id: TutoId, q: Nat): async Bool{
    switch(getUser(caller)){
      case null {return false };
      case(?user){
        if(inArray<TutoId>(user.votedPosts, id)){
          return false;
        };

      };
    };
  };
  */

}
