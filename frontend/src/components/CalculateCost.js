const CalculateCost = (zipCode) => {
    if (zipCode > 1000 && zipCode < 2000)return 600
    if (zipCode > 2000 && zipCode < 3000)return 1200
    if (zipCode > 3000 && zipCode < 4000)return 1600
    if (zipCode > 4000 && zipCode < 5000)return 2500
    if (zipCode > 5000 && zipCode < 6000)return 2500
    if (zipCode > 6000 && zipCode < 7000)return 1600
    if (zipCode > 7000 && zipCode < 8000)return 1100
    if (zipCode > 8000 && zipCode < 9000)return 1600
    if (zipCode > 9000 && zipCode < 10000)return 3000
    return -1
}
export default CalculateCost