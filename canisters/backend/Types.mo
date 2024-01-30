import Nat32 "mo:base/Nat32";
import HashMap "mo:base/HashMap";
module{

    public type DaoInit = {

    };

    public type Member = {
        name: Text;
        admissionDate: Int;
        votedTutoId: [TutoId];
        enabled: Bool;
        //score: Nat;
        //account: Account;
    };

    public type Mode = {
        #Add;
        #Remove;
    };

    public type Tutorial = {
        title: Text;  //Limitar a 100 caracteres
        tags: [Text];
        html: Text; //Se genera automaticamente desde el front
        assets: [Blob];
        //La hoja de estilos es comun para todos los tutoriales    
    };
    public type TutoId = Nat;

    public func tutoIdHash(a : Nat): Nat32 { Nat32.fromNat(a) };

    public func tutoIdEqual(a: TutoId, b: TutoId): Bool{ a == b };

    public type Publication = {
        autor: Nat;
        date: Int; //Timestamp
        content: Tutorial;
        score: ?Float;
    };


}