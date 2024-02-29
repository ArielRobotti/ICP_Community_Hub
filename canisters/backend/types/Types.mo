import Nat32 "mo:base/Nat32";
import HashMap "../libs/FunctionalStableHashMap";
module {

    public type DaoFounder = {
        name : Text;
        principal : Principal;
    };

    public type Member = {
        name : Text;
        admissionDate : Int;
        votedTutoId : [TutoId];
        enabled : Bool;
        //score: Nat;
        //account: Account;
    };

    public type UserSettings = {
        name : ?Text;
        email : ?Text;
        avatar : ?Blob;
        country : ?Text
    };
    public type User = {
        name : Text;
        email : ?Text;
        avatar : ?Blob;
        admissionDate : Int; //Timestamp in secconds
        country : ?Text;
        //account: Account;
        votedPosts : [Nat];
        postPublicated : [TutoId]
    };

    public type SignUpErrors = {
        #CallerAnnonymous;
        #IsAlreadyAMember;
        #InBlackList
    };

    public type VotingStatus = {
        startRound: Int; //Timestamp de la publicación
        votes: Nat;
        balance: Int;
        end: Bool;
    };

    public type Mode = {
        #Add;
        #Remove
    };

    public type Tutorial = {
        title : Text; //Limitar a 100 caracteres
        description: Text;
        tags : [Text];
        html : Text; //Se genera automaticamente desde el front
        assets : [Blob];
        //La hoja de estilos es comun para todos los tutoriales
    };
    public type TutoId = Nat;

    public func tutoIdHash(a : Nat) : Nat32 { Nat32.fromNat(a) };

    public func tutoIdEqual(a : TutoId, b : TutoId) : Bool { a == b };

    public type Publication = {
        id: TutoId;
        autor : Nat;
        date : Int; //Timestamp
        content : Tutorial;
        qualifyQty: Nat;
        qualifySum: Nat;
        comments: [Comment];
    };

    public let PUBLICATION_NOT_FOUND: Publication = {
        id = 0;
        autor = 0;
        date = 0:Int; //Timestamp
        content = {title = ""; description = "";tags = [];html="";assets=[]};
        qualifyQty=0;
        qualifySum=0;
        comments=[];
    };

    public type Comment = {
        id: Nat;
        autor : Principal;
        content : Text;
        date : Int;
    }

}
