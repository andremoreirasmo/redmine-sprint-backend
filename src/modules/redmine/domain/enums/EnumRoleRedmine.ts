enum EnumRoleRedmine {
  Owner = 1,
  Admin = 2,
  Contributor = 3,
}

const EnumRoleRedmineLabel = new Map<number, string>([
  [EnumRoleRedmine.Owner, 'owner'],
  [EnumRoleRedmine.Admin, 'admin'],
  [EnumRoleRedmine.Contributor, 'contributor'],
]);

export function GetEnumRoleRedmine(value: number): string {
  return EnumRoleRedmineLabel.get(value) ?? '';
}

export default EnumRoleRedmine;
