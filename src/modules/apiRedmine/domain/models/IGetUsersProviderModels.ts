interface IMemberships {
  user?: {
    id: number;
    name: string;
  };
}

interface IResponseApiGetUsersProvider {
  memberships: IMemberships[];
  total_count: number;
  offset: number;
}

export type { IMemberships, IResponseApiGetUsersProvider };
