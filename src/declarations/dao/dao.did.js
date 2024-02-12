export const idlFactory = ({ IDL }) => {
  const DaoFounder = IDL.Record({
    'principal' : IDL.Principal,
    'name' : IDL.Text,
  });
  const TutoId = IDL.Nat;
  const Dao = IDL.Service({
    'addMember' : IDL.Func([IDL.Principal, IDL.Text], [IDL.Bool], []),
    'disableMember' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'eneableMember' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'getManifesto' : IDL.Func([], [IDL.Text], ['query']),
    'getName' : IDL.Func([], [IDL.Text], ['query']),
    'getPrincipalMembers' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getmembersQty' : IDL.Func([], [IDL.Nat], ['query']),
    'isAMember' : IDL.Func([], [IDL.Bool], []),
    'votePublication' : IDL.Func(
        [IDL.Principal, TutoId, IDL.Int, IDL.Bool],
        [IDL.Bool],
        [],
      ),
    'whoAmi' : IDL.Func([], [IDL.Principal], []),
  });
  return Dao;
};
export const init = ({ IDL }) => {
  const DaoFounder = IDL.Record({
    'principal' : IDL.Principal,
    'name' : IDL.Text,
  });
  return [IDL.Text, IDL.Text, IDL.Vec(DaoFounder)];
};
