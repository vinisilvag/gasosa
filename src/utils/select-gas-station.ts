export function selectGasStation(selectFuel: boolean) {
  return {
    id: true,
    name: true,
    email: true,
    latitude: true,
    longitude: true,
    createdAt: true,
    updatedAt: true,
    fuels: selectFuel
      ? {
          select: {
            id: true,
            name: true,
            price: true,
            createdAt: true,
            updatedAt: true
          }
        }
      : undefined
  }
}
