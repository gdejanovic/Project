export const apiRoutes = {
    contracts: '/contracts',
    singleContract: (id: number | string) => `/contract/${id}`,
    saveContract: '/saveContract',
    createContract: '/createContract',
    items: '/items',
    createItem: '/createItem',
  };