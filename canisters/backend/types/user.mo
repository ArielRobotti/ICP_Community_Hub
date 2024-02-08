

module{
    public type UserSettings = {
        name: ?Text;
        email: ?Text;
        avatar: ?Blob;
        country: ?Text;
    };
    public type User = {
        name: Text;
        email: ?Text;
        avatar: ?Blob;
        admissionDate: Int; //Timestamp in secconds
        country: ?Text;
        //account: Account;
        qualifiedPosts: [Nat];
    };

    public type SignUpErrors = {
        #CallerAnnonymous;
        #IsAlreadyAMember;
        #InBlackList;
    };
}