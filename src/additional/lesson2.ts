const orderStates = [
  'initial',
  'inWork',
  'buyingSupplies',
  'producing',
  'fullfilled',
] as const;

type OrderState = typeof orderStates[number];

export const getUserOrderStates = (orderStatesToFilter: OrderState[]) => orderStatesToFilter
  .filter((element) => element !== 'buyingSupplies' && element !== 'producing');
