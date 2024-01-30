import Types "Types";
import Principal "mo:base/Principal";
import HashMap "libs/FunctionalStableHashMap";
import User "user";
import Time "mo:base/Time";

import Result "mo:base/Result";

shared ({ caller }) actor class Dao(name : Text, manifesto : Text, founders : [(Principal, User.User)]) = {

    stable let deployTimeStamp : Int = Time.now();
    stable var masterPlatform = Principal.fromText("aaaaa-aa");

    type Member = Types.Member;
    type TutoId = Types.TutoId;
    type Mode = Types.Mode;
    type updateMembersResult = Result.Result<?Member, Text>;
    let principalHash = Principal.hash;
    let principalEqual = Principal.equal;

    public func getName() : async Text { name };
    public func getManifesto() : async Text { manifesto };

    let members = HashMap.init<Principal, Member>();
    for (founder in founders.vals()) {
        let member = {
            name = founder.1.name;
            admissionDate = deployTimeStamp;
            enabled = true;
            votedTutoId : [TutoId] = [];
            //score: Nat;
            //account: Account;
        };
        HashMap.put(members, principalEqual, principalHash, founder.0, member)
    };

    public func isAMember(p : Principal) : async Bool { _isAMember(p) };

    func _isAMember(p : Principal) : Bool {
        return switch (HashMap.get(members, principalEqual, principalHash, p)) {
            case null { false };
            case (_) { true }
        }
    };

    public shared ({ caller }) func addMember(p : Principal, name : Text) : async Bool {
        assert (caller == masterPlatform);
        if (_isAMember(p)) { 
            return false;
        };
        let admissionDate = Time.now();
        let member = {
            name;
            admissionDate;
            enabled = true;
            votedTutoId : [TutoId] = [];
            //score: Nat;
            //account: Account;
        };
        HashMap.put(members, principalEqual, principalHash, p, member);
        return true

    };

    public shared func eneableMember(p : Principal) : async Bool {
        assert (caller == masterPlatform);
        return setMemberEnablement(p, true)
    };

    public shared ({ caller }) func disableMember(p : Principal) : async Bool {
        assert (caller == masterPlatform);
        return setMemberEnablement(p, false)
    };

    func setMemberEnablement(p : Principal, setMemberEnablement : Bool) : Bool {
        switch (HashMap.get(members, principalEqual, principalHash, p)) {
            case null {
                return false
            };
            case (?member) {
                let updateStatus = {
                    name = member.name;
                    admissionDate = member.admissionDate;
                    enabled = setMemberEnablement;
                    votedTutoId = member.votedTutoId;
                    //score: Nat;
                    //account: Account;
                };
                HashMap.put(members, principalEqual, principalHash, p, updateStatus);
                return true
            }
        }
    };

}
