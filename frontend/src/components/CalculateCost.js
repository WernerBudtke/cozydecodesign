const CalculateCost = (zipCode) => {
    // 1XXX = Buenos Aires City, Buenos Aires Province North (e.g., C1420 Buenos Aires City, B1900 La Plata).
    // 2XXX = Santa Fe (e.g., S2000 Rosario, S2300 Rafaela).
    // 3XXX = Santa Fe, Entre Ríos, Chaco, Corrientes, Formosa, Misiones (e.g., E3100 Paraná, P3600 Formosa, N3300 Posadas, W3400 Corrientes).
    // 4XXX = Jujuy, Salta, Tucumán, Catamarca, Santiago del Estero (e.g., T4000 Tucumán, A4400 Salta, K4700 Catamarca).
    // 5XXX = Córdoba, La Rioja, San Juan, San Luis, Mendoza (e.g., X5000 Córdoba, M5500 Mendoza, D5700 San Luis, F5300 La Rioja).
    // 6XXX = Buenos Aires Province West, La Pampa (e.g., B6000 Junín, L6300 Santa Rosa, L6700 Luján).
    // 7XXX = Buenos Aires Province East, Center and South (e.g., B7000 Tandil, B7600 Mar del Plata, B7400 Olavarría).
    // 8XXX = Buenos Aires Province South, Río Negro, Neuquén (e.g., B8000 Bahía Blanca, R8400 Bariloche, R8500 Viedma, Q8300 Neuquén).
    // 9XXX = Chubut, Santa Cruz and Tierra del Fuego (e.g., U9000 Comodoro Rivadavia, U9200 Esquel, V9410 Ushuaia, Z9400 Río Gallegos).
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