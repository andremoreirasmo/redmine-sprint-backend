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

export function GetLabelEnumRoleRedmine(value: number): string {
  return EnumRoleRedmineLabel.get(value) ?? '';
}

export function GetLabelsEnumRoleRedmine(...values: number[]): string[] {
  const labels = values.map(value => GetLabelEnumRoleRedmine(value));

  return labels;
}

export default EnumRoleRedmine;
