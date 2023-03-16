export class PrismaFormatter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static formatFilter(filterObject: any): Record<string, any> {
    const filterEntries = Object.entries(filterObject);

    const filterdByDate = [
      'createdAt',
      'updatedAt',
      'readjustmentBaseDate',
      'originalStartDate',
      'originalEndDate',
      'startDate',
      'cancellationDate',
      'endDate',
      'executionStartDate',
      'executionEndDate',
      'finishedDate',
      'sentDate',
      'receivedDate',
      'lastUpdate',
    ];

    const enumValues = ['type', 'unit', 'unity', 'role', 'status'];

    const filterWithouUndefined = filterEntries.filter(
      ([, value]) => value !== undefined,
    );

    const filterEntriesTransformed = filterWithouUndefined.map(
      ([key, value]) => {
        if (
          key === 'type' ||
          key === 'unit' ||
          key === 'unity' ||
          key === 'role' ||
          key === 'status'
        ) {
          if (Array.isArray(value)) {
            return [key, { in: value }];
          }
          return [key, value];
        }
        if (key.endsWith('Id') && typeof value === 'string') {
          return [key, value];
        }
        if (key.endsWith('Id') && Array.isArray(value)) {
          return [key, { in: value }];
        }

        if (enumValues.includes(key)) {
          if (Array.isArray(value)) {
            return [key, { in: value }];
          }
          return [key, value];
        }

        if (typeof value === 'string' && key !== 'id') {
          return [key, { contains: value, mode: 'insensitive' }];
        }

        if (filterdByDate.includes(key)) {
          // @ts-ignore
          const { initialDate, finalDate } = value;

          if (initialDate === undefined && finalDate === undefined) {
            return [null, null];
          }

          if (finalDate === undefined) {
            return [key, { gte: new Date(initialDate) }];
          }

          if (initialDate === undefined) {
            return [key, { lte: new Date(finalDate) }];
          }

          return [
            key,
            { gte: new Date(initialDate), lte: new Date(finalDate) },
          ];
        }

        return [key, value];
      },
    );

    const filterEntriesTransformedWithouNulls = filterEntriesTransformed.filter(
      ([, value]) => value !== undefined || value !== null,
    );

    const filterObjectFormated = Object.fromEntries(
      filterEntriesTransformedWithouNulls,
    );

    return filterObjectFormated;
  }

  static formatFindOptions(findOptions: {
    take: number | undefined;
    skip: number | undefined;
    orderBy:
      | {
          property: string;
          mode: 'asc' | 'desc';
        }
      | undefined;
  }) {
    const { take, skip, orderBy } = findOptions;

    const findOptionsObject = {
      ...(take !== undefined ? { take } : {}),
      ...(skip !== undefined ? { skip } : {}),
      orderBy:
        orderBy?.property !== undefined && orderBy?.mode !== undefined
          ? { [orderBy.property]: orderBy.mode }
          : { createdAt: 'desc' },
    };

    return findOptionsObject;
  }
}
