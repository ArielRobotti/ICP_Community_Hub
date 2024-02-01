import Nat32 "mo:base/Nat32";
import HashMap "libs/FunctionalStableHashMap";
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
        tags : [Text];
        html : Text; //Se genera automaticamente desde el front
        assets : [Blob];
        //La hoja de estilos es comun para todos los tutoriales
    };
    public type TutoId = Nat;

    public func tutoIdHash(a : Nat) : Nat32 { Nat32.fromNat(a) };

    public func tutoIdEqual(a : TutoId, b : TutoId) : Bool { a == b };

    public type Publication = {
        autor : Nat;
        date : Int; //Timestamp
        content : Tutorial;
        qualifyQty: Nat;
        qualifySum: Nat;
        comments: [Comment];
    };

    public type Comment = {
        id: Nat;
        autor : Principal;
        content : Text;
        date : Int;
    }

}
