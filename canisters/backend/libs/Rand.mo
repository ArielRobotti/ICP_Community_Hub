// import Blob "mo:base/Blob";
// import Nat8 "mo:base/Nat8";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";
import Prim "mo:⛔";

module {
  public type Number = {
      #Nat: Nat;
      #Nat8: Nat8;
      #Nat16: Nat16;
      #Nat32: Nat32;
      #Nat64: Nat64;
  };

  public class Rand() = this {
    
    let raw_rand = (actor "aaaaa-aa" : actor { raw_rand : () -> async Blob }).raw_rand;
    var store : Nat = 0;
    var range : Nat = 256;
    var bias : Nat = 0;
    //public func getStore() : Nat = store;

    public func init() : async () {
      let blob = Prim.blobToArray(await raw_rand());
      for (i in blob.keys()) {
        store += (256 ** i * Prim.nat8ToNat(blob[i]));
      };
    };

    public func setRange(_min : Nat, _max : Nat) : () {
      if (_min <= _max) {
        range := _max - _min;
        bias := _min;
      } else {
        range := _min - _max;
        bias := _max;
      };
    };

    public func next() : async Nat {
      if (store == 0) { await init() };
      let result = store % range + bias;
      store /= range;
      result;
    };

    public func nRandom(n : Nat) : async [Nat] {
      let tempBuffer = Buffer.fromArray<Nat>([]);
      var i = n;
      while (i > 0) {
        tempBuffer.add(await next());
        i -= 1;
      };
      Buffer.toArray(tempBuffer);
    };
    
    public func randomTypeT(t: ?Text): async Number{
      return switch(t){
        case(?"Nat8" ){ #Nat8 (Prim.natToNat8 (await next()))};
        case(?"Nat16"){ #Nat16(Prim.natToNat16(await next()))};
        case(?"Nat32"){ #Nat32(Prim.natToNat32(await next()))};
        case(?"Nat64"){ #Nat64(Prim.natToNat64(await next()))};
        case(_){ #Nat(await next())};
      };
    };

    public func principal() : async Principal {
      let a = Prim.blobToArray(await raw_rand()); 
      let array = Array.subArray(a, 0, 28); 
      Prim.principalOfBlob(Prim.arrayToBlob(array));
    };
  };
};
