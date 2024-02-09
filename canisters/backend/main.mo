// Imports for base library structures
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Bool "mo:base/Bool";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Internal "mo:⛔";
import Principal "mo:base/Principal";

// Imports for custom structures
import HashMap "libs/FunctionalStableHashMap";
import Dao "Dao"; //Actor class for deploying the DAO from this canister
import Types "./types/Types";
import { tutoIdHash; tutoIdEqual } = "./types/Types";
// import User "./types/user";

shared ({ caller = deployer }) actor class ICP_Community_Hub() = {

  public type Tutorial = Types.Tutorial;
  public type Publication = Types.Publication;
  public type Comment = Types.Comment;
  public type User = Types.User;
  public type SignUpResult = Result.Result<User, Types.SignUpErrors>;
  public type PublishResult = Result.Result<Publication, Text>;
  public type TutoId = Nat;
  public type UserId = Nat;
  public type UserSettings = Types.UserSettings;
  public type DaoFounder = Types.DaoFounder;

  // stable var currentUserId = 0;
  // stable var currentTutorialId = 0;
  stable var admins : [Principal] = [deployer];

  stable let userIds = HashMap.init<Principal, UserId>();
  stable let users = HashMap.init<UserId, User>();
  stable let blackList = HashMap.init<Principal, ()>();
  stable let incomingPublications = HashMap.init<TutoId, Publication>();
  stable let aprovedPublications = HashMap.init<TutoId, Publication>();

  stable var counterGeneralId = 0;
  stable var DAO = Principal.fromText("aaaaa-aa");

  // -------------- Function to deploy the DAO canister  bw4dl-smaaa-aaaaa-qaacq-cai -----------

  public shared ({ caller }) func deployDaoCanister(_name : Text, _manifesto : Text, founders : [DaoFounder], extraFees : Nat) : async Principal {
    //Considering that this function will be executed only once, it is suggested to execute it directly from the CLI to
    //save time associated with the development of a form in the front.
    //Upon a second execution attempt, an assertion error will be thrown;
    //Evaluate the possibility of returning #err(Text) indicating the Main ID of the Dao in this case
    // execution example using dfx CLI

    /* dfx canister call backend deployDaoCanister '("<DaoName>", "Manifiesto", vec {
          record {
            name = "Ariel";
            "principal" = principal "<Principal ID de Ariel>";
          };
          record {
            name = "Daniel";
            "principal" = principal "<Principal ID de Daniel>";
          };
          record {
            name = "Juan";
            "principal" = principal "<Principal ID Juan>";
          };

      }, 0)' */
    // 3_150 additional cycles were requested. Repeat the execution placing said ammount in the last parameter of the call instead of 0

    assert (isAdmin(caller));
    assert (not daoIsDeployed()); // This prevents the function from being executed more than once.
    Internal.cyclesAdd(13_846_199_230 + extraFees); // FEE to create a canister 13 846 199 230
    let daoCanister = await Dao.Dao(_name, _manifesto, founders); // Creation of canister for the DAO
    DAO := Principal.fromActor(daoCanister);
    return DAO
  };

  // -------------------------- Private Fuctions -------------------------------
  func daoIsDeployed() : Bool {
    Principal.fromText("aaaaa-aa") != DAO
  };

  func generateId() : Nat {
    counterGeneralId += 1;
    counterGeneralId - 1
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

  func isUser(p : Principal) : Bool {
    return switch (HashMap.get(userIds, Principal.equal, Principal.hash, p)) {
      case null { false };
      case _ { true }
    }
  };

  func getUser(p : Principal) : ?User {
    switch (HashMap.get(userIds, Principal.equal, Principal.hash, p)) {
      case null { null };
      case (?userId) { HashMap.get(users, Nat.equal, Nat32.fromNat, userId) }
    }
  };

  func validateEjecution(_caller : Principal) : () {
    ///If the DAO is deployed and _caller is not the DAO it throws an assertion error
    ///If the DAO is NOT deployed and _caller is not an admin it throws an error
    if (daoIsDeployed()) {
      assert _caller == DAO
    } else {
      (assert isAdmin(_caller))
    }
  };

  //----- if DAO, only DAO, else only admins -----------------------------------

  public shared ({ caller }) func aprovePublication(id : Nat) : async Result.Result<(), Text> {
    validateEjecution(caller);

    let pub = HashMap.remove(incomingPublications, tutoIdEqual, tutoIdHash, id);
    switch (pub) {
      case null { return #err("Tutorial id does not exist") };
      case (?tuto) {
        let autor = HashMap.get(users, Nat.equal, Nat32.fromNat, tuto.autor);
        switch autor {
          case null { return #err("Error inesperado :P") };
          case (?autor) {
            let updatPublications = Buffer.fromArray<Nat>(autor.postPublicated);
            updatPublications.add(id);
            let updateAutor = { autor with postPublicated = updatPublications }
          };
        };
        HashMap.put(aprovedPublications, tutoIdEqual, tutoIdHash, id, tuto);
        return #ok()
      }
    }
  };

  public shared ({ caller }) func rejectPublication(id : Nat) : async Result.Result<(), Text> {
    validateEjecution(caller);

    let pub = HashMap.remove(incomingPublications, tutoIdEqual, tutoIdHash, id);
    return switch (pub) {
      case null { #err("Tutorial id does not exist") };
      case (_) { #ok() }
    }
  };

  public shared ({ caller }) func getIncomingPublication() : async [Publication] {
    validateEjecution(caller);
    return Iter.toArray(HashMap.vals(incomingPublications))
  };

  //----------- Only Admins functions -----------------------------------------------

  public shared ({ caller }) func addAdmin(p : Text) : async Bool {
    assert (isAdmin(caller));
    for (a in admins.vals()) { if (a == Principal.fromText(p)) { return true } };
    var tempBuffer = Buffer.fromArray<Principal>(admins);
    tempBuffer.add(Principal.fromText(p));

    admins := Buffer.toArray<Principal>(tempBuffer);
    true
  };

  //----------------- Public shared functions ---------------------------------------

  public shared query ({ caller }) func whoAmi() : async Text {
    "Soy " # Principal.toText(caller)
  };

  public shared ({ caller }) func signUp(name : Text, email : ?Text, avatar : ?Blob) : async SignUpResult {

    if (Principal.isAnonymous(caller)) {
      return #err(#CallerAnnonymous)
    };
    if (inBlackList(caller)) {
      return #err(#InBlackList)
    };
    let user = HashMap.get(userIds, Principal.equal, Principal.hash, caller);
    switch (user) {
      case null {
        let timestamp = Time.now() / 1_000_000_000 : Int; //Timestamp in seconds
        let userId = generateId();
        HashMap.put(userIds, Principal.equal, Principal.hash, caller, userId);

        let newUser : User = {
          name;
          email;
          country = null;
          admissionDate = timestamp;
          avatar;
          votedPosts : [Nat] = [];
          postPublicated : [TutoId] = []
        };
        // users.put(currentUserId,newMember);
        HashMap.put(users, Nat.equal, Nat32.fromNat, userId, newUser);
        return #ok(newUser)
      };
      case (?member) {
        return #err(#IsAlreadyAMember)
      }
    }
  };

  public shared ({ caller }) func iamRegistered() : async Bool {
    return switch (HashMap.get(userIds, Principal.equal, Principal.hash, caller)) {
      case null { false };
      case _ { true }
    }
  };

  public shared ({ caller }) func getMiId() : async ?Nat {
    assert not Principal.isAnonymous(caller);
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
          user with
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
          }
        };
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
            // It is suggested to compress the image in the front before sending it to this function
            HashMap.put(users, Nat.equal, Nat32.fromNat, userId, { user with avatar = ?avatar });
            return ?avatar
          }
        }
      }
    }
  };

  public shared ({ caller }) func uploadTutorial(content : Tutorial) : async PublishResult {
    switch (HashMap.get(userIds, Principal.equal, Principal.hash, caller)) {
      case null { return #err("Caller is not a member") };
      case (?userId) {
        let date = Time.now() / 1_000_000_000 : Int;
        let pub = {
          autor = userId;
          date;
          content;
          qualifyQty = 0;
          qualifySum = 0;
          comments = []
        };
        HashMap.put(incomingPublications, tutoIdEqual, tutoIdHash, generateId(), pub);
        #ok(pub)
      }
    }
  };

  public shared ({ caller }) func addComment(_id : TutoId, content : Text) : async Bool {
    assert (isUser(caller));
    switch (HashMap.get(aprovedPublications, tutoIdEqual, tutoIdHash, _id)) {
      case null { return false };
      case (?pub) {
        let commentBuffer = Buffer.fromArray<Comment>(pub.comments);
        let comment = {
          id = generateId();
          autor = caller;
          content;
          date = Time.now()
        };
        commentBuffer.add(comment);
        let updatePub = { pub with comments = Buffer.toArray(commentBuffer) };
        HashMap.put(aprovedPublications, tutoIdEqual, tutoIdHash, _id, updatePub);
        return true
      }
    }
  };

  public shared ({ caller }) func editComment(_id : TutoId, _commentId : Nat, _updateContent : Text) : async Bool {
    assert (isUser(caller));
    let pub = HashMap.get(aprovedPublications, tutoIdEqual, tutoIdHash, _id);
    switch (pub) {
      case null { return false };
      case (?pub) {
        var index = 0;
        for (comment in pub.comments.vals()) {
          if (comment.id == _commentId) {
            assert (comment.autor == caller);
            let commentsUpdate = Buffer.fromArray<Comment>(pub.comments);
            let old = commentsUpdate.remove(index);
            commentsUpdate.insert(index, { old with content = _updateContent });

            let updatePub = {
              pub with comments = Buffer.toArray(commentsUpdate)
            };
            HashMap.put(aprovedPublications, tutoIdEqual, tutoIdHash, _id, updatePub);
            return true
          };
          index += 1
        };
        return false
      }
    }
  };

  public shared ({ caller }) func deleteComment(_id : TutoId, _commentId : Nat) : async Bool {
    assert (isUser(caller));
    let pub = HashMap.get(aprovedPublications, tutoIdEqual, tutoIdHash, _id);
    switch (pub) {
      case null { return false };
      case (?pub) {
        var index = 0;
        for (comment in pub.comments.vals()) {
          if (comment.id == _commentId) {
            assert (comment.autor == caller);
            let commentsUpdate = Buffer.fromArray<Comment>(pub.comments);
            ignore commentsUpdate.remove(index);
            return true
          };
          index += 1
        };
        return false
      }
    }
  };

  public shared ({ caller }) func qualifyPost(_id : TutoId, q : Nat) : async Bool {
    assert (q >= 1 and q <= 5);
    switch (getUser(caller)) {
      case (?user) {
        for (postId in user.votedPosts.vals()) {
          if (postId == _id) {
            return false
          }
        };
        switch (HashMap.get(aprovedPublications, tutoIdEqual, tutoIdHash, _id)) {
          case (?pub) {
            let updatePub = {
              pub with
              qualifyQty = pub.qualifyQty + 1;
              qualifySum = pub.qualifySum + q
            };
            HashMap.put(aprovedPublications, tutoIdEqual, tutoIdHash, _id, updatePub);
            return true
          };
          case _ { return false }
        }
      };
      case _ { return false }
    }
  };

  //---------------------------------------------------------------------------------

  //---------------- Query functions ------------------------------------------------

  public query func getUsers() : async [User] {
    //Public??
    Iter.toArray<User>(HashMap.vals(users))
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

}
