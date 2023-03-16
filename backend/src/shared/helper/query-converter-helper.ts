export const booleanConverter = (value: string): boolean => {
  if (value === 'false') return false;

  return Boolean(value);
};

const arrayConverter = (value: string) => {
  if (typeof value === 'string' && value !== '') return [...value.split(',')];
  return value;
};

const numberConverter = (value: string) => parseInt(value, 10);

const numberFloatConverter = (value: string) => Number(value);

const rangeDateConverter = (value: string) => {
  const rangeDateArray = arrayConverter(value);

  const [initialDate, finalDate] = rangeDateArray;

  const rangeDateObject = { initialDate, finalDate };

  return rangeDateObject;
};

const orderByConverter = (value: string) => {
  const orderByArray = arrayConverter(value);

  const [property, mode] = orderByArray;

  const orderByObject = { property, mode };

  return orderByObject;
};

const propertysInQueryToConvert = {
  lotsAmount: numberConverter,
  housingUnitAmount: numberConverter,
  stampsAmount: numberConverter,
  totalArea: numberConverter,
  order: numberConverter,
  isAdmin: booleanConverter,
  deleted: booleanConverter,
  salary: numberConverter,
  unitValue: numberFloatConverter,
  consortiumParticipation: numberConverter,
  expectedQuantity: numberFloatConverter,
  deadline: numberConverter,
  value: numberConverter,
  originalValue: numberConverter,
  take: numberConverter,
  skip: numberConverter,
  readjustmentBaseDateRange: rangeDateConverter,
  originalStartDateRange: rangeDateConverter,
  originalEndDateRange: rangeDateConverter,
  startDateRange: rangeDateConverter,
  endDateRange: rangeDateConverter,
  originalEndtDate: rangeDateConverter,
  cancellationDateRange: rangeDateConverter,
  endtDate: rangeDateConverter,
  createdAt: rangeDateConverter,
  updatedAt: rangeDateConverter,
  orderBy: orderByConverter,
  count: booleanConverter,
  code: numberConverter,
  amount: numberConverter,
  lastUpdate: rangeDateConverter,
  enable: booleanConverter,
  startDate: rangeDateConverter,
  endDate: rangeDateConverter,
  percent: numberFloatConverter,
  available: booleanConverter,
  oisExist: booleanConverter,
  avalibleToBeMeasure: booleanConverter,
  balance: booleanConverter,
  rangeDate: rangeDateConverter,
  goalTypeFinancial: booleanConverter,
  totalValue: numberFloatConverter,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertProperties = (obj: any): any =>
  Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => {
        // @ts-ignore
        if (propertysInQueryToConvert[key])
          // @ts-ignore
          return [key, propertysInQueryToConvert[key](value)];
        return [key, value];
      }),
  );

const propertysInMultipartToConvert = {
  deadline: numberConverter,
  totalValue: numberFloatConverter,
  value: numberFloatConverter,
  lotsAmount: numberFloatConverter,
  housingUnitAmount: numberFloatConverter,
  stampsAmount: numberFloatConverter,
  totalArea: numberFloatConverter,
  deleted: booleanConverter,
  createdAt: rangeDateConverter,
  updatedAt: rangeDateConverter,
  orderBy: orderByConverter,
  count: booleanConverter,
  amount: numberFloatConverter,
  originalValue: numberFloatConverter,
  readjustmentValue: numberFloatConverter,
  rangeDate: rangeDateConverter,
  quantity: numberFloatConverter,
  goalTypeFinancial: booleanConverter,
};

export const convertPropertiesInMultipart = (obj: any): any =>
  Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => {
        // @ts-ignore
        if (propertysInMultipartToConvert[key])
          // @ts-ignore
          return [key, propertysInMultipartToConvert[key](value)];
        return [key, value];
      }),
  );
