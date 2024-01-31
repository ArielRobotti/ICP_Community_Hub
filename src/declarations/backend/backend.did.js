export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const DaoFounder = IDL.Record({
    'principal' : IDL.Principal,
    'name' : IDL.Text,
  });
  const TutoId = IDL.Nat;
  const Tutorial = IDL.Record({
    'title' : IDL.Text,
    'html' : IDL.Text,
    'assets' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'tags' : IDL.Vec(IDL.Text),
  });
  const Publication = IDL.Record({
    'content' : Tutorial,
    'autor' : IDL.Nat,
    'date' : IDL.Int,
    'score' : IDL.Opt(IDL.Float64),
  });
  const User = IDL.Record({
    'country' : IDL.Opt(IDL.Text),
    'admissionDate' : IDL.Int,
    'name' : IDL.Text,
    'email' : IDL.Opt(IDL.Text),
    'votedPosts' : IDL.Vec(IDL.Nat),
    'avatar' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Tutorial__1 = IDL.Record({
    'title' : IDL.Text,
    'html' : IDL.Text,
    'assets' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'tags' : IDL.Vec(IDL.Text),
  });
  const PublishResult = IDL.Variant({ 'ok' : Publication, 'err' : IDL.Text });
  const SignUpErrors = IDL.Variant({
    'InBlackList' : IDL.Null,
    'CallerAnnonymous' : IDL.Null,
    'IsAlreadyAMember' : IDL.Null,
  });
  const SignUpResult = IDL.Variant({ 'ok' : User, 'err' : SignUpErrors });
  const UserSettings = IDL.Record({
    'country' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'email' : IDL.Opt(IDL.Text),
    'avatar' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const ICP_Community_Hub = IDL.Service({
    'addAdmin' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'aprovePublication' : IDL.Func([IDL.Nat], [Result], []),
    'deployDaoCanister' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(DaoFounder), IDL.Nat],
        [IDL.Principal],
        [],
      ),
    'getAprovedPublication' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TutoId, Publication))],
        ['query'],
      ),
    'getIncomingPublication' : IDL.Func([], [IDL.Vec(Publication)], []),
    'getMiId' : IDL.Func([], [IDL.Opt(IDL.Nat)], []),
    'getMiUser' : IDL.Func([], [IDL.Opt(User)], []),
    'getPubByID' : IDL.Func([IDL.Nat], [IDL.Opt(Publication)], ['query']),
    'getPubFromUser' : IDL.Func([IDL.Nat], [IDL.Vec(Publication)], ['query']),
    'getUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'iamRegistered' : IDL.Func([], [IDL.Bool], []),
    'loadAvatar' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        [],
      ),
    'publish' : IDL.Func([Tutorial__1], [PublishResult], []),
    'rejectPublication' : IDL.Func([IDL.Nat], [Result], []),
    'search' : IDL.Func([IDL.Text], [IDL.Vec(Publication)], ['query']),
    'signUp' : IDL.Func(
        [IDL.Text, IDL.Opt(IDL.Text), IDL.Opt(IDL.Vec(IDL.Nat8))],
        [SignUpResult],
        [],
      ),
    'userConfig' : IDL.Func([UserSettings], [], []),
  });
  return ICP_Community_Hub;
};
export const init = ({ IDL }) => { return []; };
