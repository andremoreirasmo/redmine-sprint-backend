enum EnumRoleRedmine {
  Owner = 1,
  Admin = 2,
  Contributor = 3,
}

export const EnumRoleRedmineLabel = new Map<number, string>([
  [EnumRoleRedmine.Owner, 'owner'],
  [EnumRoleRedmine.Admin, 'admin'],
  [EnumRoleRedmine.Contributor, 'contributor'],
]);

export default EnumRoleRedmine;
